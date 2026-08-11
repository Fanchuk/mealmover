"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Confetti() {
  useEffect(() => {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.3 },
      colors: ["#EF5B5B", "#FFCF27", "#1A9E82", "#028DFF", "#CD424E"],
    });
  }, []);

  return null;
}