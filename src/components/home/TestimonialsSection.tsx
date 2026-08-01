"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { name: "Angeline Liu", role: "Food Vlogger", avatar: "/Mask group (1).png", text: "\u201CLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla.\u201D" },
  { name: "Anne Marie",   role: "Career Woman", avatar: "/Mask group (2).png", text: "\u201CLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla.\u201D" },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const visible = [TESTIMONIALS[idx % TESTIMONIALS.length], TESTIMONIALS[(idx + 1) % TESTIMONIALS.length]];

  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

        <div className="flex-shrink-0 w-full lg:w-[320px] relative">
          <img src="/Group 1000002224.png" alt="" className="w-[140px] lg:w-[180px] mb-6 lg:mb-8" />
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">Testimonials</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[39px] leading-[123%] tracking-[0.01em] text-neutral-800 mt-2 mb-6 lg:mb-8">
            What They Say About Us
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] border border-neutral-300 flex items-center justify-center text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)} className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full min-h-[500px] lg:h-[615px] rounded-[24px] bg-[#EF5B5B] overflow-hidden">
          <img src="/Star 2.svg" alt="" className="absolute top-6 left-10 w-16 h-16 lg:w-24 lg:h-24 opacity-90" />
          <img src="/Star 2.svg" alt="" className="absolute bottom-6 right-10 w-16 h-16 lg:w-24 lg:h-24 opacity-90" />

          <div className="absolute inset-x-4 lg:inset-x-6 top-[60px] lg:top-[80px] bottom-[60px] lg:bottom-[80px] flex flex-col sm:flex-row gap-4">
            {visible.map((t, i) => (
              <div key={i} className="flex-1 bg-white rounded-[20px] p-5 lg:p-6 shadow-[0_16px_40px_0_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[18px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">{t.name}</p>
                    <p className="font-heading font-normal text-[16px] lg:text-[18px] leading-[150%] text-neutral-500">{t.role}</p>
                  </div>
                </div>
                <p className="font-heading font-normal text-[16px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 flex-1">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}