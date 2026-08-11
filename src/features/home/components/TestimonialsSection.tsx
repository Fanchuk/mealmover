"use client";

import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
}

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        
        <div className="flex-shrink-0 w-full lg:w-[320px] relative z-20">
          <img src="/Group 1000002224.png" alt="" className="w-[140px] lg:w-[180px] mb-6 lg:mb-8" />
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[39px] leading-[123%] tracking-[0.01em] text-neutral-800 mt-2 mb-6 lg:mb-8">
            What They Say About Us
          </h2>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] border border-neutral-300 flex items-center justify-center text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full min-h-[500px] lg:h-[615px] rounded-[24px] bg-[#EF5B5B] overflow-hidden">
          <img src="/Ellipse 25 (1).png" alt="" className="absolute top-0 left-0 w-20 h-20 lg:w-28 lg:h-28 z-10 object-contain" />
          <img src="/Ellipse 25 (1).png" alt="" className="absolute bottom-0 right-0 w-20 h-20 lg:w-28 lg:h-28 rotate-180 z-10 object-contain" />

          <div
            className="absolute inset-x-4 lg:inset-x-6 top-[60px] lg:top-[80px] bottom-[60px] lg:bottom-[80px] z-20 overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex h-full gap-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.5rem)] min-w-0 bg-white rounded-[20px] p-5 lg:p-8 shadow-[0_16px_40px_0_rgba(0,0,0,0.05)] flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-[18px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
                        {t.name}
                      </p>
                      <p className="font-heading font-normal text-[16px] lg:text-[18px] leading-[150%] text-neutral-500">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <p className="font-heading font-normal text-[16px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 flex-1">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}