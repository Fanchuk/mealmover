import { Star, MapPin, Clock } from "lucide-react";

export const PRICE_OPTIONS = [
  { value: "$", label: "$", desc: "Budget" },
  { value: "$$", label: "$$", desc: "Mid-range" },
  { value: "$$$", label: "$$$", desc: "Premium" },
];

export const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated", icon: Star },
  { value: "distance", label: "Nearest", icon: MapPin },
  { value: "delivery", label: "Fastest", icon: Clock },
];