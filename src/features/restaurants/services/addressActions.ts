"use server";

import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";

const Input = z.object({
  title: z.string().min(2).max(60),
  street: z.string().min(3).max(120),
});

export type SaveAddressResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveAddress(title: string, street: string): Promise<SaveAddressResult> {
  const parsed = Input.safeParse({ title, street });
  if (!parsed.success) return { ok: false, error: "Please fill both fields." };

  const session = await auth();
  if (!session?.user?.id) return { ok: true, id: `guest-${Date.now()}` };

  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });

  if (!userExists) {
    return { ok: false, error: "Your session is out of date — please sign in again." };
  }

  const created = await prisma.address.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title,
      street: parsed.data.street,
      city: "",
      label: "OTHER",
    },
  });

  return { ok: true, id: created.id };
}