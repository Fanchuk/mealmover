"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check, Printer, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/src/features/cart/store";
import { DEFAULT_SIZE_ID, SIZE_OPTIONS } from "../../cart/data/modifiers";
import { CourierMap } from "./CourierMap";
import { OrderProgress } from "./OrderProgress";
import { DriverRating } from "./DriverRating";
import { useOrderStatus } from "../hooks/useOrderStatus";
import type { OrderListItem } from "../types";

const ONGOING = ["PENDING", "CONFIRMED", "PREPARING", "ON_THE_WAY"];

export function OrderDetailPanel({ order }: { order: OrderListItem }) {
  const [copied, setCopied] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const liveStatus = useOrderStatus(order.id, order.status);
  
  const isOngoing = ONGOING.includes(liveStatus);
  const isDelivered = liveStatus === "DELIVERED";

  function copyNumber() {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    toast.success("Order number copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  function orderAgain() {
    const defaultSize = SIZE_OPTIONS.find((s) => s.id === DEFAULT_SIZE_ID)!;
    clearCart();
    order.items.forEach((it) => {
      addItem({
        id: it.menuItemId ?? it.id,
        restaurantId: order.restaurantId,
        restaurantName: order.restaurant.name,
        name: it.name,
        image: it.image,
        basePrice: it.price,
        qty: it.quantity,
        size: { id: defaultSize.id, name: defaultSize.name, price: 0 },
        addons: [],
      });
    });
    setCartOpen(true);
    toast.success("Items added to cart!");
  }

  function printReceipt() {
    window.print();
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={order.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
        className="border border-neutral-200 rounded-[24px] p-6 print-area"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <img src={order.restaurant.image} alt={order.restaurant.name} className="w-[64px] h-[64px] rounded-[16px] object-cover" />
            <div>
              <h2 className="font-heading font-bold text-[22px] text-neutral-800">{order.restaurant.name}</h2>
              <button onClick={copyNumber} className="flex items-center gap-1.5 text-neutral-400 hover:text-[#EF5B5B] transition-colors font-heading text-[14px] mt-0.5">
                #{order.orderNumber}
                {copied ? <Check size={14} className="text-[#1A9E82]" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {isOngoing && (
          <>
            <OrderProgress status={liveStatus} />
            <CourierMap driverName={order.driver?.name ?? "Your courier"} />
          </>
        )}

        <div className="mt-5 flex flex-col gap-3">
          <h3 className="font-heading font-semibold text-[16px] text-neutral-800">Items</h3>
          {order.items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <img src={it.image} alt={it.name} className="w-[48px] h-[48px] rounded-[12px] object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-heading font-medium text-[15px] text-neutral-800 truncate">{it.name}</p>
                <p className="font-heading text-[13px] text-neutral-400">x{it.quantity}</p>
              </div>
              <span className="font-heading font-semibold text-[15px] text-neutral-800">${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-dashed border-neutral-200 flex flex-col gap-2">
          <Row label="Subtotal" value={`$${order.subtotal.toFixed(2)}`} />
          <Row label="Delivery" value={`$${order.shippingCost.toFixed(2)}`} />
          {order.discount > 0 && <Row label="Discount" value={`-$${order.discount.toFixed(2)}`} green />}
          <div className="flex justify-between mt-1">
            <span className="font-heading font-semibold text-[17px] text-neutral-800">Total</span>
            <span className="font-heading font-bold text-[20px] text-[#EF5B5B]">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {isDelivered && order.driver && (
          <div className="mt-5 pt-4 border-t border-neutral-100">
            <DriverRating orderId={order.id} initialRating={order.driverRating} driverName={order.driver.name} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 no-print">
          <button onClick={orderAgain} className="flex items-center gap-2 h-[46px] px-5 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[15px] hover:bg-[#CD424E] transition-colors">
            <RotateCcw size={17} /> Order again
          </button>
          <button onClick={printReceipt} className="flex items-center gap-2 h-[46px] px-5 rounded-[50px] border border-neutral-300 text-neutral-700 font-heading font-medium text-[15px] hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors">
            <Printer size={17} /> Download
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between font-heading text-[15px]">
      <span className="text-neutral-500">{label}</span>
      <span className={green ? "text-[#1A9E82] font-medium" : "text-neutral-800 font-medium"}>{value}</span>
    </div>
  );
}