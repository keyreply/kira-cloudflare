import { useState } from 'react';
import {
    DocumentTextIcon,
    FolderIcon,
    QuestionMarkCircleIcon,
    ChevronRightIcon,
    ArrowTopRightOnSquareIcon,
    BookOpenIcon,
    CloudArrowUpIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Sources from './Sources.tsx';
import Content from './Content.tsx';
import ArticleEditor from './ArticleEditor.tsx';
import type { Article } from '../../types/index.ts';

type TabType = 'sources' | 'content';
type ViewType = 'all' | 'ai-agent' | 'copilot' | 'help-center';

export default function KnowledgeBase() {
    const [activeTab, setActiveTab] = useState<TabType>('sources');
    const [activeView, setActiveView] = useState<ViewType>('all');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isContentExpanded, setIsContentExpanded] = useState(true);

    const handleCreateArticle = (newArticle: Article) => {
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
        <div className="flex h-full bg-slate-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-5 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] rounded-xl shadow-lg shadow-[#1D57D8]/20">
                            <BookOpenIcon className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">Knowledge</h2>
                    </div>
                </div>

                {/* Search */}
                <div className="px-4 py-3">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-3 py-2 space-y-1">
                    <button
                        onClick={() => {
                            setActiveTab('sources');
                            setSelectedArticle(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            activeTab === 'sources'
                                ? 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        <DocumentTextIcon className={`w-5 h-5 ${activeTab === 'sources' ? 'text-[#1D57D8]' : 'text-slate-400'}`} />
                        Sources
                    </button>

                    <button
                        onClick={() => {
                            setActiveTab('content');
                            setSelectedArticle(null);
                            setIsContentExpanded(!isContentExpanded);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            activeTab === 'content'
                                ? 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <FolderIcon className={`w-5 h-5 ${activeTab === 'content' ? 'text-[#1D57D8]' : 'text-slate-400'}`} />
                            Content
                        </div>
                        <ChevronRightIcon
                            className={`w-4 h-4 text-slate-400 transition-transform ${isContentExpanded && activeTab === 'content' ? 'rotate-90' : ''}`}
                        />
                    </button>

                    {isContentExpanded && activeTab === 'content' && (
                        <div className="ml-8 mt-1 space-y-1">
                            <div className="text-xs text-slate-500 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
                                Your first folder
                            </div>
                        </div>
                    )}

                    <a
                        href="#"
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <QuestionMarkCircleIcon className="w-5 h-5 text-slate-400" />
                            Help Center
                        </div>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400" />
                    </a>
                </nav>

                {/* Stats */}
                <div className="p-4 border-t border-slate-200">
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Documents</span>
                            <span className="text-sm font-bold text-slate-900">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Articles</span>
                            <span className="text-sm font-bold text-slate-900">8</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] h-1.5 rounded-full" style={{ width: '45%' }} />
                        </div>
                        <p className="text-xs text-slate-500">45% of storage used</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                {renderMainContent()}
            </div>
        </div>
    );
}
