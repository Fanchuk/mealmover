"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCartStore } from "@/src/features/cart/store";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const incQty = useCartStore((s) => s.incQty);
  const decQty = useCartStore((s) => s.decQty);
  const lineTotal = useCartStore((s) => s.lineTotal);
  const restaurantId = items[0]?.restaurantId;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] text-neutral-800">Order Summary</h2>
        {restaurantId && (
          <Link
            href={`/restaurants/${restaurantId}`}
            className="flex items-center gap-2 text-[#EF5B5B] font-heading font-medium text-[15px] hover:gap-3 transition-all"
          >
            <Plus size={18} /> Add more
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const modifiers = [
            ...(item.size ? [item.size.name] : []),
            ...item.addons.map((a) => a.name),
          ];
          return (
            <div key={item.lineId} className="flex items-center gap-4 p-4 rounded-[20px] border border-neutral-200">
              <img src={item.image} alt={item.name} className="w-[72px] h-[72px] rounded-[14px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-[17px] text-neutral-800 truncate">{item.name}</p>
                {modifiers.length > 0 && (
                  <p className="font-heading text-[13px] text-neutral-400 truncate">{modifiers.join(" · ")}</p>
                )}
                <p className="font-heading font-semibold text-[16px] text-[#EF5B5B] mt-1">${lineTotal(item).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  type="button"
                  onClick={() => decQty(item.lineId)}
                  whileTap={{ scale: 0.85 }}
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
                >
                  <Minus size={15} />
                </motion.button>
                <span className="font-heading font-semibold text-[17px] min-w-[24px] text-center">{item.qty}</span>
                <motion.button
                  type="button"
                  onClick={() => incQty(item.lineId)}
                  whileTap={{ scale: 0.85 }}
                  className="w-8 h-8 rounded-full bg-[#EF5B5B] flex items-center justify-center hover:bg-[#CD424E] transition-colors"
                >
                  <Plus size={15} className="text-white" />
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}