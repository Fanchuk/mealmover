"use client";

import { useActionState, useEffect, useOptimistic, useState } from "react";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { addComment, type CommentState } from "../services/commentAction";

interface Comment {
  id: string;
  name: string;
  content: string;
  rating: number;
  createdAt: Date | string;
}

export function CommentSection({ postId, comments }: { postId: number; comments: Comment[] }) {
  const [state, formAction, pending] = useActionState(addComment, { ok: false } as CommentState);
  const [rating, setRating] = useState(5);
  const [optimistic, addOptimistic] = useOptimistic(
    comments,
    (cur, next: Comment) => [next, ...cur]
  );

  useEffect(() => {
    if (state.ok) toast.success("Comment posted!");
    else if (state.error) toast.error(state.error);
  }, [state]);

  function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const content = formData.get("content") as string;
    addOptimistic({
      id: `temp-${Date.now()}`,
      name,
      content,
      rating,
      createdAt: new Date(),
    });
    formAction(formData);
  }

  return (
    <section className="mt-12">
      <h2 className="font-heading font-bold text-[24px] text-neutral-800 mb-6">Comments ({optimistic.length})</h2>

      <form action={handleSubmit} className="rounded-[20px] border border-neutral-200 p-5 flex flex-col gap-3 mb-8">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="rating" value={rating} />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)}>
              <Star size={24} className={n <= rating ? "text-[#FFCF27] fill-[#FFCF27]" : "text-neutral-300"} />
            </button>
          ))}
        </div>
        <input name="name" required placeholder="Your name" className="h-[46px] rounded-[12px] border border-neutral-200 px-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B]" />
        <textarea name="content" required placeholder="Write a comment..." className="min-h-[90px] rounded-[12px] border border-neutral-200 p-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B] resize-none" />
        <button type="submit" disabled={pending} className="self-start h-[46px] px-6 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium hover:bg-[#CD424E] transition-colors disabled:opacity-70">
          {pending ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {optimistic.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[16px] border border-neutral-200 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-semibold text-[15px] text-neutral-800">{c.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: c.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#FFCF27] fill-[#FFCF27]" />
                  ))}
                </div>
              </div>
              <p className="font-heading text-[15px] text-neutral-600">{c.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}