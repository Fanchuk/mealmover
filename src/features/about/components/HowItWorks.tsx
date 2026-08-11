"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { FloatingShapes } from "@/src/components/FloatingShapes";

const STEPS = [
  { illo: "/Layer_20.svg",          title: "Online Order with Our Platform" },
  { illo: "/Group.svg",             title: "The Chef will Cook Your Food" },
  { illo: "/Layer_1.svg",           title: "Wait for the Courier to Deliver" },
  { illo: "/Layer_15.svg",          title: "The Order Reaches You" },
];

export function HowItWorks() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "5%", left: "2%" },
        { top: "50%", right: "2%" },
        { top: "88%", left: "4%" },
        { top: "20%", right: "5%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">How It Works</span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-12 lg:mb-16">
          Get your favorite food<br className="hidden sm:block" /> in an easy way
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 w-full">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="h-[220px] flex items-center justify-center mb-6">
                <img src={step.illo} alt="" className="max-h-[220px] w-auto object-contain" />
              </div>
              <h3 className="font-heading font-bold text-[22px] sm:text-[25px] leading-[132%] text-neutral-800 max-w-[220px]">{step.title}</h3>
              <p className="font-heading font-normal text-[16px] leading-[150%] text-neutral-500 mt-3 max-w-[220px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setVideoOpen(true)} 
          className="mt-12 lg:mt-16 flex items-center gap-3 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] pl-8 pr-2 font-heading font-medium text-[16px] tracking-wider text-white uppercase"
        >
          Learn How to Order
          <img src="/play-circle.svg" alt="Play" className="w-10 h-10 object-contain" />
        </button>
      </div>

      {videoOpen && (
        <div onClick={() => setVideoOpen(false)} className="fixed inset-0 z-[80] bg-black/70 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[860px] aspect-video rounded-[20px] overflow-hidden relative bg-black">
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
              <X size={20} />
            </button>
            <iframe
              src="https://www.youtube.com/embed/ZJy1ajvMU1k?autoplay=1"
              title="How to order"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}