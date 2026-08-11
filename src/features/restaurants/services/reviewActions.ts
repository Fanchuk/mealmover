"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

export async function canUserReview(restaurantId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const delivered = await prisma.order.findFirst({
    where: { userId: session.user.id, restaurantId, status: "DELIVERED" },
    select: { id: true },
  });
  return delivered !== null;
}

const ReviewInput = z.object({
  restaurantId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3).max(1000),
  aspect: z.enum(["PRICE", "TASTE", "HYGIENE", "PACKAGING"]).nullable(),
});

export type ReviewFormState = { ok: boolean; error?: string };

export async function submitReview(
  _prev: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "You must be signed in." };

  const parsed = ReviewInput.safeParse({
    restaurantId: formData.get("restaurantId"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
    aspect: (formData.get("aspect") as string) || null,
  });

  if (!parsed.success) return { ok: false, error: "Please check your input." };

  const { restaurantId, rating, comment, aspect } = parsed.data;
  const allowed = await canUserReview(restaurantId);
  if (!allowed) return { ok: false, error: "Only customers with a delivered order can review." };

  await prisma.review.create({
    data: { restaurantId, userId: session.user.id, rating, comment, aspect, isVisible: true, purchasedAt: new Date() },
  });

  revalidatePath("/restaurants/[id]", "page");
  return { ok: true };
}