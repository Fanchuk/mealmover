"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useFavoritesStore } from "@/src/store/useFavoriteStore";
import { useCartStore } from "@/src/features/cart/store";

export function FavoritesSection() {
  const { items: favItems, remove } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);

  if (favItems.length === 0) return null;

  return (
    <div className="border border-neutral-200 rounded-[26px] p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Heart size={18} className="text-[#EF5B5B] fill-[#EF5B5B]" />
        <h3 className="font-heading font-medium text-[18px] text-neutral-800">Favorites</h3>
      </div>
      <div className="w-full h-px bg-neutral-100" />
      <AnimatePresence initial={false}>
        {favItems.map((fav) => (
          <motion.div
            key={fav.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <img
              src={fav.image}
              alt={fav.name}
              className="w-12 h-12 rounded-[12px] object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-heading font-medium text-[14px] text-neutral-800 truncate">{fav.name}</p>
              <p className="font-heading text-[13px] text-neutral-400">{fav.restaurantName}</p>
              <p className="font-heading font-semibold text-[14px] text-[#EF5B5B]">${fav.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={() => {
                  addItem({
                    id: fav.id,
                    restaurantId: "mealmover-kitchen",
                    restaurantName: fav.restaurantName,
                    name: fav.name,
                    image: fav.image,
                    basePrice: fav.price,
                    qty: 1,
                  });
                }}
                className="h-7 px-3 rounded-[50px] bg-[#EF5B5B] text-white font-heading text-[12px] hover:bg-[#CD424E] transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => remove(fav.id)}
                className="h-7 px-3 rounded-[50px] border border-neutral-200 text-neutral-400 font-heading text-[12px] hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}