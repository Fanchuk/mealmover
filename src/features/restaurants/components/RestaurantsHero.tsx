"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { RestaurantListItem } from "../types";

function highlight(name: string, q: string) {
  if (!q) return name;
  const i = name.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return name;
  return (
    <>
      {name.slice(0, i)}
      <mark className="bg-[#FFCF27]/40 text-inherit rounded px-0.5">{name.slice(i, i + q.length)}</mark>
      {name.slice(i + q.length)}
    </>
  );
}

export function RestaurantsHero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<RestaurantListItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q.trim().length < 1) { setResults([]); setOpen(false); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/restaurants?q=${encodeURIComponent(q)}&page=1`);
        const data = await res.json();
        setResults((data.items ?? []).slice(0, 5));
        setOpen(true);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function goToRestaurant(slug: string) { setOpen(false); router.push(`/restaurants/${slug}`); }
  function submit() { if (results[0]) goToRestaurant(results[0].slug); }

  return (
    <section className="relative bg-white pt-12 lg:pt-20 pb-32 lg:pb-40 overflow-visible">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">
          Restaurants
        </span>
        <h1 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[120%] text-neutral-800 mt-3 max-w-[900px]">
          Find your next favourite meal
        </h1>
        <p className="font-heading text-[15px] sm:text-[18px] text-neutral-500 mt-4 max-w-[640px]">
          Search across every restaurant near you — from quick bites to fine dining, all in one place.
        </p>

        <div ref={boxRef} className="relative w-full max-w-[860px] mt-10 z-50">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-[50px] pl-5 pr-2 h-[64px] sm:h-[72px] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)]">
            <Search size={22} className="text-neutral-400 flex-shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              onFocus={() => results.length && setOpen(true)}
              placeholder="Search restaurants..."
              className="flex-1 bg-transparent outline-none font-heading text-[18px] sm:text-[22px] text-neutral-800 placeholder:text-neutral-400 min-w-0"
            />
            <button
              onClick={submit}
              className="flex-shrink-0 h-[48px] sm:h-[56px] px-6 sm:px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] sm:text-[18px] hover:bg-[#CD424E] transition-colors"
            >
              Search
            </button>
          </div>

          <AnimatePresence>
            {open && (results.length > 0 || loading) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white/90 backdrop-blur-md rounded-[24px] border border-white/60 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] overflow-hidden z-50 text-left"
              >
                {loading && results.length === 0 ? (
                  <div className="p-5 text-center font-heading text-neutral-400 text-[15px]">Searching...</div>
                ) : (
                  results.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => goToRestaurant(r.slug)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#EF5B5B]/5 transition-colors"
                    >
                      <img src={r.image} alt={r.name} className="w-[56px] h-[56px] rounded-[14px] object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-medium text-[18px] text-neutral-800 truncate text-left">
                          {highlight(r.name, q)}
                        </p>
                        <p className="font-heading text-[14px] text-neutral-400 truncate text-left">{r.street}</p>
                      </div>
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}