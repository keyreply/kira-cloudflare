import React, { useState } from 'react';
import {
    DocumentTextIcon,
    FolderIcon,
    QuestionMarkCircleIcon,
    ChevronRightIcon,
    PlusIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import Sources from './Sources';
import Content from './Content';
import ArticleEditor from './ArticleEditor';

export default function KnowledgeBase() {
    const [activeTab, setActiveTab] = useState('sources');
    const [activeView, setActiveView] = useState('all'); // all, ai-agent, copilot, help-center
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isContentExpanded, setIsContentExpanded] = useState(true);

    const handleCreateArticle = (newArticle) => {
        // Open the article editor with the new article
        setSelectedArticle(newArticle);
        setActiveTab('content');
    };

    const renderMainContent = () => {
        if (selectedArticle) {
            return <ArticleEditor article={selectedArticle} onClose={() => setSelectedArticle(null)} />;
        }

        switch (activeTab) {
            case 'sources':
                return <Sources activeView={activeView} setActiveView={setActiveView} onArticleCreate={handleCreateArticle} />;
            case 'content':
                return <Content onArticleSelect={setSelectedArticle} />;
            default:
                return <Sources activeView={activeView} setActiveView={setActiveView} onArticleCreate={handleCreateArticle} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <span className="text-xl">📚</span> Knowledge
                    </h2>
                </div>

                <nav className="flex-1 p-3">
                    <button
                        onClick={() => {
                            setActiveTab('sources');
                            setSelectedArticle(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sources'
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-700 hover:bg-slate-100'
                            }`}
                    >
                        <DocumentTextIcon className="w-5 h-5" />
                        Sources
                    </button>

                    <button
                        onClick={() => {
                            setActiveTab('content');
                            setSelectedArticle(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-1 ${activeTab === 'content'
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-700 hover:bg-slate-100'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <FolderIcon className="w-5 h-5" />
                            Content
                        </div>
                        <ChevronRightIcon
                            className={`w-4 h-4 transition-transform ${isContentExpanded ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {isContentExpanded && activeTab === 'content' && (
                        <div className="ml-8 mt-2 space-y-1">
                            <div className="text-xs text-slate-500 px-3 py-1">Your first folder</div>
                        </div>
                    )}

                    <a
                        href="#"
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 mt-1"
                    >
                        <div className="flex items-center gap-3">
                            <QuestionMarkCircleIcon className="w-5 h-5" />
                            Help Center
                        </div>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {renderMainContent()}
            </div>
        </div>
    );
}
