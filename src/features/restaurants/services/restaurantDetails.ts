import { prisma } from "@/src/lib/prisma";

export async function getRestaurantBySlug(slug: string) {
  return prisma.restaurant.findUnique({
    where: { slug },
    include: { tags: true },
  });
}

export async function getMenuByRestaurant(restaurantId: string) {
  return prisma.menuItem.findMany({
    where: { restaurantId },
    include: { category: true },
  });
}

export async function getReviewsByRestaurant(restaurantId: string) {
  return prisma.review.findMany({
    where: { restaurantId, isVisible: true },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviewStatsByRestaurant(restaurantId: string) {
  const aspects = ["PRICE", "TASTE", "HYGIENE", "PACKAGING"] as const;
  
  const [all, ...byAspect] = await Promise.all([
    prisma.review.aggregate({
      where: { restaurantId, isVisible: true },
      _avg: { rating: true },
      _count: true,
    }),
    ...aspects.map((aspect) =>
      prisma.review.aggregate({
        where: { restaurantId, isVisible: true, aspect },
        _avg: { rating: true },
        _count: true,
      })
    ),
  ]);

  return {
    all: { count: all._count, avg: all._avg.rating ?? 4.9 },
    price: { count: byAspect[0]._count, avg: byAspect[0]._avg.rating ?? 4.8 },
    taste: { count: byAspect[1]._count, avg: byAspect[1]._avg.rating ?? 4.9 },
    hygiene: { count: byAspect[2]._count, avg: byAspect[2]._avg.rating ?? 4.8 },
    packaging: { count: byAspect[3]._count, avg: byAspect[3]._avg.rating ?? 4.9 },
  };
}