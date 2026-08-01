"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";

const CATEGORIES = [
  { id: "near",    label: "Near Me",     icon: "/Button.png" },
  { id: "best",    label: "Best Seller", icon: "/Button (1).png" },
  { id: "loved",   label: "Most Loved",  icon: "/Button (2).png" },
  { id: "24h",     label: "24 Hours",    icon: "/Button (3).png" },
  { id: "healthy", label: "Healthy",     icon: "/Button (4).png" },
];

export function ExploreSection() {
  const [active, setActive] = useState("near");

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">
          Explore Restaurant
        </span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-10 lg:mb-14">
          Looking for Food? Start Here
        </h2>

        <div className="w-full flex flex-wrap justify-center gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "transition-all duration-200 rounded-[30px] border",
                active === cat.id
                  ? "border-[#EF5B5B] shadow-[0_8px_24px_-6px_rgba(239,91,91,0.25)]"
                  : "border-neutral-200 hover:border-[#EF5B5B]"
              )}
            >
              <img src={cat.icon} alt={cat.label} className="w-[140px] sm:w-[180px] lg:w-[213px]" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}