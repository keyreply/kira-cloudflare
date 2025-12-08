import React, { useState } from 'react';
import { FolderIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { knowledgeData } from '../../data/knowledgeData';

export default function Content({ onArticleSelect }) {
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleArticleClick = (articleId) => {
        const article = knowledgeData.articles.find(a => a.id === articleId);
        if (article) {
            onArticleSelect(article);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-4">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <FolderIcon className="w-6 h-6" />
                    Content
                </h1>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Folder List */}
                <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
                    <div className="p-4 space-y-1">
                        {knowledgeData.folders.map(folder => (
                            <button
                                key={folder.id}
                                onClick={() => setSelectedFolder(folder)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedFolder?.id === folder.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FolderIcon className="w-4 h-4" />
                                    <span className="truncate">{folder.name}</span>
                                </div>
                                {folder.articles.length > 0 && (
                                    <span className="text-xs text-slate-500">{folder.articles.length}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Article List */}
                <div className="flex-1 overflow-y-auto p-8">
                    {selectedFolder ? (
                        selectedFolder.articles.length > 0 ? (
                            <div className="max-w-3xl">
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">{selectedFolder.name}</h2>
                                <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200">
                                    {selectedFolder.articles.map(articleId => {
                                        const article = knowledgeData.articles.find(a => a.id === articleId);
                                        return (
                                            <button
                                                key={articleId}
                                                onClick={() => handleArticleClick(articleId)}
                                                className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left"
                                            >
                                                <DocumentTextIcon className="w-5 h-5 text-slate-400" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-slate-900">{article?.title}</div>
                                                    <div className="text-sm text-slate-500">
                                                        {article?.type} · Updated {article?.lastUpdated}
                                                    </div>
                                                </div>
                                                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FolderIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-600">This folder is empty</p>
                                <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Add article
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500">Select a folder to view its contents</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
