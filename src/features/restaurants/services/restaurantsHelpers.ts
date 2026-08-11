import { Prisma } from "@prisma/client";
import { haversineDistanceKm } from "@/src/features/restaurants/restaurantsUtils";
import type { RestaurantsFilters, RestaurantListItem } from "@/src/features/restaurants/types";

export function buildPrismaWhereClause(filters: RestaurantsFilters): Prisma.RestaurantWhereInput {
  const where: Prisma.RestaurantWhereInput = {};

  if (filters.q) where.name = { contains: filters.q, mode: "insensitive" };

  if (filters.city) where.city = { name: { equals: filters.city, mode: "insensitive" } };

  if (filters.price) where.priceLevel = filters.price.length;

  if (filters.minRating) where.rating = { gte: filters.minRating };

  if (filters.tags && filters.tags.length > 0)
    where.tags = { some: { name: { in: filters.tags } } };

  if (filters.category === "healthy")
    where.tags = { some: { name: { equals: "Healthy", mode: "insensitive" } } };

  if (filters.category === "24h") where.isOpen = true;

  return where;
}

export function sortAndFilterRestaurants(
  items: RestaurantListItem[],
  filters: RestaurantsFilters
) {
  let processed = [...items];
  const withDistance = filters.lat != null && filters.lng != null;

  if (withDistance && (filters.category === "near" || filters.sort === "distance")) {
    // є координати — сортуємо по реальній відстані
    processed = processed
      .filter((r) => r.lat != null && r.lng != null)
      .map((r) => ({
        ...r,
        distanceKm: haversineDistanceKm(filters.lat!, filters.lng!, r.lat!, r.lng!),
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  } else if (filters.sort === "distance") {
    // немає координат — fallback по часу доставки
    processed.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
  } else if (filters.category === "best") {
    processed.sort((a, b) => b.ordersCount - a.ordersCount);
  } else if (filters.category === "loved") {
    processed.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (filters.sort === "delivery") {
    processed.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
  } else {
    processed.sort((a, b) => b.rating - a.rating);
  }

  return processed;
}