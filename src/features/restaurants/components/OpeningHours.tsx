"use client";

import { useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/src/lib/utils";

function parseTime(t: string): number {
  const clean = t.trim().replace(".", ":");
  const [h, m] = clean.split(":").map((n) => parseInt(n, 10));
  return (h || 0) * 60 + (m || 0);
}

function getOpenStatus(openingHours: string) {
  const [openRaw = "08.00", closeRaw = "23.00"] = openingHours.split("-").map((s) => s.trim());
  const openMin = parseTime(openRaw);
  const closeMin = parseTime(closeRaw);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const isOpen = closeMin > openMin ? nowMin >= openMin && nowMin < closeMin : nowMin >= openMin || nowMin < closeMin;
  return { isOpen, raw: openingHours };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function buildWeekSchedule(openingHours: string) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  return DAYS.map((day, i) => ({ day, hours: openingHours, isToday: i === todayIdx }));
}

export function OpeningHours({ openingHours }: { openingHours: string }) {
  const [open, setOpen] = useState(false);
  const status = getOpenStatus(openingHours);
  const week = buildWeekSchedule(openingHours);

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 font-heading font-medium text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em]">
        <span className={status.isOpen ? "text-[#1A9E82]" : "text-[#EF5B5B]"}>
          {status.isOpen ? "Open Now" : "Closed"}
        </span>
        <span className="font-heading font-normal text-[20px] sm:text-[24px] leading-[150%] text-neutral-600">
          | Today: {status.raw}
        </span>
        <ChevronRight size={20} className={cn("text-neutral-500 transition-transform", open && "rotate-90")} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-full mt-3 z-50 w-[280px] rounded-[20px] bg-white border border-neutral-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-[#EF5B5B]" />
                <span className="font-heading font-semibold text-[16px] text-neutral-800">Opening Hours</span>
                <span className={cn("ml-auto text-[12px] font-medium px-2 py-0.5 rounded-full", status.isOpen ? "bg-[#1A9E82]/10 text-[#1A9E82]" : "bg-[#EF5B5B]/10 text-[#EF5B5B]")}>
                  {status.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {week.map((d) => (
                  <li key={d.day} className={cn("flex items-center justify-between text-[14px] font-heading px-2 py-1 rounded-lg", d.isToday ? "bg-neutral-100 font-medium text-neutral-800" : "text-neutral-500")}>
                    <span>{d.day}</span>
                    <span>{d.hours}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}