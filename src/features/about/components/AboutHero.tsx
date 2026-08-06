import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="bg-white overflow-hidden relative">
      <div className="absolute left-0 top-[20%] z-0 w-[80px] sm:w-[100px] lg:w-[120px]">
        <Image src="/015-spinach (1).png" alt="" width={120} height={120} className="object-contain drop-shadow-lg w-full h-auto" />
      </div>
      <div className="absolute left-0 bottom-0 z-0 w-[40px] sm:w-[50px] lg:w-[75px]">
        <Image src="/Ellipse.png" alt="" width={75} height={150} className="object-contain w-full h-auto" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
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
            <Image src="/Mask group (20).png" alt="" width={56} height={56} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
            <div className="w-[3px] h-12 bg-[#FFCF27] rounded-full flex-shrink-0" />
            <p className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-neutral-500 max-w-[240px]">
              When you are too lazy or busy to cook, just click away!
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 w-full">
          <Image src="/Group 1000002226 (2).png" alt="About Hero" width={648} height={648} className="w-full max-w-[648px] h-auto object-contain" priority />
        </div>
      </div>
    </section>
  );
}