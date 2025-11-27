import React from 'react';

export function Preview({
    previewMessages,
    previewMode,
    setPreviewMode,
    kiraInput,
    setKiraInput,
    userReply,
    setUserReply,
    handleKiraSend,
    handleUserSend
}) {
    return (
        <div className="flex-1 flex bg-slate-100">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-800">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                <div>
                                    <div className="font-semibold text-sm">Kira AI</div>
                                    <div className="text-xs opacity-90">Active now</div>
                                </div>
                            </div>
                            <div className="text-xl">💬</div>
                        </div>
                    </div>

                    <div className="h-[500px] overflow-y-auto p-4 bg-slate-50">
                        {previewMessages.map((msg, index) => (
                            <div key={index} className={`flex gap-2 mb-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.sender === 'kira'
                                        ? 'bg-white text-slate-800 rounded-tl-none'
                                        : 'bg-blue-500 text-white rounded-tr-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 bg-white border-t border-slate-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 p-2.5 px-4 bg-slate-100 border-none rounded-full text-sm outline-none"
                                placeholder="Type a message..."
                                value={previewMode === 'user' ? userReply : ''}
                                onChange={(e) => setUserReply(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && previewMode === 'user') {
                                        handleUserSend();
                                    }
                                }}
                                disabled={previewMode !== 'user'}
                            />
                            <button
                                className="w-10 h-10 bg-blue-500 border-none rounded-full text-white cursor-pointer transition-all duration-150 hover:bg-blue-600 disabled:bg-slate-300"
                                onClick={previewMode === 'user' ? handleUserSend : null}
                                disabled={previewMode !== 'user' || !userReply.trim()}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[400px] bg-white border-l border-slate-200 p-6">
                <h3 className="text-xl font-bold mb-6">Kira Admin Panel</h3>

                <div className="mb-6">
                    <div className="text-sm font-semibold mb-3">Control Mode</div>
                    <div className="flex gap-2">
                        <button
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-150 ${previewMode === 'kira'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            onClick={() => setPreviewMode('kira')}
                        >
                            🤖 Kira Mode
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-150 ${previewMode === 'user'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            onClick={() => setPreviewMode('user')}
                        >
                            👤 User Mode
                        </button>
                    </div>
                </div>

                {previewMode === 'kira' && (
                    <div className="mb-6">
                        <div className="text-sm font-semibold mb-3">Send as Kira</div>
                        <textarea
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none outline-none focus:border-blue-500"
                            placeholder="Type Kira's message..."
                            rows="4"
                            value={kiraInput}
                            onChange={(e) => setKiraInput(e.target.value)}
                        />
                        <button
                            className="w-full mt-2 py-2.5 px-4 bg-blue-500 border-none rounded-lg text-white font-medium cursor-pointer transition-all duration-150 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
                            onClick={handleKiraSend}
                            disabled={!kiraInput.trim()}
                        >
                            Send as Kira
                        </button>
                    </div>
                )}

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-semibold text-blue-800 mb-2">💡 Live Preview Mode</div>
                    <div className="text-xs text-blue-600 leading-relaxed">
                        This simulates a real conversation. Switch between Kira (AI) and User modes to test the full interaction flow.
                    </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <div className="text-sm font-semibold mb-3">Conversation Stats</div>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Total Messages</span>
                            <span className="font-semibold">{previewMessages.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Kira Messages</span>
                            <span className="font-semibold">{previewMessages.filter(m => m.sender === 'kira').length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">User Messages</span>
                            <span className="font-semibold">{previewMessages.filter(m => m.sender === 'user').length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
