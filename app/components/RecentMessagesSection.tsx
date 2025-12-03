import Image from "next/image";
import Link from "next/link";
import { Search, Download, Play } from "lucide-react";
import { messages } from "../constants/messages";

export default function RecentMessagesSection() {
  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-4 lg:gap-6">
          <h2 className="font-anton font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] text-black leading-tight capitalize">Recent Messages</h2>

          {/* Search Bar */}
          <div className="relative w-full lg:w-auto lg:min-w-[400px] xl:min-w-[500px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by message title, program, or preacher"
              className="w-full h-[56px] md:h-[60px] lg:h-[64px] pl-12 pr-4 bg-[#F8F8F8] border border-[#C5C5C5] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8">
          {messages.map((message) => (
            <div key={message.id} className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
              {/* Banner Section - Using the healing meeting image */}
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px] overflow-hidden bg-gray-100">
                {/* Background Image */}
                <Image
                  src={message.image}
                  alt="Message thumbnail"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                  priority={message.id <= 3}
                />
              </div>

              {/* Message Details */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col min-h-[160px] sm:min-h-[170px]">
                <div className="flex-grow mb-4">
                  <h4 className="font-anton font-normal text-base sm:text-lg md:text-xl text-black mb-2 leading-tight line-clamp-2">{message.title}</h4>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="font-satoshi font-medium text-sm text-gray-600 truncate">{message.preacher}</span>
                    <span className="font-satoshi font-medium text-sm text-gray-500 whitespace-nowrap">{message.date}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={message.audioUrl}
                    download
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-[50px] px-4 py-2.5 flex items-center justify-center gap-2 font-semibold transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD</span>
                  </a>
                  <Link href={`/messages/${message.id}`} className="flex-1 border-1 border-black text-black hover:bg-black hover:text-white rounded-[50px] px-4 py-2.5 flex items-center justify-center gap-2 font-semibold transition-colors text-sm">
                    <Play className="w-4 h-4 fill-black" />
                    <span>PLAY</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
