import React from 'react';
import {
    ChartBarIcon,
    ChatBubbleLeftIcon,
    FaceFrownIcon,
    FireIcon,
    ArrowPathIcon,
    NoSymbolIcon,
    XCircleIcon,
    MicrophoneIcon,
    SparklesIcon,
    PhoneIcon,
    InformationCircleIcon,
    ChevronRightIcon,
    UserIcon,
    ClockIcon,
    TagIcon,
    BoltIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Map emoji icons to Hero Icons
const iconMap = {
    'chart': ChartBarIcon,
    'chat': ChatBubbleLeftIcon,
    'sad': FaceFrownIcon,
    'fire': FireIcon,
    'refresh': ArrowPathIcon,
    'block': NoSymbolIcon,
    'close': XCircleIcon,
    'mic': MicrophoneIcon,
    'sparkle': SparklesIcon,
    'phone': PhoneIcon,
};

export function RightPanel({
    activePanel,
    setActivePanel,
    interactionMode,
    scenario,
    messagesToShow,
    currentStep,
    conversationLogs,
    setIsRightPanelOpen
}) {
    const getIconComponent = (iconEmoji) => {
        const IconComponent = iconMap[iconEmoji] || InformationCircleIcon;
        return IconComponent;
    };

    const getTagIcon = (tag) => {
        if (tag.type === 'status') return ChartBarIcon;
        if (tag.type === 'intent') return BoltIcon;
        return TagIcon;
    };

    return (
        <div className="w-[400px] bg-gradient-to-b from-white to-slate-50/30 border-l border-slate-200/80 flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-slate-200/80 relative bg-white">
                <button
                    onClick={() => setIsRightPanelOpen(false)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all duration-200"
                    title="Collapse Panel"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
                <button
                    className={`flex-1 py-3.5 text-center text-[13px] font-semibold transition-all duration-200 border-b-2 pl-8 ${
                        activePanel === 'profile'
                            ? 'text-[#1D57D8] border-[#1D57D8] bg-[#1D57D8]/5'
                            : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                    onClick={() => setActivePanel('profile')}
                >
                    Details
                </button>
                <button
                    className={`flex-1 py-3.5 text-center text-[13px] font-semibold transition-all duration-200 border-b-2 ${
                        activePanel === 'logs'
                            ? 'text-[#1D57D8] border-[#1D57D8] bg-[#1D57D8]/5'
                            : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                    onClick={() => setActivePanel('logs')}
                >
                    {interactionMode === 'interactive' ? 'Activity' : 'System Logs'}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
                {activePanel === 'profile' ? (
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-lg"
                                    style={{
                                        background: scenario.avatar?.bg || '#1D57D8',
                                        boxShadow: `0 4px 14px ${scenario.avatar?.bg || '#1D57D8'}40`
                                    }}
                                >
                                    {scenario.avatar?.initials || 'U'}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg">{scenario.name}</h3>
                                    <p className="text-sm text-slate-500 mt-0.5">{scenario.email || 'customer@example.com'}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium border border-emerald-100">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Conversation Summary */}
                        {interactionMode === 'interactive' && (
                            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Conversation Summary</h4>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#1D57D8]/10 flex items-center justify-center">
                                                <ChatBubbleLeftIcon className="w-4 h-4 text-[#1D57D8]" />
                                            </div>
                                            <span className="text-sm text-slate-600">Messages</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">{messagesToShow.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                <BoltIcon className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <span className="text-sm text-slate-600">Mode</span>
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                                            currentStep < (scenario.steps?.length || 0) - 1
                                                ? 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                                : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            {currentStep < (scenario.steps?.length || 0) - 1 ? 'Guided' : 'Open'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Status Card */}
                        {interactionMode === 'static' && scenario.currentStatus && (
                            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Status</h4>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                                                <SparklesIcon className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <span className="text-sm text-slate-600">Customer Intent</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">{scenario.currentStatus.intent}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#1D57D8]/10 flex items-center justify-center">
                                                <ArrowPathIcon className="w-4 h-4 text-[#1D57D8]" />
                                            </div>
                                            <span className="text-sm text-slate-600">Next Step</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">{scenario.currentStatus.nextAction}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <UserIcon className="w-4 h-4 text-slate-600" />
                                            </div>
                                            <span className="text-sm text-slate-600">Queue</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">{scenario.currentStatus.queue}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {scenario.tags && scenario.tags.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tags</h4>
                                    <span className="text-xs font-medium text-slate-400">{scenario.tags.length}</span>
                                </div>
                                <div className="p-4 space-y-2">
                                    {scenario.tags.map((tag, index) => {
                                        const IconComponent = getTagIcon(tag);
                                        return (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                                        tag.type === 'status'
                                                            ? 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                                            : tag.type === 'intent'
                                                                ? 'bg-amber-50 text-amber-600'
                                                                : 'bg-emerald-50 text-emerald-600'
                                                    }`}>
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700">{tag.name}</span>
                                                </div>
                                                <div className="relative">
                                                    <button className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center text-xs text-slate-400 hover:text-slate-600 transition-colors border border-transparent group-hover:border-slate-200">
                                                        ?
                                                    </button>
                                                    {tag.tooltip && (
                                                        <div className="hidden group-hover:block absolute bottom-full right-0 w-64 bg-slate-900 text-white p-3.5 rounded-xl text-xs leading-relaxed mb-2 z-50 shadow-xl">
                                                            <div className="font-semibold text-[#37CFFF] mb-1.5">{tag.tooltip.title}</div>
                                                            <div className="text-slate-300">{tag.tooltip.description}</div>
                                                            <div className="absolute bottom-[-6px] right-3 w-3 h-3 bg-slate-900 transform rotate-45" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Activity Header */}
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {interactionMode === 'interactive' ? 'Recent Activity' : 'Processing History'}
                            </h4>
                            <span className="text-xs text-slate-400">{conversationLogs.length} events</span>
                        </div>

                        {/* Activity Items */}
                        <div className="space-y-3">
                            {conversationLogs.map((log, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm animate-[fadeIn_0.3s_ease-out]"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex items-start gap-3 p-4">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                            log.type === 'success'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : log.type === 'warning'
                                                    ? 'bg-amber-50 text-amber-600'
                                                    : log.type === 'error'
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                        }`}>
                                            {log.type === 'success' ? (
                                                <CheckCircleIcon className="w-4 h-4" />
                                            ) : log.type === 'warning' ? (
                                                <ExclamationTriangleIcon className="w-4 h-4" />
                                            ) : log.type === 'error' ? (
                                                <XCircleIcon className="w-4 h-4" />
                                            ) : (
                                                <BoltIcon className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-semibold text-slate-900">{log.title}</span>
                                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                                    <ClockIcon className="w-3 h-3" />
                                                    {log.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed">{log.detail}</p>
                                        </div>
                                    </div>
                                    {log.code && (
                                        <div className="px-4 pb-4">
                                            <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[11px] font-mono overflow-x-auto">
                                                {log.code}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Empty State */}
                            {conversationLogs.length === 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                                        <ClockIcon className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {interactionMode === 'interactive'
                                            ? 'Activity will appear as you interact'
                                            : 'No activity recorded yet'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animation Keyframes */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
