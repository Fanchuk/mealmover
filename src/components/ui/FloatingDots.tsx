"use client";

import { motion } from "motion/react";

const DOTS = [
  { src: "/Rectangle 234 (1).svg", top: "8%", left: "6%", size: 18, dur: 7 },
  { src: "/Rectangle 227 (1).svg", top: "18%", left: "90%", size: 16, dur: 9 },
  { src: "/Rectangle 236 (1).svg", top: "40%", left: "4%", size: 22, dur: 8 },
  { src: "/Rectangle 235.svg", top: "62%", left: "93%", size: 20, dur: 10 },
  { src: "/Rectangle 232.svg", top: "78%", left: "10%", size: 16, dur: 6 },
  { src: "/Ellipse 7 (1).svg", top: "30%", left: "95%", size: 14, dur: 11 },
  { src: "/Rectangle 227 (1).svg", top: "88%", left: "82%", size: 18, dur: 8 },
  { src: "/Rectangle 234 (1).svg", top: "6%", left: "72%", size: 14, dur: 9 },
];

export function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {DOTS.map((dot, i) => (
        <motion.img
          key={i}
          src={dot.src}
          alt=""
          className="absolute hidden md:block"
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, opacity: 0.6 }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: dot.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}