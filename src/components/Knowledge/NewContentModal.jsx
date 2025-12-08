import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function NewContentModal({ onClose, onCreateArticle }) {
    const [contentType, setContentType] = useState('internal');
    const [title, setTitle] = useState('');
    const [folder, setFolder] = useState('');

    const handleCreate = () => {
        if (title.trim()) {
            onCreateArticle({
                id: `article-new-${Date.now()}`,
                title: title,
                type: contentType === 'internal' ? 'Internal article' : 'Public article',
                language: 'English',
                created: 'Just now',
                createdBy: 'You',
                lastUpdated: 'Just now',
                lastUpdatedBy: 'You',
                finEnabled: false,
                copilotEnabled: contentType === 'internal',
                audience: 'Everyone',
                tags: [],
                folder: folder || 'Your first folder',
                content: ''
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold">Create new content</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Content Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Content type
                        </label>
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                <input
                                    type="radio"
                                    value="internal"
                                    checked={contentType === 'internal'}
                                    onChange={(e) => setContentType(e.target.value)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="font-medium text-slate-900">Internal article</div>
                                    <div className="text-sm text-slate-600">
                                        Only available to your team with Copilot
                                    </div>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                <input
                                    type="radio"
                                    value="public"
                                    checked={contentType === 'public'}
                                    onChange={(e) => setContentType(e.target.value)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="font-medium text-slate-900">Public article</div>
                                    <div className="text-sm text-slate-600">
                                        Available in Help Center and AI Agent
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Article title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. How to process refunds"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Folder */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Folder (optional)
                        </label>
                        <select
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Your first folder</option>
                            <option value="Processes">Processes</option>
                            <option value="Pricing">Pricing</option>
                            <option value="Products Areas">Products Areas</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!title.trim()}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        Create article
                    </button>
                </div>
            </div>
        </div>
    );
}
