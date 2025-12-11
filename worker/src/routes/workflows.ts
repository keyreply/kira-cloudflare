import { Hono } from 'hono';
import { getTenantId } from '../middleware/auth';

const workflowsRouter = new Hono();

// List Workflows
workflowsRouter.get('/', async (c) => {
    const tenantId = getTenantId(c);
    const { results } = await c.env.DB.prepare(
        "SELECT * FROM workflows WHERE tenant_id = ? ORDER BY updated_at DESC"
    ).bind(tenantId).all();
    return c.json({ workflows: results });
});

// Create Workflow
workflowsRouter.post('/', async (c) => {
    const tenantId = getTenantId(c);
    const data = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(`
        INSERT INTO workflows (id, tenant_id, name, description, trigger_type, definition, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
        id,
        tenantId,
        data.name,
        data.description || '',
        data.triggerType,
        JSON.stringify(data.definition || {}),
        data.isActive ? 1 : 0
    ).run();

    return c.json({ success: true, id });
});

// Get Workflow
workflowsRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const workflow = await c.env.DB.prepare("SELECT * FROM workflows WHERE id = ?").bind(id).first();
    if (!workflow) return c.json({ error: "Not found" }, 404);

    // Parse definition JSON
    if (workflow.definition) {
        workflow.definition = JSON.parse(workflow.definition);
    }

    return c.json({ workflow });
});

// Update Workflow
workflowsRouter.put('/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json();

    await c.env.DB.prepare(`
        UPDATE workflows 
        SET name = ?, description = ?, trigger_type = ?, definition = ?, is_active = ?, updated_at = datetime('now')
        WHERE id = ?
    `).bind(
        data.name,
        data.description,
        data.triggerType,
        JSON.stringify(data.definition),
        data.isActive ? 1 : 0,
        id
    ).run();

    return c.json({ success: true });
});

// Simple Execution Test
workflowsRouter.post('/:id/test', async (c) => {
    const id = c.req.param('id');
    // Invoke WorkflowDO
    const idObj = c.env.WORKFLOW.idFromName("engine"); // Singleton engine for now
    const stub = c.env.WORKFLOW.get(idObj);
    return stub.fetch(new Request('http://internal/execute', {
        method: 'POST',
        body: JSON.stringify({ workflowId: id, context: { test: true } })
    }));
});

export default workflowsRouter;
