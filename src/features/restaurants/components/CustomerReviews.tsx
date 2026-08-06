"use client";

import { useRef, useState } from "react";
import { Star, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn, formatDate } from "@/src/lib/utils";
import { ReviewForm } from "./ReviewForm";

interface Review {
  id: string;
  rating: number;
  comment: string;
  aspect: string | null;
  orderedItems: string[];
  purchasedAt: Date;
  user: { name: string | null; image: string | null; memberSince: number | null };
}

interface ReviewStats {
  all: { count: number; avg: number };
  price: { count: number; avg: number };
  taste: { count: number; avg: number };
  hygiene: { count: number; avg: number };
  packaging: { count: number; avg: number };
}

const TABS = [
  { id: "all", label: "All Reviews", icon: "/📝.png", statKey: "all" as const, aspect: null },
  { id: "price", label: "Price", icon: "/💰.png", statKey: "price" as const, aspect: "PRICE" },
  { id: "taste", label: "Taste", icon: "/🥧.png", statKey: "taste" as const, aspect: "TASTE" },
  { id: "hygiene", label: "Hygiene", icon: "/✨.png", statKey: "hygiene" as const, aspect: "HYGIENE" },
  { id: "packaging", label: "Packaging", icon: "/🥡.png", statKey: "packaging" as const, aspect: "PACKAGING" },
];

export function CustomerReviews({
  restaurantId,
  canReview,
  reviews,
  stats,
}: {
  restaurantId: string;
  canReview: boolean;
  reviews: Review[];
  stats: ReviewStats;
}) {
  const [active, setActive] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS.find((t) => t.id === active)!;
  const filtered = activeTab.aspect === null ? reviews : reviews.filter((r) => r.aspect === activeTab.aspect);
  const visible = showAll ? filtered : [];

  const virtualizer = useVirtualizer({
    count: visible.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 260,
    overscan: 4,
  });

  return (
    <section id="reviews" className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="w-full h-[50px] rounded-[20px] bg-[#EF5B5B]/10 flex items-center justify-center gap-2 mb-8 lg:mb-10">
          <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">Customer Reviews</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {TABS.map((tab) => {
            const stat = stats[tab.statKey];
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActive(tab.id); setShowAll(false); }}
                className={cn(
                  "relative rounded-[30px] p-6 flex flex-col items-center gap-2 transition-colors duration-200 border-2",
                  isActive ? "border-[#CD424E]" : "bg-white border-neutral-300 hover:border-[#EF5B5B]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="review-tab-bg"
                    className="absolute inset-0 rounded-[28px] bg-[#EF5B5B]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  <img src={tab.icon} alt={tab.label} className="w-12 h-12 object-contain" />
                  <span className={cn("font-heading font-medium text-[20px] sm:text-[25px] text-center", isActive ? "text-white" : "text-[#EF5B5B]")}>{tab.label}</span>
                  <span className={cn("font-heading font-light text-[16px] sm:text-[20px] text-center", isActive ? "text-white/80" : "text-neutral-600")}>{stat.count} Reviews</span>
                  <span className="flex items-center gap-1.5">
                    <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                    <span className={cn("font-heading font-medium text-[20px] sm:text-[25px]", isActive ? "text-white" : "text-neutral-800")}>{stat.avg.toFixed(1)}</span>
                    <span className={cn("font-heading font-light text-[18px] sm:text-[24px]", isActive ? "text-white/70" : "text-neutral-600")}>/ 5.0</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length > 0 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="w-full h-[57px] rounded-[50px] bg-neutral-100 border border-neutral-200 flex items-center justify-center gap-2 font-heading font-medium text-[20px] text-[#EF5B5B] mt-6 lg:mt-8"
          >
            {showAll ? "Hide Reviews" : "See All Reviews"}
            <ChevronUp size={20} className={cn("transition-transform", showAll && "rotate-180")} />
          </button>
        )}

        <AnimatePresence initial={false}>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-8"
            >
              <div ref={scrollRef} className="max-h-[720px] overflow-y-auto pr-2">
                <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
                  {virtualizer.getVirtualItems().map((row) => {
                    const rev = visible[row.index];
                    return (
                      <div
                        key={rev.id}
                        ref={virtualizer.measureElement}
                        data-index={row.index}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${row.start}px)` }}
                        className="pb-5"
                      >
                        <div className="border border-neutral-300 rounded-[40px] p-6 lg:p-8 flex flex-col gap-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <img src={rev.user.image ?? `https://i.pravatar.cc/300?u=${rev.user.name}`} alt={rev.user.name ?? "User"} className="w-[68px] h-[68px] rounded-full object-cover flex-shrink-0" />
                              <div>
                                <p className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">{rev.user.name}</p>
                                <p className="font-heading font-normal text-[18px] text-neutral-500">User since {rev.user.memberSince ?? 2022}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 border border-neutral-200 rounded-[14px] px-3.5 py-2.5 bg-white flex-shrink-0">
                              <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                              <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">{rev.rating}</span>
                            </div>
                          </div>
                          {rev.orderedItems.length > 0 && (
                            <div className="flex items-center gap-3">
                              <img src="/pie.svg" alt="" className="w-6 h-6 object-contain" />
                              <span className="font-heading font-light text-[20px] text-neutral-800">{rev.orderedItems.join(", ")}</span>
                            </div>
                          )}
                          <p className="font-heading font-normal text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700">&ldquo;{rev.comment}&rdquo;</p>
                          <div className="border-t border-dashed border-neutral-200 pt-4">
                            <span className="font-heading font-normal text-[16px] text-neutral-400">Purchased on {formatDate(rev.purchasedAt)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 lg:mt-12">
          <ReviewForm restaurantId={restaurantId} canReview={canReview} />
        </div>
      </div>
    </section>
  );
}