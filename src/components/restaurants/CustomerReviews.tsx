"use client";

import { useState } from "react";
import { Star, ChevronUp } from "lucide-react";
import { cn } from "@/src/lib/utils";

const RATINGS = [
  { id: "all",   label: "All Reviews", sub: "1k+ Reviews", rating: "4.9", icon: "/📝.png" },
  { id: "price", label: "Price",       sub: "50 Reviews",  rating: "4.8", icon: "/💰.png" },
  { id: "taste", label: "Taste",       sub: "200 Reviews", rating: "4.9", icon: "/🥧.png" },
  { id: "hygine",label: "Hygine",      sub: "500 Reviews", rating: "4.8", icon: "/✨.png" },
  { id: "pack",  label: "Packaging",   sub: "800 Reviews", rating: "4.9", icon: "/🥡.png" },
];

const REVIEWS = [
  { name: "Angeline Liu", avatar: "/Mask group (1).png" },
  { name: "Amina Toure",  avatar: "/Mask group (3).png" },
  { name: "Gordon Lee",   avatar: "/Mask group (4).png" },
  { name: "Alice Sankara",avatar: "/Mask group (5).png" },
  { name: "Andrew Tan",   avatar: "/Mask group (6).png" },
  { name: "Pablo Torres", avatar: "/Mask group (7).png" },
];

export function CustomerReviews() {
  const [active, setActive] = useState("all");

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="w-full h-[50px] rounded-[20px] bg-[#EF5B5B]/10 flex items-center justify-center gap-2 mb-8 lg:mb-10">
          <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">Customer Reviews</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {RATINGS.map((r) => {
            const isActive = active === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={cn(
                  "rounded-[30px] p-6 flex flex-col items-center gap-2 transition-all duration-200 border-2",
                  isActive ? "bg-[#EF5B5B] border-[#CD424E]" : "bg-white border-neutral-300 hover:border-[#EF5B5B]"
                )}
              >
                <img src={r.icon} alt={r.label} className="w-12 h-12 object-contain" />
                <span className={cn("font-heading font-medium text-[20px] sm:text-[25px] text-center", isActive ? "text-white" : "text-[#EF5B5B]")}>{r.label}</span>
                <span className={cn("font-heading font-light text-[16px] sm:text-[20px] text-center", isActive ? "text-white/80" : "text-neutral-600")}>{r.sub}</span>
                <div className="flex items-center gap-1.5">
                  <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                  <span className={cn("font-heading font-medium text-[20px] sm:text-[25px]", isActive ? "text-white" : "text-neutral-800")}>{r.rating}</span>
                  <span className={cn("font-heading font-light text-[18px] sm:text-[24px]", isActive ? "text-white/70" : "text-neutral-600")}>/ 5.0</span>
                </div>
              </button>
            );
          })}
        </div>

        <button className="w-full h-[57px] rounded-[50px] bg-neutral-100 border border-neutral-200 flex items-center justify-center gap-2 font-heading font-medium text-[20px] text-[#EF5B5B] mt-6 lg:mt-8">
          See All Reviews <ChevronUp size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mt-8 lg:mt-10">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="border border-neutral-300 rounded-[40px] p-6 lg:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={rev.avatar} alt={rev.name} className="w-[68px] h-[68px] rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">{rev.name}</p>
                    <p className="font-heading font-normal text-[18px] text-neutral-500">User since 2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 border border-neutral-200 rounded-[14px] px-3.5 py-2.5 bg-white flex-shrink-0">
                  <Star size={18} className="text-[#FFCF27] fill-[#FFCF27]" />
                  <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="/pie.svg" alt="" className="w-6 h-6 object-contain" />
                <span className="font-heading font-light text-[20px] text-neutral-800">Tom Yum Koong, Ice Tea</span>
              </div>
              <p className="font-heading font-normal text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit, at porttitor nulla.&rdquo;
              </p>
              <div className="border-t border-dashed border-neutral-200 pt-4">
                <span className="font-heading font-normal text-[16px] text-neutral-400">Purchased on 12 June 2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}