import { 
    MealsResponseSchema,
    MealCategoriesResponseSchema,
    type Meal,
    type OfferCardData,
 } from "./types/meals";

const BASE = "https://www.themealdb.com/api/json/v1/1";


export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const parsed = MealsResponseSchema.safeParse(json);
  return parsed.success ? (parsed.data.meals ?? []) : [];
}

export async function searchMeals(query: string): Promise<Meal[]> {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const parsed = MealsResponseSchema.safeParse(json);
  return parsed.success ? (parsed.data.meals ?? []) : [];
}

export async function getMealCategories() {
  const res = await fetch(`${BASE}/categories.php`, {
    next: { revalidate: 86400 },
  });
  const json = await res.json();
  const parsed = MealCategoriesResponseSchema.safeParse(json);
  return parsed.success ? parsed.data.categories : [];
}


const PRICE_BY_CATEGORY: Record<string, number> = {
  Seafood: 14.5,
  Chicken: 11.0,
  Beef: 13.5,
  Vegetarian: 9.5,
  Dessert: 8.0,
  Pasta: 10.5,
  Lamb: 15.0,
  Pork: 12.0,
  Breakfast: 8.5,
  Miscellaneous: 10.02,
};

function calcPrices(category: string | null, index: number) {
  const base = PRICE_BY_CATEGORY[category ?? ""] ?? 10.02;
  const price = Math.round((base + index * 0.3) * 100) / 100;
  const oldPrice = Math.round(price * 3.2 * 100) / 100;
  return { price, oldPrice };
}

export function mealToOfferCard(meal: Meal, index = 0): OfferCardData {
  const { price, oldPrice } = calcPrices(meal.strCategory, index);
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    desc: meal.strArea ? `${meal.strArea} cuisine` : "Delicious meal",
    image: meal.strMealThumb ?? `https://picsum.photos/seed/${meal.idMeal}/800/600`,
    price,
    oldPrice,
  };
}

export function mealToMenuItemCard(meal: Meal, index = 0): MenuItemCardData {
  const { price, oldPrice } = calcPrices(meal.strCategory, index);
  const discount = `Discount $${(oldPrice - price).toFixed(2)}`;
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    desc: meal.strArea ? `${meal.strArea} cuisine` : "Delicious meal",
    image: meal.strMealThumb ?? `https://picsum.photos/seed/${meal.idMeal}/800/600`,
    price,
    oldPrice,
    discount,
  };
}