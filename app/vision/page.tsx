"use client";

import Image from "next/image";
import visionHeroImage from "../assets/images/auxano_centers_header.png";
import visionDawrash from "../assets/images/vision_dawrash.svg";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={visionHeroImage}
          alt="Vision - Where God Is Taking Us"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Text */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-anton font-bold text-white text-center px-4 uppercase leading-tight">
            WHERE GOD IS<br />TAKING US
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Quote Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8">
            &ldquo;SOUGHT OUT, A CITY NOT FORSAKEN..&rdquo;
          </h2>
        </div>
        {/* Vision Image */}
        <div className="flex justify-center mb-12 md:mb-16">
          <Image
            src={visionDawrash}
            alt="Vision Dawrash"
            width={800}
            height={600}
            className="w-full max-w-4xl h-auto"
          />
        </div>

        
      </div>
    </div>
  );
}
