import React, { useState, useRef, useEffect } from 'react';
import {
    PlusIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ChevronDownIcon,
    DocumentTextIcon,
    FolderIcon,
    CloudArrowUpIcon,
    LinkIcon,
    CpuChipIcon,
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
    BoltIcon,
    TicketIcon,
    SparklesIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';
import { knowledgeData, copilotIntegrations } from '../../data/knowledgeData';
import IntegrationModal from './IntegrationModal';
import NewContentModal from './NewContentModal';
import { api } from '../../services/api';

// Icon mapping for integrations
const iconMap = {
    bolt: BoltIcon,
    ticket: TicketIcon,
    sparkles: SparklesIcon,
    document: DocumentTextIcon,
    squares: Squares2X2Icon,
    chat: ChatBubbleLeftRightIcon
};

export default function Sources({ activeView, setActiveView, onArticleCreate }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [showNewContentModal, setShowNewContentModal] = useState(false);
    const [showLearnDropdown, setShowLearnDropdown] = useState(false);
    const [showTestDropdown, setShowTestDropdown] = useState(false);
    const learnRef = useRef(null);
    const testRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (learnRef.current && !learnRef.current.contains(event.target)) {
                setShowLearnDropdown(false);
            }
            if (testRef.current && !testRef.current.contains(event.target)) {
                setShowTestDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSyncImport = (integration) => {
        setSelectedIntegration(integration);
        setShowModal(true);
    };

    const renderIntegrationCard = (item, isPublic = true) => {
        const IconComponent = iconMap[item.icon] || DocumentTextIcon;

        return (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                    {item.status === 'connected' && (
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    )}
                    {item.status === 'syncing' && (
                        <ArrowPathIcon className="w-5 h-5 text-[#1D57D8] animate-spin" />
                    )}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">
                                {item.name}
                                {item.subtitle && <span className="text-sm text-slate-500 ml-1">{item.subtitle}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {item.status === 'connected' && item.articleCount > 0 && (
                        <span className="text-sm text-slate-500">{item.articleCount} article{item.articleCount !== 1 ? 's' : ''}</span>
                    )}
                    {item.status === 'connected' ? (
                        <button className="text-sm text-[#1D57D8] hover:text-[#1D57D8]/80 font-medium">
                            Add article
                        </button>
                    ) : item.status === 'syncing' ? (
                        <span className="text-sm text-slate-500">Syncing...</span>
                    ) : (
                        <button
                            onClick={() => handleSyncImport(item)}
                            className="text-sm text-[#1D57D8] hover:text-[#1D57D8]/80 font-medium"
                        >
                            Sync or Import
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const [documents, setDocuments] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await api.documents.list();
                if (data && data.documents) {
                    setDocuments(data.documents);
                }
            } catch (err) {
                console.error("Failed to fetch documents:", err);
            } finally {
                setLoadingDocs(false);
            }
        };

        fetchDocuments();
    }, []);

    const renderAllSources = () => (
        <div className="w-full space-y-6">
            {/* Uploaded Documents Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#1D57D8]/10 rounded-xl">
                            <CloudArrowUpIcon className="w-6 h-6 text-[#1D57D8]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Uploaded Documents</h3>
                            <p className="text-sm text-slate-500">
                                Files you've uploaded to the Knowledge Base for AI training.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {loadingDocs ? (
                        <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-sm text-slate-500">Loading documents...</p>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                            <DocumentTextIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500 mb-4">No documents found</p>
                            <button
                                onClick={() => setShowNewContentModal(true)}
                                className="text-sm text-[#1D57D8] hover:text-[#1D57D8]/80 font-medium"
                            >
                                Upload your first document
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {documents.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                                            <DocumentTextIcon className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{doc.original_name}</div>
                                            <div className="text-xs text-slate-500">
                                                {(doc.file_size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.uploaded_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                            doc.status === 'ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                            doc.status === 'processing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                            'bg-red-50 text-red-700 border border-red-200'
                                        }`}>
                                            {doc.status}
                                        </span>
                                        <button
                                            onClick={() => api.documents.delete(doc.id).then(() => setDocuments(docs => docs.filter(d => d.id !== doc.id)))}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-100 rounded-xl">
                            <LinkIcon className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Integrations</h3>
                            <p className="text-sm text-slate-500">
                                Connect external sources like Zendesk, Notion, Confluence, and more.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {knowledgeData.sources.publicArticles.map(item => renderIntegrationCard(item, true))}
                </div>
            </div>
        </div>
    );

    const renderCopilotView = () => (
        <div className="w-full space-y-6">
            {/* Internal Articles for Copilot */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] flex items-center justify-center shadow-lg shadow-[#1D57D8]/20">
                            <CpuChipIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Internal Articles</h3>
                            <p className="text-sm text-slate-500">
                                Provide AI Copilot with internal knowledge accessible only to your team.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {copilotIntegrations.filter(i => i.type === 'Internal articles' || !i.type).slice(0, 4).map(item => renderIntegrationCard(item))}
                </div>
            </div>

            {/* Conversations */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                            <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Conversation History</h3>
                            <p className="text-sm text-slate-500">
                                Allow AI Copilot to learn from past conversations and support tickets.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                <UserGroupIcon className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="font-medium text-slate-900">Intercom</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500">All team conversations</span>
                            <button className="text-sm text-[#1D57D8] hover:text-[#1D57D8]/80 font-medium">
                                Configure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-5">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-slate-400" />
                        <h1 className="text-xl font-bold text-slate-900">Sources</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Learn Dropdown */}
                        <div className="relative" ref={learnRef}>
                            <button
                                onClick={() => setShowLearnDropdown(!showLearnDropdown)}
                                className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100"
                            >
                                Learn
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                            {showLearnDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Documentation</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Video tutorials</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Best practices</a>
                                </div>
                            )}
                        </div>

                        {/* Test Dropdown */}
                        <div className="relative" ref={testRef}>
                            <button
                                onClick={() => setShowTestDropdown(!showTestDropdown)}
                                className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100"
                            >
                                Test Kira
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                            {showTestDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Test in sandbox</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Run test queries</a>
                                </div>
                            )}
                        </div>

                        {/* New Content Button */}
                        <button
                            onClick={() => setShowNewContentModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#1D57D8] text-white rounded-xl hover:bg-[#1D57D8]/90 transition-all shadow-lg shadow-[#1D57D8]/25 text-sm font-medium"
                        >
                            <PlusIcon className="w-4 h-4" />
                            New content
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                    {[
                        { id: 'all', label: 'All sources' },
                        { id: 'ai-agent', label: 'AI Agent' },
                        { id: 'copilot', label: 'AI Copilot' },
                        { id: 'help-center', label: 'Help Center' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                activeView === tab.id
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl">
                    {activeView === 'all' && renderAllSources()}
                    {activeView === 'copilot' && renderCopilotView()}
                    {activeView === 'ai-agent' && renderAllSources()}
                    {activeView === 'help-center' && (
                        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FolderIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Help Center</h3>
                            <p className="text-slate-500">Help Center configuration is coming soon</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Integration Modal */}
            {showModal && (
                <IntegrationModal
                    integration={selectedIntegration}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedIntegration(null);
                    }}
                />
            )}

            {/* New Content Modal */}
            {showNewContentModal && (
                <NewContentModal
                    onClose={() => setShowNewContentModal(false)}
                    onCreateArticle={(article) => {
                        if (onArticleCreate) {
                            onArticleCreate(article);
                        }
                    }}
                />
            )}
        </>
    );
}
