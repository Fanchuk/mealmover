export interface RestaurantConfig {
  todaysOffer: string[];
  mainCourse: string[];
  drinkCategory: string;
}

export const RESTAURANT_MENU_MAP: Record<string, RestaurantConfig> = {
  "oriental-restaurant": {
    todaysOffer: ["Seafood", "Starter"],
    mainCourse: ["Pork"],
    drinkCategory: "Cocktail",
  },
  "zen-garden-asian": {
    todaysOffer: ["Chicken", "Starter"],
    mainCourse: ["Vegetarian"],
    drinkCategory: "Cocktail",
  },
  "saddleback-tavern": {
    todaysOffer: ["Beef", "Pork"],
    mainCourse: ["Beef"],
    drinkCategory: "Ordinary Drink",
  },
  "golden-bamboo": {
    todaysOffer: ["Seafood", "Chicken"],
    mainCourse: ["Pork"],
    drinkCategory: "Cocktail",
  },
  "quickbite-resto": {
    todaysOffer: ["Chicken", "Miscellaneous"],
    mainCourse: ["Chicken"],
    drinkCategory: "Soft Drink",
  },
  "merah-putih-resto": {
    todaysOffer: ["Lamb", "Vegetarian"],
    mainCourse: ["Vegetarian"],
    drinkCategory: "Cocktail",
  },
  "golden-west-diner": {
    todaysOffer: ["Beef", "Lamb"],
    mainCourse: ["Beef"],
    drinkCategory: "Ordinary Drink",
  },
  "sei-sapi-bakar": {
    todaysOffer: ["Beef", "Goat"],
    mainCourse: ["Pork"],
    drinkCategory: "Cocktail",
  },
};