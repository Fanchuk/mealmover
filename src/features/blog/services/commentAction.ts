"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/src/lib/upstash";

const commentLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "ratelimit:comment",
});

const CommentSchema = z.object({
  postId: z.number(),
  name: z.string().min(2, "Name too short").max(50),
  content: z.string().min(3, "Comment too short").max(500),
  rating: z.number().min(1).max(5),
});

export type CommentState = { ok: boolean; error?: string };

export async function addComment(_prev: CommentState, formData: FormData): Promise<CommentState> {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const { success } = await commentLimit.limit(ip);
  if (!success) return { ok: false, error: "Slow down — too many comments." };

  const parsed = CommentSchema.safeParse({
    postId: Number(formData.get("postId")),
    name: formData.get("name"),
    content: formData.get("content"),
    rating: Number(formData.get("rating")),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  await prisma.blogComment.create({ data: parsed.data });
  revalidatePath(`/blog/${parsed.data.postId}`);
  return { ok: true };
}