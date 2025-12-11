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
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Organization Settings</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Organization Name</label>
                                    <input
                                        type="text"
                                        className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        defaultValue="Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Timezone</label>
                                    <select className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all">
                                        <option value="utc">UTC (GMT+00:00)</option>
                                        <option value="pst">Pacific Time (GMT-08:00)</option>
                                        <option value="est">Eastern Time (GMT-05:00)</option>
                                        <option value="sgt">Singapore Time (GMT+08:00)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Language</label>
                                    <select className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="zh">Chinese</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-50 rounded-xl">
                                    <PaintBrushIcon className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Appearance</h2>
                                    <p className="text-sm text-slate-500">Customize the look and feel</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                                        <p className="text-xs text-slate-500">Use dark theme throughout the app</p>
                                    </div>
                                    <button className="w-12 h-6 bg-indigo-500 rounded-full relative transition-colors">
                                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">Compact View</span>
                                        <p className="text-xs text-slate-500">Show more items with less spacing</p>
                                    </div>
                                    <button className="w-12 h-6 bg-slate-200 rounded-full relative transition-colors">
                                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6">Profile Settings</h2>
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                JD
                            </div>
                            <div className="flex-1">
                                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm hover:bg-slate-50 transition-all">
                                    Change Photo
                                </button>
                                <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        defaultValue="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        defaultValue="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    defaultValue="john.doe@acmecorp.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                                    defaultValue="Administrator"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6">Notification Preferences</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Email Notifications', description: 'Receive updates via email', enabled: true },
                                { label: 'Push Notifications', description: 'Get browser notifications', enabled: true },
                                { label: 'Campaign Alerts', description: 'Notify when campaigns complete', enabled: true },
                                { label: 'Weekly Digest', description: 'Summary of weekly activity', enabled: false },
                                { label: 'Marketing Updates', description: 'News about new features', enabled: false },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                        <p className="text-xs text-slate-500">{item.description}</p>
                                    </div>
                                    <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                                        <span className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all ${item.enabled ? 'right-1 bg-white' : 'left-1 bg-white'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-50 rounded-xl">
                                    <KeyIcon className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Password</h2>
                                    <p className="text-sm text-slate-500">Update your password regularly</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full max-w-md px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 rounded-xl">
                                    <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Two-Factor Authentication</h2>
                                    <p className="text-sm text-slate-500">Add an extra layer of security</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Enable 2FA</span>
                                    <p className="text-xs text-slate-500">Use authenticator app for login</p>
                                </div>
                                <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm hover:bg-indigo-600 transition-all shadow-sm">
                                    Enable
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <GlobeAltIcon className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Active Sessions</h2>
                                    <p className="text-sm text-slate-500">Manage your logged-in devices</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                            <span className="text-emerald-500 text-lg">💻</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-slate-700">MacBook Pro - Chrome</span>
                                            <p className="text-xs text-slate-500">Singapore • Current session</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-xs text-indigo-100 font-medium">CURRENT PLAN</span>
                                    <h2 className="text-2xl font-bold text-white">Pro Plan</h2>
                                </div>
                                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                                    $99/month
                                </span>
                            </div>
                            <p className="text-sm text-indigo-100 mb-4">Access to all features, unlimited campaigns, priority support.</p>
                            <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-50 transition-all">
                                Upgrade Plan
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Payment Method</h2>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        VISA
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">•••• •••• •••• 4242</span>
                                        <p className="text-xs text-slate-500">Expires 12/25</p>
                                    </div>
                                </div>
                                <button className="text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                                    Update
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Billing History</h2>
                            <div className="space-y-3">
                                {[
                                    { date: 'Dec 1, 2024', amount: '$99.00', status: 'Paid' },
                                    { date: 'Nov 1, 2024', amount: '$99.00', status: 'Paid' },
                                    { date: 'Oct 1, 2024', amount: '$99.00', status: 'Paid' },
                                ].map((invoice, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <span className="text-sm font-medium text-slate-700">{invoice.date}</span>
                                            <p className="text-xs text-slate-500">Pro Plan - Monthly</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-slate-700">{invoice.amount}</span>
                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
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
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your account and organization preferences</p>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-64 shrink-0">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            {SECTIONS.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                        activeSection === section.id
                                            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-l-4 border-transparent'
                                    }`}
                                >
                                    <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                                    <span className="text-sm font-medium">{section.label}</span>
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
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm'
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
