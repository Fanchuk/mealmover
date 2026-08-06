import { HeroSection } from "../features/home/components/HeroSection";
import { WhySection } from "../features/home/components/WhySection";
import { FoodCategoriesSection } from "../features/home/components/FoodCategoriesSection";
import { PromoSection } from "../features/home/components/PromoSection";
import { PartnerSection } from "../features/home/components/PartnerSection";
import { TestimonialsSection } from "../features/home/components/TestimonialsSection";
import { FaqSection } from "../features/home/components/FaqSection";
import { CitiesSection } from "../features/home/components/CitiesSection";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { getMealsByCategory } from "../lib/themealdb";
import { getCocktailsByCategory } from "@/src/lib/thecocktaildb";
import { FAQS } from "../features/home/data/faqs";
import {
  getFeatures,
  getTestimonials,
  getCities,
  getCategories,
} from "@/src/features/home/queries";

const CATEGORY_MAP: Record<string, string> = {
  "fast-food": "Chicken",
  "dessert": "Dessert",
  "drink": "Side",
  "vegetables": "Vegetarian",
  "noodle": "Pasta",
  "rice": "Seafood",
  "grill": "Beef",
};

export default async function HomePage() {
  const [features, testimonials, cities, categories] = await Promise.all([
    getFeatures(),
    getTestimonials(),
    getCities(),
    getCategories(),
  ]);

  const top5 = categories.slice(0, 5);

  const drinkMeals = await getCocktailsByCategory("Cocktail").then((drinks) =>
    drinks.slice(0, 5).map((drink, i) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      price: Math.round((8.0 + i * 0.5) * 100) / 100,
      prepTimeMin: 5 + i * 2,
      rating: Math.round((4.5 + (i % 5) * 0.1) * 10) / 10,
      image: drink.strDrinkThumb ?? `https://picsum.photos/seed/${drink.idDrink}/800/600`,
      categorySlug: "drink",
      restaurantName: "MealMover Bar",
      distanceKm: Math.round((1.4 + i * 0.3) * 10) / 10,
    }))
  );

  const mealsByCategory = await Promise.all(
    top5
      .filter((cat) => cat.slug !== "drink")
      .map((cat) =>
        getMealsByCategory(CATEGORY_MAP[cat.slug] ?? "Chicken").then((meals) =>
          meals.slice(0, 5).map((meal, i) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: Math.round((10.02 + i * 0.3) * 100) / 100,
            prepTimeMin: 10 + i * 2,
            rating: Math.round((4.5 + (i % 5) * 0.1) * 10) / 10,
            image: meal.strMealThumb ?? `https://picsum.photos/seed/${meal.idMeal}/800/600`,
            categorySlug: cat.slug,
            restaurantName: "MealMover Kitchen",
            distanceKm: Math.round((1.4 + i * 0.3) * 10) / 10,
          }))
        )
      )
  );

  const popularItems = [...mealsByCategory.flat(), ...drinkMeals];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MealMover",
            url: "https://mealmover.com",
            logo: "https://mealmover.com/logo.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "MealMover",
            url: "https://mealmover.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://mealmover.com/restaurants?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <HeroSection />
      <ScrollReveal><WhySection features={features} /></ScrollReveal>
      <ScrollReveal><FoodCategoriesSection categories={top5} popularItems={popularItems} /></ScrollReveal>
      <ScrollReveal><PromoSection /></ScrollReveal>
      <ScrollReveal><PartnerSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection testimonials={testimonials} /></ScrollReveal>
      <ScrollReveal><FaqSection faqs={FAQS} /></ScrollReveal>
      <ScrollReveal><CitiesSection cities={cities} /></ScrollReveal>
    </main>
  );
}