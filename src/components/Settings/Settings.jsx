import React from 'react';
import { Cog6ToothIcon, UserCircleIcon, BellIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const SECTIONS = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon },
];

export default function Settings() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your account and organization preferences</p>
            </div>

            <div className="flex gap-8">
                {/* Sidebar Navigation */}
                <div className="w-64 shrink-0">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {SECTIONS.map(section => (
                            <button
                                key={section.id}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors
                                    ${section.id === 'general' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                            >
                                <section.icon className="w-5 h-5" />
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* General Settings */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">General Settings</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
                                <input type="text" className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="Acme Corp" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                                <select className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                    <option>UTC (GMT+00:00)</option>
                                    <option>Pacific Time (GMT-08:00)</option>
                                    <option>Eastern Time (GMT-05:00)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
