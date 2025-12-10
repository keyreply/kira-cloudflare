import { DurableObject } from "cloudflare:workers";

/**
 * WorkflowDO - Long-running business process orchestration Durable Object
 *
 * Features:
 * - Multi-step workflow execution
 * - Step types: action, wait, condition, parallel
 * - Automatic retries with exponential backoff
 * - Alarm-based scheduling for delays
 * - Workflow context management
 * - Error handling and recovery
 */
export class WorkflowDO extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;

    // Initialize database
    this.initDatabase();
  }

  /**
   * Initialize SQLite database schema
   */
  async initDatabase() {
    await this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS workflows (
        id TEXT PRIMARY KEY,
        definition_id TEXT NOT NULL,
        name TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        current_step INTEGER DEFAULT 0,
        context TEXT DEFAULT '{}',
        input TEXT DEFAULT '{}',
        output TEXT DEFAULT '{}',
        error TEXT,
        started_at INTEGER,
        completed_at INTEGER,
        created_at INTEGER DEFAULT (unixepoch())
      )
    `);

    await this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS steps (
        id TEXT PRIMARY KEY,
        workflow_id TEXT NOT NULL,
        step_id TEXT NOT NULL,
        step_index INTEGER NOT NULL,
        step_type TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        input TEXT DEFAULT '{}',
        output TEXT DEFAULT '{}',
        error TEXT,
        retry_count INTEGER DEFAULT 0,
        max_retries INTEGER DEFAULT 3,
        started_at INTEGER,
        completed_at INTEGER,
        created_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (workflow_id) REFERENCES workflows(id)
      )
    `);

    await this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS scheduled (
        id TEXT PRIMARY KEY,
        workflow_id TEXT NOT NULL,
        step_id TEXT NOT NULL,
        scheduled_at INTEGER NOT NULL,
        reason TEXT,
        data TEXT DEFAULT '{}',
        processed INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (workflow_id) REFERENCES workflows(id)
      )
    `);

    // Create indexes
    await this.ctx.storage.sql.exec(`
      CREATE INDEX IF NOT EXISTS idx_workflows_status
      ON workflows(status, created_at)
    `);

    await this.ctx.storage.sql.exec(`
      CREATE INDEX IF NOT EXISTS idx_steps_workflow
      ON steps(workflow_id, step_index)
    `);

    await this.ctx.storage.sql.exec(`
      CREATE INDEX IF NOT EXISTS idx_scheduled_time
      ON scheduled(scheduled_at, processed)
    `);
  }

  /**
   * Handle incoming fetch requests
   */
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === '/start' && request.method === 'POST') {
        const body = await request.json();
        const result = await this.start(body);
        return Response.json(result);
      }

      if (path === '/status' && request.method === 'GET') {
        const workflowId = url.searchParams.get('workflowId');
        const status = await this.getStatus(workflowId);
        return Response.json(status);
      }

      if (path === '/cancel' && request.method === 'POST') {
        const body = await request.json();
        const result = await this.cancel(body.workflowId);
        return Response.json(result);
      }

      if (path === '/retry' && request.method === 'POST') {
        const body = await request.json();
        const result = await this.retryStep(body);
        return Response.json(result);
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('WorkflowDO error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  /**
   * Alarm handler for scheduled workflow steps
   */
  async alarm() {
    const now = Math.floor(Date.now() / 1000);

    // Get all pending scheduled items
    const result = await this.ctx.storage.sql.exec(
      `SELECT * FROM scheduled
       WHERE processed = 0 AND scheduled_at <= ?
       ORDER BY scheduled_at ASC`,
      now
    );

    for (const scheduled of result.rows) {
      try {
        const data = JSON.parse(scheduled.data || '{}');

        if (scheduled.reason === 'wait') {
          // Resume workflow after wait
          await this.resumeWorkflow(scheduled.workflow_id, scheduled.step_id, data);
        } else if (scheduled.reason === 'retry') {
          // Retry failed step
          await this.executeStepWithRetry(scheduled.workflow_id, scheduled.step_id, data);
        }

        // Mark as processed
        await this.ctx.storage.sql.exec(
          `UPDATE scheduled SET processed = 1 WHERE id = ?`,
          scheduled.id
        );
      } catch (error) {
        console.error('Alarm processing error:', error);
        await this.ctx.storage.sql.exec(
          `UPDATE scheduled SET processed = 1, data = ? WHERE id = ?`,
          JSON.stringify({ error: error.message }), scheduled.id
        );
      }
    }

    // Check if there are more scheduled items
    const nextResult = await this.ctx.storage.sql.exec(
      `SELECT MIN(scheduled_at) as next_time FROM scheduled WHERE processed = 0`
    );

    if (nextResult.rows[0].next_time) {
      // Schedule next alarm
      this.ctx.storage.setAlarm(nextResult.rows[0].next_time * 1000);
    }
  }

  /**
   * Start a new workflow
   * @param {Object} params
   * @param {string} params.definitionId - Workflow definition ID
   * @param {string} params.name - Workflow name
   * @param {Object} params.input - Initial input data
   * @param {Array} params.steps - Step definitions
   * @returns {Object} { workflowId, status }
   */
  async start({ definitionId, name, input = {}, steps = [] }) {
    const workflowId = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    // Create workflow record
    await this.ctx.storage.sql.exec(
      `INSERT INTO workflows
       (id, definition_id, name, status, context, input, started_at, created_at)
       VALUES (?, ?, ?, 'running', '{}', ?, ?, ?)`,
      workflowId, definitionId, name, JSON.stringify(input), now, now
    );

    // Create step records
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await this.ctx.storage.sql.exec(
        `INSERT INTO steps
         (id, workflow_id, step_id, step_index, step_type, max_retries)
         VALUES (?, ?, ?, ?, ?, ?)`,
        crypto.randomUUID(),
        workflowId,
        step.id,
        i,
        step.type,
        step.maxRetries || 3
      );
    }

    // Start executing first step
    await this.executeNextStep(workflowId);

    return {
      workflowId,
      status: 'running',
      startedAt: now
    };
  }

  /**
   * Get workflow status
   */
  async getStatus(workflowId) {
    const workflowResult = await this.ctx.storage.sql.exec(
      `SELECT * FROM workflows WHERE id = ?`,
      workflowId
    );

    if (workflowResult.rows.length === 0) {
      return { error: 'Workflow not found' };
    }

    const workflow = workflowResult.rows[0];

    const stepsResult = await this.ctx.storage.sql.exec(
      `SELECT * FROM steps WHERE workflow_id = ? ORDER BY step_index`,
      workflowId
    );

    return {
      ...workflow,
      context: JSON.parse(workflow.context || '{}'),
      input: JSON.parse(workflow.input || '{}'),
      output: JSON.parse(workflow.output || '{}'),
      steps: stepsResult.rows.map(step => ({
        ...step,
        input: JSON.parse(step.input || '{}'),
        output: JSON.parse(step.output || '{}')
      }))
    };
  }

  /**
   * Execute next step in workflow
   */
  async executeNextStep(workflowId) {
    const workflow = await this.getStatus(workflowId);

    if (workflow.status !== 'running') {
      return;
    }

    const currentStepIndex = workflow.current_step;
    const nextStep = workflow.steps[currentStepIndex];

    if (!nextStep) {
      // Workflow completed
      await this.completeWorkflow(workflowId);
      return;
    }

    // Get workflow context
    const context = workflow.context;

    // Update step status
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'running', started_at = ? WHERE id = ?`,
      Math.floor(Date.now() / 1000), nextStep.id
    );

    try {
      await this.executeStep(workflowId, nextStep, context);
    } catch (error) {
      await this.handleStepError(workflowId, nextStep, error);
    }
  }

  /**
   * Execute a single step
   */
  async executeStep(workflowId, step, context) {
    const now = Math.floor(Date.now() / 1000);

    switch (step.step_type) {
      case 'action':
        await this.executeActionStep(workflowId, step, context);
        break;

      case 'wait':
        await this.executeWaitStep(workflowId, step, context);
        break;

      case 'condition':
        await this.executeConditionStep(workflowId, step, context);
        break;

      case 'parallel':
        await this.executeParallelStep(workflowId, step, context);
        break;

      default:
        throw new Error(`Unknown step type: ${step.step_type}`);
    }
  }

  /**
   * Execute action step (calls external service or function)
   */
  async executeActionStep(workflowId, step, context) {
    // This is where you'd call external services, APIs, or Cloudflare Workers
    // For now, this is a placeholder that simulates action execution

    const stepInput = JSON.parse(step.input || '{}');

    // Simulate async action
    const result = {
      success: true,
      data: { message: 'Action completed', context }
    };

    // Update step with output
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'completed', output = ?, completed_at = ? WHERE id = ?`,
      JSON.stringify(result), Math.floor(Date.now() / 1000), step.id
    );

    // Update workflow context
    const updatedContext = { ...context, [`step_${step.step_id}`]: result.data };
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET context = ? WHERE id = ?`,
      JSON.stringify(updatedContext), workflowId
    );

    // Proceed to next step
    await this.proceedToNextStep(workflowId);
  }

  /**
   * Execute wait step (schedule alarm)
   */
  async executeWaitStep(workflowId, step, context) {
    const stepInput = JSON.parse(step.input || '{}');
    const waitSeconds = stepInput.waitSeconds || 60;
    const scheduledAt = Math.floor(Date.now() / 1000) + waitSeconds;

    // Schedule wakeup
    await this.ctx.storage.sql.exec(
      `INSERT INTO scheduled
       (id, workflow_id, step_id, scheduled_at, reason, data)
       VALUES (?, ?, ?, ?, 'wait', ?)`,
      crypto.randomUUID(), workflowId, step.id, scheduledAt, JSON.stringify(context)
    );

    // Update step status
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'waiting' WHERE id = ?`,
      step.id
    );

    // Set alarm
    this.ctx.storage.setAlarm(scheduledAt * 1000);
  }

  /**
   * Execute condition step (branch based on condition)
   */
  async executeConditionStep(workflowId, step, context) {
    const stepInput = JSON.parse(step.input || '{}');
    const condition = stepInput.condition;

    // Evaluate condition (simplified - in production, use a proper expression evaluator)
    const conditionMet = this.evaluateCondition(condition, context);

    const result = { conditionMet };

    // Update step
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'completed', output = ?, completed_at = ? WHERE id = ?`,
      JSON.stringify(result), Math.floor(Date.now() / 1000), step.id
    );

    // Update context
    const updatedContext = { ...context, [`step_${step.step_id}`]: result };
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET context = ? WHERE id = ?`,
      JSON.stringify(updatedContext), workflowId
    );

    // Proceed based on condition
    if (conditionMet && stepInput.nextStepIfTrue) {
      // Jump to specific step
      await this.jumpToStep(workflowId, stepInput.nextStepIfTrue);
    } else {
      await this.proceedToNextStep(workflowId);
    }
  }

  /**
   * Execute parallel step (fan-out)
   */
  async executeParallelStep(workflowId, step, context) {
    const stepInput = JSON.parse(step.input || '{}');
    const parallelTasks = stepInput.tasks || [];

    // Execute all tasks in parallel (simplified)
    const results = await Promise.allSettled(
      parallelTasks.map(task => this.executeParallelTask(task, context))
    );

    const output = {
      results: results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason.message })
    };

    // Update step
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'completed', output = ?, completed_at = ? WHERE id = ?`,
      JSON.stringify(output), Math.floor(Date.now() / 1000), step.id
    );

    // Update context
    const updatedContext = { ...context, [`step_${step.step_id}`]: output };
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET context = ? WHERE id = ?`,
      JSON.stringify(updatedContext), workflowId
    );

    await this.proceedToNextStep(workflowId);
  }

  /**
   * Execute parallel task
   */
  async executeParallelTask(task, context) {
    // Placeholder for parallel task execution
    return { success: true, task };
  }

  /**
   * Handle step error with retry logic
   */
  async handleStepError(workflowId, step, error) {
    const retryCount = step.retry_count + 1;
    const maxRetries = step.max_retries;

    // Update step error
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET error = ?, retry_count = ? WHERE id = ?`,
      error.message, retryCount, step.id
    );

    if (retryCount < maxRetries) {
      // Schedule retry with exponential backoff
      const backoffSeconds = Math.pow(2, retryCount) * 10; // 10s, 20s, 40s, etc.
      const scheduledAt = Math.floor(Date.now() / 1000) + backoffSeconds;

      await this.ctx.storage.sql.exec(
        `INSERT INTO scheduled
         (id, workflow_id, step_id, scheduled_at, reason, data)
         VALUES (?, ?, ?, ?, 'retry', ?)`,
        crypto.randomUUID(), workflowId, step.id, scheduledAt,
        JSON.stringify({ retryCount, error: error.message })
      );

      // Update step status
      await this.ctx.storage.sql.exec(
        `UPDATE steps SET status = 'retrying' WHERE id = ?`,
        step.id
      );

      // Set alarm
      this.ctx.storage.setAlarm(scheduledAt * 1000);
    } else {
      // Max retries exceeded - fail workflow
      await this.failWorkflow(workflowId, `Step ${step.step_id} failed: ${error.message}`);
    }
  }

  /**
   * Proceed to next step
   */
  async proceedToNextStep(workflowId) {
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET current_step = current_step + 1 WHERE id = ?`,
      workflowId
    );

    await this.executeNextStep(workflowId);
  }

  /**
   * Jump to specific step
   */
  async jumpToStep(workflowId, stepId) {
    const result = await this.ctx.storage.sql.exec(
      `SELECT step_index FROM steps WHERE workflow_id = ? AND step_id = ?`,
      workflowId, stepId
    );

    if (result.rows.length > 0) {
      await this.ctx.storage.sql.exec(
        `UPDATE workflows SET current_step = ? WHERE id = ?`,
        result.rows[0].step_index, workflowId
      );

      await this.executeNextStep(workflowId);
    }
  }

  /**
   * Resume workflow after wait
   */
  async resumeWorkflow(workflowId, stepId, context) {
    // Update step status
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'completed', completed_at = ? WHERE step_id = ? AND workflow_id = ?`,
      Math.floor(Date.now() / 1000), stepId, workflowId
    );

    // Proceed to next step
    await this.proceedToNextStep(workflowId);
  }

  /**
   * Retry step execution
   */
  async executeStepWithRetry(workflowId, stepId, data) {
    const result = await this.ctx.storage.sql.exec(
      `SELECT * FROM steps WHERE step_id = ? AND workflow_id = ?`,
      stepId, workflowId
    );

    if (result.rows.length > 0) {
      const step = result.rows[0];
      const workflowStatus = await this.getStatus(workflowId);

      try {
        await this.executeStep(workflowId, step, workflowStatus.context);
      } catch (error) {
        await this.handleStepError(workflowId, step, error);
      }
    }
  }

  /**
   * Complete workflow
   */
  async completeWorkflow(workflowId) {
    const now = Math.floor(Date.now() / 1000);

    const workflow = await this.getStatus(workflowId);

    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET status = 'completed', output = ?, completed_at = ? WHERE id = ?`,
      JSON.stringify(workflow.context), now, workflowId
    );
  }

  /**
   * Fail workflow
   */
  async failWorkflow(workflowId, error) {
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET status = 'failed', error = ? WHERE id = ?`,
      error, workflowId
    );
  }

  /**
   * Cancel workflow
   */
  async cancel(workflowId) {
    await this.ctx.storage.sql.exec(
      `UPDATE workflows SET status = 'cancelled' WHERE id = ?`,
      workflowId
    );

    return { success: true, workflowId };
  }

  /**
   * Evaluate condition (simplified)
   */
  evaluateCondition(condition, context) {
    // This is a simplified condition evaluator
    // In production, use a proper expression parser/evaluator
    try {
      // Example: "context.step_1.value > 100"
      const func = new Function('context', `return ${condition}`);
      return func(context);
    } catch (error) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  }

  /**
   * Retry a specific step
   */
  async retryStep({ workflowId, stepId }) {
    await this.ctx.storage.sql.exec(
      `UPDATE steps SET status = 'pending', retry_count = 0, error = NULL WHERE step_id = ? AND workflow_id = ?`,
      stepId, workflowId
    );

    const workflowStatus = await this.getStatus(workflowId);
    const step = workflowStatus.steps.find(s => s.step_id === stepId);

    if (step) {
      try {
        await this.executeStep(workflowId, step, workflowStatus.context);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: false, error: 'Step not found' };
  }
}

