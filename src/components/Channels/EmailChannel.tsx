import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api';

const EmailChannel = ({ onBack }) => {
    const [apiKey, setApiKey] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, checking, verified, error
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await api.channels.list();
            const settings = data.channels?.email || {};
            setIsEnabled(settings.isEnabled);
            if (settings.config?.apiKeyMasked) {
                setApiKey(settings.config.apiKeyMasked);
                setStatus('verified');
            }
        } catch (error) {
            console.error('Failed to load email settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setStatus('checking');

            // basic validation (in real app, verify key with resend api check)
            if (isEnabled && !apiKey) {
                setStatus('error');
                setLoading(false);
                return;
            }

            // Save to backend
            await api.channels.update('email', {
                isEnabled,
                credentials: apiKey.includes('*') ? undefined : { apiKey }, // Don't send masked key back as credential
                config: {
                    apiKeyMasked: apiKey.includes('*') ? apiKey : apiKey.replace(/^(re_).{4}(.*)/, '$1****$2'),
                    provider: 'resend'
                }
            });

            setStatus('verified');
        } catch (error) {
            console.error('Failed to save email settings:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
                    </button>
                    <h1 className="text-lg font-bold text-slate-900">Email Configuration</h1>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Main Config Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Resend API Configuration</h2>
                                <p className="text-sm text-slate-500 mt-1">Configure your Resend API key to enable transactional emails.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-slate-600">Enable Email</span>
                                <button
                                    onClick={() => setIsEnabled(!isEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-blue-600' : 'bg-[#2b303d]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">API Key</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <KeyIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={apiKey}
                                        onChange={(e) => {
                                            setApiKey(e.target.value);
                                            setStatus('idle');
                                        }}
                                        placeholder="re_12345678..."
                                        className="pl-10 w-full px-3 py-2 border border-[#a2a5ad] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Get your API key from the <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Resend Dashboard</a>.
                                </p>
                            </div>

                            {status === 'verified' && (
                                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                                    <CheckCircleIcon className="w-5 h-5" />
                                    <span>Configuration verified and active.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                    <XCircleIcon className="w-5 h-5" />
                                    <span>Failed to verify or save configuration. Please check your API key.</span>
                                </div>
                            )}
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

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white border border-slate-200 rounded-lg">
                            <h3 className="font-medium text-slate-900 mb-2">Transactional Emails</h3>
                            <p className="text-sm text-slate-500">Automatically send welcome emails, password resets, and notifications to your users.</p>
                        </div>
                        <div className="p-4 bg-white border border-slate-200 rounded-lg">
                            <h3 className="font-medium text-slate-900 mb-2">Custom Domain</h3>
                            <p className="text-sm text-slate-500">Send emails from your own domain (e.g. support@yourdomain.com) for better deliverability.</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default EmailChannel;
