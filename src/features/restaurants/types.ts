export type RestaurantTag = { id: string; name: string };

export type RestaurantListItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  street: string;
  city: string;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  favoritesCount: number;
  deliveryTimeMin: number;
  is24Hours: boolean;
  priceLevel: string;
  lat: number | null;
  lng: number | null;
  tags: RestaurantTag[];
  distanceKm?: number;
};

export type RestaurantsApiResponse = {
  items: RestaurantListItem[];
  nextPage: number | null;
  totalCount: number;
};

export type RestaurantsFilters = {
  q?: string;
  category?: "near" | "best" | "loved" | "24h" | "healthy" | null;
  city?: string;
  tags?: string[];
  minRating?: number;
  price?: string | null;
  sort?: "rating" | "distance" | "delivery";
  lat?: number | null;
  lng?: number | null;
  page?: number;
  pageSize?: number;
};