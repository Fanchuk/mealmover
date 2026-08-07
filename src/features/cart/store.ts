import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartModifier {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  lineId: string;        
  id: string;            
  restaurantId: string;
  restaurantName: string;
  name: string;
  image: string;
  basePrice: number;
  qty: number;
  selected: boolean;
  note?: string;
  size?: CartModifier;
  addons: CartModifier[];
}

export interface AppliedPromo {
  code: string;
  description: string;
  discount: number;      
}

interface AddPayload {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  image: string;
  basePrice: number;
  qty?: number;
  note?: string;
  size?: CartModifier;
  addons?: CartModifier[];
}

interface CartStore {
  open: boolean;
  items: CartItem[];
  promo: AppliedPromo | null;

  setOpen: (v: boolean) => void;
  addItem: (payload: AddPayload) => void;
  incQty: (lineId: string) => void;
  decQty: (lineId: string) => void;
  removeItem: (lineId: string) => void;
  toggleSelected: (lineId: string) => void;
  toggleSelectAll: (value: boolean) => void;
  setNote: (lineId: string, note: string) => void;
  clearCart: () => void;
  setPromo: (promo: AppliedPromo | null) => void;

  lineTotal: (item: CartItem) => number;
  selectedSubtotal: () => number;
  count: () => number;
  currentRestaurantId: () => string | null;
}

function buildLineId(p: AddPayload) {
  const addonIds = (p.addons ?? []).map((a) => a.id).sort().join(",");
  return `${p.id}__${p.size?.id ?? "nosize"}__${addonIds}`;
}

function unitPrice(item: CartItem) {
  const addons = item.addons.reduce((s, a) => s + a.price, 0);
  return item.basePrice + (item.size?.price ?? 0) + addons;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      open: false,
      items: [],
      promo: null,

      setOpen: (v) => set({ open: v }),

      addItem: (payload) =>
        set((state) => {
          const lineId = buildLineId(payload);
          const existing = state.items.find((i) => i.lineId === lineId);
          const addQty = payload.qty ?? 1;

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === lineId ? { ...i, qty: i.qty + addQty } : i
              ),
            };
          }

          const newItem: CartItem = {
            lineId,
            id: payload.id,
            restaurantId: payload.restaurantId,
            restaurantName: payload.restaurantName,
            name: payload.name,
            image: payload.image,
            basePrice: payload.basePrice,
            qty: addQty,
            selected: true,
            note: payload.note,
            size: payload.size,
            addons: payload.addons ?? [],
          };
          return { items: [...state.items, newItem] };
        }),

      incQty: (lineId) =>
        set((state) => ({
          items: state.items.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i)),
        })),

      decQty: (lineId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.lineId === lineId ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((i) => i.lineId !== lineId) })),

      toggleSelected: (lineId) =>
        set((state) => ({
          items: state.items.map((i) => (i.lineId === lineId ? { ...i, selected: !i.selected } : i)),
        })),

      toggleSelectAll: (value) =>
        set((state) => ({ items: state.items.map((i) => ({ ...i, selected: value })) })),

      setNote: (lineId, note) =>
        set((state) => ({
          items: state.items.map((i) => (i.lineId === lineId ? { ...i, note } : i)),
        })),

      clearCart: () => set({ items: [], promo: null }),

      setPromo: (promo) => set({ promo }),

      lineTotal: (item) => unitPrice(item) * item.qty,

      selectedSubtotal: () =>
        get()
          .items.filter((i) => i.selected)
          .reduce((sum, i) => sum + unitPrice(i) * i.qty, 0),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      currentRestaurantId: () => get().items[0]?.restaurantId ?? null,
    }),
    {
      name: "mealmover-cart",
      partialize: (s) => ({ items: s.items, promo: s.promo }),
    }
  )
);