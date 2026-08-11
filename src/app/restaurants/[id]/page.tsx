import { notFound } from "next/navigation";
import { RestaurantDetailHero } from "@/src/features/restaurants/components/RestaurantDetailHero";
import { TodaysOffer } from "@/src/features/restaurants/components/TodaysOffer";
import { MenuSection } from "@/src/features/restaurants/components/MenuSection";
import { CustomerReviews } from "@/src/features/restaurants/components/CustomerReviews";
import { LocationMap } from "@/src/features/restaurants/components/LocationMap";
import { DetailShell } from "@/src/features/restaurants/components/DetailShell";
import { getMealsByCategory, mealToOfferCard, mealToMenuItemCard, getMealById } from "@/src/lib/themealdb";
import { getCocktailsByCategory, cocktailToMenuItemCard } from "@/src/lib/thecocktaildb";
import { getRestaurantBySlug, getReviewsByRestaurant, getReviewStatsByRestaurant, getDeliveryLocations } from "@/src/features/restaurants/services/restaurantDetails";
import { canUserReview } from "@/src/features/restaurants/services/reviewActions";
import { RESTAURANT_MENU_MAP } from "@/src/features/restaurants/menu-map";
import { mapReview } from "@/src/lib/mapReview";
import { FloatingDots } from "@/src/components/ui/FloatingDots";
import { ScrollReveal } from "@/src/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function RestaurantDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mealId?: string; highlight?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const [restaurant, config] = await Promise.all([
    getRestaurantBySlug(id),
    Promise.resolve(RESTAURANT_MENU_MAP[id]),
  ]);

  if (!restaurant || !config) notFound();

  const [reviews, reviewStats, canReview, locations] = await Promise.all([
    getReviewsByRestaurant(restaurant.id),
    getReviewStatsByRestaurant(restaurant.id),
    canUserReview(restaurant.id),
    getDeliveryLocations(),
  ]);

  const [cat1, cat2, mainCat, drinks] = await Promise.all([
    getMealsByCategory(config.todaysOffer[0]),
    getMealsByCategory(config.todaysOffer[1]),
    getMealsByCategory(config.mainCourse[0]),
    getCocktailsByCategory(config.drinkCategory),
  ]);

  const todaysOffers = [...cat1, ...cat2].slice(0, 8).map(mealToOfferCard);
  let mainCourse = mainCat.slice(0, 4).map(mealToMenuItemCard);
  const drinksDesserts = drinks.slice(0, 4).map(cocktailToMenuItemCard);

  if (sp.mealId) {
    const alreadyIn = mainCourse.some((m) => m.id === sp.mealId);
    if (!alreadyIn) {
      const highlighted = await getMealById(sp.mealId);
      if (highlighted) {
        mainCourse = [mealToMenuItemCard(highlighted), ...mainCourse.slice(0, 3)];
      }
    }
  }

  return (
    <div className="relative overflow-hidden">
      <FloatingDots />
      <div className="relative z-10">
        <DetailShell>
          <ScrollReveal><RestaurantDetailHero restaurant={restaurant} locations={locations} /></ScrollReveal>
          <ScrollReveal>
            <TodaysOffer
              offers={todaysOffers}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MenuSection
              mainCourse={mainCourse}
              drinksDesserts={drinksDesserts}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          </ScrollReveal>
          <ScrollReveal>
            <LocationMap
              lat={(restaurant as { lat?: number | null }).lat ?? null}
              lng={(restaurant as { lng?: number | null }).lng ?? null}
              address={restaurant.street}
              name={restaurant.name}
            />
          </ScrollReveal>
          <ScrollReveal>
            <CustomerReviews
              restaurantId={restaurant.id}
              canReview={canReview}
              reviews={reviews.map(mapReview)}
              stats={reviewStats}
            />
          </ScrollReveal>
        </DetailShell>
      </div>
    </div>
  );
}