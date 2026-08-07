"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { RestaurantListItem } from "@/src/features/restaurants/types";

export function RestaurantCard({ restaurant }: { restaurant: RestaurantListItem }) {
  const reviews =
    restaurant.reviewCount > 999
      ? `${(restaurant.reviewCount / 1000).toFixed(0)}K+`
      : `${restaurant.reviewCount}`;

  return (
    <Link href={`/restaurants/${restaurant.slug}`} prefetch className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group bg-[#FDFDFD] border border-neutral-300 rounded-[24px] overflow-hidden flex flex-col h-full hover:border-[#EF5B5B] hover:shadow-[0_16px_40px_-16px_rgba(239,91,91,0.35)] transition-colors"
      >
        <div className="relative h-[180px] sm:h-[200px] mb-5">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white rounded-full px-4 h-[42px] shadow-[0_8px_20px_0_rgba(0,0,0,0.08)] whitespace-nowrap">
            <img src="/Star 2.svg" alt="" className="w-4 h-4" />
            <span className="font-heading font-bold text-[16px] text-[#EF5B5B]">{restaurant.rating}</span>
            <span className="font-heading font-normal text-[14px] text-neutral-500">/ 5.0</span>
            <span className="font-heading font-normal text-[14px] text-neutral-400">({reviews})</span>
          </div>
        </div>

        <div className="p-5 pt-8 flex flex-col gap-3 flex-1">
          <h3 className="font-heading font-bold text-[20px] sm:text-[25px] leading-[140%] text-neutral-800 group-hover:text-[#EF5B5B] transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#EF5B5B] flex-shrink-0 fill-[#EF5B5B]/10" />
            <span className="font-heading font-normal text-[14px] sm:text-[16px] text-neutral-600">
              {restaurant.street}
              {typeof restaurant.distanceKm === "number" && ` · ${restaurant.distanceKm} km`}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap mt-auto">
            {restaurant.tags.map((tag) => (
              <span
                key={tag.id}
                className="font-heading font-normal text-[12px] sm:text-[13px] tracking-[0.05em] text-neutral-500 bg-neutral-100 rounded-lg px-3 py-1.5 uppercase"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}