"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { JoinModal } from "./JoinModal";
import { FloatingShapes } from "@/src/components/FloatingShapes";

const CARDS = [
  { type: "courier" as const, title: "Join Courier", image: "/courier2.webp" },
  { type: "merchant" as const, title: "Join Merchant", image: "/courier1.avif" },
];

export function PartnerSection() {
  const [activeModal, setActiveModal] = useState<"courier" | "merchant" | null>(null);

  return (
    <section id="partner" className="bg-white py-12 lg:py-20 overflow-hidden relative">
      <FloatingShapes positions={[
        { top: "10%", left: "22%" },
        { top: "10%", right: "22%" },
        { top: "35%", left: "15%" },
        { top: "35%", right: "15%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center relative z-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center"
        >
          Join Partnership
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-10 lg:mb-14 max-w-[720px]"
        >
          Join Us to Expand Your Restaurant Market
        </motion.h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveModal(card.type)}
              className="group relative h-[300px] lg:h-[419px] rounded-[32px] lg:rounded-[40px] overflow-hidden block text-left"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-6 left-6 font-heading font-bold text-[24px] lg:text-[32px] text-white">
                {card.title}
              </span>
              <span className="absolute bottom-6 right-6 w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#EF5B5B] flex items-center justify-center text-white group-hover:bg-[#CD424E] transition-colors">
                <ArrowUpRight size={22} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <JoinModal type={activeModal ?? "courier"} open={activeModal !== null} onClose={() => setActiveModal(null)} />
    </section>
  );
}