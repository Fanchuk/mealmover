import { create } from "zustand";

interface FavoritesStore {
    ids: string[]
    toggle: (id: string) => void
    isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    ids: [],
    toggle: (id) =>
        set((state) => ({
            ids: state.ids.includes(id)
               ? state.ids.filter((i) => i !== id)
               : [...state.ids, id]
        })),
    isFavorite: (id) => get().ids.includes(id)
}))