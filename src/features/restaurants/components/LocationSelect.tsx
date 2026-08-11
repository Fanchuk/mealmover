"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { MapPin, ChevronDown, Check, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { saveAddress } from "../services/addressActions";

interface Location {
  id: string;
  title: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export function LocationSelect({ locations }: { locations: Location[] }) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [extraLocations, setExtraLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | undefined>(
    locations.find((l) => l.isDefault) ?? locations[0]
  );
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setAdding(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleSave() {
    if (!newTitle.trim() || !newStreet.trim()) return;

    startTransition(async () => {
      const res = await saveAddress(newTitle.trim(), newStreet.trim());

      if (!res.ok) {
        toast.error(res.error);
        return;
      }

      const loc: Location = {
        id: res.id,
        title: newTitle.trim(),
        street: newStreet.trim(),
        city: "",
        isDefault: false,
      };

      setExtraLocations((prev) => [...prev, loc]);
      setSelected(loc);
      setNewTitle("");
      setNewStreet("");
      setAdding(false);
      setOpen(false);
      toast.success(`Saved: ${loc.title}`);
    });
  }

  const allLocations = [...locations, ...extraLocations];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-5 h-[52px] hover:border-[#EF5B5B] transition-colors"
      >
        <MapPin size={18} className="text-[#EF5B5B] flex-shrink-0" />
        <span className="font-heading font-normal text-[16px] text-neutral-800 whitespace-nowrap max-w-[160px] truncate">
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
            className="absolute right-0 top-full mt-2 z-50 w-[300px] rounded-[20px] bg-white border border-neutral-200 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] p-2 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!adding ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="font-heading text-[12px] uppercase tracking-[0.08em] text-neutral-400 px-3 py-2">
                    Deliver to
                  </p>
                  <div className="max-h-[260px] overflow-y-auto">
                    {allLocations.map((loc) => {
                      const isActive = selected?.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => { setSelected(loc); setOpen(false); }}
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
                  </div>
                  <button
                    onClick={() => setAdding(true)}
                    className="w-full mt-1 flex items-center gap-2 px-3 py-2.5 rounded-[14px] text-[#EF5B5B] font-heading font-medium text-[15px] hover:bg-[#EF5B5B]/5 transition-colors border-t border-neutral-100"
                  >
                    <Plus size={18} /> Add new address
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="p-3 flex flex-col gap-2"
                >
                  <p className="font-heading font-semibold text-[15px] text-neutral-800 px-1">New address</p>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Label (e.g. Home, Office)"
                    autoFocus
                    className="w-full h-[42px] rounded-[12px] border border-neutral-200 px-3 font-heading text-[14px] outline-none focus:border-[#EF5B5B] transition-colors"
                  />
                  <input
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    placeholder="Street & number"
                    className="w-full h-[42px] rounded-[12px] border border-neutral-200 px-3 font-heading text-[14px] outline-none focus:border-[#EF5B5B] transition-colors"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => { setAdding(false); setNewTitle(""); setNewStreet(""); }}
                      className="flex-1 h-[40px] rounded-[12px] border border-neutral-200 font-heading text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={pending || !newTitle.trim() || !newStreet.trim()}
                      className="flex-1 h-[40px] rounded-[12px] bg-[#EF5B5B] text-white font-heading font-medium text-[13px] hover:bg-[#CD424E] transition-colors disabled:opacity-50"
                    >
                      {pending ? "Saving..." : "Save"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}