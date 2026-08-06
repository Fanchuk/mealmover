import { RestaurantsHero } from "@/src/features/restaurants/components/RestaurantsHero";
import { PromoBanner } from "@/src/features/restaurants/components/PromoBanner";
import { ExploreSection } from "@/src/features/restaurants/components/ExploreSection";
import { RestaurantsGrid } from "@/src/features/restaurants/components/RestaurantsGrid";
import { DownloadAppSection } from "@/src/features/restaurants/components/DownloadAppSection";
import { getFeaturedRestaurant, getRestaurantsList } from "@/src/features/restaurants/services/restaurantsList";
import { ScrollReveal } from "@/src/components/ScrollReveal";

interface RestaurantsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const sp = await searchParams;
  const featured = await getFeaturedRestaurant();

  const { items, totalCount } = await getRestaurantsList({
    q: sp.q ?? "",
    category: sp.category as never,
    price: sp.price,
    sort: (sp.sort as never) ?? "rating",
    lat: sp.lat ? Number(sp.lat) : null,
    lng: sp.lng ? Number(sp.lng) : null,
    page: 1,
    pageSize: 8,
  });

  return (
    <>
      <RestaurantsHero />
      <ScrollReveal><PromoBanner restaurant={featured} /></ScrollReveal>
      <ScrollReveal><ExploreSection /></ScrollReveal>
      <ScrollReveal><RestaurantsGrid initialItems={items} totalCount={totalCount} /></ScrollReveal>
      <ScrollReveal><DownloadAppSection /></ScrollReveal>
    </>
  );
}