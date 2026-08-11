import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function OrderCta() {
  return (
    <section className="bg-white pb-12 lg:pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[24px] lg:rounded-[40px] bg-[#FCE4E0] overflow-hidden px-6 sm:px-12 py-14 lg:py-20">
          <Image src="/Rectangle 230 (1).svg" alt="" width={40} height={40} className="absolute top-[60%] left-[46%] w-6 pointer-events-none" />
          <Image src="/Rectangle 228.svg" alt="" width={24} height={24} className="absolute top-[52%] left-[26%] w-4 rotate-45 pointer-events-none" />
          <Image src="/Rectangle 676.svg" alt="" width={20} height={20} className="absolute bottom-[14%] left-[24%] w-3 pointer-events-none" />
          <Image src="/Rectangle 675.svg" alt="" width={16} height={16} className="absolute top-[44%] right-[26%] w-2.5 pointer-events-none" />

          <Image src="/e.svg" alt="" width={65} height={65} className="absolute top-[30%] left-[22%] w-10 sm:w-[65px] opacity-60 pointer-events-none" />
          <Image src="/l.svg" alt="" width={65} height={65} className="absolute bottom-[24%] left-[30%] w-10 sm:w-[65px] opacity-60 pointer-events-none" />
          <Image src="/m.svg" alt="" width={65} height={65} className="absolute top-[30%] right-[28%] w-10 sm:w-[65px] opacity-60 pointer-events-none" />
          <Image src="/k.svg" alt="" width={65} height={65} className="absolute bottom-[28%] right-[24%] w-10 sm:w-[65px] opacity-60 pointer-events-none" />

          <Image src="/Mask group (29).png" alt="" width={220} height={180} className="absolute -left-4 sm:left-6 top-1/2 -translate-y-1/2 w-[120px] sm:w-[200px] rotate-[-8deg] pointer-events-none" />
          <Image src="/Mask group (30).png" alt="" width={250} height={170} className="absolute -right-4 sm:right-6 top-1/2 -translate-y-1/2 w-[120px] sm:w-[220px] rotate-[8deg] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="font-heading font-bold text-[28px] sm:text-[42px] lg:text-[49px] leading-[124%] text-[#EF5B5B] max-w-[620px]">
              Order your favorite food<br className="hidden sm:block" /> now while staying at home
            </h2>
            <Link
              href="/restaurants"
              className="mt-8 inline-flex items-center gap-3 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[64px] sm:h-[76px] pl-8 pr-3 font-heading font-medium text-[18px] sm:text-[20px] text-white"
            >
              Order Food Now
              <span className="w-11 h-11 sm:w-[56px] sm:h-[56px] rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={22} className="text-[#EF5B5B]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}