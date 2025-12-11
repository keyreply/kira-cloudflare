import React, { useState, useEffect } from 'react';
import { FolderIcon, ChevronRightIcon, DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api';

export default function Content({ onArticleSelect }) {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                setLoading(true);
                const response = await api.documents.list();
                if (response.documents) {
                    setDocuments(response.documents);
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocs();
    }, []);

    const folders = [
        { id: 'all', name: 'All Documents', type: 'all' },
        { id: 'pdf', name: 'PDFs', type: 'application/pdf' },
        { id: 'text', name: 'Text Files', type: 'text/plain' }
    ];

    const getFilteredDocuments = (folder) => {
        let docs = documents;
        if (folder && folder.id !== 'all') {
            docs = documents.filter(doc => doc.content_type?.includes(folder.type));
        }
        if (searchQuery) {
            docs = docs.filter(doc => doc.original_name?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return docs;
    };

    const handleArticleClick = (doc) => {
        onArticleSelect({
            id: doc.id,
            title: doc.original_name,
            content: doc.text_content || 'No content preview available.',
            type: doc.content_type,
            lastUpdated: new Date(doc.updated_at).toLocaleDateString()
        });
    };

    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
    };

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderIcon className="w-6 h-6 text-slate-400" />
                        <h1 className="text-xl font-bold text-slate-900">Content</h1>
                    </div>
                    <div className="relative w-64">
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]"
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Folder List */}
                <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
                    <div className="p-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Folders</p>
                        <div className="space-y-1">
                            {folders.map(folder => (
                                <button
                                    key={folder.id}
                                    onClick={() => handleFolderSelect(folder)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                        selectedFolder?.id === folder.id
                                            ? 'bg-[#1D57D8]/10 text-[#1D57D8] font-medium'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <FolderIcon className={`w-4 h-4 ${selectedFolder?.id === folder.id ? 'text-[#1D57D8]' : 'text-slate-400'}`} />
                                        <span className="truncate">{folder.name}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        selectedFolder?.id === folder.id
                                            ? 'bg-[#1D57D8]/20 text-[#1D57D8]'
                                            : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {getFilteredDocuments(folder).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Article List */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin mb-4" />
                            <p className="text-sm text-slate-500">Loading documents...</p>
                        </div>
                    ) : selectedFolder ? (
                        getFilteredDocuments(selectedFolder).length > 0 ? (
                            <div className="max-w-3xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-slate-900">{selectedFolder.name}</h2>
                                    <span className="text-sm text-slate-500">
                                        {getFilteredDocuments(selectedFolder).length} document{getFilteredDocuments(selectedFolder).length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    {getFilteredDocuments(selectedFolder).map((doc, index) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => handleArticleClick(doc)}
                                            className={`w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left ${
                                                index !== getFilteredDocuments(selectedFolder).length - 1 ? 'border-b border-slate-100' : ''
                                            }`}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                                <DocumentTextIcon className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-900 truncate">{doc.original_name}</div>
                                                <div className="text-sm text-slate-500">
                                                    {doc.content_type || 'Unknown type'} • Updated {new Date(doc.updated_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <ChevronRightIcon className="w-5 h-5 text-slate-300 shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                    <FolderIcon className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents found</h3>
                                <p className="text-slate-500 text-sm">
                                    {searchQuery ? 'Try adjusting your search' : 'This folder is empty'}
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                <FolderIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a folder</h3>
                            <p className="text-slate-500 text-sm">Choose a folder from the sidebar to view its contents</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
