"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/src/features/blog/types";

const CONTACTS = [
  { icon: "/WhatsApp.svg", alt: "WhatsApp" },
  { icon: "/Facebook.svg", alt: "Facebook" },
  { icon: "/Instagram.svg", alt: "Instagram" },
  { icon: "/phone.svg", alt: "Phone" },
  { icon: "/email.svg", alt: "Email" },
];


interface Props {
  popular: BlogPost[];
  tags: string[];
  gallery: string[]
}

export function BlogSidebar({ popular, tags, gallery }: Props) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? popular : popular.slice(0, 4);

  return (
      <aside className="w-full lg:w-[433px] flex-shrink-0 flex flex-col gap-6 lg:gap-8">
          <img src="/Mask group (10).png" alt="Download Our Mobile App" className="w-full rounded-[20px]" />

          <div className="border border-neutral-300 rounded-[30px] p-6 lg:p-8">
              <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Popular Post</h3>
              <div className="flex flex-col gap-5">
                  {visible.map((p) => (
                      <Link key={p.id} href={`/blog/${p.id}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                          <img src={p.image} alt="" className="w-[80px] h-[80px] lg:w-[90px] lg:h-[90px] rounded-[16px] object-cover flex-shrink-0" />
                          <div>
                              <p className="font-heading font-medium text-[18px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-[#313131] line-clamp-2">{p.title}</p>
                              <p className="font-heading font-medium text-[16px] tracking-[0.02em] text-[#EF5B5B]">{p.createdAt}</p>
                              <p className="font-heading font-normal text-[16px] leading-[163%] tracking-[0.02em] text-neutral-500">{p.authorName}</p>
                          </div>
                      </Link>
                  ))}
              </div>
              {popular.length > 4 && (
                  <button
                      onClick={() => setShowAll((v) => !v)}
                      className="mt-6 w-full border border-neutral-300 rounded-[50px] h-[61px] flex items-center justify-center gap-2 font-heading font-medium text-[20px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
                      {showAll ? 'Show Less' : 'See More Posts'} <ChevronDown size={18} className={cn('transition-transform', showAll && 'rotate-180')} />
                  </button>
              )}
          </div>

          <div className="border border-neutral-300 rounded-[30px] p-6 lg:p-8">
              <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B]">Newsletter</h3>
              <p className="font-heading font-normal text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600 mt-3">Don&apos;t miss a thing! Sign up to recieve daily deals</p>
              <input
                  type="email"
                  placeholder="Enter your Email"
                  className="mt-6 w-full bg-neutral-100 border border-[#e1e1e1] rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-500"
              />
              <button className="mt-4 w-full bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[61px] font-heading font-medium text-[20px] text-white">Subscribe</button>
          </div>

          <div className="border border-[#e1e1e1] rounded-[30px] p-6 lg:p-8">
              <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Contact Us</h3>
              <div className="flex flex-wrap gap-3">
                  {CONTACTS.map((c, i) => (
                      <button key={i} className="w-[60px] h-[60px] rounded-full bg-neutral-200 flex items-center justify-center hover:bg-neutral-300 transition-colors">
                          <img src={c.icon} alt={c.alt} className="w-6 h-6 object-contain" />
                      </button>
                  ))}
              </div>
          </div>

          <div className="border border-[#e1e1e1] rounded-[30px] p-6 lg:p-8">
              <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-3">
                  {tags.map((tag, i) => (
                      <button
                          key={tag}
                          className={cn(
                              'rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] transition-colors capitalize',
                              i === 0 ? 'bg-[#EF5B5B] border-2 border-[#CD424E] text-white' : 'border border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]',
                          )}>
                          {tag}
                      </button>
                  ))}
              </div>
          </div>

          <div className="border border-[#e1e1e1] rounded-[30px] p-6 lg:p-8">
              <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full aspect-square rounded-[16px] object-cover" />
                  ))}
              </div>
          </div>
      </aside>
  )
}