"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { prisma } from "@/src/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/src/lib/upstash";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "300 s"), 
  prefix: "ratelimit:contact",
});

const ContactSchema = z.object({
  name: z.string().min(2, "Name too short").max(60),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject too short").max(120),
  message: z.string().min(10, "Message too short").max(1000),
  website: z.string().max(0, "Bot detected").optional(),
});

export type ContactState = { ok: boolean; error?: string };

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (formData.get("website")) return { ok: true }; 

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const { success } = await contactLimit.limit(ip);
  if (!success) return { ok: false, error: "Too many messages. Please wait a few minutes." };

  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { name, email, subject, message } = parsed.data;

  await prisma.contactMessage.create({ data: { name, email, subject, message } });

  try {
    await resend.emails.send({
      from: "MealMover <contact@mealmover.app>",
      to: process.env.ADMIN_EMAIL ?? "admin@mealmover.app",
      subject: `New contact: ${subject}`,
      html: `<p><b>${name}</b> (${email}) wrote:</p><p>${message}</p>`,
    });
    await resend.emails.send({
      from: "MealMover <contact@mealmover.app>",
      to: email,
      subject: "We received your message",
      html: `<h1>Thanks, ${name}!</h1><p>We got your message and will reply shortly.</p>`,
    });
  } catch {
  }

  return { ok: true };
}