"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { FloatingShapes } from "@/src/components/FloatingShapes";

const REVIEWS = [
  { name: "Angeline Liu", role: "Food Vlogger", avatar: "/Mask group (1).png", rating: 4.9, time: "2 months ago", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla. Vestibulum tellus mi, posuere vel turpis consequat, volutpat imperdiet ex." },
  { name: "David Chen", role: "Chef", avatar: "/Mask group (21).png", rating: 5.0, time: "1 month ago", text: "Amazing service and lightning-fast delivery. The food always arrives hot and fresh, and the courier tracking is spot on. MealMover has become part of my weekly routine." },
  { name: "Sarah Kim", role: "Blogger", avatar: "/Mask group (22).png", rating: 4.8, time: "3 weeks ago", text: "Best food delivery app I've used so far. Huge restaurant selection, smooth checkout, and the promo codes actually save money. Highly recommend to anyone who loves good food." },
];

export function CustomerSay() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const progress = ((selected + 1) / REVIEWS.length) * 100;

  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "10%", left: "2%" },
        { top: "70%", right: "3%" },
        { top: "40%", left: "1%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <div className="flex justify-center lg:justify-start">
          <img src="/Group 1000002260.png" alt="Customer statistics" className="w-full max-w-[531px] object-contain" />
        </div>

        <div className="flex flex-col gap-6">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">What They Say</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[55px] leading-[110%] tracking-[0.01em] text-neutral-800">
            What Our Customer Say About MealMover
          </h2>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {REVIEWS.map((r) => (
                <div key={r.name} className="flex-[0_0_100%] min-w-0">
                  <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-4">
                      <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">{r.name}</p>
                        <p className="font-heading font-normal text-[16px] text-neutral-500">{r.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                        <span className="font-heading font-medium text-[20px] text-neutral-800">{r.rating}</span>
                        <span className="font-heading font-light text-[18px] text-neutral-500">/ 5.0</span>
                      </div>
                      <p className="font-heading font-normal text-[14px] text-neutral-400 mt-1">{r.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 h-1 rounded-full bg-neutral-200 relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full rounded-full bg-[#FFCF27] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <button onClick={() => emblaApi?.scrollPrev()} className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
              <img src="/arrow-left.svg" alt="prev" className="w-4 h-4 object-contain" />
            </button>
            <button onClick={() => emblaApi?.scrollNext()} className="w-11 h-11 rounded-full bg-[#EF5B5B] hover:bg-[#CD424E] flex items-center justify-center transition-colors">
              <img src="/arrow-right.svg" alt="next" className="w-4 h-4 object-contain brightness-0 invert" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}