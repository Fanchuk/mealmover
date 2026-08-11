"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import type { BlogPost } from "../services/blogApi";
import { subscribeNewsletter, type NewsletterState } from "../services/newsletterAction";

const CONTACTS = [
  { icon: "/WhatsApp.svg", alt: "WhatsApp", href: "#" },
  { icon: "/Facebook.svg", alt: "Facebook", href: "#" },
  { icon: "/Instagram.svg", alt: "Instagram", href: "#" },
  { icon: "/phone.svg", alt: "Phone", href: "#" },
  { icon: "/email.svg", alt: "Email", href: "#" },
];

export function BlogSidebar({ popular, tags, activeTag }: { popular: BlogPost[]; tags: string[]; activeTag: string }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, { ok: false } as NewsletterState);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) toast.success("Subscribed! Check your inbox.");
    else if (state.error) toast.error(state.error);
  }, [state]);

  const gallery = [11, 22, 33, 44, 55, 66];

  return (
    <aside className="flex flex-col gap-8">
      <div>
        <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Popular Posts</h3>
        <div className="flex flex-col gap-4">
          {popular.map((p) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="flex gap-3 group">
              <img src={p.image} alt="" className="w-[70px] h-[70px] rounded-[14px] object-cover flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-heading font-semibold text-[15px] text-neutral-800 line-clamp-2 group-hover:text-[#EF5B5B] transition-colors">{p.title}</h4>
                <span className="font-heading text-[13px] text-neutral-400">{p.views ?? 0} views</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] bg-[#EF5B5B] p-6 text-white">
        <h3 className="font-heading font-bold text-[20px]">Newsletter</h3>
        <p className="font-heading text-[14px] text-white/80 mt-1 mb-4">Get the latest recipes in your inbox.</p>
        <form action={formAction} className="flex flex-col gap-3">
          <input name="email" type="email" required placeholder="Your email" className="w-full h-[46px] rounded-[12px] px-4 font-heading text-[14px] text-neutral-800 outline-none" />
          <button type="submit" disabled={pending} className="h-[46px] rounded-[12px] bg-white text-[#EF5B5B] font-heading font-semibold hover:bg-neutral-100 transition-colors disabled:opacity-70">
            {pending ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className={`font-heading text-[13px] rounded-full px-3 py-1.5 transition-colors ${activeTag === tag ? "bg-[#EF5B5B] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-[#EF5B5B]/10 hover:text-[#EF5B5B]"}`}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Follow us</h3>
        <div className="flex gap-3">
          {CONTACTS.map((c) => (
            <a key={c.alt} href={c.href} className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-[#EF5B5B]/10 transition-colors">
              <img src={c.icon} alt={c.alt} className="w-5 h-5 object-contain" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[20px] text-neutral-800 mb-4">Gallery</h3>
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((seed) => {
            const url = `https://picsum.photos/seed/${seed}/300/300`;
            return (
              <button key={seed} onClick={() => setLightbox(url)} className="aspect-square rounded-[12px] overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-4"
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white text-3xl leading-none">&times;</button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox.replace("300/300", "800/800")} alt="" className="max-w-full max-h-full rounded-[20px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}