"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Heart, Clock, Home, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useCartStore } from "../../cart/store";
import { useFavoritesStore } from "@/src/store/useFavoriteStore";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface PopularItem {
  id: string;
  name: string;
  price: number;
  prepTimeMin: number;
  rating: number;
  image: string;
  categorySlug: string;
  restaurantName: string;
  distanceKm: number;
}

interface Props {
  categories: Category[];
  popularItems: PopularItem[];
}

export function FoodCategoriesSection({ categories, popularItems }: Props) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    containScroll: false,
  });

  const addItem = useCartStore((s) => s.addItem)
  const setCartOpen = useCartStore((s) => s.setOpen)
  const isFavorite = useFavoritesStore((s) => s.isFavorite)
  const toggleFavorite = useFavoritesStore((s) => s.toggle)

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
        emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const filtered = popularItems.filter((m) => m.categorySlug === active);

  function handleTabChange(slug: string) {
    setActive(slug);
    emblaApi?.scrollTo(0);
  }

  function handleAddToCart(item: PopularItem) {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image })
    setCartOpen(true)
  }

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
            <button
              onClick={scrollPrev}
              className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-[64px] h-[52px] lg:w-[76px] lg:h-[60px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex lg:flex-col gap-3 lg:w-[280px] flex-shrink-0 relative overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <div className="hidden lg:flex absolute left-[-20px] top-0 bottom-0 w-[4px] flex-col">
              <div className="h-[137px] bg-[#FFCF27] rounded-full" />
              <div className="flex-1 bg-neutral-200 rounded-full" />
            </div>
            {categories.map((cat) => {
              const isActive = active === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.slug)}
                  className={cn(
                    "relative flex items-center gap-3 lg:gap-4 rounded-[50px] h-[60px] lg:h-[78px] px-4 lg:px-5 font-heading font-medium text-[16px] lg:text-[20px] flex-shrink-0 whitespace-nowrap shadow-[0_8px_20px_0_rgba(0,0,0,0.04)] overflow-hidden",
                    isActive ? "text-white" : "bg-white border border-neutral-200 text-neutral-800 hover:border-[#EF5B5B]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#EF5B5B]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center flex-shrink-0",
                      isActive ? "bg-white" : "bg-neutral-100"
                    )}
                  >
                    <img src={cat.icon} alt={cat.name} className="w-6 h-6 lg:w-7 lg:h-7 object-contain" />
                  </span>
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden flex-1 min-w-0" ref={emblaRef}>
            <div className="flex -ml-4 lg:-ml-6">
              {filtered.length > 0 ? filtered.map((meal) => (
                <div key={meal.id} className="flex-[0_0_300px] sm:flex-[0_0_360px] min-w-0 pl-4 lg:pl-6">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-[20px] shadow-[0_16px_40px_0_rgba(0,0,0,0.07)] overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-[280px] sm:h-[320px] flex-shrink-0">
                      <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleFavorite(meal.id)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#EF5B5B] shadow-md"
                      >
                        <Heart size={16} className={cn(isFavorite(meal.id) && "fill-current")} />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading font-medium text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800 mb-3">
                        {meal.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-heading font-bold text-[24px] sm:text-[28px] text-[#EF5B5B]">
                          ${meal.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#EF5B5B]" />
                          <span className="font-heading font-light text-[14px] text-neutral-600 whitespace-nowrap">
                            {meal.prepTimeMin} min · {meal.distanceKm} km
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto mb-4">
                        <div className="flex items-center gap-1.5">
                          <Home size={14} className="text-[#EF5B5B]" />
                          <span className="font-heading font-light text-[14px] text-neutral-600">{meal.restaurantName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-[#FFCF27] fill-[#FFCF27]" />
                          <span className="font-heading font-medium text-[14px] text-[#EF5B5B]">{meal.rating}</span>
                          <span className="font-heading font-light text-[14px] text-neutral-600">/ 5.0</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(meal)}
                        className="w-full h-[44px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] hover:bg-[#CD424E] transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                </div>
              )) : (
                <div className="flex items-center justify-center w-full text-neutral-400 font-heading text-[18px] py-20 ml-4 lg:ml-6">
                  No items in this category
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}