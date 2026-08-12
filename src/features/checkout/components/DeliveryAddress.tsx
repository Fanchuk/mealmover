"use client";

import { useState } from "react";
import { MapPin, Plus, Check, Pencil } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { AddAddressModal } from "./AddAddressModal";
import { cn } from "@/src/lib/utils";

export interface Address {
  id: string;
  title: string;
  street: string;
  note: string | null;
  lat?: number | null;
  lng?: number | null;
}

interface Props {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdded: (a: Address) => void;
  error?: string;
  noteRegister: UseFormRegisterReturn;
}

export function DeliveryAddress({
  addresses,
  selectedId,
  onSelect,
  onAdded,
  error,
  noteRegister,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);

  function handleAdded(a: Address) {
    onAdded(a);
    onSelect(a.id);
    setModalOpen(false);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] text-neutral-800">
          Delivery Address
        </h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 text-[#EF5B5B] font-heading font-medium text-[15px] hover:gap-3 transition-all"
        >
          <Plus size={18} /> Add new
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-neutral-300 p-6 text-center">
          <p className="font-heading text-neutral-500 mb-3">
            No saved addresses yet.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-[44px] px-5 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors"
          >
            Add address
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((addr) => {
            const isActive = selectedId === addr.id;
            return (
              <motion.button
                key={addr.id}
                type="button"
                onClick={() => onSelect(addr.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-[20px] border-2 text-left transition-colors",
                  isActive
                    ? "border-[#EF5B5B] bg-[#EF5B5B]/5"
                    : "border-neutral-200 hover:border-[#EF5B5B]/40"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    isActive
                      ? "border-[#EF5B5B] bg-[#EF5B5B]"
                      : "border-neutral-300"
                  )}
                >
                  {isActive && <Check size={14} className="text-white" />}
                </span>
                <MapPin
                  size={20}
                  className="text-[#EF5B5B] flex-shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-[17px] text-neutral-800">
                    {addr.title}
                  </p>
                  <p className="font-heading text-[15px] text-neutral-500">
                    {addr.street}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-[#EF5B5B] font-heading text-[14px] mt-2">{error}</p>
      )}

      <button
        type="button"
        onClick={() => setShowNote((v) => !v)}
        className="flex items-center gap-2 text-neutral-500 font-heading text-[15px] mt-4 hover:text-[#EF5B5B] transition-colors"
      >
        <Pencil size={16} /> {showNote ? "Hide note" : "Add a note for the courier"}
      </button>
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <textarea
              {...noteRegister}
              placeholder="e.g. Ring the doorbell, leave at the gate..."
              className="w-full mt-3 min-h-[80px] rounded-[16px] border border-neutral-200 p-4 font-heading text-[14px] outline-none focus:border-[#EF5B5B] resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AddAddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={handleAdded}
      />
    </section>
  );
}