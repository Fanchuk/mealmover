import { RestaurantDetailHero } from "@/src/components/restaurants/RestaurantDetailHero";
import { TodaysOffer } from "@/src/components/restaurants/TodaysOffer";
import { MenuSection } from "@/src/components/restaurants/MenuSection";
import { CustomerReviews } from "@/src/components/restaurants/CustomerReviews";

export default function RestaurantDetailPage() {
  return (
    <>
      <RestaurantDetailHero />
      <TodaysOffer />
      <MenuSection />
      <CustomerReviews />
    </>
  );
}