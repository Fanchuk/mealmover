"use client";

import { FloatingShapes } from "@/src/components/FloatingShapes";

const FEATURES = [
  { icon: "/takoyaki.svg",      title: "Fresh Food",   desc: "Fast delivery guaranteed. Get it fast" },
  { icon: "/fast delivery.svg", title: "Fast Delivery",desc: "Our restaurant partners have been carefully" },
  { icon: "/award.svg",         title: "Quality Food", desc: "Our couriers have proven their friendliness" },
  { icon: "/smile.svg",         title: "24/7 Service", desc: "Our couriers have proven their friendliness" },
];

export function WhyBest() {
  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "8%", right: "2%" },
        { top: "55%", left: "1%" },
        { top: "85%", right: "4%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <div className="flex justify-center">
          <img src="/Layer_9.svg" alt="Why choose us" className="w-full max-w-[520px] object-contain" />
        </div>

        <div className="flex flex-col gap-6">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">Why Choose Us</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800">
            Why We Are the Best
          </h2>
          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600">
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla. Vestibulum tellus mi, posuere vel turpis consequat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="w-16 h-16 rounded-full bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] flex items-center justify-center flex-shrink-0">
                  <img src={f.icon} alt="" className="w-7 h-7 object-contain" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-[20px] sm:text-[25px] tracking-[0.02em] text-neutral-800">{f.title}</h3>
                  <p className="font-heading font-normal text-[16px] leading-[150%] text-neutral-600 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}