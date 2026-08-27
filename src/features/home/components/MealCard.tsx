"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Heart, Clock, Home, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AddToCartStepper } from "@/src/features/restaurants/components/AddToCartStepper";
import { type FavoriteItem } from "@/src/store/useFavoriteStore";

export interface PopularItem {
  id: string;
  name: string;
  desc?: string;
  price: number;
  prepTimeMin: number;
  rating: number;
  image: string;
  categorySlug: string;
  restaurantId?: string;
  restaurantName: string;
  distanceKm: number;
}

interface MealCardProps {
  meal: PopularItem;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  onOpenModal: () => void;
}

export function MealCard({ meal, isFavorite, toggleFavorite, onOpenModal }: MealCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onOpenModal}
      className="relative bg-white rounded-[20px] shadow-[0_16px_40px_0_rgba(0,0,0,0.07)] overflow-hidden h-full flex flex-col cursor-pointer"
    >
      <div className="relative h-[280px] sm:h-[320px] flex-shrink-0 overflow-hidden">
        <img ref={imageRef} src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite({
            id: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            restaurantName: meal.restaurantName,
          });
        }}
        className={cn(
          "group absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors z-10",
          isFavorite(meal.id) ? "bg-[#EF5B5B]" : "bg-white hover:bg-[#EF5B5B]"
        )}
      >
        <Heart
          size={20}
          strokeWidth={2}
          className={cn(
            "transition-colors",
            isFavorite(meal.id) ? "text-white fill-white" : "text-[#EF5B5B] group-hover:text-white"
          )}
        />
      </button>
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
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto mb-2">
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
        <div onClick={(e) => e.stopPropagation()}>
          <AddToCartStepper
            id={meal.id}
            name={meal.name}
            price={meal.price}
            image={meal.image}
            restaurantId={meal.restaurantId ?? "mealmover-kitchen"}
            restaurantName={meal.restaurantName}
            imageRef={imageRef}
          />
        </div>
      </div>
    </motion.div>
  );
}