import Link from "next/link";
import type { BlogPost as BlogPostType } from "@/src/features/blog/types";

export function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <article className="flex flex-col gap-5">
      <img src={post.image} alt={post.title} className="w-full h-[240px] sm:h-[400px] object-cover rounded-[20px]" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">{post.createdAt}</span>
          <span className="text-neutral-300">|</span>
          <span className="font-heading font-normal text-[20px] tracking-[0.02em] text-neutral-500">{post.authorName}</span>
        </div>
        <div className="flex items-center gap-4">
          <img src="/WhatsApp (1).svg" alt="" className="w-5 h-5 object-contain" />
          <img src="/Facebook (1).svg" alt="" className="w-5 h-5 object-contain" />
          <img src="/Instagram (1).svg" alt="" className="w-5 h-5 object-contain" />
          <div className="flex items-center gap-1.5">
            <img src="/share.svg" alt="" className="w-5 h-5 object-contain" />
            <span className="font-heading font-normal text-[14px] tracking-[0.02em] text-[#EF5B5B]">{post.likes} Shares</span>
          </div>
        </div>
      </div>

      <Link href={`/blog/${post.id}`}>
        <h2 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800 hover:text-[#EF5B5B] transition-colors">
          {post.title}
        </h2>
      </Link>

      <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[720px]">
        {post.body}
      </p>

      <Link href={`/blog/${post.id}`} className="self-start flex items-center gap-2 font-heading font-medium text-[16px] tracking-wider text-[#EF5B5B] uppercase">
        Read More <img src="/diagonal-arrow-right-up.svg" alt="" className="w-4 h-4 object-contain" />
      </Link>
    </article>
  );
}