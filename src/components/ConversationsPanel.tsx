import React from 'react';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronLeftIcon,
    ChatBubbleLeftEllipsisIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

// Channel icons mapping
const channelIcons = {
    'Messenger': ChatBubbleLeftEllipsisIcon,
    'Email': EnvelopeIcon,
    'Phone': PhoneIcon,
    'Web': GlobeAltIcon,
    'WhatsApp': ChatBubbleLeftEllipsisIcon
};

export function ConversationsPanel({
    allConversationData,
    selectedScenario,
    setSelectedScenario,
    interactionMode,
    setInteractionMode,
    isInboxOpen,
    setIsInboxOpen
}) {
    const [activeTab, setActiveTab] = React.useState('all');
    const [searchFocused, setSearchFocused] = React.useState(false);

    const filteredConversations = allConversationData.filter(item => {
        if (activeTab === 'unread') return item.unreadCount > 0;
        return true;
    });

    const unreadCount = allConversationData.filter(item => item.unreadCount > 0).length;

    return (
        <div className="w-[360px] bg-gradient-to-b from-white to-slate-50/50 border-r border-slate-200/80 flex flex-col h-full">
            {/* Header */}
            <div className="p-5 pb-4">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Inbox</h2>
                        <p className="text-xs text-slate-500 mt-0.5">{filteredConversations.length} conversations</p>
                    </div>
                    <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                        onClick={() => setIsInboxOpen(false)}
                        title="Collapse Inbox"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Search */}
                <div className={`relative mb-4 transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
                    <MagnifyingGlassIcon className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${searchFocused ? 'text-[#1D57D8]' : 'text-slate-400'}`} />
                    <input
                        type="text"
                        className="w-full py-2.5 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D57D8] focus:ring-4 focus:ring-[#1D57D8]/10 transition-all duration-200 placeholder:text-slate-400"
                        placeholder="Search conversations..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 p-1 bg-slate-100/80 rounded-xl flex-1">
                        <button
                            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                activeTab === 'all'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                            onClick={() => setActiveTab('all')}
                        >
                            All
                        </button>
                        <button
                            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                                activeTab === 'unread'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                            onClick={() => setActiveTab('unread')}
                        >
                            Unread
                            {unreadCount > 0 && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                                    activeTab === 'unread'
                                        ? 'bg-[#1D57D8] text-white'
                                        : 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                }`}>
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                    <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-[#1D57D8] hover:border-[#1D57D8]/30 hover:bg-[#1D57D8]/5 transition-all duration-200">
                        <FunnelIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-3 pb-3">
                <div className="space-y-1">
                    {filteredConversations.map((item, index) => {
                        const ChannelIcon = channelIcons[item.channel] || ChatBubbleLeftEllipsisIcon;
                        const isSelected = selectedScenario === index;

                        return (
                            <div
                                key={item.id}
                                className={`group p-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                                    isSelected
                                        ? 'bg-[#1D57D8]/5 border border-[#1D57D8]/20 shadow-sm'
                                        : 'hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/50'
                                }`}
                                onClick={() => setSelectedScenario(index)}
                            >
                                <div className="flex gap-3">
                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-semibold text-sm text-white shadow-md transition-transform duration-200 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                                            style={{
                                                background: item.avatar.bg,
                                                boxShadow: `0 4px 12px ${item.avatar.bg}40`
                                            }}
                                        >
                                            {item.avatar.initials}
                                        </div>
                                        {item.unreadCount > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-white shadow-sm">
                                                {item.unreadCount}
                                            </div>
                                        )}
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                                            item.status === 'open' || item.status === 'active'
                                                ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                                                : 'bg-slate-300'
                                        }`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`text-sm truncate pr-2 ${
                                                item.unreadCount > 0
                                                    ? 'font-bold text-slate-900'
                                                    : 'font-semibold text-slate-700'
                                            }`}>
                                                {item.name}
                                            </h3>
                                            <span className={`text-[11px] whitespace-nowrap ${
                                                item.unreadCount > 0 ? 'text-[#1D57D8] font-medium' : 'text-slate-400'
                                            }`}>
                                                {item.timeAgo}
                                            </span>
                                        </div>

                                        <p className={`text-[13px] truncate mb-2.5 leading-relaxed ${
                                            item.unreadCount > 0
                                                ? 'text-slate-600 font-medium'
                                                : 'text-slate-500'
                                        }`}>
                                            {item.preview}
                                        </p>

                                        {/* Meta Row */}
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${
                                                item.status === 'open' || item.status === 'active'
                                                    ? 'bg-[#1D57D8]/10 text-[#1D57D8]'
                                                    : item.status === 'resolved'
                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                        : item.status === 'pending'
                                                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                                            : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    item.status === 'open' || item.status === 'active'
                                                        ? 'bg-[#1D57D8]'
                                                        : item.status === 'resolved'
                                                            ? 'bg-emerald-500'
                                                            : item.status === 'pending'
                                                                ? 'bg-amber-500'
                                                                : 'bg-slate-400'
                                                }`} />
                                                {item.status || 'open'}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                                <ChannelIcon className="w-3.5 h-3.5" />
                                                {item.channel || 'Messenger'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hidden controls for interaction mode */}
            <div className="hidden">
                <button onClick={() => setInteractionMode('interactive')}>Interactive</button>
                <button onClick={() => setInteractionMode('static')}>Static</button>
            </div>
        </div>
    );
}
