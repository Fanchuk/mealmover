import { NextRequest, NextResponse } from "next/server";
import { searchMeals } from "@/src/lib/themealdb";
import { searchCocktails } from "@/src/lib/thecocktaildb";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('q')?.trim() ?? ''

    if (query.length < 2) {
        return NextResponse.json({ results: [] })
    }

    const [meals, drinks] = await Promise.all([
        searchMeals(query),
        searchCocktails(query)
    ])

    const results = [
        ...meals.slice(0, 5).map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            type: 'meal' as const
        })),
        ...drinks.slice(0, 5).map((drink) => ({
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            type: 'drink' as const
        }))
    ]

    return NextResponse.json({ results })
}