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
import EmailChannel from './EmailChannel';
import SMSChannel from './SMSChannel';

const Channels = () => {
    const [activeChannel, setActiveChannel] = useState('list'); // 'list', 'whatsapp', 'phone', 'email', 'sms'

    if (activeChannel === 'whatsapp') return <WhatsAppChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'phone') return <PhoneChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'email') return <EmailChannel onBack={() => setActiveChannel('list')} />;
    if (activeChannel === 'sms') return <SMSChannel onBack={() => setActiveChannel('list')} />;

    const channels = [
        { id: 'widget', name: 'Chat Widget', icon: ChatBubbleLeftRightIcon, color: 'text-blue-500 bg-blue-50', status: 'Included in your plan', recommended: true, onClick: () => { } },
        { id: 'whatsapp', name: 'WhatsApp', icon: ChatBubbleLeftRightIcon, color: 'text-green-500 bg-green-50', status: 'Send and receive WhatsApp messages', recommended: true, onClick: () => setActiveChannel('whatsapp') },
        { id: 'phone', name: 'Phone', icon: PhoneIcon, color: 'text-green-500 bg-green-50', status: 'Make and receive phone calls', recommended: true, onClick: () => setActiveChannel('phone') },
        { id: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-red-500 bg-red-50', status: 'Transactional emails via Resend', recommended: false, onClick: () => setActiveChannel('email') },
        { id: 'sms', name: 'SMS', icon: DevicePhoneMobileIcon, color: 'text-green-500 bg-green-50', status: 'Send and receive text messages', recommended: false, onClick: () => setActiveChannel('sms') },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto h-full font-sans">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Channels</h1>
                <p className="text-slate-500">Connect and manage your communication channels</p>
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
                                Active
                            </div>
                        )}
                        {channel.id === 'email' && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Active
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channels;
