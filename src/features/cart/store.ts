import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface CartStore {
  open: boolean;
  items: CartItem[];
  setOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  open: false,
  items: [],
  setOpen: (v) => set({ open: v }),
  addItem: (item) =>
    set((state) => {
        const existing = state.items.find((i) => i.id === item.id)

        if (existing) {
            return {
                items: state.items.map((i) =>
                   i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            )
            }
        }

        return { items: [...state.items, { ...item, qty: 1 }] }
    }),
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
}));