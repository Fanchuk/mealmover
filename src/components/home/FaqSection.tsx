"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from '@/src/lib/utils'

const TABS = ["General", "Transaction", "Payments", "Returns", "Careers"];

const FAQS = [
  { q: "Do you charge per hour our per project rate?", a: null },
  { q: "Can I have the plan for one package or any bundling?", a: null },
  { q: "Can I consult first when I feel confused what should I choose?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar quis turpis et efficitur.\n\nSed accumsan nisi eget sodales cursus. Nullam semper quis turpis varius dapibus. Integer orci nisi, finibus id accumsan eu, ultricies vel lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In iaculis commodo imperdiet." },
  { q: "Can I have any revision if the work unexpectedly?", a: null },
];

export function FaqSection() {
  const [activeTab, setActiveTab] = useState("General");
  const [openIdx, setOpenIdx] = useState<number | null>(2);

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-16">

        <div className="flex-shrink-0 lg:w-[280px]">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">FAQ's</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 mt-2 mb-6 lg:mb-8">
            How Can We Help You
          </h2>

          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "h-[52px] lg:h-[60px] rounded-[50px] font-heading font-medium text-[16px] lg:text-[20px] transition-all duration-200 text-center lg:text-left px-6 flex-shrink-0 whitespace-nowrap",
                  activeTab === tab
                    ? "bg-[#EF5B5B] text-white"
                    : "border border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 lg:pt-[120px]">
          <div className="flex flex-col divide-y divide-neutral-200">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5 lg:py-6">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between gap-4 text-left">
                  <span className="font-heading font-normal text-[18px] sm:text-[24px] leading-[150%] text-neutral-800">{faq.q}</span>
                  {openIdx === i ? <X size={20} className="text-[#EF5B5B] flex-shrink-0" /> : <Plus size={20} className="text-[#EF5B5B] flex-shrink-0" />}
                </button>
                {openIdx === i && faq.a && (
                  <div className="mt-4 font-heading font-light text-[15px] lg:text-[16px] leading-[150%] text-neutral-700 whitespace-pre-line">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}