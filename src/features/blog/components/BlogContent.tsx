"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { BlogPost } from "../services/blogApi";
import { BlogSidebar } from "./BlogSidebar";
import { cn } from "@/src/lib/utils";

interface Props {
  posts: BlogPost[];
  popular: BlogPost[];
  tags: string[];
  activeQ: string;
  activeTag: string;
}

const LIMIT = 9;

export function BlogContent({ posts, popular, tags, activeQ, activeTag }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(activeQ);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / LIMIT);
  const progress = totalPages > 0 ? ((page + 1) / totalPages) * 100 : 100;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEmblaCarousel.globalOptions = { watchDrag: false };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(page, false);
  }, [emblaApi, page]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setPage(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (search === activeQ) return;
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      setPage(0);
      router.push(`/blog?${params.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(t);
  }, [search, activeQ, router]);

  useEffect(() => { setPage(0) }, [posts]);

  const renderDot = (i: number) => (
    <button
      key={i}
      onClick={() => { setPage(i); emblaApi?.scrollTo(i); }}
      className={cn(
        "rounded-full font-heading font-medium text-[15px] transition-all duration-300",
        page === i ? "w-10 h-10 bg-[#EF5B5B] text-white" : "w-8 h-8 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      )}
    >
      {i + 1}
    </button>
  );

  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">Blog</span>
        <h1 className="font-heading font-bold text-[32px] sm:text-[48px] text-neutral-800 mt-2 mb-8">Latest articles &amp; recipes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 bg-neutral-100 rounded-[50px] px-5 h-[56px] mb-6">
              <Search size={20} className="text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 bg-transparent outline-none font-heading text-[16px] text-neutral-800 placeholder:text-neutral-400"
              />
            </div>

            {activeTag && (
              <div className="mb-4 flex items-center gap-2">
                <span className="font-heading text-[14px] text-neutral-500">Filtered by tag:</span>
                <Link href="/blog" className="font-heading text-[14px] text-[#EF5B5B] font-medium">#{activeTag} ✕</Link>
              </div>
            )}

            {posts.length === 0 ? (
              <div className="py-16 text-center">
                <span className="text-5xl">🔍</span>
                <p className="font-heading font-bold text-[20px] text-neutral-700 mt-4">No articles found</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {Array.from({ length: totalPages }).map((_, pageIdx) => (
                      <div key={pageIdx} className="flex-[0_0_100%] min-w-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {posts.slice(pageIdx * LIMIT, pageIdx * LIMIT + LIMIT).map((post, i) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06, duration: 0.4 }}
                            >
                              <Link href={`/blog/${post.id}`} className="group block rounded-[24px] border border-neutral-200 overflow-hidden hover:border-[#EF5B5B] hover:shadow-[0_16px_40px_-16px_rgba(239,91,91,0.3)] transition-all h-full">
                                <div className="relative h-[200px] overflow-hidden">
                                  <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-5">
                                  <div className="flex gap-2 mb-2 flex-wrap">
                                    {post.tags.slice(0, 2).map((t) => (
                                      <span key={t} className="font-heading text-[12px] text-[#EF5B5B] bg-[#EF5B5B]/10 rounded-full px-3 py-1">#{t}</span>
                                    ))}
                                  </div>
                                  <h3 className="font-heading font-bold text-[19px] text-neutral-800 leading-tight line-clamp-2 group-hover:text-[#EF5B5B] transition-colors">{post.title}</h3>
                                  <p className="font-heading text-[14px] text-neutral-500 mt-2 line-clamp-2">{post.body}</p>
                                  <span className="inline-flex items-center gap-1 text-[#EF5B5B] font-heading font-medium text-[14px] mt-3 group-hover:gap-2 transition-all">
                                    Read more <ArrowRight size={15} />
                                  </span>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="mt-10">
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-6">
                      <motion.div
                        className="h-full bg-[#EF5B5B] rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={scrollPrev}
                        disabled={page === 0}
                        className="w-[52px] h-[52px] rounded-full border border-neutral-300 flex items-center justify-center text-[#EF5B5B] hover:border-[#EF5B5B] disabled:opacity-30 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          if (totalPages <= 5) {
                            return renderDot(i);
                          }
                          if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1) {
                            return renderDot(i);
                          }
                          if (i === 1 && page > 3) {
                            return <span key="s1" className="font-heading text-neutral-400 px-1">...</span>;
                          }
                          if (i === totalPages - 2 && page < totalPages - 4) {
                            return <span key="s2" className="font-heading text-neutral-400 px-1">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={scrollNext}
                        disabled={page === totalPages - 1}
                        className="w-[52px] h-[52px] rounded-full bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] disabled:opacity-30 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <p className="text-center font-heading text-[14px] text-neutral-400 mt-4">
                      Page {page + 1} of {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BlogSidebar popular={popular} tags={tags} activeTag={activeTag} />
          </div>
        </div>
      </div>
    </section>
  );
}