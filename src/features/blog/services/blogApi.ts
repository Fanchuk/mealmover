import { z } from "zod";
import { redis } from "@/src/lib/upstash";

const MealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().optional(),
  strTags: z.string().nullable().optional(),
  strInstructions: z.string().optional(),
  strMealThumb: z.string().optional(),
});

export type BlogPost = {
  id: number;
  title: string;
  body: string;
  image: string;
  tags: string[];
  userId: number;
  views: number;
};

const CATEGORIES = ["all", "beef", "chicken", "dessert", "lamb", "pasta", "seafood", "vegetarian", "breakfast", "goat"];

function mapMeal(m: z.infer<typeof MealSchema>): BlogPost {
  return {
    id: Number(m.idMeal),
    title: m.strMeal,
    body: m.strInstructions ?? "",
    image: m.strMealThumb ?? `https://picsum.photos/seed/${m.idMeal}/600/400`,
    tags: m.strTags
      ? m.strTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [m.strCategory?.toLowerCase() ?? "food"],
    userId: 1,
    views: (Number(m.idMeal) * 7) % 1000,
  };
}

export async function getPosts(params: { q?: string; tag?: string } = {}): Promise<BlogPost[]> {
  const { q = "", tag = "" } = params;
  const cacheKey = `blog:meals:${q}:${tag}`;

  try {
    const cached = await redis.get<BlogPost[]>(cacheKey);
    if (cached) return cached;
  } catch {}

  let url: string;
  if (q) url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`;
  else if (tag) url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(tag)}`;
  else url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const raw = await res.json();
  const meals = (raw.meals ?? []) as unknown[];

  // filter endpoint повертає скорочені дані — треба дофетчити деталі
  let detailed: BlogPost[];
  if (tag && !q) {
    const full = await Promise.all(
      meals.slice(0, 20).map(async (m: any) => {
        const r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
        const d = await r.json();
        const meal = MealSchema.safeParse(d.meals?.[0]);
        return meal.success ? mapMeal(meal.data) : null;
      })
    );
    detailed = full.filter(Boolean) as BlogPost[];
  } else {
    detailed = meals
      .map((m) => {
        const parsed = MealSchema.safeParse(m);
        return parsed.success ? mapMeal(parsed.data) : null;
      })
      .filter(Boolean) as BlogPost[];
  }

  try {
    await redis.set(cacheKey, detailed, { ex: 3600 });
  } catch {}

  return detailed;
}

export async function getPopularPosts(limit = 4): Promise<BlogPost[]> {
  try {
    const cached = await redis.get<BlogPost[]>("blog:meals:popular");
    if (cached) return cached.slice(0, limit);
  } catch {}

  const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken", {
    next: { revalidate: 3600 },
  });
  const raw = await res.json();
  const meals = (raw.meals ?? []).slice(0, limit);
  const result = meals
    .map((m: unknown) => {
      const parsed = MealSchema.safeParse(m);
      return parsed.success ? mapMeal(parsed.data) : null;
    })
    .filter(Boolean) as BlogPost[];

  try {
    await redis.set("blog:meals:popular", result, { ex: 3600 });
  } catch {}

  return result;
}

export async function getAllTags(): Promise<string[]> {
  try {
    const cached = await redis.get<string[]>("blog:meals:tags");
    if (cached) return cached;
  } catch {}

  const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list", {
    next: { revalidate: 86400 },
  });
  const raw = await res.json();
  const tags = (raw.meals ?? []).map((m: { strCategory: string }) =>
    m.strCategory.toLowerCase()
  ).slice(0, 12) as string[];

  try {
    await redis.set("blog:meals:tags", tags, { ex: 86400 });
  } catch {}

  return tags;
}

export { CATEGORIES };