import React, { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    SignalIcon
} from '@heroicons/react/24/outline';
import WhatsAppChannel from './WhatsAppChannel';
import PhoneChannel from './PhoneChannel';

const Channels = () => {
    const [activeChannel, setActiveChannel] = useState('list'); // 'list', 'whatsapp', 'phone'

    if (activeChannel === 'whatsapp') {
        return <WhatsAppChannel onBack={() => setActiveChannel('list')} />;
    }

    if (activeChannel === 'phone') {
        return <PhoneChannel onBack={() => setActiveChannel('list')} />;
    }

    const channels = [
        { id: 'widget', name: 'Widget', icon: ChatBubbleLeftRightIcon, color: 'text-blue-500 bg-blue-50', status: 'Embedded in your plan', recommended: true, onClick: () => { } },
        { id: 'whatsapp', name: 'WhatsApp', icon: ChatBubbleLeftRightIcon, color: 'text-green-500 bg-green-50', status: 'Respond to WhatsApp messages and broadcast', recommended: true, onClick: () => setActiveChannel('whatsapp') },
        { id: 'phone', name: 'Phone', icon: PhoneIcon, color: 'text-green-500 bg-green-50', status: 'Make and accept calls directly', recommended: true, onClick: () => setActiveChannel('phone') },
        { id: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-red-500 bg-red-50', status: 'Included in your plan', recommended: false, onClick: () => { } },
        { id: 'instagram', name: 'Instagram', icon: DevicePhoneMobileIcon, color: 'text-pink-500 bg-pink-50', status: 'Respond to Instagram messages and stories', recommended: false, onClick: () => { } },
        { id: 'facebook', name: 'Facebook', icon: DevicePhoneMobileIcon, color: 'text-blue-600 bg-blue-50', status: 'Respond to Facebook messages without switching', recommended: false, onClick: () => { } },
        { id: 'slack', name: 'Slack', icon: ChatBubbleLeftRightIcon, color: 'text-purple-500 bg-purple-50', status: 'Collaborate directly from Slack channels', recommended: false, onClick: () => { } },
        { id: 'sms', name: 'SMS', icon: DevicePhoneMobileIcon, color: 'text-green-500 bg-green-50', status: 'Send and receive SMS messages', recommended: false, onClick: () => { } },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50 font-sans overflow-hidden">
            <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
                    <span className="font-semibold text-gray-900">Kira</span>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Every channel, one inbox</h1>
                        <p className="text-gray-600">Connect every messaging channel you use and respond to each from your team's one inbox.<br />Collaborate with teammates before and send replies and prioritize and resolve issues faster.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {channels.map((channel) => (
                            <div
                                key={channel.id}
                                onClick={channel.onClick}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${channel.color}`}>
                                        <channel.icon className="w-6 h-6" />
                                    </div>
                                    {channel.recommended && (
                                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">Recommended</span>
                                    )}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{channel.name}</h3>
                                <p className="text-sm text-gray-500">{channel.status}</p>
                                {channel.id === 'widget' && (
                                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Embedded in your plan
                                    </div>
                                )}
                                {channel.id === 'email' && (
                                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Embedded in your plan
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Channels;
