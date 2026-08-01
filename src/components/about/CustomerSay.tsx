"use client";
import { Star } from "lucide-react";

export function CustomerSay() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex justify-center lg:justify-start">
          <img src="/Group 1000002260.png" alt="Customer statistics" className="w-full max-w-[531px] object-contain" />
        </div>

        <div className="flex flex-col gap-6">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">What They Say</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[55px] leading-[110%] tracking-[0.01em] text-neutral-800">
            What Our Customer Say About MealMover
          </h2>
          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600">
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla. Vestibulum tellus mi, posuere vel turpis consequat, volutpat imperdiet ex.&rdquo;
          </p>

          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-4">
              <img src="/Mask group (1).png" alt="Angeline Liu" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div>
                <p className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">Angeline Liu</p>
                <p className="font-heading font-normal text-[16px] text-neutral-500">Food Vlogger</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                <span className="font-heading font-medium text-[20px] text-neutral-800">4.9</span>
                <span className="font-heading font-light text-[18px] text-neutral-500">/ 5.0</span>
              </div>
              <p className="font-heading font-normal text-[14px] text-neutral-400 mt-1">2 months ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 h-1 rounded-full bg-neutral-200 relative">
              <div className="absolute left-0 top-0 h-full w-1/4 rounded-full bg-[#FFCF27]" />
            </div>
            <button className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
              <img src="/arrow-left.svg" alt="prev" className="w-4 h-4 object-contain" />
            </button>
            <button className="w-11 h-11 rounded-full bg-[#EF5B5B] hover:bg-[#CD424E] flex items-center justify-center transition-colors">
              <img src="/arrow-right.svg" alt="next" className="w-4 h-4 object-contain brightness-0 invert" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}