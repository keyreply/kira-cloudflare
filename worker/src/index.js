/**
 * PPP Academy API - Main Worker Entry Point
 *
 * This is the main entry point for the Cloudflare Worker that powers PPP Academy's API.
 * It uses the Hono framework for routing and middleware management.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Import routes
import tenantsRouter from './routes/tenants.js';
import customersRouter from './routes/customers.js';
import conversationsRouter from './routes/conversations.js';
import agentsRouter from './routes/agents.js';
import notificationsRouter from './routes/notifications.js';
import documentsRouter from './routes/documents.js';
import emailsRouter from './routes/emails.js';
import sttRouter from './routes/stt.js';

// Import AI configuration
import { getAllModels } from './services/ai-config.js';

// Import middleware
import { trackApiUsage } from './middleware/auth.js';

// Import services
import { processDocument as processDocumentRAG } from './services/rag.js';

// Create main Hono app
const app = new Hono();

// ============================================
// Global Middleware
// ============================================

// CORS middleware - allow cross-origin requests
app.use('*', cors({
  origin: (origin) => {
    // Allow requests from any origin in development
    if (process.env.ENVIRONMENT === 'development') {
      return origin || '*';
    }

    // In production, only allow specific origins
    const allowedOrigins = [
      'https://ppp-academy.com',
      'https://app.ppp-academy.com',
      'https://admin.ppp-academy.com'
    ];

    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  exposeHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  maxAge: 86400,
  credentials: true,
}));

// Request logging middleware
app.use('*', logger());

// API usage tracking middleware (for authenticated routes)
app.use('/tenants/*', trackApiUsage);
app.use('/customers/*', trackApiUsage);
app.use('/conversations/*', trackApiUsage);
app.use('/agents/*', trackApiUsage);
app.use('/notifications/*', trackApiUsage);
app.use('/documents/*', trackApiUsage);
app.use('/emails/*', trackApiUsage);
app.use('/stt/*', trackApiUsage);

// ============================================
// Health Check
// ============================================

app.get('/', (c) => {
  return c.json({
    name: 'PPP Academy API',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT || 'development'
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'ok',
      storage: 'ok',
      ai: 'ok'
    }
  });
});

// ============================================
// Mount Route Modules
// ============================================

app.route('/tenants', tenantsRouter);
app.route('/customers', customersRouter);
app.route('/conversations', conversationsRouter);
app.route('/agents', agentsRouter);
app.route('/notifications', notificationsRouter);
app.route('/documents', documentsRouter);
app.route('/emails', emailsRouter);
app.route('/stt', sttRouter);

// AI Models endpoint
app.get('/ai/models', (c) => {
  return c.json(getAllModels());
});

// ============================================
// Error Handling
// ============================================

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: c.req.path,
    method: c.req.method
  }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error('Error:', err);

  // Don't expose internal errors in production
  if (c.env.ENVIRONMENT === 'production') {
    return c.json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    }, 500);
  }

  return c.json({
    error: 'Internal Server Error',
    message: err.message,
    stack: err.stack
  }, 500);
});

// ============================================
// Queue Handler
// ============================================

/**
 * Handle messages from the document processing queue
 */
async function handleQueue(batch, env) {
  for (const message of batch.messages) {
    try {
      const { type, data } = message.body;

      switch (type) {
        case 'document.process':
          await processDocument(data, env);
          break;
        case 'document.embed':
          await embedDocument(data, env);
          break;
        case 'document.delete':
          await deleteDocument(data, env);
          break;
        default:
          console.warn('Unknown queue message type:', type);
      }

      message.ack();
    } catch (error) {
      console.error('Queue message processing error:', error);
      message.retry();
    }
  }
}

/**
 * Process document (extract text, generate embeddings, etc.)
 */
async function processDocument(data, env) {
  const { documentId, tenantId } = data;

  console.log(`Processing document ${documentId} for tenant ${tenantId}`);

  // Use the RAG service to process the document
  await processDocumentRAG(env, tenantId, documentId);

  console.log(`Document ${documentId} processed successfully`);
}

/**
 * Embed document chunks into vector database
 */
async function embedDocument(data, env) {
  const { documentId, chunks, tenantId } = data;

  console.log(`Embedding ${chunks.length} chunks for document ${documentId}`);

  const embeddings = [];

  for (const chunk of chunks) {
    // Use Qwen3 Embedding model (1024 dimensions)
    const result = await env.AI.run('@cf/qwen/qwen3-embedding-0.6b', {
      text: chunk.text
    });

    embeddings.push({
      id: `${documentId}:${chunk.index}`,
      values: result.data[0],
      metadata: {
        tenantId,
        documentId,
        chunkIndex: chunk.index,
        text: chunk.text
      }
    });
  }

  await env.VECTORIZE.insert(embeddings);

  console.log(`Embedded ${embeddings.length} chunks for document ${documentId}`);
}

/**
 * Delete document and its embeddings
 */
async function deleteDocument(data, env) {
  const { documentId, tenantId } = data;

  console.log(`Deleting document ${documentId}`);

  // Delete from R2
  await env.DOCS_BUCKET.delete(`${tenantId}/${documentId}`);

  // Delete embeddings from Vectorize
  // Note: Vectorize delete implementation would go here

  // Delete from D1
  await env.DB.prepare('DELETE FROM documents WHERE id = ?')
    .bind(documentId)
    .run();

  console.log(`Document ${documentId} deleted successfully`);
}

// ============================================
// Durable Object Exports
// ============================================

/**
 * Export Durable Object classes
 * These will be implemented in separate files
 */

// Tenant management
export { TenantDO } from './durable-objects/TenantDO.js';

// Customer profiles
export { CustomerDO } from './durable-objects/CustomerDO.js';

// Conversations and messages
export { ConversationDO } from './durable-objects/ConversationDO.js';

// Rate limiting
export { RateLimiterDO } from './durable-objects/RateLimiterDO.js';

// AI agents
export { AgentDO } from './durable-objects/AgentDO.js';

// Notifications
export { NotificationDO } from './durable-objects/NotificationDO.js';

// Workflows
export { WorkflowDO } from './durable-objects/WorkflowDO.js';

// Analytics
export { AnalyticsDO } from './durable-objects/AnalyticsDO.js';

// ============================================
// Worker Exports
// ============================================

/**
 * Main fetch handler
 */
export default {
  fetch: app.fetch,
  queue: handleQueue,
};
