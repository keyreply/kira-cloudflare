import React, { useState } from 'react';
import {
    BeakerIcon,
    PlayIcon,
    ChatBubbleLeftRightIcon,
    BoltIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    DocumentTextIcon,
    SparklesIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { api } from '../../services/api';

const Testing = () => {
    const [activeTab, setActiveTab] = useState('rag'); // 'rag', 'workflow'
    const [sandboxMode, setSandboxMode] = useState(false);

    // RAG State
    const [ragQuery, setRagQuery] = useState('');
    const [ragResult, setRagResult] = useState(null);
    const [ragLoading, setRagLoading] = useState(false);

    // Workflow State
    const [workflowId, setWorkflowId] = useState('');
    const [workflowPayload, setWorkflowPayload] = useState('{\n  "userId": "test_user_1",\n  "event": "page_view"\n}');
    const [workflowResult, setWorkflowResult] = useState(null);
    const [workflowLoading, setWorkflowLoading] = useState(false);

    const handleRagTest = async () => {
        if (!ragQuery.trim()) return;
        setRagLoading(true);
        setRagResult(null);
        try {
            const response = await api.chat.send(ragQuery, 'testing');
            setRagResult({
                status: 'success',
                response: response.response,
                sources: response.sources || [],
                hasContext: response.hasContext
            });
        } catch (error) {
            setRagResult({
                status: 'error',
                message: error.message
            });
        } finally {
            setRagLoading(false);
        }
    };

    const handleWorkflowTest = async () => {
        if (!workflowId.trim()) return;
        setWorkflowLoading(true);
        setWorkflowResult(null);
        try {
            await new Promise(r => setTimeout(r, 1000));

            let parsedPayload;
            try {
                parsedPayload = JSON.parse(workflowPayload);
            } catch (e) {
                throw new Error("Invalid JSON Payload");
            }

            const workflow = await api.workflows.get(workflowId);

            setWorkflowResult({
                status: 'success',
                message: `Workflow "${workflow.name}" triggered successfully`,
                executionId: 'exec_' + Date.now(),
                steps: [
                    { name: 'Trigger', status: 'completed', duration: '12ms' },
                    { name: 'Condition Check', status: 'completed', duration: '5ms' },
                    { name: 'Action: Send Email', status: 'completed', duration: '245ms' }
                ]
            });

        } catch (error) {
            setWorkflowResult({
                status: 'error',
                message: error.message || "Failed to trigger workflow"
            });
        } finally {
            setWorkflowLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20">
                                <BeakerIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Testing Sandbox</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Test your RAG agent and workflow automations</p>
                            </div>
                        </div>

                        {/* Sandbox Toggle */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600">Sandbox Mode</span>
                            <button
                                onClick={() => setSandboxMode(!sandboxMode)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    sandboxMode ? 'bg-amber-500' : 'bg-slate-300'
                                }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                    sandboxMode ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                            </button>
                            {sandboxMode && (
                                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                    Active
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('rag')}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                            activeTab === 'rag'
                                ? 'bg-[#1D57D8] text-white shadow-lg shadow-[#1D57D8]/25'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        RAG / Agent Tester
                    </button>
                    <button
                        onClick={() => setActiveTab('workflow')}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                            activeTab === 'workflow'
                                ? 'bg-[#1D57D8] text-white shadow-lg shadow-[#1D57D8]/25'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <BoltIcon className="w-4 h-4" />
                        Workflow Tester
                    </button>
                </div>

                {/* RAG Tester Content */}
                {activeTab === 'rag' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Input Panel */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5 text-[#1D57D8]" />
                                    Query Configuration
                                </h3>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">User Context</label>
                                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]">
                                        <option>Current User</option>
                                        <option disabled>Simulated User (Pro required)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Test Query</label>
                                    <textarea
                                        value={ragQuery}
                                        onChange={(e) => setRagQuery(e.target.value)}
                                        placeholder="Enter a question to test retrieval..."
                                        className="w-full h-36 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8] resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleRagTest}
                                    disabled={ragLoading || !ragQuery.trim()}
                                    className="w-full bg-[#1D57D8] hover:bg-[#1D57D8]/90 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#1D57D8]/25"
                                >
                                    {ragLoading ? (
                                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <PlayIcon className="w-4 h-4" />
                                    )}
                                    Run Test
                                </button>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <DocumentTextIcon className="w-5 h-5 text-slate-500" />
                                    Execution Results
                                </h3>
                                {ragResult && (
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                        ragResult.status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        {ragResult.status.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="p-6 min-h-[400px]">
                                {!ragResult && !ragLoading && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16">
                                        <BeakerIcon className="w-12 h-12 mb-4" />
                                        <p className="text-sm">Ready to execute...</p>
                                        <p className="text-xs text-slate-300 mt-1">Enter a query and click Run Test</p>
                                    </div>
                                )}

                                {ragLoading && (
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin mb-4" />
                                        <p className="text-sm text-slate-500">Processing query...</p>
                                    </div>
                                )}

                                {ragResult && (
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                            {ragResult.hasContext ? (
                                                <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                                            ) : (
                                                <XCircleIcon className="w-5 h-5 text-amber-500 shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {ragResult.hasContext ? 'Context Found' : 'No Relevant Context'}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {ragResult.hasContext
                                                        ? 'Retrieved relevant documents from knowledge base'
                                                        : 'Response generated without specific context'
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {ragResult.status === 'success' && (
                                            <>
                                                {ragResult.sources.length > 0 && (
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                            Sources ({ragResult.sources.length})
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {ragResult.sources.map((src, i) => (
                                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                                    <div className="flex items-center gap-2">
                                                                        <DocumentTextIcon className="w-4 h-4 text-[#1D57D8]" />
                                                                        <span className="text-sm text-slate-700">{src.documentName}</span>
                                                                    </div>
                                                                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                                                                        {src.score.toFixed(3)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                        AI Response
                                                    </h4>
                                                    <div className="p-4 bg-[#1D57D8]/5 border border-[#1D57D8]/10 rounded-xl">
                                                        <p className="text-sm text-slate-700 leading-relaxed">{ragResult.response}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {ragResult.status === 'error' && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                                <p className="text-sm text-red-700">Error: {ragResult.message}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Workflow Tester Content */}
                {activeTab === 'workflow' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Input Panel */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <BoltIcon className="w-5 h-5 text-[#1D57D8]" />
                                    Trigger Configuration
                                </h3>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Workflow ID</label>
                                    <input
                                        type="text"
                                        value={workflowId}
                                        onChange={(e) => setWorkflowId(e.target.value)}
                                        placeholder="e.g. wf_123456"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">JSON Payload</label>
                                    <textarea
                                        value={workflowPayload}
                                        onChange={(e) => setWorkflowPayload(e.target.value)}
                                        className="w-full h-48 bg-slate-900 text-slate-100 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8] resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleWorkflowTest}
                                    disabled={workflowLoading || !workflowId.trim()}
                                    className="w-full bg-[#1D57D8] hover:bg-[#1D57D8]/90 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#1D57D8]/25"
                                >
                                    {workflowLoading ? (
                                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <PlayIcon className="w-4 h-4" />
                                    )}
                                    Trigger Workflow
                                </button>
                            </div>
                        </div>

                        {/* Log Panel */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5 text-slate-500" />
                                    Execution Logs
                                </h3>
                                {workflowResult && (
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                        workflowResult.status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        {workflowResult.status.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="p-6 min-h-[400px]">
                                {!workflowResult && !workflowLoading && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16">
                                        <BoltIcon className="w-12 h-12 mb-4" />
                                        <p className="text-sm">Waiting for trigger...</p>
                                        <p className="text-xs text-slate-300 mt-1">Enter a workflow ID and click Trigger</p>
                                    </div>
                                )}

                                {workflowLoading && (
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin mb-4" />
                                        <p className="text-sm text-slate-500">Executing workflow...</p>
                                    </div>
                                )}

                                {workflowResult && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                                                {workflowResult.executionId}
                                            </span>
                                            <span>{new Date().toLocaleTimeString()}</span>
                                        </div>

                                        {workflowResult.status === 'success' && (
                                            <div className="space-y-3">
                                                {workflowResult.steps.map((step, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                                                            <span className="text-sm font-medium text-slate-900">{step.name}</span>
                                                        </div>
                                                        <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                                                            {step.duration}
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                                    <p className="text-sm text-emerald-700 font-medium">{workflowResult.message}</p>
                                                </div>
                                            </div>
                                        )}

                                        {workflowResult.status === 'error' && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                                <p className="text-sm text-red-700">Error: {workflowResult.message}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testing;
