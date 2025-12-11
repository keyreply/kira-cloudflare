import React, { useState } from 'react';
import {
    ChatBubbleOvalLeftEllipsisIcon,
    CodeBracketIcon,
    PaintBrushIcon,
    SwatchIcon,
    Cog6ToothIcon,
    ClipboardDocumentIcon,
    CheckIcon,
    EyeIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default function WidgetSettings() {
    const [brandColor, setBrandColor] = useState('#1D57D8');
    const [position, setPosition] = useState('bottom-right');
    const [copied, setCopied] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const installCode = `<script>
  window.KiraWidget = {
    appId: "app_123456789",
    color: "${brandColor}",
    position: "${position}"
  };
</script>
<script src="https://cdn.keyreply.com/widget.js" async></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(installCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] rounded-xl shadow-lg shadow-[#1D57D8]/20">
                                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Chat Widget</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Customize and install your website chat widget</p>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-[#1D57D8] text-white rounded-xl hover:bg-[#1D57D8]/90 transition-all shadow-lg shadow-[#1D57D8]/25 font-medium">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Settings Column */}
                    <div className="col-span-2 space-y-6">
                        {/* Appearance */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#1D57D8]/10 rounded-lg">
                                        <PaintBrushIcon className="w-5 h-5 text-[#1D57D8]" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900">Appearance</h3>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Brand Color</label>
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <input
                                                    type="color"
                                                    value={brandColor}
                                                    onChange={(e) => setBrandColor(e.target.value)}
                                                    className="w-12 h-12 p-1 rounded-xl cursor-pointer border border-slate-200"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={brandColor}
                                                onChange={(e) => setBrandColor(e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                                        <div className="flex gap-2">
                                            {[
                                                { id: 'bottom-right', label: 'Bottom Right' },
                                                { id: 'bottom-left', label: 'Bottom Left' }
                                            ].map(pos => (
                                                <button
                                                    key={pos.id}
                                                    onClick={() => setPosition(pos.id)}
                                                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                                                        position === pos.id
                                                            ? 'bg-[#1D57D8] text-white'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    {pos.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Welcome Message</label>
                                    <input
                                        type="text"
                                        defaultValue="Hi! How can I help you today?"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1D57D8]/20 focus:border-[#1D57D8]"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <SwatchIcon className="w-5 h-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Auto-detect theme</p>
                                            <p className="text-xs text-slate-500">Match user's system preferences</p>
                                        </div>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#1D57D8] transition-colors">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6 shadow-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Behavior */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <Cog6ToothIcon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900">Behavior</h3>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { label: 'Auto-open on first visit', description: 'Show chat window after 5 seconds', enabled: false },
                                    { label: 'Sound notifications', description: 'Play sound when new message arrives', enabled: true },
                                    { label: 'Show typing indicator', description: 'Display animation when agent is typing', enabled: true }
                                ].map((setting, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{setting.label}</p>
                                            <p className="text-xs text-slate-500">{setting.description}</p>
                                        </div>
                                        <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            setting.enabled ? 'bg-[#1D57D8]' : 'bg-slate-300'
                                        }`}>
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                                setting.enabled ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Installation */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <CodeBracketIcon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900">Installation</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-600 mb-4">
                                    Copy and paste this code before the closing <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">&lt;/body&gt;</code> tag of your website.
                                </p>
                                <div className="relative group">
                                    <pre className="bg-slate-900 text-slate-300 p-5 rounded-xl text-xs font-mono overflow-x-auto">
                                        {installCode}
                                    </pre>
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-all"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckIcon className="w-4 h-4 text-emerald-400" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardDocumentIcon className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Column */}
                    <div className="col-span-1">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-slate-700">Live Preview</span>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                                        <DevicePhoneMobileIcon className="w-4 h-4 text-slate-600" />
                                    </button>
                                    <button className="p-2 bg-[#1D57D8]/10 rounded-lg">
                                        <EyeIcon className="w-4 h-4 text-[#1D57D8]" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-slate-200 rounded-2xl border border-slate-300 h-[600px] relative overflow-hidden">
                                {/* Mock Website Background */}
                                <div className="absolute inset-0 bg-white">
                                    <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-6 bg-slate-200 rounded-full max-w-xs" />
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                                        <div className="h-4 bg-slate-100 rounded w-1/2" />
                                        <div className="h-4 bg-slate-100 rounded w-2/3" />
                                        <div className="h-32 bg-slate-50 rounded-xl border border-slate-200 mt-6" />
                                        <div className="h-4 bg-slate-100 rounded w-4/5" />
                                        <div className="h-4 bg-slate-100 rounded w-1/2" />
                                    </div>
                                </div>

                                {/* Chat Widget Preview */}
                                <div className={`absolute bottom-6 ${position === 'bottom-right' ? 'right-6' : 'left-6'}`}>
                                    {previewOpen ? (
                                        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4">
                                            {/* Widget Header */}
                                            <div className="p-4" style={{ backgroundColor: brandColor }}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-semibold text-sm">Kira Assistant</p>
                                                        <p className="text-white/70 text-xs">Online • Typically replies instantly</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Widget Body */}
                                            <div className="p-4 h-48 bg-slate-50">
                                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 max-w-[80%]">
                                                    <p className="text-sm text-slate-700">Hi! How can I help you today?</p>
                                                </div>
                                            </div>
                                            {/* Widget Input */}
                                            <div className="p-4 border-t border-slate-200">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Type a message..."
                                                        className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none"
                                                    />
                                                    <button
                                                        className="p-2 rounded-full text-white"
                                                        style={{ backgroundColor: brandColor }}
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setPreviewOpen(true)}
                                            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform"
                                            style={{ backgroundColor: brandColor }}
                                        >
                                            <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
                                        </button>
                                    )}
                                </div>

                                {/* Close button when preview is open */}
                                {previewOpen && (
                                    <button
                                        onClick={() => setPreviewOpen(false)}
                                        className={`absolute bottom-6 ${position === 'bottom-right' ? 'right-6' : 'left-6'} translate-y-[-340px] w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors`}
                                    >
                                        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-3 text-center">
                                Click the widget button to preview the chat window
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
