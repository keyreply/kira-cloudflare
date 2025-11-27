import React from 'react';
import {
    ChatBubbleLeftRightIcon,
    ChartBarIcon,
    EyeIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export function Sidebar({ currentView, setCurrentView }) {
    return (
        <div className="w-16 bg-white flex flex-col items-center py-5 z-100 border-r border-slate-200 shadow-[1px_0_2px_rgba(0,0,0,0.02)]">
            <div
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-lg text-white mb-8 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                onClick={() => setCurrentView('conversations')}
            >
                K
            </div>

            <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer mb-2 transition-all duration-200 relative hover:bg-slate-100 hover:text-blue-500 ${currentView === 'conversations' ? 'bg-blue-100 text-blue-500' : ''}`}
                onClick={() => setCurrentView('conversations')}
            >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    7
                </div>
            </div>

            <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer mb-2 transition-all duration-200 relative hover:bg-slate-100 hover:text-blue-500 ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-500' : ''}`}
                onClick={() => setCurrentView('dashboard')}
            >
                <ChartBarIcon className="w-6 h-6" />
            </div>

            <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer mb-2 transition-all duration-200 relative hover:bg-slate-100 hover:text-blue-500 ${currentView === 'preview' ? 'bg-blue-100 text-blue-500' : ''}`}
                onClick={() => setCurrentView('preview')}
                title="Live Preview"
            >
                <EyeIcon className="w-6 h-6" />
            </div>

            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer mb-2 transition-all duration-200 relative hover:bg-slate-100 hover:text-blue-500">
                <Cog6ToothIcon className="w-6 h-6" />
            </div>
        </div>
    );
}
