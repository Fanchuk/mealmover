"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { rateDriver } from "../services/orderActions";

export function DriverRating({
  orderId,
  initialRating,
  driverName,
}: {
  orderId: string;
  initialRating: number | null;
  driverName: string;
}) {
  const [optimisticRating, setOptimistic] = useOptimistic(initialRating ?? 0);
  const [, startTransition] = useTransition();

  function handleRate(value: number) {
    startTransition(async () => {
      setOptimistic(value);
      const res = await rateDriver(orderId, value);
      if (!res.ok) toast.error(res.error ?? "Failed to rate.");
      else toast.success("Thanks for rating!");
    });
  }

  return (
    <div>
      <p className="font-heading font-semibold text-[16px] text-neutral-800 mb-1">Rate {driverName}</p>
      <p className="font-heading text-[13px] text-neutral-400 mb-3">How was your delivery?</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={n}
            onClick={() => handleRate(n)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star
              size={30}
              className={n <= optimisticRating ? "text-[#FFCF27] fill-[#FFCF27]" : "text-neutral-300"}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}