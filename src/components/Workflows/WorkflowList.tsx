import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
    PlusIcon,
    PencilIcon,
    PlayIcon,
    BoltIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    EllipsisHorizontalIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import WorkflowEditor from './WorkflowEditor';

export default function WorkflowList() {
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        try {
            const data = await api.workflows.list();
            if (data.workflows) {
                setWorkflows(data.workflows);
            }
        } catch (error) {
            console.error("Failed to fetch workflows:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedWorkflowId(null);
        setShowEditor(true);
    };

    const handleEdit = (id) => {
        setSelectedWorkflowId(id);
        setShowEditor(true);
    };

    const handleTest = async (id) => {
        try {
            await api.workflows.test(id);
            alert("Test execution triggered!");
        } catch (error) {
            alert("Test failed");
        }
    };

    const filteredWorkflows = workflows.filter(wf => {
        const matchesSearch = wf.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'active' && wf.is_active) ||
            (filterStatus === 'inactive' && !wf.is_active);
        return matchesSearch && matchesFilter;
    });

    if (showEditor) {
        return (
            <WorkflowEditor
                workflowId={selectedWorkflowId}
                onClose={() => { setShowEditor(false); fetchWorkflows(); }}
            />
        );
    }

    return (
        <div className="flex-1 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] rounded-xl shadow-lg shadow-[#1D57D8]/20">
                                <BoltIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Workflow Automation</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Automate your business logic with visual workflows</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#1D57D8] text-white rounded-xl hover:bg-[#1D57D8]/90 transition-all shadow-lg shadow-[#1D57D8]/25 font-medium"
                        >
                            <PlusIcon className="w-5 h-5" />
                            New Workflow
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Workflows</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{workflows.length}</p>
                            </div>
                            <div className="p-3 bg-slate-100 rounded-xl">
                                <BoltIcon className="w-5 h-5 text-slate-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Active</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">
                                    {workflows.filter(w => w.is_active).length}
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Inactive</p>
                                <p className="text-2xl font-bold text-slate-400 mt-1">
                                    {workflows.filter(w => !w.is_active).length}
                                </p>
                            </div>
                            <div className="p-3 bg-slate-100 rounded-xl">
                                <XCircleIcon className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Executions Today</p>
                                <p className="text-2xl font-bold text-[#1D57D8] mt-1">--</p>
                            </div>
                            <div className="p-3 bg-[#1D57D8]/10 rounded-xl">
                                <ArrowPathIcon className="w-5 h-5 text-[#1D57D8]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search workflows..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
                        {['all', 'active', 'inactive'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                    filterStatus === status
                                        ? 'bg-[#1D57D8] text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workflows List */}
                {loading ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin mx-auto" />
                        <p className="text-slate-500 mt-4">Loading workflows...</p>
                    </div>
                ) : filteredWorkflows.length === 0 ? (
                    <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-16 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BoltIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {searchQuery ? 'No workflows found' : 'No workflows yet'}
                        </h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                            {searchQuery
                                ? 'Try adjusting your search or filters'
                                : 'Create your first workflow to automate repetitive tasks and save time.'
                            }
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={handleCreate}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D57D8] text-white rounded-xl hover:bg-[#1D57D8]/90 transition-all font-medium"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Create Your First Workflow
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workflow</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trigger</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Run</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredWorkflows.map((wf) => (
                                    <tr key={wf.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${wf.is_active ? 'bg-[#1D57D8]/10' : 'bg-slate-100'}`}>
                                                    <BoltIcon className={`w-4 h-4 ${wf.is_active ? 'text-[#1D57D8]' : 'text-slate-400'}`} />
                                                </div>
                                                <span className="font-medium text-slate-900">{wf.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                                {wf.trigger_type || 'Manual'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                wf.is_active
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${wf.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                                {wf.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <ClockIcon className="w-4 h-4" />
                                                {wf.last_run_at
                                                    ? new Date(wf.last_run_at).toLocaleDateString(undefined, {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : 'Never'
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleTest(wf.id)}
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Test Run"
                                                >
                                                    <PlayIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(wf.id)}
                                                    className="p-2 text-slate-400 hover:text-[#1D57D8] hover:bg-[#1D57D8]/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="More"
                                                >
                                                    <EllipsisHorizontalIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
