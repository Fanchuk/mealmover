"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Clock, Home, Star } from "lucide-react";
import { cn } from '@/src/lib/utils'

const CATEGORIES = [
  { id: "fastfood", label: "Fast Food",  icon: "/Hamburger.svg" },
  { id: "dessert",  label: "Dessert",    icon: "/Ice_cream.svg" },
  { id: "drink",    label: "Drink",      icon: "/Sparkling_water.svg" },
  { id: "veggies",  label: "Vegetables", icon: "/Burrito.svg" },
  { id: "noodle",   label: "Noodle",     icon: "/Noodle.svg" },
];

const MEALS = [
  { id: 1, name: "Veg Big Burger",        price: 10.02, time: "10 min", distance: "1.4 km", resto: "Quickbite Resto", rating: 4.9, reviews: "1K+", image: "/two-female-friends-relaxing-in-outdoor-cafe-2023-11-27-05-00-06-utc 1.png" },
  { id: 2, name: "Creamy Potato Chicken", price: 10.02, time: "10 min", distance: "1.4 km", resto: "Quickbite Resto", rating: 4.9, reviews: "1K+", image: "/two-female-friends-relaxing-in-outdoor-cafe-2023-11-27-05-00-06-utc 1 (1).png" },
  { id: 3, name: "Creamy Chicken Bowl",   price: 12.50, time: "15 min", distance: "2.1 km", resto: "Oriental Resto",  rating: 4.8, reviews: "500+", image: "/two-female-friends-relaxing-in-outdoor-cafe-2023-11-27-05-00-06-utc 1.png" },
];

export function FoodCategoriesSection() {
  const [active, setActive] = useState("fastfood");

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-heading font-bold text-[16px] sm:text-[20px] leading-[150%] tracking-[0.1em] text-[#EF5B5B] uppercase">
              Food Categories
            </span>
            <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 mt-1 max-w-[640px]">
              Many food variants from your favorite restaurants
            </h2>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories */}
          <div className="flex lg:flex-col gap-3 lg:w-[280px] flex-shrink-0 relative overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <div className="hidden lg:flex absolute left-[-20px] top-0 bottom-0 w-[4px] flex-col">
              <div className="h-[137px] bg-[#FFCF27] rounded-full" />
              <div className="flex-1 bg-neutral-200 rounded-full" />
            </div>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  "flex items-center gap-3 lg:gap-4 rounded-[50px] h-[60px] lg:h-[78px] px-4 lg:px-5 transition-all duration-200 font-heading font-medium text-[16px] lg:text-[20px] flex-shrink-0 whitespace-nowrap",
                  active === cat.id
                    ? "bg-[#EF5B5B] text-white"
                    : "bg-white border border-neutral-200 text-neutral-700 hover:border-[#EF5B5B]"
                )}
              >
                <span className={cn(
                  "w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center flex-shrink-0",
                  active === cat.id ? "bg-white" : "bg-neutral-100"
                )}>
                  <img src={cat.icon} alt={cat.label} className="w-6 h-6 lg:w-7 lg:h-7 object-contain" />
                </span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Meals */}
          <div className="flex gap-4 lg:gap-5 overflow-x-auto flex-1 pb-2">
            {MEALS.map((meal) => (
              <div key={meal.id} className="bg-white rounded-2xl shadow-[0_16px_40px_0_rgba(0,0,0,0.07)] flex-shrink-0 w-[280px] sm:w-[340px] overflow-hidden">
                <div className="relative h-[200px] sm:h-[220px]">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#EF5B5B] transition-colors">
                    <Heart size={14} className="fill-current" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-medium text-[18px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
                      {meal.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-heading font-bold text-[18px] sm:text-[20px] text-[#EF5B5B]">
                      ${meal.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-[#EF5B5B]" />
                      <span className="font-heading font-light text-[13px] sm:text-[14px] text-neutral-600 whitespace-nowrap">
                        {meal.time} · {meal.distance}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div className="flex items-center gap-1">
                      <Home size={12} className="text-[#EF5B5B]" />
                      <span className="font-heading font-light text-[13px] sm:text-[14px] text-neutral-600">{meal.resto}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#FFCF27] fill-[#FFCF27]" />
                      <span className="font-heading font-medium text-[13px] sm:text-[14px] text-[#EF5B5B]">{meal.rating}</span>
                      <span className="font-heading font-light text-[13px] sm:text-[14px] text-neutral-600">/ 5.0</span>
                      <span className="font-heading font-light text-[13px] sm:text-[14px] text-neutral-400">({meal.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}