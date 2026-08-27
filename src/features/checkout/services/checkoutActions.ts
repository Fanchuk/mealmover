"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { haversineKm, shippingCost, estimateEta } from "../lib/delivery";
import { CheckoutSchema } from "../schema";
import type { CheckoutInput, CheckoutState } from "../schema";

function genOrderNumber() {
  return Math.random().toString(36).slice(2, 12).toUpperCase();
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "MealMover/1.0" },
    });
    const data = await res.json();
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

async function getWeatherCode(lat: number, lng: number): Promise<number> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();
    return data.current_weather?.weathercode ?? 0;
  } catch {
    return 0;
  }
}

export async function placeOrder(
  _prev: CheckoutState,
  raw: CheckoutInput
): Promise<CheckoutState> {
  const parsed = CheckoutSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Please sign in to place an order." };

  const d = parsed.data;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: d.restaurantId },
    select: { id: true, lat: true, lng: true },
  }) ?? await prisma.restaurant.findFirst({
    orderBy: { isFeatured: "desc" },
    select: { id: true, lat: true, lng: true },
  });
  
  if (!restaurant) return { ok: false, error: "Restaurant not found." };
  const restaurantId = restaurant.id;

  const userCoords = await geocodeAddress(`${d.addressStreet}, ${d.addressTitle}`);

  const distanceKm = userCoords
    ? haversineKm(restaurant.lat, restaurant.lng, userCoords.lat, userCoords.lng)
    : null;

  const coords = userCoords ?? { lat: restaurant.lat, lng: restaurant.lng };
  const weatherCode = await getWeatherCode(coords.lat, coords.lng);

  const realShipping = shippingCost(distanceKm ?? 0);
  const ETA = estimateEta(distanceKm ?? 0, weatherCode);

  const orderNumber = genOrderNumber();

  const created = await prisma.order.create({
    data: {
      orderNumber,
      userId: session.user.id,
      restaurantId,
      status: "PENDING",
      paymentMethod: d.paymentMethod,
      paymentStatus: "PENDING",
      subtotal: d.subtotal,
      shippingCost: realShipping,
      discount: d.discount,
      total: d.subtotal + realShipping - d.discount,
      note: d.note || null,
      distanceKm: distanceKm ?? 0,
      items: {
        create: d.items.map((i) => ({
          menuItemId: null,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.qty,
        })),
      },
    },
  });

  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId: created.id }),
  }).catch((err) => console.error('Помилка симуляції:', err));

  redirect(`/checkout/success?order=${orderNumber}&eta=${ETA}`);
}