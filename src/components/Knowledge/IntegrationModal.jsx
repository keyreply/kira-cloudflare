import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function IntegrationModal({ integration, onClose }) {
    const [syncType, setSyncType] = useState('sync');

    if (!integration) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold">Add content from {integration.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Icon Tabs */}
                    <div className="flex gap-4 justify-center">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">{integration.icon}</span>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <span className="text-xl">📊</span>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <span className="text-xl">☰</span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Choose your {integration.name}
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select workspace...</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Select a {integration.name}
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Select database...</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Select folders:
                        </label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All folders</option>
                        </select>
                    </div>

                    {/* Sync Options */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Choose how to connect your data
                        </label>
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    value="sync"
                                    checked={syncType === 'sync'}
                                    onChange={(e) => setSyncType(e.target.value)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="font-medium text-slate-900">Sync content</div>
                                    <div className="text-sm text-slate-600">
                                        Sync a continuously updated view-only version of your content
                                    </div>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    value="import"
                                    checked={syncType === 'import'}
                                    onChange={(e) => setSyncType(e.target.value)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="font-medium text-slate-900">Import content</div>
                                </div>
                            </label>
                        </div>
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
                    <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Sync
                    </button>
                </div>
            </div>
        </div>
    );
}
