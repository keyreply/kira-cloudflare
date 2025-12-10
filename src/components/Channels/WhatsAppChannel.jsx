import React, { useState } from 'react';
import { ArrowLeftIcon, BookOpenIcon, ArrowTopRightOnSquareIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const WhatsAppChannel = ({ onBack }) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [switchToWhatsApp, setSwitchToWhatsApp] = useState(false);

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50 font-sans relative">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">WhatsApp</h1>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                    <BookOpenIcon className="w-4 h-4" />
                    Learn
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Business Profile */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">Configure Business Profile</h3>
                        <p className="text-sm text-gray-600 mb-6">Set up your WhatsApp Business profile details that customers will see, including profile picture, contact information, and business description.</p>
                        <button
                            onClick={() => setShowProfileModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Configure Profile
                        </button>
                    </div>

                    {/* Message Templates */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-semibold text-gray-900">Message Templates</h3>
                            <a href="#" className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600">
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                Manage Templates
                            </a>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">WhatsApp requires pre-approved message templates to initiate or continue conversations after 24 hours of inactivity.</p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Learn more</a>
                    </div>

                    {/* Switch to WhatsApp */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Switching</h3>
                            <p className="text-sm text-gray-600">Allow customers who start conversations via web chat to continue on WhatsApp for a seamless mobile experience. <a href="#" className="text-blue-600 hover:underline">Learn more about contact types</a></p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-900 font-medium">Enable WhatsApp transition</span>
                            <button
                                onClick={() => setSwitchToWhatsApp(!switchToWhatsApp)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${switchToWhatsApp ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${switchToWhatsApp ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-lg text-gray-900">Business Profile Settings</h3>
                            <button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <p className="text-sm text-gray-600">Set up your WhatsApp Business profile information.</p>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Profile Picture</label>
                                <p className="text-xs text-gray-500 mb-3">Recommended: 640x640 pixels, maximum 63KB</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <CloudArrowUpIcon className="w-4 h-4" />
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Business Email</label>
                                <input type="email" placeholder="contact@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Business Address</label>
                                <input type="text" placeholder="123 Main Street, City, Country" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Business Description</label>
                                <textarea rows={3} placeholder="Describe your products or services" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setShowProfileModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">Cancel</button>
                            <button onClick={() => setShowProfileModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhatsAppChannel;
