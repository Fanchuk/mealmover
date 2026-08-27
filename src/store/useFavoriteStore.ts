import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantName: string;
}

interface FavoritesStore {
  items: FavoriteItem[];
  toggle: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  remove: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) =>
        set((state) => ({
          items: state.items.some((i) => i.id === item.id)
            ? state.items.filter((i) => i.id !== item.id)
            : [...state.items, item],
        })),
      isFavorite: (id) => get().items.some((i) => i.id === id),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    }),
    { name: "mealmover-favorites" }
  )
);