"use client";

import { useOptimistic, useTransition } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/src/features/cart/store";
import { useFlyToCart } from "./FlyToCartProvider";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

export function AddToCartStepper({ id, name, price, image, imageRef }: Props) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const { fly } = useFlyToCart();
  const [, startTransition] = useTransition();
  const realQty = items.find((i) => i.id === id)?.qty ?? 0;
  const [optimisticQty, setOptimisticQty] = useOptimistic(realQty);

  function handleAdd() {
    const el = imageRef.current;
    if (el) fly(image, el.getBoundingClientRect());
    startTransition(() => {
      setOptimisticQty(optimisticQty + 1);
      addItem({ id, name, price, image });
    });
  }

  function handleRemove() {
    const next = Math.max(0, optimisticQty - 1);
    startTransition(() => {
      setOptimisticQty(next);
      removeItem(id);
      for (let k = 0; k < next; k++) addItem({ id, name, price, image });
    });
  }

  if (optimisticQty === 0) {
    return (
      <button
        onClick={handleAdd}
        className="mt-2 w-full border border-neutral-300 rounded-[50px] h-[52px] flex items-center justify-center gap-2 font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors"
      >
        Add <Plus size={18} />
      </button>
    );
  }

  return (
    <div className="mt-2 w-full h-[52px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-between px-2 text-white">
      <button onClick={handleRemove} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
        <Minus size={18} />
      </button>
      <div className="relative min-w-[28px] h-[28px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={optimisticQty}
            initial={{ scale: 0.5, y: 6, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: -6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute font-heading font-bold text-[18px]"
          >
            {optimisticQty}
          </motion.span>
        </AnimatePresence>
      </div>
      <button onClick={handleAdd} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
        <Plus size={18} />
      </button>
    </div>
  );
}