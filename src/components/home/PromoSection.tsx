import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function PromoSection() {
  return (
    <section className="py-8 lg:py-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative w-full rounded-[32px] lg:rounded-[40px] bg-[#FFCE41] overflow-hidden flex flex-col lg:flex-row items-center min-h-[420px] lg:h-[454px]">

          <div className="absolute left-[45%] top-0 bottom-0 right-0 bg-[#F5C023]/60 hidden lg:block" style={{ clipPath: "ellipse(70% 120% at 90% 50%)" }} />

          <div className="relative z-10 px-6 lg:pl-16 py-8 lg:py-0 flex flex-col gap-4 max-w-full lg:max-w-[480px]">
            <h2 className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[61px] leading-[115%] tracking-[0.01em] text-[#EF5B5B]">
              Taco Day
            </h2>
            <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
              Limited Offer by Using Promo Code
            </p>
            <p className="font-heading font-bold text-[28px] sm:text-[39px] leading-[123%] tracking-[0.01em] text-[#EF5B5B]">
              Start from $3
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-2">
              <Link href="/restaurants" className="inline-flex items-center gap-2 h-[52px] lg:h-[60px] px-6 lg:px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] lg:text-[20px] hover:bg-[#CD424E] transition-colors">
                Order Now <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-3">
                <span className="w-[44px] h-[44px] lg:w-[50px] lg:h-[50px] rounded-full bg-white flex items-center justify-center shadow-md">
                  <Play size={16} className="text-[#EF5B5B] fill-[#EF5B5B] ml-0.5" />
                </span>
                <div className="text-left">
                  <p className="font-heading font-bold text-[16px] lg:text-[20px] leading-[175%] tracking-[0.1em] text-neutral-800">Play Video</p>
                  <p className="font-heading font-light text-[14px] lg:text-[16px] text-neutral-700">Learn How to Order</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative z-10 lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-1/2 w-[280px] sm:w-[380px] lg:w-[469px] flex items-center justify-center">
            <img src="/Burrito.svg" alt="Taco" className="w-full object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}