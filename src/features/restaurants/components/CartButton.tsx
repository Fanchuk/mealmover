"use client";

import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/src/features/cart/store";
import { useFlyToCart } from "./FlyToCartProvider";

export function CartButton() {
  const items = useCartStore((s) => s.items);
  const setOpen = useCartStore((s) => s.setOpen);
  const { registerCartTarget } = useFlyToCart();
  const btnRef = useRef<HTMLButtonElement>(null);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    registerCartTarget(btnRef.current);
  }, [registerCartTarget]);

  return (
    <button
      ref={btnRef}
      onClick={() => setOpen(true)}
      className="relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#EF5B5B] text-white"
    >
      <ShoppingCart size={22} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 15 }}
            className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#FFCF27] text-neutral-900 text-[12px] font-bold flex items-center justify-center"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}