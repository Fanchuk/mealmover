"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";

const TABS = ["History", "Ongoing", "Draf"];

const ORDERS = [
  { id: 1, name: "Oriental Restaurant",    price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 670.png" },
  { id: 2, name: "Quickbite Restaurant",   price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 670 (1).jpg" },
  { id: 3, name: "Golden Bamboo Resto",    price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 670 (2).jpg" },
  { id: 4, name: "Oriental Restaurant",    price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 698 (2).png" },
  { id: 5, name: "Saddleback Tavern",      price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 670 (3).jpg" },
  { id: 6, name: "Zen Garden Asian Fusion",price: 32.10, desc: "1 Tarik Noodle, 2 Tom...", date: "20 Jun 2024 | 10.05", image: "/Rectangle 670 (4).jpg" },
];

interface TransactionListProps {
  selected: number;
  onSelect: (id: number) => void;
}

export function TransactionList({ selected, onSelect }: TransactionListProps) {
  const [activeTab, setActiveTab] = useState("History");

  return (
    <div className="border border-neutral-200 rounded-[30px] p-5 flex flex-col gap-4">
      <div className="bg-neutral-100 rounded-[20px] p-1 flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 h-[50px] rounded-[16px] font-heading font-medium text-[16px] tracking-[0.02em] transition-all duration-200",
              activeTab === tab ? "bg-[#EF5B5B] text-white" : "text-neutral-600 hover:text-neutral-800"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {ORDERS.map((order) => (
          <button
            key={order.id}
            onClick={() => onSelect(order.id)}
            className={cn(
              "flex items-center gap-4 rounded-[26px] p-4 transition-all duration-200 text-left",
              selected === order.id ? "bg-[#EF5B5B]/10 border border-[#EF5B5B]/30" : "border border-transparent hover:bg-neutral-50"
            )}
          >
            <img src={order.image} alt={order.name} className="w-[91px] h-[90px] rounded-[20px] object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800 truncate">{order.name}</span>
                <span className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800 flex-shrink-0">${order.price.toFixed(2)}</span>
              </div>
              <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600 truncate">{order.desc}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-heading font-medium text-[16px] leading-[163%] tracking-[0.02em] text-neutral-600">{order.date}</span>
                <button className="bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors text-white font-heading font-medium text-[16px] rounded-[50px] h-[40px] px-6">
                  Order Again
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}