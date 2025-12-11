import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api';

const SMSChannel = ({ onBack }) => {
    const [accountSid, setAccountSid] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [fromNumber, setFromNumber] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState('idle');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await api.channels.list();
            const settings = data.channels?.sms || {};
            setIsEnabled(settings.isEnabled);
            if (settings.config?.accountSidMasked) {
                setAccountSid(settings.config.accountSidMasked);
                setAuthToken('********'); // Placeholder
                setFromNumber(settings.config.fromNumber || '');
                setStatus('verified');
            }
        } catch (error) {
            console.error('Failed to load SMS settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setStatus('checking');

            // Save to backend
            await api.channels.update('sms', {
                isEnabled,
                credentials: authToken.includes('*') ? undefined : { accountSid, authToken },
                config: {
                    accountSidMasked: accountSid.includes('*') ? accountSid : accountSid.slice(0, 6) + '****' + accountSid.slice(-4),
                    fromNumber,
                    provider: 'twilio'
                }
            });

            setStatus('verified');
        } catch (error) {
            console.error('Failed to save SMS settings:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
                    </button>
                    <h1 className="text-lg font-bold text-slate-900">SMS Configuration</h1>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Twilio Config */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Twilio Configuration</h2>
                                <p className="text-sm text-slate-500 mt-1">Connect your Twilio account to send and receive SMS messages.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-slate-700">Enable SMS</span>
                                <button
                                    onClick={() => setIsEnabled(!isEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Account SID</label>
                                <input
                                    type="text"
                                    value={accountSid}
                                    onChange={(e) => setAccountSid(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Auth Token</label>
                                <input
                                    type="password"
                                    value={authToken}
                                    onChange={(e) => setAuthToken(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">From Number / Sender ID</label>
                                <input
                                    type="text"
                                    value={fromNumber}
                                    onChange={(e) => setFromNumber(e.target.value)}
                                    placeholder="+1234567890"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {loading ? 'Saving...' : 'Save Configuration'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SMSChannel;
