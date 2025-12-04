import React, { useState } from 'react';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    UserCircleIcon,
    BellIcon,
    MoonIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ManageBrands = ({ brands, onEditBrand, onNewBrand }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col h-full bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-8 flex-1">
                    <h1 className="text-lg font-bold text-gray-900">Brands</h1>
                    <div className="relative max-w-md w-full">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoonIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <BellIcon className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Learn</a>
                    <button
                        onClick={onNewBrand}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        New brand
                    </button>
                    <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <UserCircleIcon className="w-8 h-8" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage brands</h2>
                        <p className="text-gray-600">Create and manage brands to customize your customer experience across different products or regions</p>
                    </div>

                    {/* Brands List */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-9">Brand</div>
                            <div className="col-span-3">Status</div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {filteredBrands.map((brand) => (
                                <div
                                    key={brand.id}
                                    onClick={() => onEditBrand(brand)}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 cursor-pointer transition-colors group"
                                >
                                    <div className="col-span-9 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${brand.iconColor}`}>
                                            <StarIconSolid className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{brand.name || 'Untitled Brand'}</div>
                                            <div className="text-sm text-gray-500">AI Agent: {brand.agent === 'Fin' ? 'Kira' : brand.agent}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {brand.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {filteredBrands.length === 0 && (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    No brands found. Click "New brand" to create one.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                        <div className="shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">i</div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-900 mb-1">About brands</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Brands allow you to customize the look and feel of your customer-facing touchpoints. You can create different brands for different products, regions, or customer segments.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageBrands;
