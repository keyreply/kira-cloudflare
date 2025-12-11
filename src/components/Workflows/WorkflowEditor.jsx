import React, { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { api } from '../../services/api';
import { ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Start Trigger' },
        position: { x: 250, y: 0 },
    },
];

const initialEdges = [];

export default function WorkflowEditor({ workflowId, onClose }) {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [name, setName] = useState("New Workflow");
    const [triggerType, setTriggerType] = useState("page_view");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (workflowId) {
            loadWorkflow();
        }
    }, [workflowId]);

    const loadWorkflow = async () => {
        try {
            const data = await api.workflows.get(workflowId);
            if (data.workflow) {
                const wf = data.workflow;
                setName(wf.name);
                setTriggerType(wf.trigger_type);
                if (wf.definition) {
                    setNodes(wf.definition.nodes || initialNodes);
                    setEdges(wf.definition.edges || initialEdges);
                }
            }
        } catch (error) {
            console.error("Failed to load workflow:", error);
        }
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                name,
                triggerType,
                isActive: true,
                definition: { nodes, edges }
            };

            if (workflowId) {
                await api.workflows.update(workflowId, payload);
            } else {
                await api.workflows.create(payload);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save workflow:", error);
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent text-lg font-bold text-slate-900 focus:outline-none border-b border-transparent focus:border-blue-500"
                    />
                    <select
                        value={triggerType}
                        onChange={(e) => setTriggerType(e.target.value)}
                        className="text-sm bg-white border border-slate-300 rounded px-2 py-1"
                    >
                        <option value="page_view">Trigger: Page View</option>
                        <option value="inbound_message">Trigger: Inbound Message</option>
                        <option value="tag_added">Trigger: Tag Added</option>
                    </select>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                    <CloudArrowUpIcon className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save Workflow'}
                </button>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-slate-100">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
