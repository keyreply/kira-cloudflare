import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService.ts';
import {
    ChatBubbleLeftRightIcon,
    UsersIcon,
    CpuChipIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    SignalIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

interface DashboardSummary {
    totalConversations: number;
    interestedLeads: number;
    voiceInteractions: number;
    declined: number;
    activeUsers?: number;
    aiResponseRate?: string;
}

interface Intent {
    label: string;
    count: number;
}

export function Dashboard() {
    const [summary, setSummary] = useState<DashboardSummary>({
        totalConversations: 0,
        interestedLeads: 0,
        voiceInteractions: 0,
        declined: 0
    });
    const [funnel, setFunnel] = useState<unknown[]>([]);
    const [intents, setIntents] = useState<Intent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const dashboardSummary = await analyticsService.getDashboardSummary();
                setSummary(prev => ({ ...prev, ...dashboardSummary }));

                const intentData = await analyticsService.getIntents();
                setIntents(intentData.intents || []);

                const campaignStats = await analyticsService.getCampaignStats('default');
                setFunnel(campaignStats.funnel || []);
            } catch (error) {
                console.error("Dashboard fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Loading analytics...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            label: 'Total Conversations',
            value: summary.totalConversations || 0,
            icon: ChatBubbleLeftRightIcon,
            gradient: 'from-[#1D57D8] to-[#37CFFF]',
            bgColor: 'bg-[#1D57D8]/5',
            trend: '+12%',
            trendUp: true
        },
        {
            label: 'Active Users',
            value: summary.activeUsers || 0,
            icon: UsersIcon,
            gradient: 'from-emerald-500 to-emerald-400',
            bgColor: 'bg-emerald-50',
            trend: '+8%',
            trendUp: true
        },
        {
            label: 'AI Response Rate',
            value: summary.aiResponseRate || '0%',
            icon: CpuChipIcon,
            gradient: 'from-[#37CFFF] to-[#34DBAE]',
            bgColor: 'bg-[#37CFFF]/10',
            trend: '+5%',
            trendUp: true
        },
        {
            label: 'Events Tracked',
            value: intents.length || 0,
            icon: ChartBarIcon,
            gradient: 'from-amber-500 to-amber-400',
            bgColor: 'bg-amber-50',
            trend: '-2%',
            trendUp: false
        }
    ];

    const intentColors = [
        'from-[#1D57D8] to-[#37CFFF]',
        'from-emerald-500 to-emerald-400',
        'from-[#37CFFF] to-[#34DBAE]',
        'from-amber-500 to-amber-400',
        'from-[#1D57D8] to-[#34DBAE]'
    ];

    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Campaign Performance</h2>
                        <p className="text-slate-500 text-sm">Real-time analytics and insights</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <SignalIcon className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-slate-600 font-medium">Live</span>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-5 mb-8">
                    {statCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                                    <card.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    card.trendUp
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                        : 'bg-red-50 text-red-600 border border-red-200'
                                }`}>
                                    {card.trendUp ? (
                                        <ArrowTrendingUpIcon className="w-3 h-3" />
                                    ) : (
                                        <ArrowTrendingDownIcon className="w-3 h-3" />
                                    )}
                                    {card.trend}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
                            <div className="text-sm text-slate-500">{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                    {/* Intents Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-900">Top Detected Intents</h3>
                            <button className="text-xs text-[#1D57D8] hover:text-[#1D57D8]/80 transition-colors font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {intents.length > 0 ? intents.map((intent, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600">{intent.label}</span>
                                        <span className="font-semibold text-slate-900">{intent.count}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`bg-gradient-to-r ${intentColors[idx % intentColors.length]} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${Math.min(intent.count * 10, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )) : (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <ChartBarIcon className="w-12 h-12 text-slate-300 mb-3" />
                                    <p className="text-slate-500 text-sm">No intent data yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lead Status */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-900">Lead Status Breakdown</h3>
                            <button className="text-xs text-[#1D57D8] hover:text-[#1D57D8]/80 transition-colors font-medium">
                                View Details
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                                        <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Interested</div>
                                        <div className="text-xs text-slate-500">Likely to convert</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-emerald-600">{summary.interestedLeads || '--'}</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#1D57D8]/5 rounded-xl border border-[#1D57D8]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] rounded-xl flex items-center justify-center shadow-lg">
                                        <BoltIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Voice Interactions</div>
                                        <div className="text-xs text-slate-500">Engaged via voice</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-[#1D57D8]">{summary.voiceInteractions || '--'}</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-400 rounded-xl flex items-center justify-center shadow-lg">
                                        <ArrowTrendingDownIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Declined</div>
                                        <div className="text-xs text-slate-500">Not interested</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-red-500">{summary.declined || '--'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Insights</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-[#1D57D8]/5 rounded-xl border border-[#1D57D8]/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] rounded-lg shadow-lg">
                                    <SignalIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-slate-900">Live Data Connected</span>
                            </div>
                            <p className="text-sm text-slate-500">Dashboard is now fetching from D1 Analytics</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-lg shadow-lg">
                                    <CpuChipIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-slate-900">AI Processing</span>
                            </div>
                            <p className="text-sm text-slate-500">Real-time intent detection and analysis</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg shadow-lg">
                                    <BoltIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-slate-900">Smart Automation</span>
                            </div>
                            <p className="text-sm text-slate-500">Automated workflows and responses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
