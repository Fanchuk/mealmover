"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { OrderListItem } from "../types";
import { Tab } from "../queries";
import { OrderList } from "./OrderList";
import { OrderDetailPanel } from "./OrderDetailPanel";
import { EmptyState } from "./EmptyState";

const TABS: { id: Tab; label: string }[] = [
  { id: "ongoing", label: "Ongoing" },
  { id: "history", label: "History" },
  { id: "draft", label: "Draft" },
];

interface Props {
  tab: Tab;
  orders: OrderListItem[];
  selectedId?: string;
}

export function TransactionsContent({ tab, orders, selectedId }: Props) {
  const router = useRouter();
  const selected = orders.find((o) => o.id === selectedId) ?? orders[0];

  function switchTab(next: Tab) {
    router.push(`/transactions?tab=${next}`, { scroll: false });
  }

  function selectOrder(id: string) {
    router.push(`/transactions?tab=${tab}&order=${id}`, { scroll: false });
  }

  return (
    <section className="bg-white py-8 lg:py-12 min-h-[70vh]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h1 className="font-heading font-bold text-[32px] sm:text-[42px] text-neutral-800 mb-6">
          My Orders
        </h1>

        <div className="flex gap-2 border-b border-neutral-200 mb-8">
          {TABS.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={cn(
                  "relative px-5 py-3 font-heading font-medium text-[16px] transition-colors",
                  isActive ? "text-[#EF5B5B]" : "text-neutral-500 hover:text-neutral-800"
                )}
              >
                {t.label}
                {isActive && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full bg-[#EF5B5B]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {orders.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
            <OrderList orders={orders} selectedId={selected?.id} onSelect={selectOrder} />

            <div className="hidden lg:block">
              {selected && <OrderDetailPanel order={selected} />}
            </div>

            {selectedId && (
              <div className="lg:hidden">
                {selected && <OrderDetailPanel order={selected} />}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}