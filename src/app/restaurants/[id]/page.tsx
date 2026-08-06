import { notFound } from "next/navigation";
import { RestaurantDetailHero } from "@/src/features/restaurants/components/RestaurantDetailHero";
import { TodaysOffer } from "@/src/features/restaurants/components/TodaysOffer";
import { MenuSection } from "@/src/features/restaurants/components/MenuSection";
import { CustomerReviews } from "@/src/features/restaurants/components/CustomerReviews";
import { LocationMap } from "@/src/features/restaurants/components/LocationMap";
import { DetailShell } from "@/src/features/restaurants/components/DetailShell";
import { getMealsByCategory, mealToOfferCard, mealToMenuItemCard } from "@/src/lib/themealdb";
import { getCocktailsByCategory, cocktailToMenuItemCard } from "@/src/lib/thecocktaildb";
import { getRestaurantBySlug, getReviewsByRestaurant, getReviewStatsByRestaurant } from "@/src/features/restaurants/services/restaurantDetails";
import { canUserReview } from "@/src/features/restaurants/services/reviewActions";
import { RESTAURANT_MENU_MAP } from "@/src/features/restaurants/menu-map";
import { mapReview } from "@/src/lib/mapReview";

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [restaurant, config] = await Promise.all([
    getRestaurantBySlug(id),
    Promise.resolve(RESTAURANT_MENU_MAP[id]),
  ]);

  if (!restaurant || !config) notFound();

  const [reviews, reviewStats, canReview] = await Promise.all([
    getReviewsByRestaurant(restaurant.id),
    getReviewStatsByRestaurant(restaurant.id),
    canUserReview(restaurant.id),
  ]);

  const [cat1, cat2, mainCat, drinks] = await Promise.all([
    getMealsByCategory(config.todaysOffer[0]),
    getMealsByCategory(config.todaysOffer[1]),
    getMealsByCategory(config.mainCourse[0]),
    getCocktailsByCategory(config.drinkCategory),
  ]);

  const todaysOffers = [...cat1, ...cat2].slice(0, 8).map(mealToOfferCard);
  const mainCourse = mainCat.slice(0, 4).map(mealToMenuItemCard);
  const drinksDesserts = drinks.slice(0, 4).map(cocktailToMenuItemCard);

  return (
    <DetailShell>
      <RestaurantDetailHero restaurant={restaurant} />
      <TodaysOffer offers={todaysOffers} />
      <MenuSection mainCourse={mainCourse} drinksDesserts={drinksDesserts} />
      <LocationMap
        lat={(restaurant as { lat?: number | null }).lat ?? null}
        lng={(restaurant as { lng?: number | null }).lng ?? null}
        address={restaurant.street}
        name={restaurant.name}
      />
      <CustomerReviews
        restaurantId={restaurant.id}
        canReview={canReview}
        reviews={reviews.map(mapReview)}
        stats={reviewStats}
      />
    </DetailShell>
  );
}

export async function generateStaticParams() {
  return Object.keys(RESTAURANT_MENU_MAP).map((slug) => ({ id: slug }));
}