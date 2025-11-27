import React from 'react';
import { PlayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export function ConversationsPanel({
    allConversationData,
    selectedScenario,
    setSelectedScenario,
    interactionMode,
    setInteractionMode
}) {
    return (
        <div className="w-[340px] bg-white border-r border-slate-200 flex flex-col">
            <div className="p-5 border-b border-slate-200">
                <div className="text-xl font-bold mb-4">7 Complete Journeys</div>
                <div className="relative mb-3">
                    <input
                        type="text"
                        className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex gap-2 p-2 bg-slate-50 rounded-lg">
                    <button
                        className={`flex-1 py-1.5 px-3 bg-transparent border border-transparent rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 text-center text-slate-500 flex items-center justify-center gap-1.5 ${interactionMode === 'interactive' ? 'bg-white border-blue-500 text-blue-500 shadow-sm' : ''}`}
                        onClick={() => setInteractionMode('interactive')}
                    >
                        <PlayIcon className="w-3.5 h-3.5" />
                        Interactive
                    </button>
                    <button
                        className={`flex-1 py-1.5 px-3 bg-transparent border border-transparent rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 text-center text-slate-500 flex items-center justify-center gap-1.5 ${interactionMode === 'static' ? 'bg-white border-blue-500 text-blue-500 shadow-sm' : ''}`}
                        onClick={() => setInteractionMode('static')}
                    >
                        <DocumentTextIcon className="w-3.5 h-3.5" />
                        Static View
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="py-3 px-5 bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500 border-b border-slate-200">
                    Day 0 → Post-Event Campaign
                </div>

                {allConversationData.map((item, index) => (
                    <div
                        key={item.id}
                        className={`p-4 px-5 border-b border-slate-200 cursor-pointer transition-colors duration-150 flex gap-3 hover:bg-slate-50 ${selectedScenario === index ? 'bg-slate-50 border-l-[3px] border-l-blue-500' : ''}`}
                        onClick={() => setSelectedScenario(index)}
                    >
                        <div
                            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-semibold text-[15px] text-white"
                            style={{ background: item.avatar.bg }}
                        >
                            {item.avatar.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-sm font-semibold truncate">{item.name}</div>
                            </div>
                            <div className="text-[13px] text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap mb-1">
                                {item.preview}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-xs py-0.5 px-1.5 bg-slate-100 rounded text-slate-500 font-medium">
                                    Day {item.day}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
