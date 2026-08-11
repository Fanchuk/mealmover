"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useFavoritesStore } from "@/src/store/useFavoriteStore";
import { MealCard, type PopularItem } from "./MealCard";
import { DishModal } from "@/src/features/cart/components/DishModal";
import { ClearCartDialog } from "@/src/features/cart/components/ClearCartDialog";
import { useAddGuard } from "@/src/features/cart/hooks/useAddGuard";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface Props {
  categories: Category[];
  popularItems: PopularItem[];
}

export function FoodCategoriesSection({ categories, popularItems }: Props) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const [modalDish, setModalDish] = useState<PopularItem | null>(null);
  const { guard, pending, confirm, cancel } = useAddGuard();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: false,
  });

  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

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
                  <MealCard
                    meal={meal}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                    onOpenModal={() => setModalDish(meal)}
                  />
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

      <DishModal
        open={!!modalDish}
        dish={
          modalDish
            ? {
                id: modalDish.id,
                name: modalDish.name,
                desc: modalDish.desc ?? "",
                image: modalDish.image,
                basePrice: modalDish.price,
                restaurantId: modalDish.restaurantId ?? "mealmover-kitchen",
                restaurantName: modalDish.restaurantName,
              }
            : null
        }
        onClose={() => setModalDish(null)}
        onBeforeAdd={(rid, add) => guard(rid, modalDish?.restaurantName ?? "", add)}
      />

      <ClearCartDialog
        open={!!pending}
        restaurantName={pending?.restaurantName ?? ""}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </section>
  );
}