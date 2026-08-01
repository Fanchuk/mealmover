import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ContactHero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">Contact</span>
          </nav>

          <h1 className="font-heading font-bold text-[48px] sm:text-[61px] lg:text-[76px] leading-[121%] tracking-[0.01em] text-neutral-800">
            Contact
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[460px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur sit amet vehicula mi. Ut dapibus consequat accumsan.
          </p>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[320px] sm:min-h-[480px] lg:min-h-[560px]">
          <div className="absolute w-[80%] max-w-[540px] aspect-square rounded-full border-2 border-dashed border-[#FDCEBE]" />
          <div className="absolute w-[68%] max-w-[440px] aspect-square bg-[#FEE9DE] rounded-full" />
          <div className="relative z-10 w-[64%] max-w-[420px] aspect-square overflow-hidden">
            <img src="/Group 1000002226 (3).png" alt="Courier" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[8%] left-[18%] w-3.5 h-3.5 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[20%] right-[10%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute bottom-[14%] right-[14%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
        </div>
      </div>
    </section>
  );
}