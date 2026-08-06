"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";

const Mastercard = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><circle cx="12" cy="16" r="9" fill="#EB001B"/><circle cx="20" cy="16" r="9" fill="#F79E1B" fillOpacity="0.9"/></svg>
);
const CashIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><rect x="4" y="9" width="24" height="14" rx="3" fill="#4CAF50"/><circle cx="16" cy="16" r="4" fill="#fff"/></svg>
);
const PaypalIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8"><path d="M12 8h8a5 5 0 0 1 0 10h-5l-1 6h-4l2-16Z" fill="#003087"/><path d="M14 11h6a4 4 0 0 1 0 8h-4l-1 5h-3l2-13Z" fill="#009CDE"/></svg>
);

const METHODS = [
  { id: "credit", label: "Credit Card", icon: <Mastercard /> },
  { id: "cash",   label: "Cash",        icon: <CashIcon /> },
  { id: "paypal", label: "Paypal",      icon: <PaypalIcon /> },
];

export function PaymentMethod() {
  const [selected, setSelected] = useState("credit");

  return (
    <div>
      <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6">
        Payment Method
      </h2>

      <div className="flex flex-col gap-4">
        {METHODS.map((m) => (
          <button key={m.id} onClick={() => setSelected(m.id)} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">{m.icon}</span>
              <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">{m.label}</span>
            </div>
            <span className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              selected === m.id ? "border-[#EF5B5B]" : "border-neutral-300"
            )}>
              {selected === m.id && <span className="w-3 h-3 rounded-full bg-[#EF5B5B]" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}