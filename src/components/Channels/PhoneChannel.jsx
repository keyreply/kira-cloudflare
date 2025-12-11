import { api } from '../../services/api';

const PhoneChannel = ({ onBack }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [wrapUpTime, setWrapUpTime] = useState(true);
    const [phoneCallsEnabled, setPhoneCallsEnabled] = useState(true);
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await api.channels.list();
            const config = data.channels?.phone?.config || {};
            setPhoneCallsEnabled(data.channels?.phone?.isEnabled || false);
            if (config.numbers) {
                setNumbers(config.numbers);
            } else {
                // Default mock if empty, or just empty
                setNumbers([
                    { id: 1, name: 'Main Line', country: '🇺🇸 United States', type: 'Local', number: '+1 555 123 4567', inbound: true, outbound: true, routing: 'Workflows', status: 'Active' }
                ]);
            }
        } catch (error) {
            console.error("Error loading Phone settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async (updatedNumbers, enabled) => {
        try {
            await api.channels.update('phone', {
                isEnabled: enabled,
                config: { numbers: updatedNumbers }
            });
        } catch (error) {
            console.error("Error saving phone settings:", error);
        }
    };

    const handleEditSave = (updatedNum) => {
        const newNumbers = numbers.map(n => n.id === updatedNum.id ? updatedNum : n);
        setNumbers(newNumbers);
        saveSettings(newNumbers, phoneCallsEnabled);
        setShowEditModal(false);
    };

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
                    <h1 className="text-lg font-bold text-gray-900">Phone</h1>
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
                            <p className="text-sm text-gray-600 mb-2">Inbound and outbound calling</p>
                            <p className="text-sm text-gray-500 mb-4">Phone numbers are billed monthly and calls are billed per minute. View <a href="#" className="text-blue-600">pricing</a> and <a href="#" className="text-blue-600">terms of service</a>.</p>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <PlusIcon className="w-4 h-4" />
                                Add Phone Number
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
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Post-Call Wrap-Up</h4>
                            <div className="flex items-center gap-3 mb-2">
                                <input
                                    type="checkbox"
                                    checked={wrapUpTime}
                                    onChange={(e) => setWrapUpTime(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">Give agents time to complete notes before receiving the next call</span>
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
                                <input
                                    type="text"
                                    value={editingNumber.name}
                                    onChange={(e) => setEditingNumber({ ...editingNumber, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setEditingNumber({ ...editingNumber, outbound: !editingNumber.outbound })}
                                            className={`w-10 h-6 rounded-full p-1 transition-colors ${editingNumber.outbound ? 'bg-gray-900' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingNumber.outbound ? 'translate-x-4' : ''}`} />
                                        </button>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Outbound Calls</span>
                                            <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">On</span>
                                            <p className="text-xs text-gray-500 mt-0.5">Allow team members to make calls to customers from the inbox</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setEditingNumber({ ...editingNumber, inbound: !editingNumber.inbound })}
                                            className={`w-10 h-6 rounded-full p-1 transition-colors ${editingNumber.inbound ? 'bg-gray-900' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingNumber.inbound ? 'translate-x-4' : ''}`} />
                                        </button>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900">Inbound Calls</span>
                                            <span className="ml-2 bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">On</span>
                                            <p className="text-xs text-gray-500 mt-0.5">Accept incoming calls from customers. Calls will be routed to available team members</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Welcome Message</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                    placeholder="Enter a greeting message for callers"
                                    value={editingNumber.welcomeMessage || ''}
                                    onChange={(e) => setEditingNumber({ ...editingNumber, welcomeMessage: e.target.value })}
                                />
                            </div>

                            {/* ... Routing section omitted for brevity, but could be similarly bound ... */}

                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white">Cancel</button>
                            <button onClick={() => handleEditSave(editingNumber)} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneChannel;
