"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const TAGS = ["Asian", "Grill", "Steak"];

const COMMENTS = [
  { name: "Liana Kwame", rating: 5, date: "June, 16 2023", image: "/Mask group (18).png" },
  { name: "Sarah Smith",  rating: 5, date: "June, 16 2023", image: "/Mask group (19).png" },
];

export function BlogDetailContent() {
  return (
    <article className="flex-1 min-w-0">
      <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px] mb-6">
        <Link href="/" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Home</Link>
        <ChevronRight size={16} className="text-neutral-400" />
        <Link href="/restaurants" className="text-neutral-400 hover:text-[#EF5B5B] transition-colors">Restaurants</Link>
        <ChevronRight size={16} className="text-neutral-400" />
        <span className="text-[#FFCF27] font-medium">Oriental Restaurant</span>
      </nav>

      <p className="font-heading font-bold text-[14px] tracking-[0.1em] text-[#EF5B5B] uppercase mb-4">Blog Detail</p>

      <h1 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800 mb-6 lg:mb-8">
        Convenience at Your Doorstep: Exploring the Benefits of Order Food Delivery Apps
      </h1>

      <img src="/Rectangle 670 (1).jpg" alt="Post" className="w-full h-[240px] sm:h-[340px] lg:h-[400px] object-cover rounded-[20px] mb-6" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">January, 17 2024</span>
          <span className="text-neutral-300">|</span>
          <span className="font-heading font-normal text-[20px] tracking-[0.02em] text-neutral-500">Javier Bardem</span>
        </div>
        <div className="flex items-center gap-3">
          <img src="/WhatsApp (1).svg" alt="WhatsApp" className="w-5 h-5 object-contain" />
          <img src="/Facebook (1).svg" alt="Facebook" className="w-5 h-5 object-contain" />
          <img src="/Instagram (1).svg" alt="Instagram" className="w-5 h-5 object-contain" />
          <div className="flex items-center gap-1.5">
            <img src="/share.svg" alt="Share" className="w-5 h-5 object-contain" />
            <span className="font-heading font-normal text-[14px] tracking-[0.02em] text-[#EF5B5B]">14 Shares</span>
          </div>
        </div>
      </div>

      <h2 className="font-heading font-bold text-[28px] sm:text-[39px] lg:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800 mb-5">
        Convenience at Your Doorstep: Exploring the Benefits of Order Food Delivery Apps
      </h2>

      <div className="font-heading font-light text-[18px] sm:text-[20px] leading-[150%] text-neutral-800 flex flex-col gap-5 mb-8">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tortor a hendrerit mattis, elit sapien volutpat nunc, ac vestibulum lorem est et felis. Suspendisse egestas fermentum elit, in semper odio vestibulum id. Donec placerat erat vitae fermentum rutrum.</p>
        <p>Suspendisse a dapibus nibh. Vivamus sed orci in elit facilisis placerat quis et velit. Sed euismod posuere sem, nec posuere purus venenatis non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla lorem sem, interdum eget eros sed, tempus tincidunt est. Maecenas ullamcorper ipsum dapibus, tempus massa vel, commodo ipsum. Curabitur eu nibh nec mi consequat dapibus at vitae massa. Sed sed euismod urna, nec lacinia ex. Vestibulum fermentum tortor sed enim rhoncus consectetur sed sit amet dui.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <img src="/Rectangle 4610.png" alt="" className="w-full h-[200px] sm:h-[260px] object-cover rounded-[20px]" />
        <img src="/Rectangle 4610 (1).png" alt="" className="w-full h-[200px] sm:h-[260px] object-cover rounded-[20px]" />
      </div>

      <div className="font-heading font-light text-[18px] sm:text-[20px] leading-[150%] text-neutral-800 flex flex-col gap-5 mb-8">
        <p>Sed vestibulum pharetra mauris quis scelerisque. Cras at dignissim sem. In pharetra massa sem, pharetra dictum nibh consequat eget. Ut eget libero id erat dapibus ultrices. Ut finibus condimentum odio, et euismod nulla congue sed. Aenean eget facilisis nibh, nec varius est. Nulla tristique mauris quis eros accumsan mollis. Cras vel tellus eu ex semper maximus a sit amet dui.</p>
      </div>

      <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-[#EF5B5B] mb-5">Popular Post</h3>

      <div className="font-heading font-light text-[18px] sm:text-[20px] leading-[150%] text-neutral-800 flex flex-col gap-5 mb-8">
        <p>Donec dignissim tellus elit, vitae varius sem porttitor id. Aliquam tincidunt maximus viverra. Suspendisse nunc dui, consectetur ac odio vel, consectetur elementum diam. Sed vulputate turpis eu nulla efficitur euismod. Maecenas metus libero, posuere eu porta in, pulvinar in massa.</p>
        <p>Donec dignissim tellus elit, vitae varius sem porttitor id. Aliquam tincidunt maximus viverra. Suspendisse nunc dui, consectetur ac odio vel, consectetur elementum diam. Sed vulputate turpis eu nulla efficitur euismod. Maecenas metus libero, posuere eu porta in, pulvinar in massa.</p>
      </div>

      <div className="flex gap-4 items-start mb-8 bg-[#FEE9DE]/30 rounded-[20px] p-5">
        <img src="/Group 1000002224.png" alt="" className="w-[60px] h-[60px] object-contain flex-shrink-0 opacity-30" />
        <div>
          <p className="font-heading font-medium text-[18px] sm:text-[20px] leading-[150%] text-[#EF5B5B] italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis non eros sed dignissim. In auctor tincidunt arcu, ut pulvinar est luctus mollis.
          </p>
          <p className="font-heading font-medium text-[18px] text-[#EF5B5B] mt-3">— Angeline Liu</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
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

      <div className="grid grid-cols-2 gap-4 border border-neutral-200 rounded-[24px] overflow-hidden mb-8">
        <Link href="#" className="p-5 border-r border-neutral-200 flex flex-col gap-2 hover:bg-neutral-50 transition-colors">
          <div className="flex items-center gap-2">
            <ChevronRight size={16} className="rotate-180 text-[#EF5B5B]" />
            <span className="font-heading font-bold text-[14px] tracking-[0.05em] text-neutral-600 uppercase">Previous</span>
          </div>
          <p className="font-heading font-light text-[16px] sm:text-[18px] leading-[150%] text-neutral-700">The Influence of Food Delivery Apps on Consumer Choices</p>
        </Link>
        <Link href="#" className="p-5 flex flex-col gap-2 items-end text-right hover:bg-neutral-50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-[14px] tracking-[0.05em] text-neutral-600 uppercase">Next</span>
            <ChevronRight size={16} className="text-[#EF5B5B]" />
          </div>
          <p className="font-heading font-light text-[16px] sm:text-[18px] leading-[150%] text-neutral-700">The Role of Food Delivery Apps in Modern Dining</p>
        </Link>
      </div>

      <div className="flex items-start gap-5 mb-10">
        <img src="/Mask group (17).png" alt="John Doe" className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] rounded-[20px] object-cover flex-shrink-0" />
        <div>
          <p className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800">John Doe</p>
          <p className="font-heading font-medium text-[18px] text-[#EF5B5B] mb-3">Author</p>
          <p className="font-heading font-light text-[16px] sm:text-[20px] leading-[150%] text-neutral-700">
            Morbi ac eleifend mauris, id venenatis ligula. Phasellus sit amet eros quis velit mattis facilisis. Phasellus tempor turpis id accumsan sollicitudin. Quisque quis purus
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-[#EF5B5B] mb-6">
          Comments <span className="text-neutral-400">(2)</span>
        </h3>
        <div className="flex flex-col gap-6">
          {COMMENTS.map((c, i) => (
            <div key={i} className="flex items-start gap-4">
              <img src={c.image} alt={c.name} className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-[16px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-heading font-bold text-[20px] sm:text-[25px] tracking-[0.02em] text-neutral-800">{c.name}</span>
                  <div className="flex items-center gap-1.5">
                    <img src="/star.svg" alt="" className="w-4 h-4 object-contain" />
                    <span className="font-heading font-medium text-[18px] text-[#EF5B5B]">{c.rating}.0</span>
                    <span className="font-heading font-light text-[18px] text-neutral-500">/ 5.0</span>
                  </div>
                  <span className="font-heading font-light text-[16px] text-neutral-500 ml-auto">{c.date}</span>
                </div>
                <p className="font-heading font-light text-[16px] sm:text-[20px] leading-[150%] text-neutral-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tortor a hendrerit mattis, elit sapien volutpat nunc, ac vestibulum lorem est et felis.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-[#EF5B5B] mb-3">Leave a Comment</h3>
        <p className="font-heading font-light text-[16px] sm:text-[20px] leading-[150%] text-neutral-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="font-heading font-medium text-[16px] text-neutral-700 mb-2">Your Rating:</p>
        <div className="flex gap-1 mb-5">
          {[1,2,3,4,5].map((s) => (
            <img key={s} src={s <= 3 ? "/Star 2.svg" : "/star.svg"} alt="" className="w-6 h-6 object-contain" />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="Input Comment"
            className="w-full bg-neutral-100 border border-neutral-200 rounded-[20px] p-5 h-[140px] outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400 resize-none"
          />
          <input
            type="text"
            placeholder="Input Name"
            className="w-full bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400"
          />
          <input
            type="email"
            placeholder="Input Email"
            className="w-full bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-light text-[16px] text-neutral-800 placeholder:text-neutral-400"
          />
          <button className="self-start bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] px-8 font-heading font-medium text-[16px] sm:text-[20px] text-white">
            Post Comment
          </button>
        </div>
      </div>
    </article>
  );
}