"use client";

import { cn } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";

const POPULAR = [
  { title: "Click, Order, Eat: The Convenience of FDA", image: "/Mask group (12).png" },
  { title: "Efficiency and Flavor: The Promise of FDA",  image: "/Mask group (13).png" },
  { title: "Reshaping the Restaurant Industry",          image: "/Mask group (14).png" },
  { title: "Tap to Taste your favourite food",           image: "/Mask group (15).png" },
];

const CATEGORIES = [
  { name: "Children", count: 10 },
  { name: "Medicine", count: 12 },
  { name: "Disease",  count: 5 },
  { name: "Vaccine",  count: 10 },
  { name: "Covid-19", count: 8 },
];

const CONTACTS = [
  { icon: "/WhatsApp.svg", alt: "WhatsApp" },
  { icon: "/Facebook.svg", alt: "Facebook" },
  { icon: "/Instagram.svg", alt: "Instagram" },
  { icon: "/phone.svg", alt: "Phone" },
  { icon: "/email.svg", alt: "Email" },
];

const TAGS = ["Asian", "Grill", "Steak", "Courier", "Vegetarian", "Mochi", "Ice Cream", "Burger", "Padang"];

const GALLERY = [
  "/Mask group (11).png", "/Mask group (13).png", "/Mask group (14).png",
  "/Mask group (12).png", "/Mask group (16).png", "/Mask group (15).png",
];

export function BlogSidebar() {
  return (
    <aside className="w-full lg:w-[433px] flex-shrink-0 flex flex-col gap-6 lg:gap-8">
      <img src="/Mask group (10).png" alt="Download Our Mobile App" className="w-full rounded-[20px]" />

      <div className="border border-neutral-300 rounded-[30px] p-6 lg:p-8">
        <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Popular Post</h3>
        <div className="flex flex-col gap-5">
          {POPULAR.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <img src={p.image} alt="" className="w-[80px] h-[80px] lg:w-[90px] lg:h-[90px] rounded-[16px] object-cover flex-shrink-0" />
              <div>
                <p className="font-heading font-medium text-[18px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-[#313131]">{p.title}</p>
                <p className="font-heading font-medium text-[16px] tracking-[0.02em] text-[#EF5B5B]">January, 17 2024</p>
                <p className="font-heading font-normal text-[16px] leading-[163%] tracking-[0.02em] text-neutral-500">Javier Bardem</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full border border-neutral-300 rounded-[50px] h-[61px] flex items-center justify-center gap-2 font-heading font-medium text-[20px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
          See More Posts <ChevronDown size={18} />
        </button>
      </div>

      <div className="border border-neutral-300 rounded-[30px] p-6 lg:p-8">
        <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B]">Newsletter</h3>
        <p className="font-heading font-normal text-[20px] leading-[150%] tracking-[0.02em] text-neutral-600 mt-3">
          Don&apos;t miss a thing! Sign up to recieve daily deals
        </p>
        <input type="email" placeholder="Enter your Email" className="mt-6 w-full bg-neutral-100 border border-[#e1e1e1] rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-500" />
        <button className="mt-4 w-full bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[61px] font-heading font-medium text-[20px] text-white">Subscribe</button>
      </div>

      <div className="border border-neutral-300 rounded-[30px] p-6 lg:p-8">
        <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Categories</h3>
        <div className="flex flex-col gap-4">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center justify-between">
              <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">{c.name}</span>
              <span className="font-heading font-normal text-[20px] tracking-[0.02em] text-neutral-500">({c.count})</span>
            </div>
          ))}
        </div>
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
          {TAGS.map((tag, i) => (
            <button
              key={tag}
              className={cn(
                "rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] transition-colors",
                i === 0 ? "bg-[#EF5B5B] border-2 border-[#CD424E] text-white" : "border border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-[#e1e1e1] rounded-[30px] p-6 lg:p-8">
        <h3 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Gallery</h3>
        <div className="grid grid-cols-3 gap-3">
          {GALLERY.map((img, i) => (
            <img key={i} src={img} alt="" className="w-full aspect-square rounded-[16px] object-cover" />
          ))}
        </div>
      </div>
    </aside>
  );
}