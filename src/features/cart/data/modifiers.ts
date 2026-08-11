export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export const SIZE_OPTIONS: ModifierOption[] = [
  { id: "size-s", name: "Small", price: 0 },
  { id: "size-m", name: "Medium", price: 1.5 },
  { id: "size-l", name: "Large", price: 3.0 },
];

export const ADDON_OPTIONS: ModifierOption[] = [
  { id: "add-cheese", name: "Extra Cheese", price: 1.2 },
  { id: "add-egg", name: "Fried Egg", price: 1.0 },
  { id: "add-sauce-bbq", name: "BBQ Sauce", price: 0.6 },
  { id: "add-sauce-chili", name: "Chili Sauce", price: 0.6 },
  { id: "add-salad", name: "Side Salad", price: 1.8 },
  { id: "add-rice", name: "Steamed Rice", price: 1.4 },
  { id: "add-fries", name: "Fries", price: 2.0 },
  { id: "add-avocado", name: "Avocado", price: 2.2 },
];

export const DEFAULT_SIZE_ID = "size-m";