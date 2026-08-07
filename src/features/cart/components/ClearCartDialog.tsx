"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  restaurantName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ClearCartDialog({ open, restaurantName, onConfirm, onCancel }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[400px] bg-white rounded-[28px] p-6 lg:p-8 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#EF5B5B]/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-[#EF5B5B]" />
            </div>
            <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-2">Start a new cart?</h3>
            <p className="font-heading text-[15px] text-neutral-500 mb-6">
              Your cart has items from another restaurant. Adding this dish from{" "}
              <span className="font-medium text-neutral-700">{restaurantName}</span> will clear the current cart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 h-[48px] rounded-[50px] border border-neutral-200 font-heading font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Keep cart
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 h-[48px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors"
              >
                Clear & add
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}