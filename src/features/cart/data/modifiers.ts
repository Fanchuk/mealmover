export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const SIZE_OPTIONS: ModifierOption[] = [
  { id: "size-s", name: "Small",  price: 0,    image: "/modifiers/size-s.png" },
  { id: "size-m", name: "Medium", price: 1.5,  image: "/modifiers/size-m.png" },
  { id: "size-l", name: "Large",  price: 3.0,  image: "/modifiers/size-l.png" },
];

export const ADDON_OPTIONS: ModifierOption[] = [
  { id: "add-cheese",   name: "Extra Cheese",   price: 1.2, image: "/modifiers/cheese.png" },
  { id: "add-egg",      name: "Fried Egg",      price: 1.0, image: "/modifiers/egg.png" },
  { id: "add-sauce-bbq",name: "BBQ Sauce",      price: 0.6, image: "/modifiers/bbq.png" },
  { id: "add-sauce-chili", name: "Chili Sauce", price: 0.6, image: "/modifiers/chili.png" },
  { id: "add-salad",    name: "Side Salad",     price: 1.8, image: "/modifiers/salad.png" },
  { id: "add-rice",     name: "Steamed Rice",   price: 1.4, image: "/modifiers/rice.png" },
  { id: "add-fries",    name: "Fries",          price: 2.0, image: "/modifiers/fries.png" },
  { id: "add-avocado",  name: "Avocado",        price: 2.2, image: "/modifiers/avocado.png" },
];

export const DEFAULT_SIZE_ID = "size-m";