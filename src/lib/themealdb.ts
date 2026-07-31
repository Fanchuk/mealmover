// TheMealDB — free meals API (no key required)
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
};

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`, {
    next: { revalidate: 60 * 60 * 24 }, // cache 24h
  });
  if (!res.ok) throw new Error(`TheMealDB error: ${res.status}`);
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) throw new Error(`TheMealDB error: ${res.status}`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}

// helper: assign a pseudo-price to a meal (TheMealDB has no prices)
export const mealPrice = (id: string) => {
  const n = parseInt(id.slice(-3), 10) % 20;
  return (n + 5 + 0.02).toFixed(2);
};