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
import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    BoltIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    CodeBracketIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    EnvelopeIcon,
    BellIcon,
    TagIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Start Trigger' },
        position: { x: 250, y: 0 },
    },
];

const initialEdges = [];

// Node palette configuration
const nodeTypes = [
    {
        category: 'Triggers',
        items: [
            { type: 'trigger', label: 'Page View', icon: BoltIcon, color: '#1D57D8' },
            { type: 'trigger', label: 'Inbound Message', icon: ChatBubbleLeftRightIcon, color: '#1D57D8' },
            { type: 'trigger', label: 'Tag Added', icon: TagIcon, color: '#1D57D8' },
        ]
    },
    {
        category: 'Actions',
        items: [
            { type: 'action', label: 'Send Message', icon: ChatBubbleLeftRightIcon, color: '#37CFFF' },
            { type: 'action', label: 'Send Email', icon: EnvelopeIcon, color: '#37CFFF' },
            { type: 'action', label: 'Send Notification', icon: BellIcon, color: '#37CFFF' },
            { type: 'action', label: 'Add Tag', icon: TagIcon, color: '#37CFFF' },
        ]
    },
    {
        category: 'Logic',
        items: [
            { type: 'condition', label: 'Condition', icon: CodeBracketIcon, color: '#34DBAE' },
            { type: 'delay', label: 'Delay', icon: ClockIcon, color: '#34DBAE' },
        ]
    }
];

export default function WorkflowEditor({ workflowId, onClose }) {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [name, setName] = useState("New Workflow");
    const [triggerType, setTriggerType] = useState("page_view");
    const [saving, setSaving] = useState(false);
    const [isActive, setIsActive] = useState(true);

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
                setIsActive(wf.is_active);
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

    const onDragStart = (event, nodeType, label) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const position = {
                x: event.clientX - 350, // Adjust for sidebar width
                y: event.clientY - 120, // Adjust for header height
            };

            const newNode = {
                id: `${nodes.length + 1}`,
                type: 'default',
                position,
                data: { label: data.label },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [nodes],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                name,
                triggerType,
                isActive,
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
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Header with gradient accent */}
            <div className="relative h-20 border-b border-slate-200 bg-white shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1D57D8] via-[#37CFFF] to-[#34DBAE]"></div>
                <div className="h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent text-xl font-semibold text-slate-900 focus:outline-none border-b-2 border-transparent focus:border-[#1D57D8] transition-colors px-1"
                                placeholder="Workflow name"
                            />
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                                <select
                                    value={triggerType}
                                    onChange={(e) => setTriggerType(e.target.value)}
                                    className="text-sm bg-transparent text-slate-700 focus:outline-none"
                                >
                                    <option value="page_view">Page View</option>
                                    <option value="inbound_message">Inbound Message</option>
                                    <option value="tag_added">Tag Added</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                            >
                                {isActive ? (
                                    <>
                                        <CheckCircleIcon className="w-4 h-4" />
                                        Active
                                    </>
                                ) : (
                                    <>
                                        <ExclamationTriangleIcon className="w-4 h-4" />
                                        Inactive
                                    </>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#1D57D8] text-white rounded-lg hover:bg-[#1546b0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm font-medium"
                        >
                            <CloudArrowUpIcon className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Workflow'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content area with sidebar and canvas */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left sidebar - Node palette */}
                <div className="w-72 bg-white border-r border-slate-200 shadow-sm overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                            Node Palette
                        </h2>
                        <p className="text-sm text-slate-600 mb-6">
                            Drag and drop nodes onto the canvas to build your workflow.
                        </p>

                        {nodeTypes.map((category) => (
                            <div key={category.category} className="mb-6">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                    {category.category}
                                </h3>
                                <div className="space-y-2">
                                    {category.items.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={idx}
                                                draggable
                                                onDragStart={(e) => onDragStart(e, item.type, item.label)}
                                                className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all group"
                                            >
                                                <div
                                                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: `${item.color}15` }}
                                                >
                                                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                                                    {item.label}
                                                </span>
                                                <PlusCircleIcon className="w-4 h-4 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 p-4 bg-gradient-to-br from-[#1D57D8]/5 to-[#37CFFF]/5 rounded-lg border border-[#37CFFF]/20">
                            <p className="text-xs text-slate-600 leading-relaxed">
                                <strong className="text-slate-900">Tip:</strong> Connect nodes by dragging from one node's handle to another. Use conditions to create branching logic.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Canvas area */}
                <div className="flex-1 bg-slate-50" onDrop={onDrop} onDragOver={onDragOver}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        className="bg-slate-50"
                    >
                        <Background color="#cbd5e1" gap={16} size={1} />
                        <Controls className="bg-white border border-slate-200 rounded-lg shadow-sm" />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}
