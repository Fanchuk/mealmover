"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SIZE_OPTIONS, ADDON_OPTIONS, DEFAULT_SIZE_ID } from "../data/modifiers";
import { useCartStore } from "../store";
import { SizeCard } from "./SizeCard";
import { AddonCard } from "./AddonCard";

interface DishData {
  id: string;
  name: string;
  desc: string;
  image: string;
  basePrice: number;
  restaurantId: string;
  restaurantName: string;
}

interface Props {
  open: boolean;
  dish: DishData | null;
  onClose: () => void;
  onBeforeAdd?: (restaurantId: string, add: () => void) => void;
}

export function DishModal({ open, dish, onClose, onBeforeAdd }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [sizeId, setSizeId] = useState(DEFAULT_SIZE_ID);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  if (!dish) return null;

  const size = SIZE_OPTIONS.find((s) => s.id === sizeId)!;
  const addons = ADDON_OPTIONS.filter((a) => addonIds.includes(a.id));
  const unit = dish.basePrice + size.price + addons.reduce((s, a) => s + a.price, 0);
  const total = unit * qty;

  function toggleAddon(id: string) {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function reset() {
    setSizeId(DEFAULT_SIZE_ID);
    setAddonIds([]);
    setQty(1);
    setNote("");
  }

  function doAdd() {
    addItem({
      id: dish!.id,
      restaurantId: dish!.restaurantId,
      restaurantName: dish!.restaurantName,
      name: dish!.name,
      image: dish!.image,
      basePrice: dish!.basePrice,
      qty,
      note: note.trim() || undefined,
      size: { id: size.id, name: size.name, price: size.price },
      addons: addons.map((a) => ({ id: a.id, name: a.name, price: a.price })),
    });
    reset();
    onClose();
  }

  function handleAdd() {
    if (onBeforeAdd) onBeforeAdd(dish!.restaurantId, doAdd);
    else doAdd();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 pt-28 sm:p-6 sm:pt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] bg-white rounded-[28px] flex flex-col overflow-hidden shadow-2xl isolate"
            style={{ maxHeight: "calc(100dvh - 160px)" }}
          >
            <div className="relative w-full h-[180px] sm:h-[220px] flex-shrink-0 bg-neutral-100 rounded-t-[28px] overflow-hidden">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10"
              >
                <X size={18} className="text-neutral-800" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
              <h3 className="font-heading font-bold text-[22px] sm:text-[24px] text-neutral-800 leading-tight">{dish.name}</h3>
              <p className="font-heading text-[14px] sm:text-[15px] text-neutral-500 mt-1.5">{dish.desc}</p>
              <p className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#EF5B5B] mt-3">${dish.basePrice.toFixed(2)}</p>

              <div className="mt-6">
                <p className="font-heading font-semibold text-[15px] sm:text-[16px] text-neutral-800 mb-3">
                  Portion size <span className="text-neutral-400 font-normal text-[13px]">· pick one</span>
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {SIZE_OPTIONS.map((opt) => (
                    <SizeCard key={opt.id} opt={opt} active={sizeId === opt.id} onClick={() => setSizeId(opt.id)} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-heading font-semibold text-[15px] sm:text-[16px] text-neutral-800 mb-3">
                  Add extras <span className="text-neutral-400 font-normal text-[13px]">· optional</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {ADDON_OPTIONS.map((opt) => (
                    <AddonCard key={opt.id} opt={opt} active={addonIds.includes(opt.id)} onClick={() => toggleAddon(opt.id)} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-heading font-semibold text-[15px] sm:text-[16px] text-neutral-800 mb-2">Note</p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. no onions, extra spicy..."
                  className="w-full min-h-[70px] rounded-[16px] border border-neutral-200 p-3 font-heading text-[14px] outline-none focus:border-[#EF5B5B] resize-none"
                />
              </div>
            </div>

            <div className="flex-shrink-0 border-t border-neutral-100 px-5 sm:px-6 py-4 flex items-center gap-3 sm:gap-4 bg-white rounded-b-[28px]">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-heading font-semibold text-[18px] min-w-[20px] text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EF5B5B] flex items-center justify-center hover:bg-[#CD424E] transition-colors"
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 h-[48px] sm:h-[52px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[15px] sm:text-[16px] hover:bg-[#CD424E] transition-colors flex items-center justify-center gap-2"
              >
                Add · ${total.toFixed(2)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}