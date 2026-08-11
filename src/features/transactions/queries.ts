import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import type { OrderStatus } from "@prisma/client";

export type Tab = "history" | "ongoing" | "draft";

const TAB_STATUSES: Record<Tab, OrderStatus[]> = {
  draft: ["DRAFT"],
  ongoing: ["PENDING", "CONFIRMED", "PREPARING", "ON_THE_WAY"],
  history: ["DELIVERED", "CANCELLED"],
};

export async function getOrdersByTab(tab: Tab) {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.order.findMany({
    where: { userId: session.user.id, status: { in: TAB_STATUSES[tab] } },
    orderBy: { createdAt: "desc" },
    include: {
      restaurant: { select: { name: true, image: true, slug: true } },
      driver: { select: { name: true, avatar: true } },
      items: true,
    },
  });
}

export async function getOrderById(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      restaurant: { select: { name: true, image: true, slug: true } },
      driver: { select: { id: true, name: true, avatar: true } },
      address: true,
      items: true,
    },
  });
}