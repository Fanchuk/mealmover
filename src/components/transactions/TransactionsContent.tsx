"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TransactionList } from "@/src/components/transactions/TransactionList";
import { OrderDetail } from "@/src/components/transactions/OrderDetail";

export function TransactionsContent() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px] mb-6">
          <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
          <ChevronRight size={16} className="text-neutral-400" />
          <span className="text-[#FFCF27] font-medium">Transaction</span>
        </nav>

        <h1 className="font-heading font-semibold text-[38px] sm:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800 mb-8 lg:mb-10">
          Transaction History
        </h1>

        <div className="w-full border-t border-dashed border-neutral-300 mb-8 lg:mb-10" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <div className="w-full lg:w-[516px] flex-shrink-0">
            <TransactionList selected={selected} onSelect={setSelected} />
          </div>

          <div className="w-full flex-1">
            <OrderDetail />
          </div>
        </div>
      </div>
    </section>
  );
}