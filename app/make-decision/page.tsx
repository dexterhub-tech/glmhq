import Image from "next/image";
import becomeMemberImage from "../assets/images/becomemember.png";

export default function MakeDecisionPage() {
    return (
        <div className="min-h-screen bg-white pt-[72px]">
            <div className="relative min-h-[calc(100vh-72px)]">
                {/* Top Half - Image Background */}
                <div className="absolute top-0 left-0 right-0 h-1/2">
                    <Image
                        src={becomeMemberImage}
                        alt="Make a Decision for God"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Bottom Half - White Background */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>

                {/* Form Card - Overlays both sections */}
                <div className="relative z-10 min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-8 md:py-12">
                    <div className="max-4xl-mx-auto">
                        <div className="bg-white border-1 border-black rounded-2xl shadow-2xl w-full max-w-lg p-8 md:p-10">
                            {/* Title */}
                            <h1 className="text-3xl md:text-[24px] font-anton font-bold text-black mb-8 text-center">
                                Decision Slip
                            </h1>

                            {/* Form */}
                            <form className="space-y-5 mb-8">
                                {/* Full Name Input */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1.5">Full name</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="Full name"
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                                    />
                                </div>

                                {/* Phone Number Input */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1.5">Phone number</label>
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Phone number"
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                                    />
                                </div>

                                {/* Current Address Input */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1.5">Current address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="Current address"
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                                    />
                                </div>

                                {/* Occupation / School Input */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1.5">Occupation / School</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Occupation"
                                            className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Meeting Attendance Question */}
                                <div className="pt-2">
                                    <label className="block text-sm text-gray-700 mb-3">
                                        Have you attended any of our meetings before?
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="attended"
                                                value="yes"
                                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="attended"
                                                value="no"
                                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-[#D00002] hover:bg-[#B00002] text-white font-semibold py-3.5 px-6 rounded-full transition-colors duration-200 text-base"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
