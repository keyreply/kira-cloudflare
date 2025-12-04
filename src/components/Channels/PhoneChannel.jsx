import React, { useState } from 'react';
import { ArrowLeftIcon, BookOpenIcon, PlusIcon, PencilSquareIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

const PhoneChannel = ({ onBack }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [wrapUpTime, setWrapUpTime] = useState(true);
    const [phoneCallsEnabled, setPhoneCallsEnabled] = useState(true);

    const [numbers, setNumbers] = useState([
        { id: 1, name: 'Example', country: '🇺🇸 United States of America', type: 'Local', number: '+1 256 297 8484', inbound: true, outbound: true, routing: 'Workflows', status: 'Active' },
        { id: 2, name: 'Canadian number', country: '🇨🇦 Canada', type: 'Local', number: '+1 807 797 5736', inbound: false, outbound: false, routing: '-', status: 'Active' },
    ]);

    const [editingNumber, setEditingNumber] = useState(null);

    const handleEdit = (num) => {
        setEditingNumber(num);
        setShowEditModal(true);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50 font-sans relative">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Phone calls</h1>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                    <BookOpenIcon className="w-4 h-4" />
                    Learn
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-6">

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-base font-semibold text-gray-900">Phone calls</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${phoneCallsEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {phoneCallsEnabled ? 'On' : 'Off'}
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2">Inbound and outbound phone calls</p>
                            <p className="text-sm text-gray-500 mb-4">Phone numbers are charged by month and phone calls are charged per minute. See <a href="#" className="text-blue-600">costs</a> and <a href="#" className="text-blue-600">terms of service</a>.</p>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <PlusIcon className="w-4 h-4" />
                                Purchase new number
                            </button>
                        </div>

                        {/* Table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Country</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Phone number</th>
                                        <th className="px-4 py-3 text-center">Inbound</th>
                                        <th className="px-4 py-3 text-center">Outbound</th>
                                        <th className="px-4 py-3">Routing</th>
                                        <th className="px-4 py-3">Voicemail</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {numbers.map((num) => (
                                        <tr key={num.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{num.name}</td>
                                            <td className="px-4 py-3">{num.country}</td>
                                            <td className="px-4 py-3 text-gray-500">{num.type}</td>
                                            <td className="px-4 py-3 font-mono text-gray-600">{num.number}</td>
                                            <td className="px-4 py-3 text-center">{num.inbound && <CheckIcon className="w-4 h-4 text-gray-600 mx-auto" />}</td>
                                            <td className="px-4 py-3 text-center">{num.outbound && <CheckIcon className="w-4 h-4 text-gray-600 mx-auto" />}</td>
                                            <td className="px-4 py-3 text-gray-500 flex items-center gap-1">
                                                {num.routing === 'Workflows' && <span className="w-4 h-4">⚙️</span>}
                                                {num.routing}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">-</td>
                                            <td className="px-4 py-3">
                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{num.status}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => handleEdit(num)} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Wrap up time */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Wrap up time</h4>
                            <div className="flex items-center gap-3 mb-2">
                                <input
                                    type="checkbox"
                                    checked={wrapUpTime}
                                    onChange={(e) => setWrapUpTime(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">Allow agents post-call wrap-up time before they receive their next call</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={50}
                                    disabled={!wrapUpTime}
                                    className="w-16 border border-gray-200 rounded px-2 py-1 text-sm bg-gray-50"
                                />
                                <span className="text-sm text-gray-500">Seconds</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {showEditModal && editingNumber && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🇺🇸</span>
                                <h3 className="font-bold text-lg text-gray-900">{editingNumber.number}</h3>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
                                <input type="text" defaultValue={editingNumber.name} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${editingNumber.outbound ? 'bg-gray-900' : 'bg-gray-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingNumber.outbound ? 'translate-x-4' : ''}`} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Outbound phone calls</span>
                                            <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">On</span>
                                            <p className="text-xs text-gray-500 mt-0.5">Teammates can place phone calls to a customer's phone number in the Inbox</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${editingNumber.inbound ? 'bg-gray-900' : 'bg-gray-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingNumber.inbound ? 'translate-x-4' : ''}`} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Inbound phone calls</span>
                                            <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">On</span>
                                            <p className="text-xs text-gray-500 mt-0.5">Allows your customers to place phone calls to this number. Calls will be routed to teammates in the Help Desk</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Welcome greeting</label>
                                <textarea rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                                <p className="text-xs text-gray-500 mt-1 text-right">255 characters remaining</p>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Routing</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input type="radio" name="routing" defaultChecked className="text-gray-900 focus:ring-gray-900" />
                                        <span className="text-sm text-gray-700">Configure with a <span className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs font-medium">⚙️ workflow</span></span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="radio" name="routing" className="text-gray-900 focus:ring-gray-900" />
                                        <span className="text-sm text-gray-700 flex items-center gap-2">
                                            Assign to
                                            <select className="bg-gray-100 border-none text-xs rounded py-1 pl-2 pr-6 font-medium">
                                                <option>Team with Manual</option>
                                            </select>
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="radio" name="routing" className="text-gray-900 focus:ring-gray-900" />
                                        <span className="text-sm text-gray-700">Assign to Workspace</span>
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">Cancel</button>
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneChannel;
