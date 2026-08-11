import { NextRequest, NextResponse } from "next/server";
import { searchMeals } from "@/src/lib/themealdb";
import { searchCocktails } from "@/src/lib/thecocktaildb";
import { prisma } from "@/src/lib/prisma";
import { RESTAURANT_MENU_MAP } from "@/src/features/restaurants/menu-map";

const RESTAURANT_IDS = Object.keys(RESTAURANT_MENU_MAP);

function findRestaurantByCategory(category: string): string {
  const cat = category.toLowerCase();
  const match = RESTAURANT_IDS.find((id) => {
    const cfg = RESTAURANT_MENU_MAP[id];
    return [...cfg.todaysOffer, ...cfg.mainCourse].some((c) => c.toLowerCase() === cat);
  });
  return match ?? RESTAURANT_IDS[0];
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const [restaurants, meals, drinks] = await Promise.all([
    prisma.restaurant.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { id: true, name: true, image: true, slug: true },
      take: 4,
    }),
    searchMeals(query),
    searchCocktails(query),
  ]);

  const results = [
    ...restaurants.map((r) => ({
      id: r.id,
      name: r.name,
      image: r.image,
      type: "restaurant" as const,
      slug: r.slug,
    })),
    ...meals.slice(0, 5).map((meal) => {
      const restId = findRestaurantByCategory(meal.strCategory ?? "");
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        type: "meal" as const,
        restaurantName: restId.replace(/-/g, " "),
        slug: restId,
      };
    }),
    ...drinks.slice(0, 4).map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      type: "drink" as const,
      restaurantName: "MealMover Bar",
    })),
  ];

  return NextResponse.json({ results });
}