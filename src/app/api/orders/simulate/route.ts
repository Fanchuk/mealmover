import { prisma } from "@/src/lib/prisma";
import type { OrderStatus } from "@prisma/client";

const NEXT_STATUS: Record<string, OrderStatus | null> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "ON_THE_WAY",
  ON_THE_WAY: "DELIVERED",
  DELIVERED: null,
};

const DELAY = 5_000;

export async function POST(req: Request) {
  const { orderId } = await req.json();
  if (!orderId) return Response.json({ ok: false });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });
  if (!order) return Response.json({ ok: false });

  const next = NEXT_STATUS[order.status];
  if (!next) return Response.json({ ok: true, done: true });

  await new Promise((r) => setTimeout(r, DELAY));

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: next,
      ...(next === "DELIVERED" ? { deliveredAt: new Date() } : {}),
    },
  });

  try {
    const { pusherServer } = await import("@/src/lib/pusher");
    await pusherServer.trigger(`order-${orderId}`, "status-update", { status: next });
  } catch {
  }

  if (NEXT_STATUS[next]) {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    }).catch(console.error);
  }

  return Response.json({ ok: true, status: next });
}