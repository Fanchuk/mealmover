// src/components/FloatingShapes.tsx
"use client";

import { motion } from "motion/react";

const SHAPES = [
  { src: "/Rectangle 227 (1).svg", size: 12 },
  { src: "/Rectangle 230 (1).svg", size: 14 },
  { src: "/Rectangle 228.svg", size: 12 },
  { src: "/Rectangle 236 (1).svg", size: 16 },
  { src: "/Rectangle 675.svg", size: 14 },
  { src: "/Rectangle 676.svg", size: 14 },
];

export function FloatingShapes({ positions }: { positions: { top: string; left?: string; right?: string }[] }) {
  return (
    <>
      {positions.map((pos, i) => {
        const shape = SHAPES[i % SHAPES.length];
        return (
          <motion.img
            key={i}
            src={shape.src}
            alt=""
            width={shape.size}
            height={shape.size}
            className="absolute pointer-events-none"
            style={{ top: pos.top, left: pos.left, right: pos.right }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}