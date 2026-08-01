import Link from "next/link";
import { RestaurantCard } from "@/src/components/restaurants/RestaurantCard";

const RESTAURANTS = [
  { name: "Zen Garden Asian",   image: "/Rectangle 670.jpg" },
  { name: "Saddleback Tavern",  image: "/Rectangle 670 (1).jpg" },
  { name: "Golden Bamboo",      image: "/Rectangle 670 (2).jpg" },
  { name: "Quickbite Resto",    image: "/Rectangle 670 (3).jpg" },
  { name: "Oriental Restaurant",image: "/Rectangle 670 (4).jpg" },
  { name: "Merah Putih Resto",  image: "/Rectangle 670 (5).jpg" },
  { name: "Golden West Diner",  image: "/bbq-dinner-with-top-sirloin-steak-2023-11-27-05-01-04-utc 2.jpg" },
  { name: "Oriental Restaurant",image: "/Rectangle 670 (6).jpg" },
].map((r) => ({
  ...r,
  address: "Sentani Road, 10",
  rating: 4.9,
  reviews: "1K+",
  tags: ["Asian", "Seafood"],
}));

export function RestaurantsGrid() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">
          Restaurants
        </span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 max-w-[820px]">
          What is the best restaurant around me?
        </h2>
        <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] text-neutral-600 text-center mt-4 max-w-[600px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque
          magna rhoncus, lacinia enim id, suscipit diam.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-10 lg:mt-14">
          {RESTAURANTS.map((r, i) => (
            <RestaurantCard key={i} {...r} />
          ))}
        </div>

        <Link href="/restaurants" className="inline-flex items-center justify-center h-[52px] lg:h-[60px] px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] lg:text-[20px] hover:bg-[#CD424E] transition-colors mt-10 lg:mt-14">
          Show All Resto
        </Link>
      </div>
    </section>
  );
}