import { z } from "zod";

export const DummyUserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
});

export const DummyPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  reactions: z.object({ likes: z.number(), dislikes: z.number() }),
  views: z.number(),
  userId: z.number(),
});

export const DummyPostsResponseSchema = z.object({
  posts: z.array(DummyPostSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type DummyPost = z.infer<typeof DummyPostSchema>;
export type DummyUser = z.infer<typeof DummyUserSchema>;

export type BlogPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  views: number;
  image: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
};