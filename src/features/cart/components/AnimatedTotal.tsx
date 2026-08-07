"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

export function AnimatedTotal({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => `$${v.toFixed(2)}`);

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.4, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
}