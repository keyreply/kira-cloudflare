import { useState } from 'react';
import {
    Cog6ToothIcon,
    UserCircleIcon,
    BellIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    KeyIcon,
    GlobeAltIcon,
    PaintBrushIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

type SectionId = 'general' | 'profile' | 'notifications' | 'security' | 'billing';

interface Section {
    id: SectionId;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
}

const SECTIONS: Section[] = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon, description: 'Basic organization settings' },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon, description: 'Your personal information' },
    { id: 'notifications', label: 'Notifications', icon: BellIcon, description: 'Manage your alerts' },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon, description: 'Authentication & access' },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon, description: 'Subscription & payments' },
];

export default function Settings() {
    const [activeSection, setActiveSection] = useState<SectionId>('general');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-white mb-6">Organization Settings</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Organization Name</label>
                                    <input
                                        type="text"
                                        className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        defaultValue="Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Timezone</label>
                                    <select className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all">
                                        <option value="utc">UTC (GMT+00:00)</option>
                                        <option value="pst">Pacific Time (GMT-08:00)</option>
                                        <option value="est">Eastern Time (GMT-05:00)</option>
                                        <option value="sgt">Singapore Time (GMT+08:00)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Language</label>
                                    <select className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="zh">Chinese</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#37CFFF]/20 rounded-xl">
                                    <PaintBrushIcon className="w-5 h-5 text-[#37CFFF]" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Appearance</h2>
                                    <p className="text-sm text-slate-500">Customize the look and feel</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-white">Dark Mode</span>
                                        <p className="text-xs text-slate-500">Use dark theme throughout the app</p>
                                    </div>
                                    <button className="w-12 h-6 bg-[#1D57D8] rounded-full relative">
                                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-white">Compact View</span>
                                        <p className="text-xs text-slate-500">Show more items with less spacing</p>
                                    </div>
                                    <button className="w-12 h-6 bg-[#2b303d] rounded-full relative">
                                        <span className="absolute left-1 top-1 w-4 h-4 bg-[#a2a5ad] rounded-full shadow" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Profile Settings</h2>
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                JD
                            </div>
                            <div className="flex-1">
                                <button className="px-4 py-2 bg-[#2b303d] border border-slate-200 text-white rounded-xl text-sm hover:bg-slate-200 transition-all">
                                    Change Photo
                                </button>
                                <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        defaultValue="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        defaultValue="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                    defaultValue="john.doe@acmecorp.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-slate-500"
                                    defaultValue="Administrator"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Email Notifications', description: 'Receive updates via email', enabled: true },
                                { label: 'Push Notifications', description: 'Get browser notifications', enabled: true },
                                { label: 'Campaign Alerts', description: 'Notify when campaigns complete', enabled: true },
                                { label: 'Weekly Digest', description: 'Summary of weekly activity', enabled: false },
                                { label: 'Marketing Updates', description: 'News about new features', enabled: false },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-white">{item.label}</span>
                                        <p className="text-xs text-slate-500">{item.description}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-[#1D57D8]' : 'bg-[#2b303d]'}`}>
                                        <span className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all ${item.enabled ? 'right-1 bg-white' : 'left-1 bg-[#a2a5ad]'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-500/20 rounded-xl">
                                    <KeyIcon className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Password</h2>
                                    <p className="text-sm text-slate-500">Update your password regularly</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl text-white placeholder-[#565856] focus:outline-none focus:border-[#37CFFF]/50 focus:ring-1 focus:ring-[#37CFFF]/25 transition-all"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/20 rounded-xl">
                                    <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Two-Factor Authentication</h2>
                                    <p className="text-sm text-slate-500">Add an extra layer of security</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                <div>
                                    <span className="text-sm font-medium text-white">Enable 2FA</span>
                                    <p className="text-xs text-slate-500">Use authenticator app for login</p>
                                </div>
                                <button className="px-4 py-2 bg-[#1D57D8] text-white rounded-xl text-sm hover:bg-[#37CFFF] transition-all shadow-lg shadow-[#37CFFF]/25">
                                    Enable
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-500/20 rounded-xl">
                                    <GlobeAltIcon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Active Sessions</h2>
                                    <p className="text-sm text-slate-500">Manage your logged-in devices</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                            <span className="text-emerald-400 text-lg">💻</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-white">MacBook Pro - Chrome</span>
                                            <p className="text-xs text-slate-500">Singapore • Current session</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-[#1D57D8]/20 to-[#37CFFF]/20 backdrop-blur-sm rounded-2xl border border-[#37CFFF]/30 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-xs text-[#37CFFF] font-medium">CURRENT PLAN</span>
                                    <h2 className="text-2xl font-bold text-white">Pro Plan</h2>
                                </div>
                                <span className="px-3 py-1 bg-[#37CFFF]/20 text-[#37CFFF] rounded-full text-sm font-medium">
                                    $99/month
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">Access to all features, unlimited campaigns, priority support.</p>
                            <button className="px-4 py-2 bg-white/50 border border-slate-200 text-white rounded-xl text-sm hover:bg-slate-200 transition-all">
                                Upgrade Plan
                            </button>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-white mb-6">Payment Method</h2>
                            <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        VISA
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-white">•••• •••• •••• 4242</span>
                                        <p className="text-xs text-slate-500">Expires 12/25</p>
                                    </div>
                                </div>
                                <button className="text-sm text-[#37CFFF] hover:text-[#37CFFF] transition-colors">
                                    Update
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-white mb-6">Billing History</h2>
                            <div className="space-y-3">
                                {[
                                    { date: 'Dec 1, 2024', amount: '$99.00', status: 'Paid' },
                                    { date: 'Nov 1, 2024', amount: '$99.00', status: 'Paid' },
                                    { date: 'Oct 1, 2024', amount: '$99.00', status: 'Paid' },
                                ].map((invoice, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl">
                                        <div>
                                            <span className="text-sm font-medium text-white">{invoice.date}</span>
                                            <p className="text-xs text-slate-500">Pro Plan - Monthly</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-white">{invoice.amount}</span>
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                                                {invoice.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-[#111722] to-[#111722] overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your account and organization preferences</p>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-64 shrink-0">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden">
                            {SECTIONS.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                        activeSection === section.id
                                            ? 'bg-[#37CFFF]/20 text-white border-l-4 border-[#37CFFF]'
                                            : 'text-slate-500 hover:bg-slate-200/30 hover:text-white border-l-4 border-transparent'
                                    }`}
                                >
                                    <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-[#37CFFF]' : ''}`} />
                                    <div>
                                        <span className="text-sm font-medium">{section.label}</span>
                                        <p className="text-xs text-slate-500 hidden">{section.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {renderContent()}

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleSave}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                                    saved
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-[#1D57D8] to-[#37CFFF] text-white hover:from-[#37CFFF] hover:to-[#37CFFF] shadow-lg shadow-[#37CFFF]/25'
                                }`}
                            >
                                {saved ? (
                                    <>
                                        <CheckIcon className="w-4 h-4" />
                                        Saved
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
