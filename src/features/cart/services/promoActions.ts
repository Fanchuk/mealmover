"use server";

import { prisma } from "@/src/lib/prisma";

export type PromoResult =
  | { ok: true; code: string; description: string; discount: number }
  | { ok: false; error: string };

export async function applyPromoCode(code: string, subtotal: number): Promise<PromoResult> {
  const clean = code.trim().toUpperCase();
  if (!clean) return { ok: false, error: "Enter a promo code." };

  const promo = await prisma.promoCode.findUnique({ where: { code: clean } });

  if (!promo || !promo.isActive) return { ok: false, error: "Invalid or inactive code." };
  if (promo.expiresAt && promo.expiresAt < new Date()) return { ok: false, error: "This code has expired." };
  if (promo.usageLimit != null && promo.usedCount >= promo.usageLimit) return { ok: false, error: "Usage limit reached." };
  if (subtotal < promo.minOrder) return { ok: false, error: `Minimum order is $${promo.minOrder.toFixed(2)}.` };

  let discount =
    promo.type === "PERCENT" ? (subtotal * promo.value) / 100 : promo.value;

  if (promo.maxDiscount != null) discount = Math.min(discount, promo.maxDiscount);
  discount = Math.round(discount * 100) / 100;

  return { ok: true, code: promo.code, description: promo.description, discount };
}