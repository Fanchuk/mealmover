import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">About</span>
          </nav>

          <h1 className="font-heading font-bold text-[48px] sm:text-[61px] lg:text-[76px] leading-[121%] tracking-[0.01em] text-neutral-800">
            About
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[460px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet vehicula mi. Ut dapibus consequat accumsan.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <img src="/Mask group (20).png" alt="" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
            <div className="w-[3px] h-12 bg-[#FFCF27] rounded-full flex-shrink-0" />
            <p className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-neutral-500 max-w-[240px]">
              When you are too lazy or busy to cook, just click away!
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 w-full">
          <img src="/Group 1000002226 (2).png" alt="About Hero" className="w-full max-w-[648px] object-contain" />
        </div>
      </div>
    </section>
  );
}