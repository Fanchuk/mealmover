"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface Location {
  id: string;
  title: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export function LocationSelect({ locations }: { locations: Location[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Location | undefined>(
    locations.find((l) => l.isDefault) ?? locations[0]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-5 h-[52px] hover:border-[#EF5B5B] transition-colors"
      >
        <MapPin size={18} className="text-[#EF5B5B] flex-shrink-0" />
        <span className="font-heading font-normal text-[16px] text-neutral-800 whitespace-nowrap">
          {selected?.title ?? "Select location"}
        </span>
        <ChevronDown size={18} className={cn("text-neutral-500 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full mt-2 z-50 w-[280px] rounded-[20px] bg-white border border-neutral-200 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] p-2"
          >
            <p className="font-heading text-[12px] uppercase tracking-[0.08em] text-neutral-400 px-3 py-2">
              Deliver to
            </p>
            {locations.map((loc) => {
              const isActive = selected?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelected(loc);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-2.5 rounded-[14px] text-left transition-colors",
                    isActive ? "bg-[#EF5B5B]/10" : "hover:bg-neutral-50"
                  )}
                >
                  <MapPin size={18} className="text-[#EF5B5B] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-medium text-[15px] text-neutral-800">{loc.title}</p>
                    <p className="font-heading text-[13px] text-neutral-400 truncate">{loc.street}</p>
                  </div>
                  {isActive && <Check size={18} className="text-[#EF5B5B] flex-shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}