import { prisma } from "@/src/lib/prisma";

export async function getFeatures() {
  return prisma.feature.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getFaqs() {
  return prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getCities() {
  return prisma.city.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    take: 5,
  });
}

export async function getPopularMenuItems() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
    orderBy: { order: "asc" },
    take: 5,
  });

  const items = await Promise.all(
    categories.map((cat) =>
      prisma.menuItem.findMany({
        where: { category: { slug: cat.slug } },
        include: { restaurant: true, category: true },
        take: 6,
        orderBy: { rating: "desc" },
      })
    )
  );

  return items.flat();
}