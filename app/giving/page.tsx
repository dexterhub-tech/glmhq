"use client";

import { useState } from "react";


import auxanoHeader from "../assets/images/auxano_centers_header.png";

export default function GivingPage() {
    const [activeTab, setActiveTab] = useState<"naira" | "foreign">("naira");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] pt-[72px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${auxanoHeader.src})`
                    }}
                >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="font-anton text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4">
                        BE A PART OF GOD&apos;S WORK
                    </h1>
                    <h2 className="font-anton text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
                        WITH YOUR RESOURCES
                    </h2>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="w-full px-4 py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Sidebar */}
                        <div className="lg:w-1/4">
                            <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
                                CHANNELS<br />TO GIVE
                            </h2>
                        </div>

                        {/* Right Content Area */}
                        <div className="lg:w-3/4">
                            {/* Tabs */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setActiveTab("naira")}
                                    className={`px-6 py-3 font-bold text-sm md:text-base rounded-full transition-colors ${activeTab === "naira"
                                        ? "bg-[#D00002] text-white"
                                        : "bg-white text-[#D00002] border-2 border-[#D00002]"
                                        }`}
                                >
                                    NAIRA ACCOUNTS
                                </button>
                                <button
                                    onClick={() => setActiveTab("foreign")}
                                    className={`px-6 py-3 font-bold text-sm md:text-base rounded-full transition-colors ${activeTab === "foreign"
                                        ? "bg-[#D00002] text-white"
                                        : "bg-white text-[#D00002] border-2 border-[#D00002]"
                                        }`}
                                >
                                    FOREIGN ACCOUNTS
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === "naira" && (
                                <div className="space-y-6">
                                    {/* Gospel Labour Ministry Account */}
                                    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                                        <h3 className="font-bold text-xl md:text-2xl text-black mb-4 uppercase">
                                            Gospel Labour Ministry
                                        </h3>
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-semibold">FIRST BANK OF NIGERIA</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white rounded-md p-4">
                                            <span className="font-bold text-2xl md:text-3xl text-black">2046121493</span>
                                            <button
                                                onClick={() => copyToClipboard("2046121493")}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                </svg>
                                                <span className="text-sm font-semibold">Copy</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Golahem Account */}
                                    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                                        <h3 className="font-bold text-xl md:text-2xl text-black mb-4 uppercase">
                                            Golahem (GLM Help Mission)
                                        </h3>
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-semibold">FIRST BANK OF NIGERIA</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white rounded-md p-4">
                                            <span className="font-bold text-2xl md:text-3xl text-black">2027597217</span>
                                            <button
                                                onClick={() => copyToClipboard("2027597217")}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                </svg>
                                                <span className="text-sm font-semibold">Copy</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "foreign" && (
                                <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-bold text-base">FIRST BANK OF NIGERIA</span>
                                        </div>

                                        {/* Sort Code and Swift Code */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">SORT CODE</label>
                                                <div className="flex items-center justify-between bg-white rounded-md p-3">
                                                    <span className="font-bold text-xl text-blue-600">011183822</span>
                                                    <button
                                                        onClick={() => copyToClipboard("011183822")}
                                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                        </svg>
                                                        <span className="text-xs font-semibold">Copy</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">SWIFT CODE</label>
                                                <div className="flex items-center justify-between bg-white rounded-md p-3">
                                                    <span className="font-bold text-xl text-blue-600">FBNINGLA</span>
                                                    <button
                                                        onClick={() => copyToClipboard("FBNINGLA")}
                                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                        </svg>
                                                        <span className="text-xs font-semibold">Copy</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Domiciliary Accounts */}
                                        <div className="space-y-4">
                                            {/* USD Account */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">USD - DOMICILIARY ACCOUNT</label>
                                                <div className="flex items-center justify-between bg-white rounded-md p-3">
                                                    <span className="font-bold text-2xl text-black">2046211169</span>
                                                    <button
                                                        onClick={() => copyToClipboard("2046211169")}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                        </svg>
                                                        <span className="text-sm font-semibold">Copy</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* GBP Account */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">GBP - DOMICILIARY ACCOUNT</label>
                                                <div className="flex items-center justify-between bg-white rounded-md p-3">
                                                    <span className="font-bold text-2xl text-black">2046212939</span>
                                                    <button
                                                        onClick={() => copyToClipboard("2046212939")}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                        </svg>
                                                        <span className="text-sm font-semibold">Copy</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* EUR Account */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">EUR - DOMICILIARY ACCOUNT</label>
                                                <div className="flex items-center justify-between bg-white rounded-md p-3">
                                                    <span className="font-bold text-2xl text-black">2046213084</span>
                                                    <button
                                                        onClick={() => copyToClipboard("2046213084")}
                                                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                        </svg>
                                                        <span className="text-sm font-semibold">Copy</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Branch Address */}
                                        <div className="mt-6 pt-4 border-t border-gray-300">
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                <span className="font-semibold">BRANCH:</span> 91, OPOPOGBOORO ROAD, OPP. FEDERAL HOUSING JUNCTION, ADO EKITI, EKITI STATE, NIGERIA.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
