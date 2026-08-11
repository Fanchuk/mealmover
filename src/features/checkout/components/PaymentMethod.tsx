"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

type Method = "CREDIT_CARD" | "CASH" | "PAYPAL";

const Mastercard = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <circle cx="12" cy="16" r="9" fill="#EB001B" />
    <circle cx="20" cy="16" r="9" fill="#F79E1B" fillOpacity="0.9" />
  </svg>
);

const CashIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <rect x="4" y="9" width="24" height="14" rx="3" fill="#4CAF50" />
    <circle cx="16" cy="16" r="4" fill="#fff" />
  </svg>
);

const PaypalIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <path d="M12 8h8a5 5 0 0 1 0 10h-5l-1 6h-4l2-16Z" fill="#003087" />
    <path d="M14 11h6a4 4 0 0 1 0 8h-4l-1 5h-3l2-13Z" fill="#009CDE" />
  </svg>
);

const METHODS: { id: Method; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: "CREDIT_CARD", label: "Credit Card", desc: "Visa, Mastercard (Stripe)", icon: <Mastercard /> },
  { id: "CASH", label: "Cash", desc: "Pay on delivery", icon: <CashIcon /> },
  { id: "PAYPAL", label: "PayPal", desc: "Pay with PayPal balance", icon: <PaypalIcon /> },
];

export function PaymentMethod({ selected, onSelect }: { selected: Method; onSelect: (m: Method) => void }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] text-neutral-800 mb-5">Payment Method</h2>
      <div className="flex flex-col gap-3">
        {METHODS.map((m) => {
          const isActive = selected === m.id;
          return (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => onSelect(m.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-[20px] border-2 text-left transition-colors",
                isActive ? "border-[#EF5B5B] bg-[#EF5B5B]/5" : "border-neutral-200 hover:border-[#EF5B5B]/40"
              )}
            >
              <span className={cn(
                "w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 transition-colors",
                isActive ? "bg-[#EF5B5B] text-white" : "bg-neutral-100 text-neutral-600"
              )}>
                {m.icon}
              </span>
              <div className="flex-1">
                <p className="font-heading font-semibold text-[17px] text-neutral-800">{m.label}</p>
                <p className="font-heading text-[14px] text-neutral-400">{m.desc}</p>
              </div>
              <span className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                isActive ? "border-[#EF5B5B] bg-[#EF5B5B]" : "border-neutral-300"
              )}>
                {isActive && <Check size={14} className="text-white" />}
              </span>
            </motion.button>
          );
        })}
      </div>

      {selected === "CREDIT_CARD" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden mt-4 flex flex-col gap-3"
        >
          <input placeholder="Card number" className="w-full h-[48px] rounded-[14px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B]" />
          <div className="flex gap-3">
            <input placeholder="MM / YY" className="flex-1 h-[48px] rounded-[14px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B]" />
            <input placeholder="CVC" className="flex-1 h-[48px] rounded-[14px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B]" />
          </div>
          <p className="font-heading text-[13px] text-neutral-400">Demo only — no real charge.</p>
        </motion.div>
      )}
    </section>
  );
}