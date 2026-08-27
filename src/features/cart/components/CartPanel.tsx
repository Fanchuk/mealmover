"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ShoppingCart, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCartStore } from "@/src/features/cart/store";
import { AnimatedTotal } from "./AnimatedTotal";
import { CartEmptyState } from "./CartEmptyState";
import { PromoInputSection } from "./PromoInputSection";
import { useSession } from "next-auth/react";
import { CartRow } from "./CartRow";
import { cn } from "@/src/lib/utils";
import { FavoritesSection } from "./FavoritesSection";

export function CartPanel() {
  const { open, setOpen, items, promo, setPromo } = useCartStore();
  const incQty = useCartStore((s) => s.incQty);
  const decQty = useCartStore((s) => s.decQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const toggleSelected = useCartStore((s) => s.toggleSelected);
  const toggleSelectAll = useCartStore((s) => s.toggleSelectAll);
  const setNote = useCartStore((s) => s.setNote);
  const lineTotal = useCartStore((s) => s.lineTotal);
  const selectedSubtotal = useCartStore((s) => s.selectedSubtotal);

  const { status } = useSession();

  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis, setOpen]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, input, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open, items.length]);

  const subtotal = selectedSubtotal();
  const discount = promo?.discount ?? 0;
  const total = Math.max(0, subtotal - discount);
  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const restaurantName = items[0]?.restaurantName ?? "";

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[447px] bg-white z-[70] flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="border border-neutral-300 rounded-[50px] w-[64px] h-[56px] flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
            aria-label="Close cart"
          >
            <X size={24} className="text-neutral-800" />
          </button>
          <h2 className="font-heading font-medium text-[25px] tracking-[0.02em] text-neutral-900">My Cart</h2>
          <div className="w-[64px]" />
        </div>

        {items.length === 0 ? (
          <CartEmptyState onClose={() => setOpen(false)} />
        ) : (
          <>
            <div className="px-6 mb-4 flex-shrink-0">
              <div className="flex items-center justify-center gap-3 bg-[rgba(2,141,255,0.1)] rounded-[18px] h-[52px] px-6">
                <ShoppingCart size={20} className="text-[#028DFF]" />
                <span className="font-heading font-light text-[15px] text-[#028DFF]">
                  You have {items.reduce((s, i) => s + i.qty, 0)} items in your cart
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-4 flex flex-col gap-4">
              <div className="border border-neutral-200 rounded-[26px] p-5 flex flex-col gap-4">
                <h3 className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">
                  {restaurantName}
                </h3>
                <div className="w-full h-px bg-neutral-200" />

                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartRow
                      key={item.lineId}
                      item={item}
                      total={lineTotal(item)}
                      onInc={() => incQty(item.lineId)}
                      onDec={() => decQty(item.lineId)}
                      onRemove={() => removeItem(item.lineId)}
                      onToggle={() => toggleSelected(item.lineId)}
                      onNote={(note) => setNote(item.lineId, note)}
                    />
                  ))}
                </AnimatePresence>

                <PromoInputSection subtotal={subtotal} promo={promo} setPromo={setPromo} />
              </div>

              <FavoritesSection />
            </div>

            <div className="px-6 py-6 border-t border-neutral-100 shadow-[0_-6px_25px_0_rgba(0,0,0,0.06)] flex-shrink-0">
              <div className="flex items-center justify-between">
                <button onClick={() => toggleSelectAll(!allSelected)} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-[20px] h-[20px] rounded-[6px] border flex items-center justify-center transition-colors",
                      allSelected ? "bg-[#EF5B5B] border-[#EF5B5B]" : "border-neutral-800"
                    )}
                  >
                    {allSelected && <Check size={14} className="text-white" />}
                  </span>
                  <div className="text-left">
                    <span className="font-heading font-light text-[18px] text-neutral-800 block">All Items</span>
                    <p className="font-heading font-light text-[15px] text-neutral-500">
                      Total :{" "}
                      <span className="font-heading font-medium text-[20px] text-[#EF5B5B]">
                        <AnimatedTotal value={total} />
                      </span>
                    </p>
                  </div>
                </button>
                <Link
                  href={status === "authenticated" ? "/checkout" : "/sign-in?callbackUrl=/checkout"}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[50px] h-[56px] px-8 flex items-center justify-center font-heading font-medium text-[16px] text-white uppercase tracking-wider transition-colors",
                    subtotal > 0 ? "bg-[#EF5B5B] hover:bg-[#CD424E]" : "bg-neutral-300 pointer-events-none"
                  )}
                >
                  {status === "authenticated" ? "Checkout" : "Sign in to checkout"}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}