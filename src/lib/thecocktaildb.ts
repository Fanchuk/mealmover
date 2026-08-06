import { 
    CocktailsResponseSchema,
    type Cocktail,
    type MenuItemCardData,
 } from "./types/meals";

const BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export async function getCocktailsByCategory(category = "Cocktail"): Promise<Cocktail[]> {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const parsed = CocktailsResponseSchema.safeParse(json);
  return parsed.success ? (parsed.data.drinks ?? []) : [];
}

export async function searchCocktails(query: string): Promise<Cocktail[]> {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const parsed = CocktailsResponseSchema.safeParse(json);
  return parsed.success ? (parsed.data.drinks ?? []) : [];
}

export function cocktailToMenuItemCard(drink: Cocktail, index = 0): MenuItemCardData {
  const price = Math.round((8.0 + index * 0.5) * 100) / 100;
  const oldPrice = Math.round(price * 3.2 * 100) / 100;
  const discount = `Discount $${(oldPrice - price).toFixed(2)}`;
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    desc: drink.strAlcoholic ?? drink.strCategory ?? "Refreshing drink",
    image: drink.strDrinkThumb ?? `https://picsum.photos/seed/${drink.idDrink}/800/600`,
    price,
    oldPrice,
    discount,
  };
}