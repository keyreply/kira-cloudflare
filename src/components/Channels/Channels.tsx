import { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    SignalIcon,
    ArrowTrendingUpIcon,
    Cog6ToothIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import WhatsAppChannel from './WhatsAppChannel.tsx';
import PhoneChannel from './PhoneChannel.tsx';
import EmailChannel from './EmailChannel.tsx';
import SMSChannel from './SMSChannel.tsx';

type ChannelView = 'list' | 'whatsapp' | 'phone' | 'email' | 'sms';

interface Channel {
    id: ChannelView;
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    gradient: string;
    shadowColor: string;
    status: string;
    description: string;
    recommended: boolean;
    active: boolean;
}

const Channels = () => {
    const [activeChannel, setActiveChannel] = useState<ChannelView>('list');

    if (activeChannel === 'whatsapp') return <WhatsAppChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'phone') return <PhoneChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'email') return <EmailChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'sms') return <SMSChannel onBack={() => setActiveChannel('list')} />;

    const channels: Channel[] = [
        {
            id: 'list',
            name: 'Chat Widget',
            icon: ChatBubbleLeftRightIcon,
            gradient: 'from-[#1D57D8] to-[#37CFFF]',
            shadowColor: 'shadow-[#37CFFF]/25',
            status: 'Included in your plan',
            description: 'Embed a chat widget on your website for instant customer support',
            recommended: true,
            active: true
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            icon: ChatBubbleLeftRightIcon,
            gradient: 'from-[#34DBAE] to-[#5DE530]',
            shadowColor: 'shadow-[#5DE530]/25',
            status: 'Send and receive WhatsApp messages',
            description: 'Connect with customers on the world\'s most popular messaging platform',
            recommended: true,
            active: false
        },
        {
            id: 'phone',
            name: 'Phone',
            icon: PhoneIcon,
            gradient: 'from-[#37CFFF] to-[#34DBAE]',
            shadowColor: 'shadow-[#37CFFF]/25',
            status: 'Make and receive phone calls',
            description: 'Set up voice channels for automated and live customer calls',
            recommended: true,
            active: false
        },
        {
            id: 'email',
            name: 'Email',
            icon: EnvelopeIcon,
            gradient: 'from-[#5DE530] to-[#34DBAE]',
            shadowColor: 'shadow-[#5DE530]/25',
            status: 'Transactional emails via Resend',
            description: 'Send transactional emails and manage email conversations',
            recommended: false,
            active: true
        },
        {
            id: 'sms',
            name: 'SMS',
            icon: DevicePhoneMobileIcon,
            gradient: 'from-[#1D57D8] to-[#34DBAE]',
            shadowColor: 'shadow-[#1D57D8]/25',
            status: 'Send and receive text messages',
            description: 'Reach customers directly with SMS messaging',
            recommended: false,
            active: false
        },
    ];

    const activeChannelsCount = channels.filter(c => c.active).length;
    const recommendedCount = channels.filter(c => c.recommended).length;

    const statsCards = [
        {
            label: 'Total Channels',
            value: channels.length,
            icon: GlobeAltIcon,
            gradient: 'from-[#1D57D8] to-[#37CFFF]'
        },
        {
            label: 'Active',
            value: activeChannelsCount,
            icon: SignalIcon,
            gradient: 'from-emerald-500 to-emerald-400'
        },
        {
            label: 'Available',
            value: channels.length - activeChannelsCount,
            icon: Cog6ToothIcon,
            gradient: 'from-[#37CFFF] to-[#34DBAE]'
        },
        {
            label: 'Recommended',
            value: recommendedCount,
            icon: ArrowTrendingUpIcon,
            gradient: 'from-amber-500 to-amber-400'
        }
    ];

    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Channels</h1>
                        <p className="text-slate-500 text-sm">Connect and manage your communication channels</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <SignalIcon className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-slate-600 font-medium">All Systems Operational</span>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Stats Overview */}
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
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
                            <div className="text-sm text-slate-500">{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Channel Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {channels.map((channel) => (
                        <div
                            key={channel.id}
                            onClick={() => channel.id !== 'list' && setActiveChannel(channel.id)}
                            className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all group shadow-sm ${
                                channel.id !== 'list' ? 'hover:border-[#1D57D8]/30 hover:shadow-md cursor-pointer' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${channel.gradient} flex items-center justify-center shadow-lg ${channel.shadowColor}`}>
                                    <channel.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {channel.recommended && (
                                        <span className="bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                                            Recommended
                                        </span>
                                    )}
                                    {channel.active && (
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-xs text-emerald-600 font-medium">Active</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-semibold text-slate-900 text-lg mb-2">{channel.name}</h3>
                            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{channel.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                {channel.active ? (
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <CheckCircleIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Connected</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-slate-500">{channel.status}</span>
                                )}

                                {channel.id !== 'list' && (
                                    <button className="flex items-center gap-1 text-sm text-[#1D57D8] font-medium group-hover:text-[#37CFFF] transition-colors">
                                        Configure
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integration Help */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100">
                            <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#1D57D8]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Need help connecting channels?</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                Our team can help you set up and configure your communication channels for optimal performance.
                            </p>
                            <button className="text-sm text-[#1D57D8] hover:text-[#37CFFF] font-medium transition-colors flex items-center gap-1">
                                Contact Support
                                <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900">24/7</div>
                                <div className="text-xs text-slate-500">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channels;
