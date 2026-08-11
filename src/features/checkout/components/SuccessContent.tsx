"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Confetti } from "./Confetti";

export function SuccessContent({ orderNumber }: { orderNumber: string }) {
  return (
    <section className="bg-white min-h-[70vh] flex items-center justify-center px-4 py-16 relative">
      <Confetti />
      <div className="max-w-[520px] w-full text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-[#1A9E82] flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 }}
          >
            <Check size={48} className="text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading font-bold text-[32px] sm:text-[42px] text-neutral-800"
        >
          Order confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-heading text-[16px] text-neutral-500 mt-3"
        >
          Thanks for your order. We&apos;ve sent a confirmation to your email and the restaurant is already preparing your food.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-6 py-3 rounded-[16px] bg-neutral-100"
        >
          <span className="font-heading text-[14px] text-neutral-400">Order number</span>
          <p className="font-heading font-bold text-[22px] text-[#EF5B5B] tracking-wider">#{orderNumber}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 mt-8 w-full"
        >
          <Link
            href="/transactions"
            className="flex-1 h-[52px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium flex items-center justify-center hover:bg-[#CD424E] transition-colors"
          >
            Track order
          </Link>
          <Link
            href="/restaurants"
            className="flex-1 h-[52px] rounded-[50px] border border-neutral-300 text-neutral-700 font-heading font-medium flex items-center justify-center hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors"
          >
            Back to menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
}