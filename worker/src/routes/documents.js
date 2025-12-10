/**
 * Document Management Routes
 * Handles document upload, retrieval, semantic search, and RAG-powered Q&A
 */

import { Hono } from 'hono';
import { authMiddleware, getTenantId, getUserId, requirePermission } from '../middleware/auth.js';
import {
  uploadDocument,
  processDocument,
  searchDocuments,
  generateRAGResponse,
  deleteDocument,
  listDocuments,
  getDocument,
  downloadDocument
} from '../services/rag.js';

const app = new Hono();

// Apply auth middleware to all routes
app.use('*', authMiddleware);

/**
 * Helper function to get TenantDO stub
 */
function getTenantStub(env, tenantId) {
  return env.TENANT.get(env.TENANT.idFromName(tenantId));
}

/**
 * Helper to check tenant quota
 */
async function checkTenantQuota(env, tenantId, metric) {
  try {
    const tenantStub = getTenantStub(env, tenantId);
    const response = await tenantStub.fetch(`http://internal/quota/${metric}`, {
      method: 'GET'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to check quota:', error);
    // If quota check fails, allow the operation to continue
    return { allowed: true };
  }
}

/**
 * POST /upload
 * Upload document for processing
 */
app.post('/upload', async (c) => {
  const tenantId = getTenantId(c);
  const userId = getUserId(c);

  try {
    // Check document quota
    const quota = await checkTenantQuota(c.env, tenantId, 'documents_count');
    if (!quota.allowed) {
      return c.json({
        error: 'Quota Exceeded',
        message: 'Document upload quota exceeded',
        quota: quota
      }, 429);
    }

    // Parse multipart form data
    const formData = await c.req.formData();
    const file = formData.get('file');

    if (!file) {
      return c.json({
        error: 'Bad Request',
        message: 'No file provided'
      }, 400);
    }

    // Get optional metadata from form
    const metadata = {
      userId,
      title: formData.get('title') || file.name,
      description: formData.get('description') || '',
      tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [],
      category: formData.get('category') || 'general'
    };

    // Upload document
    const result = await uploadDocument(c.env, tenantId, file, metadata);

    return c.json({
      success: true,
      document: result,
      message: 'Document uploaded successfully and queued for processing'
    }, 201);
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({
      error: 'Upload Failed',
      message: error.message
    }, 400);
  }
});

/**
 * GET /
 * List documents with pagination
 */
app.get('/', async (c) => {
  const tenantId = getTenantId(c);

  try {
    // Get query parameters
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const status = c.req.query('status');
    const sortBy = c.req.query('sortBy') || 'created_at';
    const sortOrder = c.req.query('sortOrder') || 'desc';

    // Validate pagination parameters
    if (limit < 1 || limit > 100) {
      return c.json({
        error: 'Bad Request',
        message: 'Limit must be between 1 and 100'
      }, 400);
    }

    if (offset < 0) {
      return c.json({
        error: 'Bad Request',
        message: 'Offset must be non-negative'
      }, 400);
    }

    const result = await listDocuments(c.env, tenantId, {
      limit,
      offset,
      status,
      sortBy,
      sortOrder
    });

    return c.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('List documents error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * GET /:documentId
 * Get document details
 */
app.get('/:documentId', async (c) => {
  const tenantId = getTenantId(c);
  const documentId = c.req.param('documentId');

  try {
    const document = await getDocument(c.env, tenantId, documentId);

    return c.json({
      success: true,
      document
    });
  } catch (error) {
    console.error('Get document error:', error);
    return c.json({
      error: 'Not Found',
      message: error.message
    }, 404);
  }
});

/**
 * DELETE /:documentId
 * Delete document
 */
app.delete('/:documentId', requirePermission('documents.delete'), async (c) => {
  const tenantId = getTenantId(c);
  const documentId = c.req.param('documentId');

  try {
    await deleteDocument(c.env, tenantId, documentId);

    return c.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * GET /:documentId/download
 * Download original document file
 */
app.get('/:documentId/download', async (c) => {
  const tenantId = getTenantId(c);
  const documentId = c.req.param('documentId');

  try {
    const file = await downloadDocument(c.env, tenantId, documentId);

    // Set headers for file download
    c.header('Content-Type', file.mimeType);
    c.header('Content-Disposition', `attachment; filename="${file.filename}"`);
    c.header('Content-Length', file.size.toString());

    return c.body(file.body);
  } catch (error) {
    console.error('Download document error:', error);
    return c.json({
      error: 'Not Found',
      message: error.message
    }, 404);
  }
});

/**
 * POST /search
 * Semantic search across documents
 */
app.post('/search', async (c) => {
  const tenantId = getTenantId(c);

  try {
    const body = await c.req.json();
    const { query, limit, minScore, documentIds } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return c.json({
        error: 'Bad Request',
        message: 'Query parameter is required and must be a non-empty string'
      }, 400);
    }

    // Validate and set defaults
    const searchOptions = {
      limit: Math.min(parseInt(limit) || 10, 50),
      minScore: parseFloat(minScore) || 0.7,
      documentIds: Array.isArray(documentIds) ? documentIds : null
    };

    const results = await searchDocuments(c.env, tenantId, query, searchOptions);

    return c.json({
      success: true,
      query,
      results,
      count: results.length
    });
  } catch (error) {
    console.error('Search error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * POST /ask
 * Ask a question and get RAG-powered answer
 */
app.post('/ask', async (c) => {
  const tenantId = getTenantId(c);
  const userId = getUserId(c);

  try {
    // Check AI usage quota
    const quota = await checkTenantQuota(c.env, tenantId, 'ai_requests');
    if (!quota.allowed) {
      return c.json({
        error: 'Quota Exceeded',
        message: 'AI request quota exceeded',
        quota: quota
      }, 429);
    }

    const body = await c.req.json();
    const {
      query,
      limit,
      minScore,
      documentIds,
      temperature,
      maxTokens,
      systemPrompt
    } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return c.json({
        error: 'Bad Request',
        message: 'Query parameter is required and must be a non-empty string'
      }, 400);
    }

    // Validate and set defaults
    const ragOptions = {
      limit: Math.min(parseInt(limit) || 5, 20),
      minScore: parseFloat(minScore) || 0.7,
      documentIds: Array.isArray(documentIds) ? documentIds : null,
      temperature: parseFloat(temperature) || 0.7,
      maxTokens: Math.min(parseInt(maxTokens) || 2000, 4000),
      systemPrompt: systemPrompt || null
    };

    const result = await generateRAGResponse(c.env, tenantId, query, ragOptions);

    // Track AI usage via TenantDO
    try {
      const tenantStub = getTenantStub(c.env, tenantId);
      c.executionCtx.waitUntil(
        tenantStub.fetch('http://internal/usage/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            metric: 'ai_requests',
            increment: 1,
            timestamp: new Date().toISOString()
          })
        })
      );
    } catch (err) {
      console.error('Failed to track AI usage:', err);
    }

    return c.json({
      success: true,
      query,
      ...result
    });
  } catch (error) {
    console.error('RAG ask error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * POST /:documentId/reprocess
 * Reprocess a document (re-extract text and regenerate embeddings)
 */
app.post('/:documentId/reprocess', requirePermission('documents.manage'), async (c) => {
  const tenantId = getTenantId(c);
  const documentId = c.req.param('documentId');

  try {
    // Queue document for reprocessing
    await c.env.DOCUMENT_QUEUE.send({
      type: 'document.process',
      data: {
        documentId,
        tenantId,
        reprocess: true
      }
    });

    return c.json({
      success: true,
      message: 'Document queued for reprocessing'
    });
  } catch (error) {
    console.error('Reprocess document error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * GET /:documentId/chunks
 * Get all chunks for a document
 */
app.get('/:documentId/chunks', async (c) => {
  const tenantId = getTenantId(c);
  const documentId = c.req.param('documentId');

  try {
    // Verify document belongs to tenant
    const document = await getDocument(c.env, tenantId, documentId);

    // Get chunks from D1
    const chunks = await c.env.DB.prepare(
      'SELECT id, chunk_index, text, start_offset, end_offset FROM document_chunks WHERE document_id = ? ORDER BY chunk_index'
    )
    .bind(documentId)
    .all();

    return c.json({
      success: true,
      documentId,
      chunks: chunks.results || [],
      count: (chunks.results || []).length
    });
  } catch (error) {
    console.error('Get chunks error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

/**
 * GET /stats
 * Get document statistics for tenant
 */
app.get('/stats', async (c) => {
  const tenantId = getTenantId(c);

  try {
    // Get document counts by status
    const statusCounts = await c.env.DB.prepare(
      'SELECT status, COUNT(*) as count FROM documents WHERE tenant_id = ? GROUP BY status'
    )
    .bind(tenantId)
    .all();

    // Get total storage used
    const storageResult = await c.env.DB.prepare(
      'SELECT SUM(file_size) as total_bytes FROM documents WHERE tenant_id = ?'
    )
    .bind(tenantId)
    .first();

    const totalBytes = storageResult?.total_bytes || 0;
    const totalMB = totalBytes / (1024 * 1024);

    // Format status counts
    const stats = {
      total: 0,
      byStatus: {},
      storage: {
        bytes: totalBytes,
        megabytes: Math.round(totalMB * 100) / 100,
        gigabytes: Math.round((totalMB / 1024) * 100) / 100
      }
    };

    for (const row of (statusCounts.results || [])) {
      stats.byStatus[row.status] = row.count;
      stats.total += row.count;
    }

    return c.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return c.json({
      error: 'Internal Server Error',
      message: error.message
    }, 500);
  }
});

export default app;
