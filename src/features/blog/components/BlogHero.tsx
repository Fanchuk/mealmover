"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function BlogHero() {
  return (
    <section className="bg-white overflow-hidden relative">
      <div className="absolute left-0 top-[30%] z-0 w-[80px] sm:w-[100px] lg:w-[120px]">
        <Image src="/015-spinach (1).png" alt="" width={120} height={120} className="object-contain drop-shadow-lg w-full h-auto" />
      </div>
      <div className="absolute left-0 bottom-0 z-0 w-[40px] sm:w-[50px] lg:w-[75px]">
        <Image src="/Ellipse.png" alt="" width={75} height={150} className="object-contain w-full h-auto" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">Blog</span>
          </nav>

          <h1 className="font-heading font-bold text-[48px] sm:text-[61px] lg:text-[76px] leading-[121%] tracking-[0.01em] text-neutral-800">
            Blog
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[460px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur sit amet vehicula mi. Ut dapibus consequat accumsan.
          </p>

          <div className="border border-neutral-200 rounded-[24px] p-5 flex flex-col gap-4 max-w-[502px] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6">
              <input type="text" placeholder="Search for Article..." className="flex-1 min-w-0 bg-transparent outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-500" />
              <Image src="/search.svg" alt="" width={20} height={20} className="object-contain flex-shrink-0" />
            </div>
            <div className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6">
              <span className="flex-1 min-w-0 font-heading font-normal text-[16px] text-neutral-500">Search for Article...</span>
              <Image src="/chevron-down.svg" alt="" width={20} height={20} className="object-contain flex-shrink-0" />
            </div>
            <button className="bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[61px] flex items-center justify-center gap-3 font-heading font-medium text-[20px] text-white">
              Search Article <Image src="/search.svg" alt="" width={20} height={20} className="object-contain brightness-0 invert flex-shrink-0" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[320px] sm:min-h-[480px] lg:min-h-[560px]">
          <div className="absolute w-[85%] max-w-[560px] aspect-square rounded-full border border-dashed border-[#FDCEBE]" />
          <div className="absolute w-[72%] max-w-[480px] aspect-square bg-[#FEE9DE] rounded-[45%]" />
          <div className="relative z-10 w-[62%] max-w-[420px] aspect-square rounded-[40%] overflow-hidden shadow-xl">
            <Image src="/Group 1000002226 (1).png" alt="Blog" fill className="object-cover" priority />
          </div>
          <div className="absolute top-[10%] left-[10%] w-3 h-3 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[30%] right-[6%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute bottom-[14%] left-[6%] w-3.5 h-3.5 rounded-sm bg-[#FFCF27] rotate-45" />
        </div>
      </div>
    </section>
  );
}