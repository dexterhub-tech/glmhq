"use client";

import { useState } from "react";
import Image from "next/image";
import becomeMemberImage from "../assets/images/becomemember.png";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <div className="relative min-h-[calc(100vh-72px)]">
        {/* Top Half - Image Background */}
        <div className="absolute top-0 left-0 right-0 h-1/2">
          <Image
            src={becomeMemberImage}
            alt="Sign In"
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
            <div className="bg-white lg:border lg:border-1 lg:border-black rounded-2xl shadow-2xl w-full max-w-lg p-8 md:p-10">
              {/* Title */}
              <h1 className="text-3xl md:text-[24px] font-anton font-bold text-black mb-8 text-center">
                SIGN IN{" "}
                <span className="text-[20px] font-normal text-gray-900">
                  (Personnel only)
                </span>
              </h1>

              {/* Form */}
              <form className="space-y-5 mb-8">
                {/* Email Input */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="xxxxxxxx"
                      className="w-full px-4 py-3 pr-12 rounded-md border border-gray-200 bg-gray-50 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#D00002] hover:bg-[#B00002] text-white font-semibold py-3.5 px-6 rounded-full transition-colors duration-200 text-base"
                  >
                    Sign in
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
