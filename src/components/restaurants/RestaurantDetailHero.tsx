"use client";

import Link from "next/link";
import { ChevronRight, ChevronDown, MapPin, Clock, Star, BadgeCheck, Utensils } from "lucide-react";

export function RestaurantDetailHero() {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 lg:mb-12">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <Link href="/restaurants" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Restaurants</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">Oriental Restaurant</span>
          </nav>

          <button className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-5 h-[52px] self-start md:self-auto">
            <MapPin size={18} className="text-[#EF5B5B] flex-shrink-0" />
            <span className="font-heading font-normal text-[16px] text-neutral-800 whitespace-nowrap">Garden Bay St</span>
            <ChevronDown size={18} className="text-neutral-500 flex-shrink-0" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          <img src="/Rectangle 670.png" alt="Oriental Restaurant" className="w-full md:w-[235px] h-[220px] md:h-[235px] object-cover rounded-[24px] flex-shrink-0" />

          <div className="flex flex-col gap-4">
            <h1 className="font-heading font-medium text-[38px] sm:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800">
              Oriental Restaurant 1
            </h1>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#EF5B5B] flex-shrink-0" />
              <span className="font-heading font-light text-[18px] sm:text-[24px] text-neutral-600">Sentani Road, 10 Malang</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Asian", "Seafood", "Lunch"].map((tag) => (
                <span key={tag} className="font-heading font-normal text-[16px] sm:text-[20px] tracking-[0.02em] text-neutral-600 bg-neutral-100 rounded-[12px] px-3 py-2 uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <button className="flex items-center gap-2 font-heading font-medium text-[20px] sm:text-[25px] tracking-[0.02em] text-[#188F77]">
                Opening Hours
                <span className="font-heading font-normal text-neutral-600">| Today: 08.00 - 23.00</span>
                <ChevronRight size={20} className="text-neutral-500" />
              </button>
              <div className="flex items-center gap-2">
                <BadgeCheck size={28} className="text-[#188F77] fill-[#188F77]/10" />
                <span className="font-heading font-medium text-[20px] sm:text-[25px] tracking-[0.02em] text-[#188F77]">Restaurant of Choice</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-neutral-100 rounded-[30px] px-6 lg:px-12 py-6 lg:py-8 flex flex-col sm:flex-row items-stretch gap-6 sm:gap-0">
          <div className="flex-1 flex flex-col items-center sm:items-start gap-1 sm:px-6 first:pl-0">
            <div className="flex items-center gap-2">
              <Star size={22} className="text-[#FFCF27] fill-[#FFCF27]" />
              <span className="font-heading font-medium text-[22px] sm:text-[25px] text-neutral-800">4.9</span>
              <span className="font-heading font-light text-[20px] sm:text-[24px] text-neutral-600">/ 5.0</span>
            </div>
            <span className="font-heading font-medium text-[18px] sm:text-[20px] text-[#188F77]">See Reviews</span>
          </div>

          <div className="hidden sm:block w-[2px] bg-neutral-200 self-center h-[82px]" />

          <div className="flex-1 flex flex-col items-center sm:items-start gap-1 sm:px-6">
            <div className="flex items-center gap-2">
              <MapPin size={22} className="text-[#EF5B5B]" />
              <span className="font-heading font-medium text-[22px] sm:text-[25px] text-neutral-800">2.5 km</span>
            </div>
            <span className="font-heading font-medium text-[18px] sm:text-[20px] text-[#188F77]">Distance</span>
          </div>

          <div className="hidden sm:block w-[2px] bg-neutral-200 self-center h-[82px]" />

          <div className="flex-1 flex flex-col items-center sm:items-start gap-1 sm:px-6">
            <div className="flex items-center gap-2">
              <Clock size={22} className="text-[#EF5B5B]" />
              <span className="font-heading font-medium text-[22px] sm:text-[25px] text-neutral-800">20 - 30 Min</span>
            </div>
            <span className="font-heading font-light text-[18px] sm:text-[20px] text-neutral-600">Time</span>
          </div>

          <div className="hidden sm:block w-[2px] bg-neutral-200 self-center h-[82px]" />

          <div className="flex-1 flex flex-col items-center sm:items-start gap-1 sm:px-6 last:pr-0">
            <div className="flex items-center gap-2">
              <Utensils size={20} className="text-[#EF5B5B]" />
              <span className="font-heading font-medium text-[22px] sm:text-[25px] text-neutral-800">$$<span className="text-neutral-400">$$</span></span>
            </div>
            <span className="font-heading font-light text-[18px] sm:text-[20px] text-neutral-600">20K - 100K</span>
          </div>
        </div>
      </div>
    </section>
  );
}