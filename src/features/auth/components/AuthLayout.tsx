"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px]"
        >
          {children}
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#EF5B5B] items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <img src="/Mask group (24).png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center max-w-[420px]">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <img src="/Logo.svg" alt="MealMover" className="h-10 w-auto brightness-0 invert" />
            <span className="font-heading font-bold text-[26px] text-white">MealMover</span>
          </Link>
          <h2 className="font-heading font-bold text-[36px] text-white leading-[124%]">
            Great food is just a few clicks away
          </h2>
          <p className="font-heading text-[17px] text-white/80 mt-4">
            Sign in to order from your favourite restaurants, track deliveries, and save your addresses.
          </p>
        </div>
      </div>
    </div>
  );
}