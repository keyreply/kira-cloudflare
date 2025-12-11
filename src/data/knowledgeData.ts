// Mock data for Knowledge Base
export const knowledgeData = {
    sources: {
        publicArticles: [
            {
                id: 'kira-public',
                name: 'Kira',
                icon: 'bolt',
                articleCount: 1,
                status: 'connected',
                description: 'Let Kira AI Agent and Copilot use public articles from your Help Center.'
            },
            {
                id: 'zendesk-public',
                name: 'Zendesk',
                icon: 'ticket',
                articleCount: 0,
                status: 'not_set_up',
                description: 'Sync articles from Zendesk Help Center.'
            }
        ],
        internalArticles: [
            {
                id: 'kira-internal',
                name: 'Kira',
                icon: 'bolt',
                articleCount: 1,
                status: 'connected',
                description: 'Give Copilot internal knowledge only available to you and your team.'
            },
            {
                id: 'guru',
                name: 'Guru',
                icon: 'sparkles',
                articleCount: 0,
                status: 'syncing',
                description: 'Import knowledge from Guru workspace.'
            },
            {
                id: 'notion',
                name: 'Notion',
                icon: 'document',
                articleCount: 0,
                status: 'not_set_up',
                description: 'Sync content from Notion databases.'
            },
            {
                id: 'confluence',
                name: 'Confluence',
                icon: 'squares',
                articleCount: 0,
                status: 'not_set_up',
                description: 'Import articles from Confluence.'
            }
        ]
    },

    folders: [
        {
            id: 'folder-1',
            name: 'Your first folder',
            articles: []
        },
        {
            id: 'folder-content',
            name: 'Content from conv...',
            articles: []
        },
        {
            id: 'folder-pricing',
            name: 'Pricing',
            articles: []
        },
        {
            id: 'folder-processes',
            name: 'Processes',
            articles: ['article-refund']
        },
        {
            id: 'folder-products',
            name: 'Products Areas',
            articles: []
        },
        {
            id: 'folder-security',
            name: 'Security',
            articles: []
        }
    ],

    articles: [
        {
            id: 'article-refund',
            title: 'Processing Refunds at Examply',
            type: 'Internal article',
            language: 'English',
            created: '7 months ago',
            createdBy: 'Beth-Ann Sher',
            lastUpdated: '4 months ago',
            lastUpdatedBy: 'Beth-Ann Sher',
            finEnabled: false,
            copilotEnabled: true,
            audience: 'Everyone',
            tags: [],
            folder: 'Processes',
            content: `This guide will help you navigate the process of handling refund requests efficiently and effectively. Understanding our refund policies and procedures ensures a smooth experience for both our team and our valued customers.

**Refund Policy Overview**

Examply offers refunds under the following conditions:

- The product was defective or damaged upon arrival.
- The product does not match the description on our website.
- The customer has contacted support within 30 days of purchase.
- The product is returned in its original condition and packaging.

**Steps to Process a Refund**

1. **Verify the Request:**
   - Check the purchase date and ensure it's within our 30-day window
   - Review the customer's reason for the refund request
   - Verify that the product meets return criteria

2. **Inspect the Product:**
   - Confirm the product is in original condition
   - Check for any signs of use or damage
   - Ensure all original packaging and accessories are included

3. **Process the Refund:**
   - Log into the admin portal
   - Navigate to Orders > Refunds
   - Enter the order number and select refund amount
   - Choose the refund method (original payment method or store credit)
   - Add internal notes for tracking purposes

4. **Notify the Customer:**
   - Send confirmation email with refund details
   - Provide estimated timeline for refund to appear (3-5 business days)
   - Include reference number for their records

**Important Notes:**

- Refunds for digital products must be processed within 24 hours
- International orders may take 7-10 business days for refund processing
- Always document the reason for refund in our CRM system
- Escalate unusual refund requests to management

**Common Issues:**

If you encounter any issues during the refund process, please refer to our troubleshooting guide or contact the support team lead.`
        }
    ]
};

export const copilotIntegrations = [
    {
        id: 'intercom-internal',
        name: 'Intercom',
        icon: 'chat',
        type: 'Internal articles',
        articleCount: 30,
        status: 'connected',
        description: "Give AI Copilot internal knowledge that's only available to you and your team."
    },
    {
        id: 'guru-copilot',
        name: 'Guru',
        icon: 'sparkles',
        subtitle: '(IKB: Internal Processes)',
        status: 'syncing',
        description: 'Syncing knowledge from Guru workspace.'
    },
    {
        id: 'notion-copilot',
        name: 'Notion',
        icon: 'document',
        status: 'not_set_up',
        description: 'Sync content from Notion.'
    },
    {
        id: 'confluence-copilot',
        name: 'Confluence',
        icon: 'squares',
        status: 'not_set_up',
        description: 'Import Confluence articles.'
    },
    {
        id: 'conversations',
        name: 'Conversations',
        icon: 'chat',
        type: 'Data source',
        description: 'Let AI Copilot learn from past conversations and customer tickets from the last 4 months.',
        integration: 'Intercom',
        status: 'connected',
        scope: "All teammates' conversations"
    }
];
