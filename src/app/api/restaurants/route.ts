import { NextRequest, NextResponse } from "next/server";
import { getRestaurantsList } from "@/src/features/restaurants/services/restaurantsList";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const data = await getRestaurantsList({
    q: sp.get("q") ?? "",
    category: sp.get("category") as never,
    city: sp.get("city") ?? "",
    tags: sp.getAll("tags"),
    minRating: Number(sp.get("minRating") ?? "0"),
    price: sp.get("price"),
    sort: (sp.get("sort") as never) ?? "rating",
    lat: sp.get("lat") ? Number(sp.get("lat")) : null,
    lng: sp.get("lng") ? Number(sp.get("lng")) : null,
    page: Number(sp.get("page") ?? "1"),
    pageSize: 8,
  });

  return NextResponse.json(data);
}