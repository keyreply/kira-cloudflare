import React, { useState } from 'react';
import {
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    CloudArrowUpIcon,
    DocumentIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const KnowledgeBase = ({ onBack }) => {
    const [files, setFiles] = useState([
        { id: 1, name: 'Q3_Financial_Report.pdf', size: '2.4 MB', type: 'PDF', status: 'indexed', date: '2024/12/1', active: true },
        { id: 2, name: 'Product_Documentation.pdf', size: '5.8 MB', type: 'PDF', status: 'indexed', date: '2024/11/28', active: true },
        { id: 3, name: 'Customer_FAQ.docx', size: '1.2 MB', type: 'DOCX', status: 'processing', date: '2024/12/3', active: false },
        { id: 4, name: 'Training_Manual.pdf', size: '3.6 MB', type: 'PDF', status: 'indexed', date: '2024/11/25', active: false },
        { id: 5, name: 'API_Reference.md', size: '856 KB', type: 'MD', status: 'indexed', date: '2024/11/20', active: true },
    ]);

    const toggleFile = (id) => {
        setFiles(files.map(f => f.id === id ? { ...f, active: !f.active } : f));
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header */}
            <div className="h-[60px] px-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-1.5 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="font-semibold text-sm text-gray-900">Knowledge Base</h3>
                        <p className="text-[10px] text-gray-500">3 of 5 sources active</p>
                    </div>
                </div>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                    Manage
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-white border-b border-gray-200">
                {[
                    { label: 'Total', value: files.length, color: 'text-gray-900' },
                    { label: 'Indexed', value: files.filter(f => f.status === 'indexed').length, color: 'text-green-600' },
                    { label: 'Active', value: files.filter(f => f.active).length, color: 'text-indigo-600' },
                    { label: 'Docs', value: 131, color: 'text-purple-600' }
                ].map((stat, i) => (
                    <div key={i} className="text-center p-2 bg-gray-50 rounded-xl">
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
                <button className="w-full bg-[#6366F1] text-white py-2.5 rounded-xl font-medium text-sm shadow-sm hover:bg-[#534be0] transition-colors flex items-center justify-center gap-2">
                    <CloudArrowUpIcon className="w-5 h-5" />
                    Upload New File
                </button>

                <div className="relative">
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                </div>

                <div className="flex items-center gap-2 px-1">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs text-gray-500 font-medium">Select all</span>
                </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                {files.map((file) => (
                    <div key={file.id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-indigo-200 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5" />
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${file.type === 'PDF' ? 'bg-red-50 text-red-500' :
                                        file.type === 'DOCX' ? 'bg-blue-50 text-blue-500' :
                                            'bg-gray-100 text-gray-500'
                                    }`}>
                                    <DocumentIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</div>
                                    <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
                                        <span>{file.type}</span>
                                        <span>•</span>
                                        <span>{file.size}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleFile(file.id)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${file.active ? 'bg-indigo-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${file.active ? 'left-6' : 'left-1'
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                            <div className={`flex items-center gap-1 text-[10px] font-medium ${file.status === 'indexed' ? 'text-green-600' : 'text-amber-600'
                                }`}>
                                {file.status === 'indexed' ? (
                                    <>
                                        <CheckCircleIcon className="w-3 h-3" />
                                        <span>Indexed</span>
                                    </>
                                ) : (
                                    <>
                                        <ClockIcon className="w-3 h-3" />
                                        <span>Processing</span>
                                    </>
                                )}
                            </div>
                            <div className="text-[10px] text-gray-400">{file.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeBase;
