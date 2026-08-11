"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { advanceOrderStatus } from "../services/orderActions";

export function CourierMap({ driverName, orderId }: { driverName: string; orderId?: string }) {
  const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 0.95 ? 0.1 : p + 0.04));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const start = { x: 40, y: 160 };
  const end = { x: 360, y: 60 };
  const ctrl = { x: 200, y: 10 };
  const t = progress;
  const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * ctrl.x + t ** 2 * end.x;
  const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * ctrl.y + t ** 2 * end.y;

  return (
    <div className="my-5 rounded-[20px] overflow-hidden border border-neutral-200 bg-[#EAF4F0] relative h-[200px]">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <path d={`M${start.x},${start.y} Q${ctrl.x},${ctrl.y} ${end.x},${end.y}`} fill="none" stroke="#B8D8CD" strokeWidth="4" strokeDasharray="8 6" />
        <circle cx={start.x} cy={start.y} r="10" fill="#EF5B5B" />
        <text x={start.x} y={start.y + 28} fontSize="11" textAnchor="middle" fill="#666" fontFamily="sans-serif">Restaurant</text>
        <circle cx={end.x} cy={end.y} r="10" fill="#1A9E82" />
        <text x={end.x} y={end.y - 16} fontSize="11" textAnchor="middle" fill="#666" fontFamily="sans-serif">You</text>
        <motion.g animate={{ x, y }} transition={{ duration: 0.8, ease: "linear" }} style={{ x, y }}>
          <circle r="14" fill="white" stroke="#EF5B5B" strokeWidth="2" />
          <text fontSize="16" textAnchor="middle" dy="6">🛵</text>
        </motion.g>
      </svg>
      <div className="absolute bottom-3 left-3 bg-white rounded-[12px] px-3 py-2 shadow-sm flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A9E82] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1A9E82]" />
        </span>
        <span className="font-heading text-[13px] text-neutral-700">{driverName} is on the way</span>
      </div>
    </div>
  );
}