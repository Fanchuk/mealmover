import { MapPin, Clock, Star, Utensils } from "lucide-react";

export interface Restaurant {
  name: string;
  image: string;
  street: string;
  tags: { name: string }[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  deliveryMinMin: number;
  deliveryMaxMin: number;
  priceLevel: number;
  priceRange: string;
  openingHours: string;
  isRestaurantOfChoice: boolean;
}

export function getRestaurantStats(restaurant: Restaurant) {
  return [
    {
      key: "rating" as const,
      icon: <Star size={22} className="text-[#FFCF27] fill-[#FFCF27]" />,
      value: `${restaurant.rating}`,
      sub: "/ 5.0",
      label: "See Reviews",
    },
    {
      key: "distance" as const,
      icon: <MapPin size={22} className="text-[#EF5B5B]" />,
      value: `${restaurant.distanceKm} km`,
      sub: null,
      label: "Distance",
    },
    {
      key: "time" as const,
      icon: <Clock size={22} className="text-[#EF5B5B]" />,
      value: `${restaurant.deliveryMinMin} - ${restaurant.deliveryMaxMin} Min`,
      sub: null,
      label: "Time",
    },
    {
      key: "price" as const,
      icon: <Utensils size={20} className="text-[#EF5B5B]" />,
      value: (
        <>
          {[1, 2, 3, 4].map((d) => (
            <span
              key={d}
              className={d <= restaurant.priceLevel ? "text-neutral-800" : "text-neutral-400"}
            >
              $
            </span>
          ))}
        </>
      ),
      sub: null,
      label: restaurant.priceRange,
    },
  ];
}