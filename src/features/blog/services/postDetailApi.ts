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
  return { prevId: id > 52772 ? id - 1 : null, nextId: id + 1 };
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