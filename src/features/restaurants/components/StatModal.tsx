"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function StatModal({ open, onClose, title, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-white rounded-[28px] p-6 lg:p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
            >
              <X size={18} className="text-neutral-600" />
            </button>
            <h3 className="font-heading font-bold text-[22px] text-neutral-800 mb-4">{title}</h3>
            <div className="font-heading text-[16px] text-neutral-600 leading-[160%]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}