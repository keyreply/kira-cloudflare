import React from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, CodeBracketIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

export default function WidgetSettings() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Chat Widget</h1>
                    <p className="text-slate-500">Customize and install your website chat widget</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Settings Column */}
                <div className="col-span-2 space-y-6">
                    {/* Appearance */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <PaintBrushIcon className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-slate-900">Appearance</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Brand Color</label>
                                <div className="flex items-center gap-2">
                                    <input type="color" className="h-9 w-16 p-0 border rounded cursor-pointer" defaultValue="#2563EB" />
                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="#2563EB" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                    <option>Bottom Right</option>
                                    <option>Bottom Left</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Installation */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                <CodeBracketIcon className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-slate-900">Installation</h3>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Copy and paste this code before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-600 border border-slate-200 relative group">
                            <pre>{`<script>
  window.KiraWidget = {
    appId: "app_123456789",
    color: "#2563EB"
  };
</script>
<script src="https://cdn.ppp-academy.com/widget.js" async></script>`}</pre>
                            <button className="absolute top-2 right-2 px-2 py-1 bg-white border border-slate-200 rounded text-xs hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                Copy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Column */}
                <div className="col-span-1">
                    <div className="sticky top-6">
                        <div className="text-sm font-medium text-slate-500 mb-2">Live Preview</div>
                        <div className="bg-slate-100 rounded-2xl border border-slate-200 h-[600px] relative overflow-hidden flex items-end justify-end p-6">
                            {/* Mock Website Background */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            {/* Mock Widget */}
                            <div className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
                                <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
                            </div>

                            {/* Mock Open Widget (Hidden for simple preview, or toggleable) */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
