import { DurableObject } from "cloudflare:workers";

export class WorkflowDO extends DurableObject {
  constructor(state, env) {
    super(state, env);
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Stub logic for now
    if (path.endsWith('/execute') && method === 'POST') {
      const data = await request.json();
      return this.executeWorkflow(data);
    }

    return new Response("Not found", { status: 404 });
  }

  async executeWorkflow(data) {
    try {
      const { workflowId, context } = data;

      // 1. Fetch definition (mock or from D1 via injected service if possible, or pass it in)
      // For DO, it usually maintains state. If this DO represents a specific Workflow execution, it's stateful.
      // If it represents the "Engine", it might just be a stateless runner or coordinating singleton.
      // Given the Binding name "WORKFLOW", it usually implies one DO or many.

      // Assuming this DO is a transient runner or a singleton orchestrator.
      // Let's assume passed definition for simplicity for now.

      console.log(`Executing Workflow ${workflowId}`, context);

      // Mock Execution
      return new Response(JSON.stringify({
        status: 'completed',
        result: { action: 'sent_message', text: 'Hello from workflow' }
      }));

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
