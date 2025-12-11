import { useState } from 'react';
import {
    FunnelIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    Squares2X2Icon,
    ChatBubbleLeftIcon,
    TagIcon,
    EllipsisHorizontalIcon,
    UserCircleIcon,
    ClockIcon,
    GlobeAltIcon,
    UsersIcon,
    UserPlusIcon,
    ArrowTrendingUpIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { contactsData } from '../../data/contactsData.ts';
import type { Contact } from '../../types/index.ts';

export default function Contacts() {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(contactsData.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId: number) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const filteredContacts = contactsData.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Stats
    const totalContacts = contactsData.length;
    const activeContacts = contactsData.filter(c => c.lastSeen.includes('hour') || c.lastSeen.includes('minute')).length;
    const newThisMonth = Math.floor(totalContacts * 0.3);

    const statsCards = [
        {
            label: 'Total Contacts',
            value: totalContacts,
            icon: UsersIcon,
            gradient: 'from-[#1D57D8] to-[#37CFFF]',
            bgColor: 'bg-blue-50',
            trend: '+18%'
        },
        {
            label: 'Active Today',
            value: activeContacts,
            icon: ArrowTrendingUpIcon,
            gradient: 'from-emerald-500 to-emerald-400',
            bgColor: 'bg-emerald-50',
            trend: '+12%'
        },
        {
            label: 'New This Month',
            value: newThisMonth,
            icon: UserPlusIcon,
            gradient: 'from-[#37CFFF] to-[#34DBAE]',
            bgColor: 'bg-cyan-50',
            trend: '+24%'
        },
        {
            label: 'Verified',
            value: Math.floor(totalContacts * 0.7),
            icon: CheckBadgeIcon,
            gradient: 'from-amber-500 to-amber-400',
            bgColor: 'bg-amber-50',
            trend: '+8%'
        }
    ];

    return (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Contacts</h1>
                        <p className="text-slate-500 text-sm">Manage your customer database and relationships</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <FunnelIcon className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] text-white rounded-xl hover:shadow-lg hover:shadow-[#37CFFF]/25 transition-all">
                            <PlusIcon className="w-4 h-4" />
                            Add Contact
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
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                                    <ArrowTrendingUpIcon className="w-3 h-3" />
                                    {card.trend}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
                            <div className="text-sm text-slate-500">{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Identity Verification Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-lg shadow-sm border border-blue-100">
                        <svg className="w-5 h-5 text-[#1D57D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-slate-600">
                            <span className="font-medium text-slate-900">Identity verification</span> — Enable to secure customer conversations and build trust.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-[#1D57D8] hover:bg-blue-50 hover:border-[#1D57D8]/30 transition-all shadow-sm">
                        Configure
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative">
                                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search contacts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1D57D8] focus:ring-2 focus:ring-[#1D57D8]/10 w-72 transition-all"
                                />
                            </div>
                            <span className="text-sm text-slate-500">
                                <span className="font-semibold text-slate-900">{filteredContacts.length}</span> contacts found
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {selectedUsers.length > 0 && (
                                <div className="flex items-center gap-2 mr-2 pr-3 border-r border-slate-200">
                                    <span className="text-xs font-medium text-[#1D57D8] bg-blue-50 px-2 py-1 rounded-full">{selectedUsers.length} selected</span>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200 transition-colors">
                                        <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                                        Message
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200 transition-colors">
                                        <TagIcon className="w-3.5 h-3.5" />
                                        Tag
                                    </button>
                                    <button className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
                                        <EllipsisHorizontalIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-[#1D57D8] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Bars3Icon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-[#1D57D8] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Squares2X2Icon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="w-12 px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 bg-white text-[#1D57D8] focus:ring-[#1D57D8]/25 focus:ring-offset-0"
                                            checked={selectedUsers.length === filteredContacts.length && filteredContacts.length > 0}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <UserCircleIcon className="w-4 h-4" />
                                            Name
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors">
                                            <ClockIcon className="w-4 h-4" />
                                            Last Active
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Channel</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">First Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sessions</th>
                                    <th className="w-12 px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredContacts.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`transition-colors ${selectedUsers.includes(user.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 bg-white text-[#1D57D8] focus:ring-[#1D57D8]/25 focus:ring-offset-0"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm text-white shrink-0 shadow-md"
                                                    style={{ background: `linear-gradient(135deg, ${user.avatar.bg}, ${user.avatar.bg}dd)` }}
                                                >
                                                    {user.avatar.initials}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500">{user.domain}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{user.lastSeen}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                                                user.channel === 'WhatsApp' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                                user.channel === 'Email' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                                                user.channel === 'Messenger' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' :
                                                'bg-cyan-50 text-cyan-600 border border-cyan-200'
                                            }`}>
                                                <GlobeAltIcon className="w-3 h-3" />
                                                {user.channel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 font-medium">
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{user.firstSeen}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-900">{user.webSessions}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                                <EllipsisHorizontalIcon className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-sm text-slate-500">
                            Showing <span className="font-medium text-slate-900">{filteredContacts.length}</span> of <span className="font-medium text-slate-900">{contactsData.length}</span> contacts
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                Previous
                            </button>
                            <button className="px-3 py-1.5 bg-[#1D57D8] rounded-lg text-sm text-white font-medium shadow-sm">
                                1
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                2
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
