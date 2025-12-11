import { useState, useEffect } from 'react';
import { api } from '../../services/api.ts';
import {
    PlusIcon,
    PlayIcon,
    PauseIcon,
    ChartBarIcon,
    MegaphoneIcon,
    EllipsisHorizontalIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowPathIcon,
    RocketLaunchIcon,
    ArrowTrendingUpIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import CampaignWizard from './CampaignWizard.tsx';
import type { Campaign } from '../../types/index.ts';

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [showWizard, setShowWizard] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const data = await api.campaigns.list();
            if (data.campaigns) {
                setCampaigns(data.campaigns);
            }
        } catch (error) {
            console.error("Failed to fetch campaigns:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusAction = async (id: string, currentStatus: string) => {
        try {
            if (currentStatus === 'running') {
                await api.campaigns.pause(id);
            } else {
                await api.campaigns.start(id);
            }
            fetchCampaigns();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    if (showWizard) {
        return <CampaignWizard onClose={() => { setShowWizard(false); fetchCampaigns(); }} />;
    }

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'running':
                return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'paused':
                return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'completed':
                return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'draft':
                return 'bg-slate-100 text-slate-500 border-slate-200';
            default:
                return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'email':
                return 'from-blue-500 to-cyan-500';
            case 'voice':
                return 'from-[#37CFFF] to-purple-500';
            case 'whatsapp':
                return 'from-emerald-500 to-green-500';
            default:
                return 'from-slate-500 to-slate-600';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'email':
                return EnvelopeIcon;
            case 'voice':
                return PhoneIcon;
            case 'whatsapp':
                return ChatBubbleLeftRightIcon;
            default:
                return MegaphoneIcon;
        }
    };

    // Stats calculations
    const runningCampaigns = campaigns.filter(c => c.status === 'running').length;
    const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
    const draftCampaigns = campaigns.filter(c => c.status === 'draft').length;

    const statsCards = [
        {
            label: 'Total Campaigns',
            value: campaigns.length,
            icon: MegaphoneIcon,
            gradient: 'from-[#1D57D8] to-[#37CFFF]',
            trend: '+12%'
        },
        {
            label: 'Active Now',
            value: runningCampaigns,
            icon: RocketLaunchIcon,
            gradient: 'from-emerald-500 to-emerald-400',
            trend: '+8%'
        },
        {
            label: 'Completed',
            value: completedCampaigns,
            icon: CheckCircleIcon,
            gradient: 'from-[#37CFFF] to-[#34DBAE]',
            trend: '+24%'
        },
        {
            label: 'Drafts',
            value: draftCampaigns,
            icon: ClockIcon,
            gradient: 'from-amber-500 to-amber-400',
            trend: null
        }
    ];

    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Campaigns</h1>
                        <p className="text-slate-500 text-sm">Create and manage your outbound marketing campaigns</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchCampaigns}
                            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                            title="Refresh"
                        >
                            <ArrowPathIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowWizard(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] text-white rounded-xl hover:shadow-lg hover:shadow-[#37CFFF]/25 transition-all"
                        >
                            <PlusIcon className="w-4 h-4" />
                            New Campaign
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-5 mb-8">
                    {statsCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                                    <card.icon className="w-5 h-5 text-white" />
                                </div>
                                {card.trend && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                                        <ArrowTrendingUpIcon className="w-3 h-3" />
                                        {card.trend}
                                    </div>
                                )}
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
                            <div className="text-sm text-slate-500">{card.label}</div>
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1D57D8] rounded-full animate-spin" />
                            <p className="text-slate-500 text-sm">Loading campaigns...</p>
                        </div>
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                            <MegaphoneIcon className="w-8 h-8 text-[#1D57D8]" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">Create your first campaign to reach your customers via email, voice, or WhatsApp.</p>
                        <button
                            onClick={() => setShowWizard(true)}
                            className="px-5 py-2.5 bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] text-white rounded-xl hover:shadow-lg hover:shadow-[#37CFFF]/25 transition-all font-medium"
                        >
                            Create Campaign
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search campaigns..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1D57D8] focus:ring-2 focus:ring-[#1D57D8]/10 w-72 transition-all"
                                    />
                                </div>
                                <span className="text-sm text-slate-500">
                                    <span className="font-semibold text-slate-900">{filteredCampaigns.length}</span> campaigns
                                </span>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                <FunnelIcon className="w-4 h-4" />
                                Filter
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Channel</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredCampaigns.map((campaign) => {
                                        const TypeIcon = getTypeIcon(campaign.type);
                                        return (
                                            <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getTypeStyles(campaign.type)} flex items-center justify-center shadow-md`}>
                                                            <TypeIcon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-900">{campaign.name}</div>
                                                            <div className="text-xs text-slate-500">Created {new Date().toLocaleDateString()}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getTypeStyles(campaign.type)} text-white shadow-sm`}>
                                                        {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusStyles(campaign.status)}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${campaign.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-current opacity-50'}`} />
                                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className={`h-2 rounded-full bg-gradient-to-r ${getTypeStyles(campaign.type)} transition-all duration-500`}
                                                                style={{ width: campaign.status === 'completed' ? '100%' : campaign.status === 'running' ? '45%' : '0%' }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-slate-600 font-medium">
                                                            {campaign.status === 'completed' ? '100%' : campaign.status === 'running' ? '45%' : '0%'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleStatusAction(campaign.id, campaign.status)}
                                                            className={`p-2 rounded-lg transition-colors ${
                                                                campaign.status === 'running'
                                                                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200'
                                                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                                                            }`}
                                                            title={campaign.status === 'running' ? "Pause" : "Start"}
                                                        >
                                                            {campaign.status === 'running' ? (
                                                                <PauseIcon className="w-4 h-4" />
                                                            ) : (
                                                                <PlayIcon className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        <button
                                                            className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors border border-slate-200"
                                                            title="View Stats"
                                                        >
                                                            <ChartBarIcon className="w-4 h-4" />
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
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <span className="text-sm text-slate-500">
                                Showing <span className="font-medium text-slate-900">{filteredCampaigns.length}</span> of <span className="font-medium text-slate-900">{campaigns.length}</span> campaigns
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 bg-[#1D57D8] rounded-lg text-sm text-white font-medium shadow-sm">
                                    1
                                </button>
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
