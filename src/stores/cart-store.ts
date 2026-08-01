import { create } from "zustand";

interface CartStore {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
}));