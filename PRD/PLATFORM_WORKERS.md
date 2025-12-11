# PRD: Platform Functions (User-Defined Logic)

## 1. Overview
The **Platform Functions** module enables tenants (users) to run their own custom code securely within the keyreply-kira platform. By leveraging **Cloudflare Workers for Platforms**, we allow users to extend the platform's capabilities without compromising security or performance.

## 2. Goals
- **Extensibility**: Users can write custom logic to transform data, interact with third-party APIs, and automate workflows.
- **Security**: User code runs in a strictly isolated environment (Dispatch Namespace) with resource limits.
- **Integration**: Seamlessly integrate user functions into existing modules like **Workflows**, **Campaigns**, and **Integrations**.

## 3. Key Use Cases

### 3.1 Custom Webhook Handlers
Tenants can define custom endpoints to receive webhooks from their internal systems (e.g., Salesforce, SAP) and transform the payload into the format expected by our CRM.
- **Input**: Raw HTTP request from external system.
- **Logic**: Parse JSON/XML, validate signature, map fields.
- **Output**: JSON payload for `CustomerDO` or `CampaignDO`.

### 3.2 Workflow Automation Actions
In the Workflow Builder, users can add a "Run Code" step.
- **Input**: Variables from the current workflow context (e.g., `{{contact.email}}`, `{{last_message}}`).
- **Logic**: Custom JavaScript/TypeScript execution (e.g., "Calculate lead score based on proprietary logic", "Send data to legacy ERP").
- **Output**: Updated variables or reliability status (Success/Fail).

### 3.3 Message Transformation (Middleware)
Users can intercept messages before they are sent or after they are received to apply custom business rules.
- **Example**: Anonymize PII (Personally Identifiable Information) before saving to the database.
- **Example**: Automatically translate incoming messages using a specific vendor API before processing.

## 4. Technical Architecture

### 4.1 Cloudflare Workers for Platforms
- **Dispatch Namespace**: `keyreply-functions`.
- **Dynamic Dispatch Worker**: Our main `keyreply-kira-api` worker will hold the binding to this namespace.
- **User Workers**: Scripts uploaded by tenants. Each tenant can have multiple named functions.

### 4.2 Resource Management
- **Naming Convention**: `tenant_{tenantId}_{functionName}`.
- **Limits**:
  - CPU Time: 10ms (default) - 50ms (tier-based).
  - Memory: 128MB.
  - Subrequests: 10-50 active subrequests.

## 5. User Interface Requirements
1.  **Function Editor**:
    - Monaco Editor (VS Code style) in the Dashboard.
    - Support for JavaScript/TypeScript.
    - "Test Run" button with mock payload input.
2.  **Logs & Debugging**:
    - Real-time logs stream (via WebSocket or polling).
    - Execution history (Success/Failure rates).
3.  **Marketplace** (Future):
    - Pre-built functions provided by us or community (e.g., "HubSpot Sync", "Slack Notify").

## 6. API Specs (Draft)
- `POST /api/tenants/:tenantId/functions` - Upload/Update a function.
- `GET /api/tenants/:tenantId/functions` - List functions.
- `DELETE /api/tenants/:tenantId/functions/:name` - Delete a function.
- `POST /api/tenants/:tenantId/functions/:name/test` - particular execution for testing.

## 7. Success Metrics
- Number of active functions created.
- Number of workflow executions using "Run Code".
- Reduction in "feature requests" for specific integrations (users build them themselves).
