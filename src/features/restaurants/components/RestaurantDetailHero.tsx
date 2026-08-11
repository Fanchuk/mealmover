"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { OpeningHours } from "./OpeningHours";
import { LocationSelect } from "./LocationSelect";
import { StatModal } from "./StatModal";
import { getRestaurantStats, type Restaurant } from '../data/restaurantStats'
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface Location {
  id: string;
  title: string;
  street: string;
  city: string;
  isDefault: boolean;
}

type ModalKey = null | "rating" | "distance" | "time" | "price";

export function RestaurantDetailHero({
  restaurant,
  locations,
}: {
  restaurant: Restaurant;
  locations: Location[];
}) {
  const [modal, setModal] = useState<ModalKey>(null);
  const stats = getRestaurantStats(restaurant);

  return (
    <section className="bg-white relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "10%", left: "2%" },
        { top: "60%", right: "3%" },
        { top: "80%", left: "5%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 lg:mb-12">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px] flex-wrap">
            <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <Link href="/restaurants" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Restaurants</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">{restaurant.name}</span>
          </nav>
          <LocationSelect locations={locations} />
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 relative z-10">
          <img src={restaurant.image} alt={restaurant.name} className="w-full md:w-[235px] h-[220px] md:h-[235px] object-cover rounded-[24px] flex-shrink-0" />
          <div className="flex flex-col gap-4">
            <h1 className="font-heading font-medium text-[32px] sm:text-[42px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800">{restaurant.name}</h1>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#EF5B5B] flex-shrink-0" />
              <span className="font-heading font-light text-[16px] sm:text-[24px] text-neutral-600">{restaurant.street}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {restaurant.tags.map((tag) => (
                <span key={tag.name} className="font-heading font-normal text-[14px] sm:text-[20px] tracking-[0.02em] text-neutral-600 bg-neutral-100 rounded-[12px] px-3 py-2 uppercase">
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <OpeningHours openingHours={restaurant.openingHours} />
              {restaurant.isRestaurantOfChoice && (
                <div className="flex items-center gap-2">
                  <BadgeCheck size={28} className="text-[#1A9E82]" />
                  <span className="font-heading font-medium text-[18px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-center text-[#147A64]">Restaurant of Choice</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-neutral-100 rounded-[30px] px-4 sm:px-6 lg:px-12 py-6 lg:py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:flex sm:items-stretch relative z-10">
          {stats.map((s, i) => (
            <div key={s.key} className="contents sm:flex sm:flex-1 sm:items-center">
              <motion.button
                onClick={() => setModal(s.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex-1 flex flex-col items-center sm:items-start gap-1 sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <div className="flex items-center gap-2">
                  {s.icon}
                  <span className="font-heading font-medium text-[20px] sm:text-[25px] text-neutral-800">{s.value}</span>
                  {s.sub && <span className="font-heading font-light text-[18px] sm:text-[24px] text-neutral-600">{s.sub}</span>}
                </div>
                <span className="font-heading font-medium text-[15px] sm:text-[20px] text-[#1A9E82]">{s.label}</span>
              </motion.button>
              {i < stats.length - 1 && <div className="hidden sm:block w-[2px] bg-neutral-200 self-center h-[82px]" />}
            </div>
          ))}
        </div>
      </div>

      <StatModal open={modal === "rating"} onClose={() => setModal(null)} title="Ratings & Reviews">
        <p className="mb-3">
          <span className="font-bold text-[#EF5B5B] text-[20px]">{restaurant.rating}</span> / 5.0 based on{" "}
          <span className="font-medium">{restaurant.reviewCount.toLocaleString()}</span> reviews.
        </p>
        <a href="#reviews" onClick={() => setModal(null)} className="inline-flex items-center gap-1 text-[#1A9E82] font-medium">
          Jump to all reviews <ChevronRight size={16} />
        </a>
      </StatModal>

      <StatModal open={modal === "distance"} onClose={() => setModal(null)} title="Distance">
        <p className="mb-3">
          You are approximately <span className="font-medium">{restaurant.distanceKm} km</span> away from this restaurant.
        </p>
        <a href="#location" onClick={() => setModal(null)} className="inline-flex items-center gap-1 text-[#1A9E82] font-medium">
          View on map <ChevronRight size={16} />
        </a>
      </StatModal>

      <StatModal open={modal === "time"} onClose={() => setModal(null)} title="Delivery Time">
        <p>
          Estimated delivery: <span className="font-medium">{restaurant.deliveryMinMin}–{restaurant.deliveryMaxMin} minutes</span>.
        </p>
        <p className="mt-2 text-neutral-500 text-[14px]">Times may vary during peak hours.</p>
      </StatModal>

      <StatModal open={modal === "price"} onClose={() => setModal(null)} title="Price Range">
        <p className="mb-2">
          Average check: <span className="font-medium">{restaurant.priceRange}</span>.
        </p>
        <p className="text-neutral-500 text-[14px]">
          Price level: {"$".repeat(restaurant.priceLevel)}{"$".repeat(4 - restaurant.priceLevel).replace(/./g, "·")}
        </p>
      </StatModal>
    </section>
  );
}