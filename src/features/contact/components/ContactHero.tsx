import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function ContactHero() {
  return (
    <section className="bg-white overflow-hidden relative">
      <div className="absolute left-0 bottom-[-10%] z-0 w-[60px] sm:w-[80px] lg:w-[120px]">
        <Image src="/Ellipse.png" alt="" width={120} height={240} className="object-contain w-full h-auto" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
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
          <div className="absolute w-[80%] max-w-[540px] aspect-square rounded-[40%] border-2 border-dashed border-[#FDCEBE]" />
          <div className="absolute w-[68%] max-w-[440px] aspect-square bg-[#FEE9DE] rounded-[40%]" />
          <div className="relative z-10 w-[64%] max-w-[420px] aspect-square overflow-hidden rounded-[30%]">
            <Image src="/Group 1000002226 (3).png" alt="Courier" fill className="object-cover" priority />
          </div>
          <div className="absolute top-[8%] left-[18%] w-3.5 h-3.5 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[20%] right-[10%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute bottom-[14%] right-[14%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
        </div>
      </div>
    </section>
  );
}