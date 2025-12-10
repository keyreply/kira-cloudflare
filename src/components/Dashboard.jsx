import React from 'react';

export function Dashboard() {
    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Campaign Performance Overview</h2>

                <div className="grid grid-cols-4 gap-5 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-slate-500 text-sm mb-2">Total Conversations</div>
                        <div className="text-3xl font-bold text-slate-800">7</div>
                        <div className="text-xs text-green-600 mt-2">↑ 100% reached</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-slate-500 text-sm mb-2">Interested Leads</div>
                        <div className="text-3xl font-bold text-green-600">5</div>
                        <div className="text-xs text-slate-500 mt-2">71.4% conversion rate</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-slate-500 text-sm mb-2">Voice Interactions</div>
                        <div className="text-3xl font-bold text-purple-600">2</div>
                        <div className="text-xs text-slate-500 mt-2">63.2% engagement rate</div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-slate-500 text-sm mb-2">Declined</div>
                        <div className="text-3xl font-bold text-red-600">1</div>
                        <div className="text-xs text-slate-500 mt-2">14.3% opt-out rate</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Customer Journey Stages</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 0 - Initial Contact</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 3-7 - Follow-up & Nurturing</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 7 - Opted Out</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 10 - Voice Outreach</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 12 - Alternative Offer</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Day 14 - Event Invitation</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Post-Event - Re-engagement</span>
                                    <span className="font-semibold">1 lead</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Lead Status Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                        5
                                    </div>
                                    <div>
                                        <div className="font-semibold text-green-800">Interested</div>
                                        <div className="text-xs text-green-600">Likely to convert</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-green-600">71%</div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                                        1
                                    </div>
                                    <div>
                                        <div className="font-semibold text-amber-800">Considering</div>
                                        <div className="text-xs text-amber-600">Needs more engagement</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-amber-600">14%</div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                        1
                                    </div>
                                    <div>
                                        <div className="font-semibold text-red-800">Not Interested</div>
                                        <div className="text-xs text-red-600">Opted out of communications</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-red-600">14%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl mb-2">🎙️</div>
                            <div className="font-semibold text-purple-800 mb-1">Voice Outreach Impact</div>
                            <div className="text-sm text-purple-600">63.2% conversion rate when using voice messages</div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-2xl mb-2">🎯</div>
                            <div className="font-semibold text-blue-800 mb-1">Re-engagement Success</div>
                            <div className="text-sm text-blue-600">85.6% recovery rate through multi-channel outreach</div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-2xl mb-2">🔄</div>
                            <div className="font-semibold text-green-800 mb-1">Follow-up Effectiveness</div>
                            <div className="text-sm text-green-600">4-day follow-up converts 60% of hesitant leads</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
