import { DummyPostsResponseSchema, DummyPostSchema, DummyUserSchema, type BlogPost } from "@/src/features/blog/types";
import { getMealsByCategory } from "@/src/lib/themealdb";

const BASE = "https://dummyjson.com";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function fakeDate(id: number) {
  const m = MONTHS[id % 12];
  const d = (id % 28) + 1;
  return `${m}, ${String(d).padStart(2, "0")} 2024`;
}

const TAG_TO_MEAL_CATEGORY: Record<string, string> = {
  history: "Beef",
  american: "Chicken",
  crime: "Pork",
  french: "Seafood",
  fiction: "Pasta",
  english: "Lamb",
  magical: "Dessert",
  mystery: "Miscellaneous",
  love: "Vegetarian",
  food: "Seafood",
  health: "Vegetarian",
  sport: "Chicken",
  science: "Beef",
};

const mealImageCache = new Map<string, string>();

async function getMealImage(tags: string[]): Promise<string> {
  for (const tag of tags) {
    const category = TAG_TO_MEAL_CATEGORY[tag.toLowerCase()];
    if (!category) continue;
    if (mealImageCache.has(category)) return mealImageCache.get(category)!;
    const meals = await getMealsByCategory(category);
    if (meals.length > 0 && meals[0].strMealThumb) {
      mealImageCache.set(category, meals[0].strMealThumb);
      return meals[0].strMealThumb;
    }
  }
  return `https://picsum.photos/seed/blog-${Math.random()}/800/500`;
}

export async function getBlogPosts(limit = 3, skip = 0): Promise<{ posts: BlogPost[]; total: number }> {
  const res = await fetch(`${BASE}/posts?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  const parsed = DummyPostsResponseSchema.safeParse(json);
  if (!parsed.success) return { posts: [], total: 0 };

  const posts = await Promise.all(
    parsed.data.posts.map(async (post) => {
      const [userRes, image] = await Promise.all([
        fetch(`${BASE}/users/${post.userId}`, { next: { revalidate: 86400 } }).then(r => r.json()),
        getMealImage(post.tags),
      ]);

      const user = DummyUserSchema.safeParse(userRes);
      const authorName = user.success ? `${user.data.firstName} ${user.data.lastName}` : "Anonymous";
      const authorImage = user.success ? user.data.image : `https://i.pravatar.cc/300?u=${post.userId}`;

      return {
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        likes: post.reactions.likes,
        views: post.views,
        image,
        authorName,
        authorImage,
        createdAt: fakeDate(post.id),
      };
    })
  );

  return { posts, total: parsed.data.total };
}

export async function getPopularBlogPosts(): Promise<BlogPost[]> {
  const { posts } = await getBlogPosts(4, 0);
  return posts;
}

export async function getBlogTags(): Promise<string[]> {
  const res = await fetch(`${BASE}/posts/tags`, { next: { revalidate: 86400 } });
  const json = await res.json();
  if (!Array.isArray(json)) return [];
  return json
    .map((t: any) => (typeof t === "string" ? t : t.name ?? t.slug ?? ""))
    .filter(Boolean)
    .slice(0, 9);
}

export async function getBlogGalleryImages(): Promise<string[]> {
  const categories = ["Seafood", "Chicken", "Beef", "Dessert", "Pasta", "Lamb"];
  const results = await Promise.all(
    categories.map((cat) => getMealsByCategory(cat).then((m) => m[0]?.strMealThumb ?? ""))
  );
  return results.filter(Boolean);
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const postRes = await fetch(`${BASE}/posts/${id}`, { next: { revalidate: 3600 } })
  
  const postJson = await postRes.json();
  const parsed = DummyPostSchema.safeParse(postJson);
  if (!parsed.success) return null;

  const post = parsed.data;
  const userRes = await fetch(`${BASE}/users/${post.userId}`, { next: { revalidate: 86400 } });
  const userJson = await userRes.json();
  const user = DummyUserSchema.safeParse(userJson);

  const image = await getMealImage(post.tags);

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    tags: post.tags,
    likes: post.reactions.likes,
    views: post.views,
    image,
    authorName: user.success ? `${user.data.firstName} ${user.data.lastName}` : "Anonymous",
    authorImage: user.success ? user.data.image : `https://i.pravatar.cc/300?u=${post.userId}`,
    createdAt: fakeDate(post.id),
  };
}

export async function getBlogPostComments(postId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/comments`, { next: { revalidate: 3600 } });
  const json = await res.json();
  if (!json.comments) return [];
  return json.comments as { id: number; body: string; user: { username: string } }[];
}

export async function getAdjacentPosts(id: number): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const [prev, next] = await Promise.all([
    id > 1 ? getBlogPostById(id - 1) : Promise.resolve(null),
    getBlogPostById(id + 1),
  ]);
  return { prev, next };
}