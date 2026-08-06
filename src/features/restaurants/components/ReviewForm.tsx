"use client";

import { useActionState, useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { submitReview, type ReviewFormState } from '../services/reviewActions'

const ASPECTS = [
  { value: "PRICE", label: "Price" },
  { value: "TASTE", label: "Taste" },
  { value: "HYGIENE", label: "Hygiene" },
  { value: "PACKAGING", label: "Packaging" },
] as const;

export function ReviewForm({ restaurantId, canReview }: { restaurantId: string; canReview: boolean }) {
  const [state, formAction, pending] = useActionState(submitReview, { ok: false } as ReviewFormState);
  const [rating, setRating] = useState(5);
  const [aspect, setAspect] = useState("TASTE");

  useEffect(() => {
    if (state.ok) toast.success("Thanks for your review!");
    else if (state.error) toast.error(state.error);
  }, [state]);

  if (!canReview) {
    return (
      <div className="rounded-[24px] border border-dashed border-neutral-300 p-6 text-center">
        <p className="font-heading text-neutral-500 text-[16px]">
          Only customers with a delivered order from this restaurant can leave a review.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-[24px] border border-neutral-200 p-6 flex flex-col gap-4 bg-white">
      <h3 className="font-heading font-semibold text-[20px] text-neutral-800">Write a review</h3>
      <input type="hidden" name="restaurantId" value={restaurantId} />
      <input type="hidden" name="rating" value={rating} />
      <input type="hidden" name="aspect" value={aspect} />

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)}>
            <Star size={28} className={n <= rating ? "text-[#FFCF27] fill-[#FFCF27]" : "text-neutral-300"} />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {ASPECTS.map((a) => (
          <button
            key={a.value}
            type="button"
            onClick={() => setAspect(a.value)}
            className={cn(
              "px-4 h-[38px] rounded-full border font-heading text-[14px] transition-colors",
              aspect === a.value ? "bg-[#EF5B5B] border-[#EF5B5B] text-white" : "bg-white border-neutral-200 text-neutral-600 hover:border-[#EF5B5B]"
            )}
          >
            {a.label}
          </button>
        ))}
      </div>

      <textarea
        name="comment"
        required
        minLength={3}
        placeholder="Share your experience..."
        className="w-full min-h-[100px] rounded-[16px] border border-neutral-200 p-4 font-heading text-[15px] outline-none focus:border-[#EF5B5B] resize-none"
      />

      <button type="submit" disabled={pending} className="self-start h-[48px] px-6 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium disabled:opacity-60">
        {pending ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}