import { describe, it, expect, beforeEach } from "vitest";
import { useFavoritesStore } from "./useFavoriteStore";

const mockItem = {
  id: "1",
  name: "Burger",
  price: 120,
  image: "/burger.jpg",
  restaurantName: "Burger House",
};

const mockItem2 = {
  id: "2",
  name: "Pizza",
  price: 200,
  image: "/pizza.jpg",
  restaurantName: "Pizza Place",
};

beforeEach(() => {
  useFavoritesStore.setState({ items: [] });
});

describe("useFavoritesStore", () => {
  it("початково список вибраного порожній", () => {
    const { items } = useFavoritesStore.getState();
    expect(items).toHaveLength(0);
  });

  it("toggle додає item якщо його немає", () => {
    useFavoritesStore.getState().toggle(mockItem);
    expect(useFavoritesStore.getState().items).toHaveLength(1);
    expect(useFavoritesStore.getState().items[0].id).toBe("1");
  });

  it("toggle видаляє item якщо він вже є", () => {
    useFavoritesStore.getState().toggle(mockItem);
    useFavoritesStore.getState().toggle(mockItem);
    expect(useFavoritesStore.getState().items).toHaveLength(0);
  });

  it("isFavorite повертає true якщо item є у списку", () => {
    useFavoritesStore.getState().toggle(mockItem);
    expect(useFavoritesStore.getState().isFavorite("1")).toBe(true);
  });

  it("remove видаляє конкретний item зі списку", () => {
    useFavoritesStore.getState().toggle(mockItem);
    useFavoritesStore.getState().toggle(mockItem2);
    useFavoritesStore.getState().remove("1");
    const { items } = useFavoritesStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe("2");
  });
});