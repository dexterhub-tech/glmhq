import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import devotionalImg from '../assets/images/daily-devotional.svg';
import testimonyImg from '../assets/images/testimonies.svg';
import AltarCall from '../assets/images/altar-call.svg';
import AuxanoImg from '../assets/images/auxano.svg';
import sharpThreshingImg from '../assets/images/sharp-threshing.png';

export default function SeasonWordSection() {
  return (
    <section className="w-full flex flex-col items-center py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <h2 className="font-anton font-normal text-2xl sm:text-3xl md:text-[40px] leading-[120%] text-[#2B1818] mb-4 sm:mb-6 md:mb-10 text-center px-2">A word for the season</h2>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl justify-center px-2 sm:px-0">
        {/* Aleitheia Daily Devotional Card */}
        <div className="bg-[#F3F3F3] rounded-2xl shadow-md flex-1 flex flex-col overflow-hidden min-w-0 max-w-full md:min-w-[320px] md:max-w-[500px]">
          <div className="h-40 sm:h-48 w-full relative">
            <Image
              src={devotionalImg}
              alt="Aleitheia Daily Devotional"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-t-2xl"
              priority
            />
          </div>
          <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
            <h3 className="font-anton font-normal text-2xl sm:text-3xl md:text-[40px] leading-[120%] text-[#2B1818] mb-2">Aleitheia Daily Devotional</h3>
            <p className="text-xs sm:text-sm md:text-base text-[#2B1818] mb-3 sm:mb-4 md:mb-6">Start your day in a lovely way, fellowship with God through our 3-minutes inspiring devotionals.</p>
            <a
              href="https://t.me/aletheiadailydevotional"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 font-medium text-black hover:bg-black hover:text-white transition self-start text-xs sm:text-sm md:text-base inline-flex items-center gap-2 text-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_618_1685)"><path d="M8 0C5.87875 0 3.8425 0.843375 2.34375 2.34313C0.843465 3.84348 0.000429311 5.87823 0 8C0 10.1209 0.84375 12.1571 2.34375 13.6569C3.8425 15.1566 5.87875 16 8 16C10.1213 16 12.1575 15.1566 13.6562 13.6569C15.1562 12.1571 16 10.1209 16 8C16 5.87913 15.1562 3.84288 13.6562 2.34313C12.1575 0.843375 10.1213 0 8 0Z" fill="url(#paint0_linear_618_1685)"/><path d="M3.62131 7.91553C5.95381 6.89953 7.50881 6.22969 8.28631 5.90603C10.5088 4.9819 10.9701 4.8214 11.2713 4.81597C11.3376 4.8149 11.4851 4.83128 11.5813 4.90909C11.6613 4.97472 11.6838 5.06347 11.6951 5.12578C11.7051 5.18803 11.7188 5.3299 11.7076 5.44065C11.5876 6.70565 11.0663 9.7754 10.8013 11.1923C10.6901 11.7918 10.4688 11.9928 10.2551 12.0124C9.79006 12.0552 9.43756 11.7054 8.98756 11.4105C8.28381 10.9489 7.88631 10.6617 7.20256 10.2113C6.41256 9.69078 6.92506 9.40465 7.37506 8.93715C7.49256 8.81478 9.54006 6.9529 9.57881 6.78403C9.58381 6.7629 9.58881 6.68415 9.54131 6.64265C9.49506 6.60103 9.42631 6.61528 9.37631 6.62653C9.30506 6.64253 8.18131 7.38603 6.00131 8.8569C5.68256 9.07615 5.39381 9.18303 5.13381 9.1774C4.84881 9.17128 4.29881 9.0159 3.89006 8.88315C3.39006 8.72028 2.99131 8.63415 3.02631 8.35753C3.04381 8.21353 3.24256 8.06615 3.62131 7.91553Z" fill="white"/></g><defs><linearGradient id="paint0_linear_618_1685" x1="800" y1="0" x2="800" y2="1600" gradientUnits="userSpaceOnUse"><stop stopColor="#2AABEE"/><stop offset="1" stopColor="#229ED9"/></linearGradient><clipPath id="clip0_618_1685"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
              FOLLOW DAILY DEVOTIONAL
            </a>
          </div>
        </div>
        {/* Testimonies Card */}
        <div className="bg-[#F3F3F3] rounded-2xl shadow-md flex-1 flex flex-col overflow-hidden min-w-0 max-w-full md:min-w-[320px] md:max-w-[500px]">
          <div className="h-40 sm:h-48 w-full relative">
            <Image
              src={testimonyImg}
              alt="Testimonies"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-t-2xl"
              priority
            />
          </div>
          <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
            <h3 className="font-anton font-normal text-2xl sm:text-3xl md:text-[40px] leading-[120%] text-[#2B1818] mb-2">Testimonies</h3>
            <p className="text-xs sm:text-sm md:text-base text-[#2B1818] mb-3 sm:mb-4 md:mb-6">God is doing wondrous things among us through his word from the mouth of his servant.</p>
            <Link 
              href="https://t.me/glmtestimonies"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 font-medium text-black hover:bg-black hover:text-white transition self-start text-xs sm:text-sm md:text-base inline-block text-center"
            >
              OPEN TESTIMONIES
            </Link>
          </div>
        </div>
      </div>
      {/* New Section: Call to Decision */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-16 w-full max-w-5xl px-2 sm:px-0">
        {/* Image - appears first on mobile, second on desktop */}
        <div className="flex-1 flex items-center justify-center w-full order-1 md:order-2">
          <div className="overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[32px] w-full sm:max-w-xs md:max-w-md">
            <Image
              src={AltarCall}
              alt="Altar Call"
              width={351}
              height={280}
              className="object-cover w-full h-auto grayscale"
            />
          </div>
        </div>
        {/* Text - appears second on mobile, first on desktop */}
        <div className="flex-1 flex flex-col w-full order-2 md:order-1 px-2 sm:px-0">
          <h3 className="font-anton font-normal text-[28px] sm:text-[32px] leading-[120%] text-[#1E1E1E] mb-3 sm:mb-4 md:text-3xl lg:text-4xl md:font-satoshi md:font-extrabold md:leading-tight text-left">
            HAVE YOU GIVEN YOUR LIFE TO JESUS?
          </h3>
          <p className="font-satoshi font-normal text-sm leading-[140%] text-black mb-4 sm:mb-5 md:mb-6 max-w-md md:text-base">
            Do you know the trumpet can sound anytime from now? God loves you so much and his arms are wide open to you..
          </p>
          <Button variant="destructive" className="rounded-full px-6 py-3 font-semibold text-sm md:text-base shadow-md w-fit">
            <Link href="/make-decision">
              MAKE A DECISION FOR GOD
            </Link>
          </Button>
        </div>
      </div>
      {/* AUXANO Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-16 w-full max-w-5xl bg-[#F3F3F3] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mx-2 sm:mx-0">
        {/* Left Side: Image */}
        <div className="flex-1 w-full sm:max-w-xs md:max-w-md mb-4 md:mb-0">
          <Image
            src={AuxanoImg}
            alt="Auxano"
            width={320}
            height={320}
            className="rounded-xl sm:rounded-2xl w-full h-auto"
          />
        </div>
        {/* Right Side: Text and Button */}
        <div className="flex-1 flex flex-col max-w-lg w-full px-2 sm:px-0">
          <p className="font-big-shoulders font-bold text-[#170000] mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-3xl md:text-[40px] leading-[120%]">
            Do you desire spiritual growth? Intimacy with God? Spiritual fervency? AUXANO is the avenue God has designed for your growth..
          </p>
          <Button variant="destructive" asChild className="rounded-full px-6 py-3 font-inter font-14px text-sm md:text-base shadow-md w-fit">
            <Link href="/make-decision" rel="noopener noreferrer">
              REGISTER FOR AUXANO
            </Link>
          </Button>
        </div>
      </div>
      {/* Vision Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-16 w-full max-w-5xl px-2 sm:px-0">
        {/* Left Side: Image */}
        <div className="flex-1 flex items-center justify-center w-full sm:max-w-xs md:max-w-md mb-4 md:mb-0">
          <div className="relative w-full aspect-square sm:aspect-auto sm:h-48 md:h-96 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
            <Image
              src={sharpThreshingImg}
              alt="Sharp Threshing Instrument"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
            />
          </div>
        </div>
        {/* Right Side: Text and Button */}
        <div className="flex-1 flex flex-col items-center sm:items-start justify-center w-full px-2 sm:px-0">
          <h3 className="font-anton font-normal text-[27px] sm:text-[31px] leading-[130%] tracking-normal text-[#1E1E1E] mb-3 sm:mb-4 md:text-[39px] lg:text-[47px] md:leading-[120%] text-center sm:text-left">
            Behold, I will make thee a new sharp threshing instrument having teeth: thou shalt thresh the mountains, and..
          </h3>
          <p className="text-sm md:text-base text-black mb-4 sm:mb-5 md:mb-6 text-center sm:text-left">God has given us a vision..</p>
          <button className="border border-black rounded-full px-6 py-3 font-semibold text-black hover:bg-black hover:text-white transition text-sm md:text-base w-fit">

            <Link href="/vision" rel="noopener noreferrer">
              READ THE VISION
            </Link>


          </button>
        </div>
      </div>
    </section>
  );
}