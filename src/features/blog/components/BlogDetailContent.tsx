"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Share2, Clock, ChevronLeft } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import toast from "react-hot-toast";
import type { PostDetail } from "../services/postDetailApi";
import { CommentSection } from "./CommentSection";
import { BlogComment } from "@prisma/client";
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface Props {
  post: PostDetail;
  prevId: number | null;
  nextId: number;
  related: PostDetail[];
  comments: BlogComment[];
}

export function BlogDetailContent({ post, prevId, nextId, related, comments }: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const paragraphs = (post.body ?? "").split(". ").reduce<string[]>((acc, s, i) => {
    const idx = Math.floor(i / 3);
    acc[idx] = (acc[idx] ? acc[idx] + ". " : "") + s;
    return acc;
  }, []);

  const words = (post.body ?? "").split(" ").length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post.title, url }).catch((err) => {
        if (err.name === "AbortError") return;
        navigator.clipboard.writeText(url);
        toast.success("Link copied!");
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
  }

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 bg-[#EF5B5B] origin-left z-[60]" />

      <article className="bg-white py-8 lg:py-12 relative overflow-hidden">
        <FloatingShapes positions={[
          { top: "5%", right: "2%" },
          { top: "40%", left: "1%" },
          { top: "75%", right: "3%" },
          { top: "90%", left: "2%" },
        ]} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#EF5B5B] font-heading text-[15px] mb-6 transition-colors">
            <ChevronLeft size={18} /> Back to blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            <div className="max-w-[760px] mx-auto w-full">
              <div className="flex gap-2 mb-4 flex-wrap">
                {(post.tags ?? []).map((t) => (
                  <Link key={t} href={`/blog?tag=${t}`} className="font-heading text-[13px] text-[#EF5B5B] bg-[#EF5B5B]/10 rounded-full px-3 py-1">#{t}</Link>
                ))}
              </div>
              <h1 className="font-heading font-bold text-[32px] sm:text-[44px] text-neutral-800 leading-tight">{post.title}</h1>
              <div className="flex items-center justify-between gap-4 mt-5 pb-6 border-b border-neutral-100">
                <span className="flex items-center gap-1 font-heading text-[13px] text-neutral-400">
                  <Clock size={13} /> {readTime} min read
                </span>
                <button onClick={share} className="flex items-center gap-2 h-[42px] px-4 rounded-[50px] border border-neutral-200 font-heading text-[14px] text-neutral-700 hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>

              <div className="my-8 rounded-[24px] overflow-hidden bg-neutral-100 max-h-[420px]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col gap-5">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-heading text-[17px] leading-[176%] text-neutral-700"
                  >
                    {p}.
                  </motion.p>
                ))}
              </div>

              <motion.blockquote
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="my-8 pl-6 border-l-4 border-[#EF5B5B] font-heading text-[20px] italic text-neutral-800"
              >
                &ldquo;{post.title} — a story worth sharing.&rdquo;
              </motion.blockquote>

              <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-neutral-100">
                {prevId ? (
                  <Link href={`/blog/${prevId}`} className="flex items-center gap-2 font-heading text-[15px] text-neutral-600 hover:text-[#EF5B5B] transition-colors">
                    <ArrowLeft size={18} /> Previous
                  </Link>
                ) : <span />}
                <Link href={`/blog/${nextId}`} className="flex items-center gap-2 font-heading text-[15px] text-neutral-600 hover:text-[#EF5B5B] transition-colors">
                  Next <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-8">
              <CommentSection postId={post.id} comments={comments} />

              {related.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Related posts</h2>
                  <div className="flex flex-col gap-3">
                    {related.map((r) => (
                      <Link key={r.id} href={`/blog/${r.id}`} className="group flex gap-3 rounded-[16px] border border-neutral-200 overflow-hidden hover:border-[#EF5B5B] transition-colors p-2">
                        <img src={r.image} alt="" className="w-[80px] h-[80px] rounded-[12px] object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                        <p className="font-heading font-semibold text-[14px] text-neutral-800 line-clamp-3 self-center">{r.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}