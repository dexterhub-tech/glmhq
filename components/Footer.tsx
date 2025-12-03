import Image from "next/image";
import Link from "next/link";
import GlmLogo from "@/app/assets/images/glm-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#3a0a0a] text-white py-8 px-4">
      <div className="flex flex-col items-center gap-6 sm:gap-8">

        <div className="mb-2">
          <Image
            src={GlmLogo}
            alt="Gospel Labour Ministry"
            width={140}
            height={56}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-gray-300 uppercase text-center tracking-wide">
          BIGGER. STRONGER. FASTER
        </p>

        {/* Navigation Links - Mobile: Horizontal, Desktop: More links */}
        <nav className="flex items-center justify-center gap-6 sm:gap-8 mb-2">
          <Link href="/meetings" className="text-white text-sm sm:text-base font-inter uppercase hover:text-gray-300 transition">
            MEETINGS
          </Link>
          <Link href="/messages" className="text-white text-sm sm:text-base font-inter uppercase hover:text-gray-300 transition">
            MESSAGES
          </Link>
          <Link href="/auxano-centers" className="text-white text-sm sm:text-base font-inter uppercase hover:text-gray-300 transition">
            AUXANO CENTERS
          </Link>
          {/* Desktop only links */}

          <Link href="/giving" className="hidden sm:block text-white text-base font-inter uppercase hover:text-gray-300 transition">
            GIVING
          </Link>

        </nav>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <a href="https://t.me/glmchannel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition" aria-label="Telegram">

            <svg width="30" height="25" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.8965 2.67132L29.6153 27.5776C29.2165 29.3351 28.1778 29.7726 26.7015 28.9451L18.654 23.0151L14.7715 26.7501C14.3415 27.1801 13.9828 27.5388 13.154 27.5388L13.7328 19.3438L28.6465 5.86757C29.2953 5.29007 28.5053 4.96882 27.639 5.54757L9.20155 17.1576L1.26405 14.6726C-0.462203 14.1338 -0.493453 12.9463 1.62405 12.1176L32.6703 0.156325C34.1078 -0.382425 35.3653 0.475075 34.8965 2.67132Z" fill="#FFFFFF" />
            </svg>

          </a>
          <a href="https://www.facebook.com/glmhq" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition" aria-label="Facebook">
            <svg className="w-6 h-6" fill="#FFFFFF" viewBox="0 0 24 24" aria-label="Facebook">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/stories/gospellabourhq" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://x.com/ApostleJoseph_I" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition" aria-label="Twitter/X">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter/X">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer; 