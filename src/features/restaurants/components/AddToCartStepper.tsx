"use client";

import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/src/features/cart/store";
import { useFlyToCart } from "./FlyToCartProvider";
import { DEFAULT_SIZE_ID, SIZE_OPTIONS } from "../../cart/data/modifiers";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

export function AddToCartStepper({ id, name, price, image, restaurantId, restaurantName, imageRef }: Props) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const incQty = useCartStore((s) => s.incQty);
  const decQty = useCartStore((s) => s.decQty);
  const { fly } = useFlyToCart();

  const defaultSize = SIZE_OPTIONS.find((s) => s.id === DEFAULT_SIZE_ID)!;
  const lineId = `${id}__${DEFAULT_SIZE_ID}__`;
  const line = items.find((i) => i.lineId === lineId);
  const qty = line?.qty ?? 0;

  function handleAdd() {
    const el = imageRef.current;
    if (el) fly(image, el.getBoundingClientRect());
    addItem({
      id, name, image, restaurantId, restaurantName,
      basePrice: price,
      size: { id: defaultSize.id, name: defaultSize.name, price: defaultSize.price },
      addons: [],
    });
  }

  if (qty === 0) {
    return (
      <motion.button
        onClick={handleAdd}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="mt-2 w-full border border-neutral-300 rounded-[50px] h-[52px] flex items-center justify-center gap-2 font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] hover:bg-[#EF5B5B] hover:text-white transition-colors"
      >
        Add <Plus size={18} />
      </motion.button>
    );
  }

  return (
    <div className="mt-2 w-full h-[52px] rounded-[50px] bg-[#EF5B5B] flex items-center justify-between px-2 text-white">
      <motion.button onClick={() => decQty(lineId)} whileTap={{ scale: 0.85 }} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
        <Minus size={18} />
      </motion.button>
      <div className="relative min-w-[28px] h-[28px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={qty}
            initial={{ scale: 0.5, y: 6, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: -6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute font-heading font-bold text-[18px]"
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.button onClick={() => incQty(lineId)} whileTap={{ scale: 0.85 }} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
        <Plus size={18} />
      </motion.button>
    </div>
  );
}