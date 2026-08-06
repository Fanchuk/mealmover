"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const MENU_SECTIONS = [
  { id: "todays-offer", label: "Today's Offer" },
  { id: "main-course", label: "Main Course" },
  { id: "drinks-desserts", label: "Drinks & Desserts" },
  { id: "reviews", label: "Reviews" },
] as const;

function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

function useScrolled(threshold = 300) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > threshold); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function StickyMenuNav() {
  const ids = MENU_SECTIONS.map((s) => s.id);
  const activeId = useScrollSpy(ids);
  const scrolled = useScrolled(200);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className={cn("sticky top-0 z-40 bg-white transition-shadow duration-300", scrolled && "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]")}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <nav className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar">
          {MENU_SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "relative py-4 font-heading font-medium text-[15px] sm:text-[18px] whitespace-nowrap transition-colors",
                  isActive ? "text-[#EF5B5B]" : "text-neutral-500 hover:text-neutral-800"
                )}
              >
                {section.label}
                {isActive && (
                  <motion.span
                    layoutId="menu-nav-underline"
                    className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full bg-[#EF5B5B]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}