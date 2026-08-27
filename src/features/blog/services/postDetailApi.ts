import { z } from "zod";
import { redis } from "@/src/lib/upstash";
import { prisma } from "@/src/lib/prisma";

const MealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().optional(),
  strTags: z.string().nullable().optional(),
  strInstructions: z.string().optional(),
  strMealThumb: z.string().optional(),
  strArea: z.string().optional(),
});

export type PostDetail = {
  id: number;
  title: string;
  body: string;
  image: string;
  tags: string[];
  views: number;
};

function mapMeal(m: z.infer<typeof MealSchema>): PostDetail {
  return {
    id: Number(m.idMeal),
    title: m.strMeal,
    body: m.strInstructions ?? "No instructions available.",
    image: m.strMealThumb ?? "",
    tags: m.strTags
      ? m.strTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [m.strCategory?.toLowerCase() ?? "food"],
    views: (Number(m.idMeal) * 7) % 1000,
  };
}

export async function getPostDetail(id: number): Promise<PostDetail | null> {
  const cacheKey = `blog:meal:${id}`;

  try {
    const cached = await redis.get<PostDetail>(cacheKey);
    if (cached) return cached;
  } catch {}

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) return null;

  const raw = await res.json();
  const meal = raw.meals?.[0];
  if (!meal) return null;

  const parsed = MealSchema.safeParse(meal);
  if (!parsed.success) return null;

  const result = mapMeal(parsed.data);

  try {
    await redis.set(cacheKey, result, { ex: 3600 });
  } catch {}

  return result;
}

export async function getAdjacentPosts(id: number) {
  async function exists(checkId: number): Promise<boolean> {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${checkId}`);
      const data = await res.json();
      return !!data.meals?.[0];
    } catch {
      return false;
    }
  }

  const [prevExists, nextExists] = await Promise.all([
    id > 52772 ? exists(id - 1) : Promise.resolve(false),
    exists(id + 1),
  ]);

  // шукаємо наступний існуючий ID (до 5 кроків вперед)
  let nextId: number | null = null;
  if (nextExists) {
    nextId = id + 1;
  } else {
    for (let i = 2; i <= 5; i++) {
      if (await exists(id + i)) { nextId = id + i; break; }
    }
  }

  let prevId: number | null = null;
  if (id > 52772) {
    if (prevExists) {
      prevId = id - 1;
    } else {
      for (let i = 2; i <= 5; i++) {
        if (id - i >= 52772 && await exists(id - i)) { prevId = id - i; break; }
      }
    }
  }

  return { prevId, nextId };
}

export async function getRelatedPosts(tags: string[] = [], excludeId: number): Promise<PostDetail[]> {
  if (!tags || tags.length === 0) return [];

  const category = tags[0];
  const cacheKey = `blog:related:${category}`;

  try {
    const cached = await redis.get<PostDetail[]>(cacheKey);
    if (cached) return cached.filter((p) => p.id !== excludeId).slice(0, 3);
  } catch {}

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) return [];

  const raw = await res.json();
  const meals = (raw.meals ?? []).slice(0, 6);

  const detailed = await Promise.all(
    meals.map(async (m: { idMeal: string }) => {
      const r = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
      const d = await r.json();
      const parsed = MealSchema.safeParse(d.meals?.[0]);
      return parsed.success ? mapMeal(parsed.data) : null;
    })
  );

  const result = detailed.filter(Boolean) as PostDetail[];

  try {
    await redis.set(cacheKey, result, { ex: 3600 });
  } catch {}

  return result.filter((p) => p.id !== excludeId).slice(0, 3);
}

export async function getComments(postId: number) {
  return prisma.blogComment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
  });
}