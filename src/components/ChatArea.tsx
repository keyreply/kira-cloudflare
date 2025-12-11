import React, { useEffect, useRef } from 'react';
import {
    ArrowPathIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    ListBulletIcon,
    ViewColumnsIcon,
    PaperClipIcon,
    FaceSmileIcon
} from '@heroicons/react/24/outline';
import { ZoomLink } from './ZoomLink';
import VoiceMessage from './VoiceMessage';

export function ChatArea({
    scenario,
    interactionMode,
    handleReset,
    messagesToShow,
    isTyping,
    handleOptionClick,
    showInputBox,
    userInput,
    setUserInput,
    handleSendMessage,
    isInboxOpen,
    setIsInboxOpen,
    isRightPanelOpen,
    setIsRightPanelOpen
}) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagesToShow, isTyping]);

    const renderMessageContent = (content) => {
        if (content.includes('[Link]')) {
            const parts = content.split('[Link]');
            return (
                <>
                    {parts[0]}
                    <ZoomLink eventTitle={scenario.title.includes('Momentum Clinic') ? 'Final Sprint Momentum Clinic' :
                        scenario.title.includes('Downsell') ? 'Clarity Call' :
                            'Strategy Session'} />
                    {parts[1]}
                </>
            );
        }

        if (content.includes('[Agenda Link]')) {
            const parts = content.split('[Agenda Link]');
            return (
                <>
                    {parts[0]}
                    <a
                        href="https://docs.google.com/document/d/example-agenda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1D57D8] hover:text-[#1D57D8]/80 underline underline-offset-2 font-medium"
                    >
                        Event Agenda
                    </a>
                    {parts[1]}
                </>
            );
        }

        return content;
    };

    return (
        <div className="flex-1 flex flex-col bg-slate-50/50 min-w-0">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200/80 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {!isInboxOpen && (
                            <button
                                className="mr-2 py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#1D57D8] hover:border-[#1D57D8]/30 hover:bg-[#1D57D8]/5 transition-all duration-200 flex items-center gap-2"
                                onClick={() => setIsInboxOpen(true)}
                                title="Expand Inbox"
                            >
                                <ListBulletIcon className="w-4 h-4" />
                                <span className="text-[13px] font-medium">Inbox</span>
                            </button>
                        )}
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm text-white shadow-lg"
                                style={{
                                    background: scenario.avatar.bg,
                                    boxShadow: `0 4px 14px ${scenario.avatar.bg}50`
                                }}
                            >
                                {scenario.avatar.initials}
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-slate-900">{scenario.name}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-slate-500">Online now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {interactionMode === 'interactive' && (
                            <button
                                className="py-2 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 text-[13px] font-medium hover:text-[#1D57D8] hover:border-[#1D57D8]/30 hover:bg-[#1D57D8]/5 transition-all duration-200 flex items-center gap-2"
                                onClick={handleReset}
                            >
                                <ArrowPathIcon className="w-4 h-4" />
                                Reset
                            </button>
                        )}
                        {!isRightPanelOpen && (
                            <button
                                className="py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-[#1D57D8] hover:border-[#1D57D8]/30 hover:bg-[#1D57D8]/5 transition-all duration-200"
                                onClick={() => setIsRightPanelOpen(true)}
                                title="Show Details"
                            >
                                <ViewColumnsIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messagesToShow && messagesToShow.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 animate-[fadeSlideIn_0.3s_ease-out] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center font-semibold text-xs shadow-md ${
                                message.type === 'kira'
                                    ? 'bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] text-white'
                                    : message.type === 'user'
                                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white'
                                        : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700'
                            }`}
                                style={message.type !== 'kira' && message.type !== 'system' ? {
                                    background: scenario.avatar.bg,
                                    boxShadow: `0 2px 8px ${scenario.avatar.bg}40`
                                } : {}}
                            >
                                {message.type === 'kira' ? 'K' : message.type === 'system' ? 'S' : scenario.avatar.initials}
                            </div>

                            {/* Message Bubble */}
                            <div className={`max-w-[70%] ${message.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    message.type === 'kira'
                                        ? 'bg-white border border-slate-200/80 text-slate-700 rounded-tl-sm'
                                        : message.type === 'user'
                                            ? 'bg-gradient-to-br from-[#1D57D8] to-[#1D57D8]/90 text-white rounded-tr-sm shadow-lg shadow-[#1D57D8]/20'
                                            : 'bg-amber-50 border border-amber-200 text-amber-800 text-[13px] italic'
                                }`}>
                                    {renderMessageContent(message.content)}
                                    {message.hasVoice && <VoiceMessage {...message.voiceContent} />}
                                </div>
                                <div className={`text-[11px] text-slate-400 mt-1.5 px-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                                    {message.timestamp || message.time}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3 animate-[fadeSlideIn_0.3s_ease-out]">
                            <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center font-semibold text-xs bg-gradient-to-br from-[#1D57D8] to-[#37CFFF] text-white shadow-md">
                                K
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Response Options */}
                    {interactionMode === 'interactive' &&
                        messagesToShow.length > 0 &&
                        !isTyping &&
                        messagesToShow[messagesToShow.length - 1].options && (
                            <div className="mt-6 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm animate-[fadeSlideIn_0.3s_ease-out]">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                    <div className="p-1.5 bg-[#1D57D8]/10 rounded-lg">
                                        <SparklesIcon className="w-4 h-4 text-[#1D57D8]" />
                                    </div>
                                    <span className="font-medium">Select a response</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {messagesToShow[messagesToShow.length - 1].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`group p-3.5 px-4 bg-white border-2 rounded-xl text-left text-[13px] cursor-pointer transition-all duration-200 font-medium hover:translate-x-1 ${
                                                option.type === 'positive'
                                                    ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700'
                                                    : option.type === 'negative'
                                                        ? 'border-amber-200 bg-amber-50/50 hover:border-amber-400 hover:bg-amber-50 text-amber-700'
                                                        : 'border-slate-200 hover:border-[#1D57D8]/30 hover:bg-[#1D57D8]/5 text-slate-700'
                                            }`}
                                            onClick={() => handleOptionClick(option.text)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                                                    option.type === 'positive'
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : option.type === 'negative'
                                                            ? 'bg-amber-100 text-amber-600'
                                                            : 'bg-slate-100 text-slate-500 group-hover:bg-[#1D57D8]/10 group-hover:text-[#1D57D8]'
                                                }`}>
                                                    {idx + 1}
                                                </span>
                                                <span>{option.text}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            {showInputBox && (
                <div className="px-6 py-4 bg-white border-t border-slate-200/80">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex gap-3 items-end">
                            <button className="p-2.5 text-slate-400 hover:text-[#1D57D8] hover:bg-[#1D57D8]/5 transition-all duration-200 rounded-xl">
                                <PaperClipIcon className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <textarea
                                    className="w-full p-3.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm resize-none outline-none min-h-[48px] max-h-[120px] focus:border-[#1D57D8] focus:bg-white focus:ring-4 focus:ring-[#1D57D8]/10 transition-all duration-200 placeholder:text-slate-400"
                                    placeholder="Type a message..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button className="absolute right-3 bottom-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                                    <FaceSmileIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                className="w-12 h-12 bg-gradient-to-br from-[#1D57D8] to-[#1D57D8]/90 border-none rounded-xl text-white cursor-pointer transition-all duration-200 shrink-0 hover:shadow-lg hover:shadow-[#1D57D8]/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center"
                                onClick={handleSendMessage}
                                disabled={!userInput.trim()}
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-2 px-1">
                            <span className="text-[11px] text-slate-400">Press Enter to send, Shift+Enter for new line</span>
                            <span className="text-[11px] text-slate-400">{userInput.length}/1000</span>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animation Keyframes */}
            <style>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
