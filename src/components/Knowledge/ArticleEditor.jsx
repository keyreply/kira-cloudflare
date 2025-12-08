import React, { useState } from 'react';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ArticleEditor({ article, onClose }) {
    const [finEnabled, setFinEnabled] = useState(article.finEnabled);
    const [copilotEnabled, setCopilotEnabled] = useState(article.copilotEnabled);
    const [content, setContent] = useState(article.content);

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto bg-white">
                {/* Header */}
                <div className="border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Content</span>
                            <ChevronRightIcon className="w-4 h-4" />
                            <span>{article.folder}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                            Save
                        </button>
                    </div>
                </div>

                {/* Article Content */}
                <div className="max-w-3xl mx-auto p-8">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>Internal article</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">
                            {article.title}
                        </h1>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[600px] p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans text-sm leading-relaxed"
                            placeholder="Start writing..."
                        />
                    </div>

                    {/* Editor Toolbar */}
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm">B</span>
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm italic">I</span>
                        </button>
                        <div className="w-px h-6 bg-slate-600"></div>
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm">=</span>
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm">☰</span>
                        </button>
                        <div className="w-px h-6 bg-slate-600"></div>
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm">🔗</span>
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded">
                            <span className="text-sm">📷</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Panel */}
            <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Details</h3>

                    <div className="space-y-4">
                        {/* Type */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-2">Type</label>
                            <div className="px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm font-medium">
                                Internal article
                            </div>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-2">Language</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                                <option>English</option>
                            </select>
                        </div>

                        {/* Created */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-1">Created</label>
                            <div className="text-sm text-slate-900">{article.created}</div>
                        </div>

                        {/* Created by */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-1">Created by</label>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">
                                    BS
                                </div>
                                <span className="text-sm text-slate-900">{article.createdBy}</span>
                            </div>
                        </div>

                        {/* Last updated */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-1">Last updated</label>
                            <div className="text-sm text-slate-900">{article.lastUpdated}</div>
                        </div>

                        {/* Last updated by */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-1">Last updated by</label>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">
                                    BS
                                </div>
                                <span className="text-sm text-slate-900">{article.lastUpdatedBy}</span>
                            </div>
                        </div>

                        {/* Fin */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-slate-600">🔮</span>
                                <span className="text-sm text-slate-600">Fin</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">
                                When enabled, Fin will use this content to generate AI answers.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900">Fin AI Agent</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={finEnabled}
                                        onChange={(e) => setFinEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ml-2 text-sm text-slate-600">{finEnabled ? 'Enabled' : 'Disabled'}</span>
                                </label>
                            </div>
                        </div>

                        {/* Copilot */}
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900">Copilot</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={copilotEnabled}
                                        onChange={(e) => setCopilotEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    <span className="ml-2 text-sm text-slate-600">{copilotEnabled ? 'Enabled' : 'Disabled'}</span>
                                </label>
                            </div>
                        </div>

                        {/* Audience */}
                        <div>
                            <label className="block text-sm text-slate-600 mb-2">Audience</label>
                            <p className="text-xs text-slate-500 mb-2">
                                Copilot will provide relevant answers based on the selected audience.
                            </p>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                                <option>{article.audience}</option>
                            </select>
                        </div>

                        {/* Tags */}
                        <div>
                            <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                <span>🏷️</span>
                                <span>Tags</span>
                                <ChevronRightIcon className="w-4 h-4 ml-auto" />
                            </button>
                        </div>

                        {/* Folder */}
                        <div>
                            <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                <FolderIcon className="w-4 h-4" />
                                <span>Folder</span>
                                <ChevronRightIcon className="w-4 h-4 ml-auto" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';
