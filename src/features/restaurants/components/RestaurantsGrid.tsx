"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import gsap from "gsap";
import { Star, DollarSign } from "lucide-react";
import { RestaurantsApiResponse, RestaurantListItem } from "../types";
import { RestaurantCard } from "./RestaurantCard";
import { useRestaurantsAnimation } from "../hooks/useRestaurantsAnimation";
import { PRICE_OPTIONS, SORT_OPTIONS } from '../data/filterOptions'
import { useUpdateFilter } from "../hooks/useUpdateFilter";
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface RestaurantsGridProps {
  initialItems: RestaurantListItem[];
  totalCount: number;
}

async function fetchPages(searchParamsString: string, page: number) {
  const params = new URLSearchParams(searchParamsString);
  params.set("page", String(page));
  const res = await fetch(`/api/restaurants?${params.toString()}`);
  return res.json() as Promise<RestaurantsApiResponse>;
}

export function RestaurantsGrid({ initialItems, totalCount }: RestaurantsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateFilter = useUpdateFilter();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useRestaurantsAnimation(sectionRef);

  const spString = searchParams.toString();
  
  useEffect(() => {
    setExpanded(false);
  }, [spString]);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["restaurants", spString],
    queryFn: ({ pageParam }) => fetchPages(spString, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: expanded,
  });

  useEffect(() => {
    if (!expanded || !loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) fetchNextPage();
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [expanded, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (!expanded) return;
    gsap.from(".restaurant-card", {
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [data?.pages.length, expanded]);

  const items = expanded ? data?.pages.flatMap((p) => p.items) ?? [] : initialItems;

  function resetFilters() {
    router.push("/restaurants", { scroll: false });
  }

  const activePrice = searchParams.get("price");
  const activeSort = searchParams.get("sort");
  const hasActiveFilters = spString.length > 0;

  return (
    <section ref={sectionRef} id="restaurants-list" className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "5%", right: "2%" },
        { top: "50%", left: "1%" },
        { top: "90%", right: "4%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">
          Restaurants
        </span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 max-w-[820px]">
          What is the best restaurant around me?
        </h2>

        <div className="w-full mt-10 lg:mt-14">
          <div className="filter-fade flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2 flex-shrink-0 w-[90px]">
              <DollarSign size={16} className="text-neutral-400" />
              <span className="font-heading text-[13px] font-medium text-neutral-400 uppercase tracking-[0.08em]">
                Price
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {PRICE_OPTIONS.map((opt) => {
                const isActive = activePrice === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    onClick={() => updateFilter("price", opt.value)}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`relative flex flex-col items-center justify-center w-[76px] h-[56px] rounded-[16px] border font-heading overflow-hidden ${
                      isActive
                        ? "bg-[#EF5B5B] border-[#EF5B5B] shadow-[0_6px_20px_-4px_rgba(239,91,91,0.5)]"
                        : "bg-white border-neutral-200 hover:border-[#EF5B5B]"
                    }`}
                  >
                    <span
                      className={`text-[15px] font-bold leading-none ${
                        isActive ? "text-white" : "text-neutral-700"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isActive ? "text-white/80" : "text-neutral-400"
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="filter-fade w-full h-px bg-neutral-100 my-4" />

          <div className="filter-fade flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2 flex-shrink-0 w-[90px]">
              <Star size={16} className="text-neutral-400" />
              <span className="font-heading text-[13px] font-medium text-neutral-400 uppercase tracking-[0.08em]">
                Sort by
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SORT_OPTIONS.map((opt) => {
                const isActive = activeSort === opt.value;
                const Icon = opt.icon;
                return (
                  <motion.button
                    key={opt.value}
                    onClick={() => updateFilter("sort", opt.value)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`flex items-center gap-2 px-4 h-[42px] rounded-[50px] border font-heading text-[14px] font-medium ${
                      isActive
                        ? "bg-[#EF5B5B] border-[#EF5B5B] text-white shadow-[0_6px_20px_-4px_rgba(239,91,91,0.5)]"
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-[#EF5B5B] hover:text-[#EF5B5B]"
                    }`}
                  >
                    <Icon size={14} />
                    {opt.label}
                  </motion.button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto font-heading text-[13px] text-neutral-400 hover:text-[#EF5B5B] transition-colors underline underline-offset-2"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="filter-fade w-full h-px bg-neutral-100 mt-2 mb-10 lg:mb-14" />
        </div>

        {totalCount === 0 ? (
          <div className="py-16 text-center flex flex-col items-center gap-4">
            <span className="text-5xl">🍽️</span>
            <p className="font-heading font-bold text-[20px] text-neutral-700">
              No restaurants found
            </p>
            <p className="font-heading text-neutral-400 text-sm">Try removing some filters</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center h-[48px] px-6 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {items.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card">
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
              {expanded &&
                isFetching &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-[340px] rounded-[24px] bg-neutral-100 animate-pulse" />
                ))}
            </div>

            {!expanded && totalCount > initialItems.length && (
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center justify-center h-[52px] lg:h-[60px] px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] lg:text-[20px] hover:bg-[#CD424E] transition-colors mt-10 lg:mt-14"
              >
                Show All Resto
              </button>
            )}

            {expanded && <div ref={loadMoreRef} className="h-1 w-full" />}
          </>
        )}
      </div>
    </section>
  );
}