
import React, { useState } from 'react';
import {
    BookOpenIcon,
    XMarkIcon,
    PencilIcon,
    ChevronDownIcon,
    CheckIcon,
    SwatchIcon,
    ChatBubbleBottomCenterTextIcon,
    GlobeAltIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

const EditBrand = ({ brand, onCancel, onSave, onDelete }) => {
    const [formData, setFormData] = useState(brand);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(formData.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-white">{brand.isNew ? 'New brand' : 'Edit brand'}</h1>
                <div className="flex items-center gap-3">
                    {!brand.isNew && onDelete && (
                        <button
                            onClick={onDelete}
                            className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors mr-2"
                        >
                            Delete
                        </button>
                    )}
                    <button className="text-slate-600 hover:text-slate-500 font-medium text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors">
                        <BookOpenIcon className="w-4 h-4" />
                        Learn
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-white rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        disabled={!formData.name}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${formData.name ? 'bg-slate-900 hover:bg-white' : 'bg-[#565856] cursor-not-allowed'
                            }`}
                    >
                        Save
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Brand Name */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-white mb-1">Brand name</h3>
                        <p className="text-sm text-slate-500 mb-4">Choose a name for this brand. Brand names are visible to customers.</p>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Acme Corp"
                            className="w-full bg-white border-transparent rounded-lg px-4 py-2.5 text-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                    {/* Brand ID */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-white mb-1">Brand ID</h3>
                        <p className="text-sm text-slate-500 mb-4">A unique identifier for this brand, used in APIs and with customer support.</p>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-white rounded-lg px-4 py-2.5 text-white font-mono text-sm border border-slate-200">
                                {formData.id}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-white transition-colors min-w-[80px] flex items-center justify-center"
                            >
                                {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : 'Copy'}
                            </button>
                        </div>
                    </div>

                    {/* Brand Appearance */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <SwatchIcon className="w-5 h-5 text-slate-500" />
                            <h3 className="font-bold text-white">Brand Appearance</h3>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Customize how your brand appears to customers. Upload your logo and set a primary color to match your brand identity.</p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Brand Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={formData.brandColor || '#2563EB'}
                                        onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-1"
                                    />
                                    <span className="text-sm text-slate-500 font-mono">{formData.brandColor || '#2563EB'}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Logo</label>
                                <div className="flex items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-white transition-colors">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-8 w-8 text-slate-500" />
                                        <span className="mt-2 block text-xs font-medium text-slate-500">Upload Logo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Persona */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-slate-500" />
                            <h3 className="font-bold text-white">AI Persona</h3>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Define the personality and behavior of your AI agent. Choose a tone of voice and provide specific instructions to guide its responses.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Tone of Voice</label>
                                <div className="relative">
                                    <select
                                        value={formData.tone || 'Professional'}
                                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                        className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        <option>Professional</option>
                                        <option>Friendly & Casual</option>
                                        <option>Empathetic</option>
                                        <option>Technical & Concise</option>
                                    </select>
                                    <ChevronDownIcon className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Custom Instructions</label>
                                <textarea
                                    value={formData.instructions || ''}
                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                    placeholder="e.g. Always ask for the Order ID first. Never promise refunds without checking policy."
                                    rows={3}
                                    className="w-full bg-white border-transparent rounded-lg px-4 py-2.5 text-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Targeting Rules */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <GlobeAltIcon className="w-5 h-5 text-slate-500" />
                            <h3 className="font-bold text-white">Targeting</h3>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Control where and to whom this brand is displayed. Set specific URL rules and audience segments.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Target URL</label>
                                <input
                                    type="text"
                                    value={formData.targetUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                                    placeholder="e.g. example.com/support/*"
                                    className="w-full bg-white border-transparent rounded-lg px-4 py-2.5 text-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Audience</label>
                                <div className="relative">
                                    <select
                                        value={formData.audience || 'All Visitors'}
                                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                        className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        <option>All Visitors</option>
                                        <option>Logged-in Users</option>
                                        <option>VIP Customers</option>
                                        <option>New Users</option>
                                    </select>
                                    <ChevronDownIcon className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Default Address */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-white mb-1">Default address</h3>
                        <p className="text-sm text-slate-500 mb-4">Notifications, workflow messages, and other automatic emails for this brand will use this address.</p>

                        <input
                            type="email"
                            value={formData.defaultAddress || ''}
                            onChange={(e) => setFormData({ ...formData, defaultAddress: e.target.value })}
                            placeholder="support@company.com"
                            className="w-full bg-white border-transparent rounded-lg px-4 py-2.5 text-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default EditBrand;
