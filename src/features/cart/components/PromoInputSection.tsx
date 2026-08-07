"use client";

import { useState, useTransition } from "react";
import { X, Check } from "lucide-react";
import toast from "react-hot-toast";
import { type AppliedPromo } from "@/src/features/cart/store";
import { applyPromoCode } from "@/src/features/cart/services/promoActions";

interface PromoInputSectionProps {
  subtotal: number;
  promo: AppliedPromo | null;
  setPromo: (promo: AppliedPromo | null) => void;
}

export function PromoInputSection({ subtotal, promo, setPromo }: PromoInputSectionProps) {
  const [promoInput, setPromoInput] = useState("");
  const [pending, startTransition] = useTransition();

  function handleApplyPromo() {
    if (!promoInput.trim()) return;
    startTransition(async () => {
      const res = await applyPromoCode(promoInput, subtotal);
      if (res.ok) {
        setPromo({ code: res.code, description: res.description, discount: res.discount });
        toast.success("Promo applied!");
        setPromoInput("");
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {promo && (
        <>
          <div className="w-full h-px bg-neutral-200" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Check size={22} className="text-[#188F77] flex-shrink-0" />
              <div>
                <p className="font-heading font-medium text-[18px] text-neutral-800">{promo.code}</p>
                <p className="font-heading font-light text-[15px] text-neutral-600">{promo.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => setPromo(null)} aria-label="Remove promo">
                <X size={20} className="text-neutral-400 hover:text-[#EF5B5B]" />
              </button>
              <span className="font-heading font-medium text-[18px] text-[#188F77]">
                -${promo.discount.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <input
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
          placeholder="Promo code"
          className="flex-1 h-[44px] rounded-[50px] border border-neutral-200 px-4 font-heading text-[14px] outline-none focus:border-[#EF5B5B] uppercase"
        />
        <button
          onClick={handleApplyPromo}
          disabled={pending}
          className="h-[44px] px-5 rounded-[50px] border border-neutral-300 font-heading font-medium text-[14px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors disabled:opacity-60"
        >
          {pending ? "..." : "Apply"}
        </button>
      </div>
    </div>
  );
}