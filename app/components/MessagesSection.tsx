import Image from "next/image";
import Link from "next/link";
import messageImg from '../assets/images/message-img.png';

export default function MessagesSection() {
  return (
    <section className="w-full bg-black text-white py-10 sm:py-8">
      <div className="flex flex-col md:flex-row min-h-[60vh] items-center justify-center px-3 sm:px-4 md:px-16 md:gap-12 max-w-[1400px] mx-auto">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center sm:items-start font-s w-full md:w-auto h-full mb-6 sm:mb-8 md:mb-0 px-2 sm:px-0 md:pr-8">
          <span className="text-lg sm:text-[18px] md:text-[20px]">Listen to life-transforming</span>
          <h2 className="text-[2.5rem] min-[375px]:text-[4rem] sm:text-[4rem] md:text-[90px] font-anton font-extrabold m-0 tracking-wide leading-tight md:leading-none text-center sm:text-left">MESSAGES</h2>
          <span className="text-lg sm:text-[19px] md:text-[20px] mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">From the altar of grace..</span>
          <Link href="/messages" className="bg-[#E50914] border-[#FF5A5C] border-[1px] text-white rounded-full px-7 py-3 sm:px-8 sm:py-3.5 md:px-12 md:py-4 font-semibold text-base sm:text-[17px] md:text-[19px] cursor-pointer shadow-md inline-block hover:bg-[#d00813] transition">
            OPEN MESSAGES
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-center w-full md:w-auto h-full md:pl-4">
          <div className="rounded-[20px] sm:rounded-[24px] md:rounded-[32px] shadow-2xl p-3 sm:p-4 md:p-6 flex items-center font-[satoshi] justify-center w-full max-w-[380px] sm:max-w-sm md:max-w-none">
            <Image
              src={messageImg}
              alt="messages"
              width={500}
              height={500}
              className="rounded-[16px] sm:rounded-[20px] md:rounded-[28px] object-cover w-full h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[650px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 