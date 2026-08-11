"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { newsletterLimit } from "@/src/lib/upstash";

const resend = new Resend(process.env.RESEND_API_KEY);
const EmailSchema = z.string().email();

export type NewsletterState = { ok: boolean; error?: string };

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";

  const { success } = await newsletterLimit.limit(ip);
  if (!success) return { ok: false, error: "Too many attempts. Try again later." };

  const parsed = EmailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { ok: false, error: "Please enter a valid email." };

  try {
    await resend.emails.send({
      from: "MealMover <newsletter@mealmover.app>",
      to: parsed.data,
      subject: "Welcome to MealMover newsletter!",
      html: "<h1>You're subscribed!</h1><p>Thanks for joining. Expect tasty updates soon.</p>",
    });
  } catch {
    return { ok: false, error: "Could not send email. Try later." };
  }

  return { ok: true };
}