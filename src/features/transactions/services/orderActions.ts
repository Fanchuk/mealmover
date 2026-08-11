"use server";

import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { pusherServer } from "@/src/lib/pusher";
import type { OrderStatus } from "@prisma/client";

export type RatingState = { ok: boolean; error?: string };

export async function rateDriver(orderId: string, rating: number): Promise<RatingState> {
    const session = await auth()
    if (!session?.user?.id) return { ok: false, error: 'Not signed in.' }
    if (rating < 1 || rating > 5) return { ok: false, error: 'Invalid rating.' }

    const order = await prisma.order.findFirst({
        where: { id: orderId, userId: session.user.id },
        select: { id: true },
    })

    if (!order) return { ok: false, error: 'Order not found.' }

    await prisma.order.update({
        where: { id: orderId },
        data: { driverRating: rating },
    })

    return { ok: true }
}

const NEXT_STATUS: Record<string, OrderStatus | null> = {
    PENDING: 'CONFIRMED',
    CONFIRMED: 'PREPARING',
    PREPARING: 'ON_THE_WAY',
    ON_THE_WAY: 'DELIVERED',
    DELIVERED: null,
}

export async function advanceOrderStatus(orderId: string) {
    const session = await auth()
    if (!session?.user?.id) return

    const order = await prisma.order.findFirst({
        where: { id: orderId, userId: session.user.id },
        select: { status: true },
    })

    if (!order) return

    const next = NEXT_STATUS[order.status]
    if (!next) return

    await prisma.order.update({
        where: { id: orderId },
        data: { status: next, ...(next === 'DELIVERED' ? { deliveredAt: new Date() } : {}) },
    })

    await pusherServer.trigger(`order-${orderId}`, 'status-update', { status: next })
}