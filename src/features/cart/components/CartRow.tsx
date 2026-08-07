"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, Check, Pencil } from "lucide-react";
import { motion } from "motion/react";
import { type CartItem } from "@/src/features/cart/store";
import { cn } from "@/src/lib/utils";

interface CartRowProps {
  item: CartItem;
  total: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
  onToggle: () => void;
  onNote: (note: string) => void;
}

export function CartRow({ item, total, onInc, onDec, onRemove, onToggle, onNote }: CartRowProps) {
  const [editing, setEditing] = useState(false);

  const modifiers = [
    ...(item.size ? [item.size.name] : []),
    ...item.addons.map((a) => a.name),
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="flex items-start gap-3 pb-4">
        <button onClick={onToggle} className="mt-1 flex-shrink-0" aria-label="Select item">
          <span
            className={cn(
              "w-6 h-6 rounded-[7px] border flex items-center justify-center transition-colors",
              item.selected ? "bg-[#EF5B5B] border-[#EF5B5B]" : "border-neutral-300"
            )}
          >
            {item.selected && <Check size={16} className="text-white" />}
          </span>
        </button>

        <img src={item.image} alt={item.name} className="w-[80px] h-[80px] object-cover rounded-[16px] flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading font-normal text-[18px] text-neutral-800 leading-tight">{item.name}</span>
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                onClick={() => setEditing((v) => !v)}
                className="border border-neutral-300 rounded-[50px] w-[44px] h-[36px] flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
                aria-label="Edit note"
              >
                <Pencil size={14} className="text-neutral-600" />
              </button>
              <button
                onClick={onRemove}
                className="border border-neutral-300 rounded-[50px] w-[44px] h-[36px] flex items-center justify-center hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={14} className="text-neutral-600" />
              </button>
            </div>
          </div>

          {modifiers.length > 0 && (
            <p className="font-heading font-light text-[13px] text-neutral-400 mt-0.5 truncate">
              {modifiers.join(" · ")}
            </p>
          )}

          {editing && (
            <input
              value={item.note ?? ""}
              onChange={(e) => onNote(e.target.value)}
              placeholder="Note for the kitchen..."
              className="w-full mt-2 h-[36px] rounded-[10px] border border-neutral-200 px-3 font-heading text-[13px] outline-none focus:border-[#EF5B5B]"
            />
          )}
          {!editing && item.note && (
            <p className="font-heading font-light text-[13px] text-[#EF5B5B] mt-0.5 truncate">📝 {item.note}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onDec}
                className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
              >
                <Minus size={14} className="text-neutral-700" />
              </button>
              <span className="font-heading font-semibold text-[18px] text-neutral-800 min-w-[20px] text-center">
                {item.qty}
              </span>
              <button
                onClick={onInc}
                className="w-7 h-7 rounded-full bg-[#EF5B5B] flex items-center justify-center hover:bg-[#CD424E] transition-colors"
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-light text-[15px] text-neutral-600">Total :</span>
              <span className="font-heading font-semibold text-[18px] text-neutral-800">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-neutral-200" />
    </motion.div>
  );
}