import { Hono } from 'hono';
import { PlatformFunctionService } from '../services/PlatformFunctionService.ts';
import type { HonoEnv } from '../types/context.ts';
import type { UpdateFunctionRequest } from '../types/api.ts';

const functionRouter = new Hono<HonoEnv>();

// Middleware to inject service
functionRouter.use('*', async (c, next) => {
    // In a real app we might cache this service instance or use DI
    const service = new PlatformFunctionService(c.env);
    c.set('services', { ...c.get('services'), platformFunction: service });
    await next();
});

// Helper to get service
const getService = (c: any) => new PlatformFunctionService(c.env);

// Upload/Update a function
functionRouter.post('/', async (c) => {
    const tenantId = c.req.header('X-Tenant-ID');
    if (!tenantId) return c.json({ error: 'Tenant ID required' }, 400);

    const body = await c.req.json() as { name: string; script: string };
    if (!body.name || !body.script) {
        return c.json({ error: 'Name and script are required' }, 400);
    }

    try {
        const service = getService(c);
        await service.uploadFunction(tenantId, body.name, body.script);
        return c.json({ success: true, message: 'Function uploaded successfully' });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

// Delete a function
functionRouter.delete('/:name', async (c) => {
    const tenantId = c.req.header('X-Tenant-ID');
    const name = c.req.param('name');
    if (!tenantId) return c.json({ error: 'Tenant ID required' }, 400);

    try {
        const service = getService(c);
        await service.deleteFunction(tenantId, name);
        return c.json({ success: true, message: 'Function deleted successfully' });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

// Execute a function (Test)
functionRouter.post('/:name/execute', async (c) => {
    const tenantId = c.req.header('X-Tenant-ID');
    const name = c.req.param('name');
    if (!tenantId) return c.json({ error: 'Tenant ID required' }, 400);

    const payload = await c.req.json();

    try {
        const service = getService(c);
        const result = await service.executeFunction(tenantId, name, payload);
        return c.json({ success: true, result });
    } catch (err: any) {
        return c.json({ success: false, error: err.message }, 500);
    }
});

// List functions
functionRouter.get('/', async (c) => {
    const tenantId = c.req.header('X-Tenant-ID');
    if (!tenantId) return c.json({ error: 'Tenant ID required' }, 400);

    try {
        const service = getService(c);
        const functions = await service.listFunctions(tenantId);
        return c.json({ success: true, data: functions });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

export default functionRouter;
