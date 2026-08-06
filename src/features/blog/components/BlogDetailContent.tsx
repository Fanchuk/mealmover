"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { BlogPost } from "../types";

interface Comment {
  id: number;
  body: string;
  user: { username: string };
}

interface Props {
  post: BlogPost;
  comments: Comment[];
  adjacent: { prev: BlogPost | null; next: BlogPost | null };
}

export function BlogDetailContent({ post, comments, adjacent }: Props) {
  return (
    <article className="flex-1 min-w-0 relative">
      <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px] mb-6 relative z-10">
        <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
        <ChevronRight size={16} className="text-neutral-400" />
        <Link href="/blog" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Blog</Link>
        <ChevronRight size={16} className="text-neutral-400" />
        <span className="text-[#FFCF27] font-medium line-clamp-1">{post.title}</span>
      </nav>

      <p className="font-heading font-bold text-[14px] tracking-[0.1em] text-[#EF5B5B] uppercase mb-4 relative z-10">Blog Detail</p>

      <h1 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800 mb-6 lg:mb-8 relative z-10">
        {post.title}
      </h1>

      <div className="relative w-full h-[240px] sm:h-[340px] lg:h-[400px] mb-6 z-10 rounded-[20px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority unoptimized />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">{post.createdAt}</span>
          <span className="text-neutral-300">|</span>
          <span className="font-heading font-normal text-[20px] tracking-[0.02em] text-neutral-500">{post.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Image src="/share.svg" alt="Share" width={20} height={20} className="w-5 h-5 object-contain" />
          <span className="font-heading font-normal text-[14px] tracking-[0.02em] text-[#EF5B5B]">{post.likes} Shares</span>
        </div>
      </div>

      <div className="font-heading font-light text-[18px] sm:text-[20px] leading-[150%] text-neutral-800 flex flex-col gap-5 mb-8 relative z-10">
        <p>{post.body}</p>
        <p>{post.body}</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10 relative z-10">
        {post.tags.map((tag, i) => (
          <button key={tag} className={cn(
            "rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] transition-colors capitalize",
            i === 0 ? "bg-[#EF5B5B] border-2 border-[#CD424E] text-white" : "border border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]"
          )}>
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 border border-neutral-200 rounded-[24px] overflow-hidden mb-8 relative z-10 bg-white">
        {adjacent.prev ? (
          <Link href={`/blog/${adjacent.prev.id}`} className="p-5 border-r border-neutral-200 flex flex-col gap-2 hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="rotate-180 text-[#EF5B5B]" />
              <span className="font-heading font-bold text-[14px] tracking-[0.05em] text-neutral-600 uppercase">Previous</span>
            </div>
            <p className="font-heading font-light text-[16px] sm:text-[18px] leading-[150%] text-neutral-700 line-clamp-2">{adjacent.prev.title}</p>
          </Link>
        ) : <div className="p-5 border-r border-neutral-200" />}
        {adjacent.next ? (
          <Link href={`/blog/${adjacent.next.id}`} className="p-5 flex flex-col gap-2 items-end text-right hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-[14px] tracking-[0.05em] text-neutral-600 uppercase">Next</span>
              <ChevronRight size={16} className="text-[#EF5B5B]" />
            </div>
            <p className="font-heading font-light text-[16px] sm:text-[18px] leading-[150%] text-neutral-700 line-clamp-2">{adjacent.next.title}</p>
          </Link>
        ) : <div className="p-5" />}
      </div>

      <div className="flex items-start gap-5 mb-10 relative z-10">
        <img src={post.authorImage} alt={post.authorName} className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] rounded-[20px] object-cover flex-shrink-0" />
        <div>
          <p className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800">{post.authorName}</p>
          <p className="font-heading font-medium text-[18px] text-[#EF5B5B] mb-3">Author</p>
          <p className="font-heading font-light text-[16px] sm:text-[20px] leading-[150%] text-neutral-700">Food enthusiast and writer exploring the world of culinary arts.</p>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-[#EF5B5B] mb-6">
          Comments <span className="text-neutral-400">({comments.length})</span>
        </h3>
        <div className="flex flex-col gap-6">
          {comments.slice(0, 3).map((c) => (
            <div key={c.id} className="flex items-start gap-4">
              <img src={`https://i.pravatar.cc/100?u=${c.user.username}`} alt={c.user.username} className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-[16px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-heading font-bold text-[20px] sm:text-[25px] tracking-[0.02em] text-neutral-800">{c.user.username}</span>
                <p className="font-heading font-light text-[16px] sm:text-[20px] leading-[150%] text-neutral-700 mt-1">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-[#EF5B5B] mb-3">Leave a Comment</h3>
        <div className="flex flex-col gap-4 mt-5">
          <textarea placeholder="Input Comment" className="w-full bg-neutral-100 border border-neutral-200 rounded-[20px] p-5 h-[140px] outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400 resize-none" />
          <input type="text" placeholder="Input Name" className="w-full bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400" />
          <input type="email" placeholder="Input Email" className="w-full bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400" />
          <button className="self-start bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] px-8 font-heading font-medium text-[16px] sm:text-[20px] text-white">Post Comment</button>
        </div>
      </div>
    </article>
  );
}