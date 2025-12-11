# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**Always use bun** (not npm) for all package management and running scripts:
- `bun install` instead of `npm install`
- `bun run` instead of `npm run`

## Common Commands

### Frontend (React/Vite)
```bash
bun run dev          # Start Vite dev server (localhost:5173)
bun run build        # Build for production
bun run lint         # Run ESLint
bun run preview      # Preview production build
bun run deploy       # Deploy to Cloudflare Pages
```

### Backend (Cloudflare Worker)
```bash
bun run worker:dev     # Start worker dev server (from root)
bun run worker:deploy  # Deploy worker to Cloudflare

# Or from worker/ directory:
cd worker && bun run dev
cd worker && bun run deploy
```

## Architecture

This is a full-stack application with a React frontend and Cloudflare Workers backend.

### Frontend (`src/`)
- **Framework**: React 19 with Vite 7
- **Styling**: Tailwind CSS 4
- **Entry**: `src/main.jsx` → `src/App.jsx`
- **Components**: Feature-based organization in `src/components/`
  - Each feature (Campaigns, Channels, Knowledge, etc.) has its own directory
  - `GlobalAIAgent/` - AI assistant floating widget
- **Services**: `src/services/` - API client (`api.js`), conversation handling, analytics
- **Data**: `src/data/` - Mock data files for conversations, contacts, tasks

### Backend (`worker/`)
- **Framework**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **Entry**: `worker/src/index.js`
- **Routes**: `worker/src/routes/` - REST API endpoints
- **Durable Objects**: `worker/src/durable-objects/` - Stateful entities:
  - `TenantDO` - Multi-tenant management
  - `CustomerDO` - Customer profiles
  - `ConversationDO` - Chat conversations
  - `AgentDO` - AI agent configuration
  - `CampaignDO` - Marketing campaigns
  - `WorkflowDO` - Automation workflows
  - `AnalyticsDO` - Usage analytics
  - `NotificationDO` - Notification handling
  - `RateLimiterDO` - Rate limiting
- **Services**: `worker/src/services/` - RAG, email, analytics
- **Middleware**: `worker/src/middleware/auth.js`

### Cloudflare Bindings (defined in `worker/wrangler.toml`)
- **D1**: SQLite database (`DB`)
- **R2**: Document storage (`DOCS_BUCKET`)
- **Vectorize**: RAG embeddings (`VECTORIZE`) - 1024 dimensions for Qwen3
- **Queues**: Document processing, analytics, emails
- **Workers AI**: `AI` binding for embeddings and inference

## Key Patterns

- Frontend communicates with backend via `src/services/api.js`
- Real-time messaging uses WebSocket via `src/services/conversationService.js`
- AI responses use RAG pipeline: Documents → R2 → Vectorize → Workers AI
- Durable Objects use SQLite storage (see migrations in wrangler.toml)
