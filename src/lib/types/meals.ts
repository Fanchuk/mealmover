import { z } from "zod";

// ── TheMealDB ──────────────────────────────────────────────

export const MealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().nullable().optional(),
  strArea: z.string().nullable().optional(),
  strMealThumb: z.string().nullable().optional(),
}).passthrough();

export const MealsResponseSchema = z.object({
  meals: z.array(MealSchema).nullable(),
});

export const MealCategorySchema = z.object({
  idCategory: z.string(),
  strCategory: z.string(),
  strCategoryThumb: z.string(),
  strCategoryDescription: z.string(),
});

export const MealCategoriesResponseSchema = z.object({
  categories: z.array(MealCategorySchema),
});

export type Meal = z.infer<typeof MealSchema>;
export type MealCategory = z.infer<typeof MealCategorySchema>;

// ── TheCocktailDB ──────────────────────────────────────────

export const CocktailSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strCategory: z.string().nullable().optional(),
  strAlcoholic: z.string().nullable().optional(),
  strDrinkThumb: z.string().nullable().optional(),
}).passthrough();

export const CocktailsResponseSchema = z.object({
  drinks: z.array(CocktailSchema).nullable(),
});

export type Cocktail = z.infer<typeof CocktailSchema>;


export type OfferCardData = {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  oldPrice: number;
};

export type MenuItemCardData = {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: string;
};

export type RestaurantCardData = {
  id: string;
  slug: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  reviews: string;
  tags: string[];
};