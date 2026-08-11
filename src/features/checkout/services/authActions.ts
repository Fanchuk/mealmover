"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";
import { signIn } from "@/src/lib/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name is too short").max(60),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthState = { ok: boolean; error?: string };

export async function registerUser(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "This email is already registered." };

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashed, role: "USER" },
  });

  return { ok: true };
}

export async function loginUser(_prev: AuthState, formData: FormData): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return { ok: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { ok: false, error: "Invalid email or password." };
    }
    throw err;
  }
}