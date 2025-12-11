import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { PlusIcon, PencilIcon, PlayIcon } from '@heroicons/react/24/outline';
import WorkflowEditor from './WorkflowEditor';

export default function WorkflowList() {
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);
    const [showEditor, setShowEditor] = useState(false);

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

    if (showEditor) {
        return (
            <WorkflowEditor
                workflowId={selectedWorkflowId}
                onClose={() => { setShowEditor(false); fetchWorkflows(); }}
            />
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Workflow Automation</h1>
                    <p className="text-slate-500">Automate your business logic with visual workflows</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Workflow
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-slate-500">Loading workflows...</div>
            ) : workflows.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
                    <p className="text-slate-500 mb-6">No workflows found.</p>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                    >
                        Create Your First Workflow
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Trigger</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Last Run</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {workflows.map((wf) => (
                                <tr key={wf.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{wf.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono">
                                            {wf.trigger_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${wf.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                            {wf.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {wf.last_run_at ? new Date(wf.last_run_at).toLocaleString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => handleTest(wf.id)}
                                            className="text-slate-400 hover:text-green-600 p-1"
                                            title="Test Run"
                                        >
                                            <PlayIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(wf.id)}
                                            className="text-slate-400 hover:text-blue-600 p-1"
                                            title="Edit"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
