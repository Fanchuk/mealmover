"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ORDER_STAGES } from "../types";
import { cn } from "@/src/lib/utils";

export function OrderProgress({ status }: { status: string }) {
  const currentIdx = ORDER_STAGES.findIndex((s) => s.status === status);
  const activeIdx = status === "PENDING" ? -1 : currentIdx;
  const progress = activeIdx < 0 ? 0 : (activeIdx / (ORDER_STAGES.length - 1)) * 100;

  return (
    <div className="my-5">
      <div className="relative">
        <div className="absolute top-[14px] left-0 right-0 h-1 bg-neutral-200 rounded-full" />
        <motion.div
          className="absolute top-[14px] left-0 h-1 bg-[#1A9E82] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="relative flex justify-between">
          {ORDER_STAGES.map((stage, i) => {
            const done = activeIdx >= i;
            const isCurrent = activeIdx === i;
            return (
              <div key={stage.status} className="flex flex-col items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{ scale: isCurrent ? [1, 1.2, 1] : 1 }}
                  transition={isCurrent ? { repeat: Infinity, duration: 1.5 } : {}}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center border-2 bg-white z-10 transition-colors",
                    done ? "border-[#1A9E82] bg-[#1A9E82]" : "border-neutral-300"
                  )}
                >
                  {done && <Check size={14} className="text-white" />}
                </motion.div>
                <span className={cn("font-heading text-[12px] text-center", done ? "text-neutral-800 font-medium" : "text-neutral-400")}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}