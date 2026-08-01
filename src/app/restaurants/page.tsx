import { RestaurantsHero } from "@/src/components/restaurants/RestaurantsHero";
import { PromoBanner } from "@/src/components/restaurants/PromoBanner";
import { ExploreSection } from "@/src/components/restaurants/ExploreSection";
import { RestaurantsGrid } from "@/src/components/restaurants/RestaurantsGrid";
import { DownloadAppSection } from "@/src/components/restaurants/DownloadAppSection";

export default function RestaurantsPage() {
  return (
    <>
      <RestaurantsHero />
      <PromoBanner />
      <ExploreSection />
      <RestaurantsGrid />
      <DownloadAppSection />
    </>
  );
}