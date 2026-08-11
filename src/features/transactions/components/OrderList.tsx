"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import type { OrderListItem } from "../types";

const ONGOING = ["PENDING", "CONFIRMED", "PREPARING", "ON_THE_WAY"];

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft", PENDING: "Pending", CONFIRMED: "Confirmed",
  PREPARING: "Preparing", ON_THE_WAY: "On the way",
  DELIVERED: "Delivered", CANCELLED: "Cancelled",
};

interface Props {
  orders: OrderListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function OrderList({ orders, selectedId, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 108,
    overscan: 5,
  });

  return (
    <div ref={scrollRef} className="max-h-[70vh] overflow-y-auto pr-1">
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((row) => {
          const order = orders[row.index];
          const isActive = selectedId === order.id;
          const isOngoing = ONGOING.includes(order.status);

          return (
            <div
              key={order.id}
              ref={virtualizer.measureElement}
              data-index={row.index}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${row.start}px)` }}
              className="pb-3"
            >
              <button
                onClick={() => onSelect(order.id)}
                className={cn(
                  "relative w-full flex items-center gap-3 p-3 rounded-[18px] border text-left transition-colors",
                  isActive ? "border-[#EF5B5B]" : "border-neutral-200 hover:border-[#EF5B5B]/40"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="order-highlight"
                    className="absolute inset-0 rounded-[18px] bg-[#EF5B5B]/5 border-2 border-[#EF5B5B]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <img src={order.restaurant.image} alt={order.restaurant.name} className="w-[56px] h-[56px] rounded-[14px] object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-[16px] text-neutral-800 truncate">{order.restaurant.name}</p>
                    <p className="font-heading text-[13px] text-neutral-400">#{order.orderNumber}</p>
                    <p className="font-heading font-medium text-[14px] text-[#EF5B5B] mt-0.5">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {isOngoing && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A9E82] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1A9E82]" />
                      </span>
                    )}
                    <span className={cn(
                      "font-heading text-[12px] font-medium px-2 py-1 rounded-full whitespace-nowrap",
                      order.status === "DELIVERED" ? "bg-[#1A9E82]/10 text-[#1A9E82]" :
                      order.status === "CANCELLED" ? "bg-neutral-100 text-neutral-400" :
                      "bg-[#EF5B5B]/10 text-[#EF5B5B]"
                    )}>
                      {STATUS_LABEL[order.status]}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}