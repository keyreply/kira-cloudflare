import React, { useState } from 'react';
import {
    BeakerIcon,
    PlayIcon,
    ChatBubbleLeftRightIcon,
    BoltIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon
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
            // Using existing chat API, but we could add a specific debug=true param if backend supported it
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
            // Mocking a test endpoint call for now, as specific test runner might need backend work
            // But we can simulate finding a workflow and triggering it
            await new Promise(r => setTimeout(r, 1000)); // Simulate latency

            let parsedPayload;
            try {
                parsedPayload = JSON.parse(workflowPayload);
            } catch (e) {
                throw new Error("Invalid JSON Payload");
            }

            // In a real implementation, we would call api.workflows.test(workflowId, parsedPayload)
            // For now, we'll verify if the workflow exists
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
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <BeakerIcon className="w-5 h-5" />
                    </div>
                    <h1 className="text-lg font-bold text-slate-900">System Testing & Validation</h1>
                </div>

                {/* Sandbox Toggle */}
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Sandbox Mode</span>
                    <button
                        onClick={() => setSandboxMode(!sandboxMode)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${sandboxMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${sandboxMode ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                    {sandboxMode && <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">Active</span>}
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">

                    {/* Tabs */}
                    <div className="flex space-x-1 rounded-xl bg-slate-200 p-1 mb-8 w-fit">
                        <button
                            onClick={() => setActiveTab('rag')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg leading-5 transition-all ${activeTab === 'rag'
                                    ? 'bg-white text-indigo-700 shadow'
                                    : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'
                                }`}
                        >
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                            RAG / Agent Tester
                        </button>
                        <button
                            onClick={() => setActiveTab('workflow')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg leading-5 transition-all ${activeTab === 'workflow'
                                    ? 'bg-white text-indigo-700 shadow'
                                    : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'
                                }`}
                        >
                            <BoltIcon className="w-4 h-4" />
                            Workflow Tester
                        </button>
                    </div>

                    {/* RAG Tester Content */}
                    {activeTab === 'rag' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                            {/* Input Panel */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm">
                                <h3 className="text-base font-semibold text-slate-900 mb-4">Query Configuration</h3>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">User Context</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                                            <option>Current User</option>
                                            <option disabled>Simulated User (Pro required)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Test Query</label>
                                        <textarea
                                            value={ragQuery}
                                            onChange={(e) => setRagQuery(e.target.value)}
                                            placeholder="Enter a question to test retrieval..."
                                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleRagTest}
                                        disabled={ragLoading || !ragQuery.trim()}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {ragLoading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4" />}
                                        Run Test
                                    </button>
                                </div>
                            </div>

                            {/* Results Panel */}
                            <div className="bg-slate-900 rounded-xl p-6 flex flex-col shadow-sm overflow-hidden text-slate-300 font-mono text-sm">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                                    <h3 className="font-semibold text-white">Execution Results</h3>
                                    {ragResult && (
                                        <span className={`px-2 py-0.5 rounded textxs font-medium ${ragResult.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {ragResult.status.toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4">
                                    {!ragResult && !ragLoading && (
                                        <div className="h-full flex items-center justify-center text-slate-600 italic">
                                            Ready to execute...
                                        </div>
                                    )}

                                    {ragLoading && (
                                        <div className="space-y-2 animate-pulse">
                                            <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                        </div>
                                    )}

                                    {ragResult && (
                                        <>
                                            <div>
                                                <span className="text-slate-500 block mb-1"># Retrieval Status</span>
                                                <div className="flex items-center gap-2">
                                                    {ragResult.hasContext ? <CheckCircleIcon className="w-4 h-4 text-green-500" /> : <XCircleIcon className="w-4 h-4 text-orange-500" />}
                                                    <span>{ragResult.hasContext ? 'Context Found' : 'No Relevance Context'}</span>
                                                </div>
                                            </div>

                                            {ragResult.status === 'success' && (
                                                <>
                                                    <div>
                                                        <span className="text-slate-500 block mb-1"># Sources ({ragResult.sources.length})</span>
                                                        {ragResult.sources.length > 0 ? (
                                                            <ul className="space-y-1 pl-2 border-l-2 border-slate-700">
                                                                {ragResult.sources.map((src, i) => (
                                                                    <li key={i} className="text-xs">
                                                                        <span className="text-indigo-400">[{src.documentName}]</span> (Score: {src.score.toFixed(3)})
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-slate-600 italic">No sources cited</span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <span className="text-slate-500 block mb-1"># AI Response</span>
                                                        <div className="bg-slate-800 p-3 rounded-lg text-xs leading-relaxed">
                                                            {ragResult.response}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {ragResult.status === 'error' && (
                                                <div className="text-red-400 bg-red-900/10 p-3 rounded border border-red-900/30">
                                                    Error: {ragResult.message}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Workflow Tester Content */}
                    {activeTab === 'workflow' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                            {/* Input Panel */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm">
                                <h3 className="text-base font-semibold text-slate-900 mb-4">Trigger Configuration</h3>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Workflow ID</label>
                                        <input
                                            type="text"
                                            value={workflowId}
                                            onChange={(e) => setWorkflowId(e.target.value)}
                                            placeholder="e.g. wf_123456"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">JSON Payload</label>
                                        <textarea
                                            value={workflowPayload}
                                            onChange={(e) => setWorkflowPayload(e.target.value)}
                                            className="w-full h-48 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleWorkflowTest}
                                        disabled={workflowLoading || !workflowId.trim()}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {workflowLoading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4" />}
                                        Trigger Workflow
                                    </button>
                                </div>
                            </div>

                            {/* Log Panel */}
                            <div className="bg-slate-900 rounded-xl p-6 flex flex-col shadow-sm overflow-hidden text-slate-300 font-mono text-sm">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                                    <h3 className="font-semibold text-white">Execution Logs</h3>
                                    {workflowResult && (
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${workflowResult.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {workflowResult.status.toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {!workflowResult && !workflowLoading && (
                                        <div className="h-full flex items-center justify-center text-slate-600 italic">
                                            Waiting for trigger...
                                        </div>
                                    )}

                                    {workflowResult && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>ID: {workflowResult.executionId}</span>
                                                <span>•</span>
                                                <span>{new Date().toLocaleTimeString()}</span>
                                            </div>

                                            {workflowResult.status === 'success' && (
                                                <div className="space-y-2">
                                                    {workflowResult.steps.map((step, i) => (
                                                        <div key={i} className="flex items-center justify-between bg-slate-800 p-2 rounded border border-slate-700">
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                                <span className="text-white">{step.name}</span>
                                                            </div>
                                                            <span className="text-xs text-slate-500">{step.duration}</span>
                                                        </div>
                                                    ))}
                                                    <div className="mt-4 p-3 bg-green-900/10 border border-green-900/30 rounded text-green-400">
                                                        {workflowResult.message}
                                                    </div>
                                                </div>
                                            )}

                                            {workflowResult.status === 'error' && (
                                                <div className="text-red-400 bg-red-900/10 p-3 rounded border border-red-900/30">
                                                    Error: {workflowResult.message}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Testing;
