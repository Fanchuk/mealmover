import { prisma } from "@/src/lib/prisma";
import type { RestaurantsFilters, RestaurantsApiResponse, RestaurantListItem } from "@/src/features/restaurants/types";
import { buildPrismaWhereClause, sortAndFilterRestaurants } from "./restaurantsHelpers";

export async function getRestaurantsList(filters: RestaurantsFilters): Promise<RestaurantsApiResponse> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 8;

  const where = buildPrismaWhereClause(filters);
  const all = await prisma.restaurant.findMany({ 
    where, 
    include: { 
      tags: true,
      city: true,
      _count: {
        select: { 
          orders: true,
          favorites: true
        }
      }
    } 
  });

  const mappedItems: RestaurantListItem[] = all.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    image: r.image,
    street: r.street,
    city: r.city.name,
    rating: r.rating,
    reviewCount: r.reviewCount,
    ordersCount: r._count.orders,
    favoritesCount: r._count.favorites,
    deliveryTimeMin: r.deliveryMinMin,
    is24Hours: r.isOpen,
    priceLevel: r.priceLevel.toString(),
    lat: r.lat,
    lng: r.lng,
    tags: r.tags,
  }));

  const sortedItems = sortAndFilterRestaurants(mappedItems, filters);
  console.log("filters:", filters.sort, filters.lat, filters.lng);
  console.log("lat/lng в ресторанах:", mappedItems.map(r => ({ name: r.name, lat: r.lat, lng: r.lng })));

  const totalCount = sortedItems.length;
  const start = (page - 1) * pageSize;
  const pageItems = sortedItems.slice(start, start + pageSize);
  const nextPage = start + pageSize < totalCount ? page + 1 : null;

  return { items: pageItems, nextPage, totalCount };
}

export async function getFeaturedRestaurant() {
  return prisma.restaurant.findFirst({
    where: { isFeatured: true },
    include: { tags: true },
  });
}