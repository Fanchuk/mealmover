"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface CartEmptyStateProps {
  onClose: () => void;
}

export function CartEmptyState({ onClose }: CartEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center">
        <ShoppingCart size={40} className="text-neutral-300" />
      </div>
      <p className="font-heading font-bold text-[20px] text-neutral-700">Your cart is empty</p>
      <p className="font-heading text-[15px] text-neutral-400">Add some delicious dishes to get started.</p>
      <Link
        href="/restaurants"
        onClick={onClose}
        className="mt-2 inline-flex items-center h-[48px] px-6 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors"
      >
        Browse restaurants
      </Link>
    </div>
  );
}