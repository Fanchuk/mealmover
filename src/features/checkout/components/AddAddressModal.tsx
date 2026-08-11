"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { saveAddress } from "@/src/features/restaurants/services/addressActions";

interface Address {
  id: string; 
  title: string;
  street: string;
  note: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAdded: (a: Address) => void;
}

export function AddAddressModal({ open, onClose, onAdded }: Props) {
    const [title, setTitle] = useState('')
    const [street, setStreet] = useState('')
    const [pending, startTransition] = useTransition()

    function handleSave() {
        if (!title.trim() || !street.trim()) return
        startTransition(async () => {
            const res = await saveAddress(title.trim(), street.trim())
            if (!res.ok) {
                toast.error(res.error ?? 'Failed to save address.')
                return
            }
            onAdded({ id: res.id, title: title.trim(), street: street.trim(), note: null })
            setTitle('')
            setStreet('')
            toast.success('Address added!')
        })
    }

    return (
          <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[440px] bg-white rounded-[28px] p-6 lg:p-8 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
              <X size={18} />
            </button>
            <h3 className="font-heading font-bold text-[22px] text-neutral-800 mb-5">New address</h3>
            <div className="flex flex-col gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Label (e.g. Home, Office)"
                autoFocus
                className="w-full h-[48px] rounded-[14px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B] transition-colors"
              />
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Street & number"
                className="w-full h-[48px] rounded-[14px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B] transition-colors"
              />
              <button
                onClick={handleSave}
                disabled={pending || !title.trim() || !street.trim()}
                className="mt-2 h-[52px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors disabled:opacity-50"
              >
                {pending ? "Saving..." : "Save address"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    )
}