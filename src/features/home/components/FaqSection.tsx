"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

const TAB_MAP: Record<string, string> = {
  GENERAL: "General",
  TRANSACTION: "Transaction",
  PAYMENTS: "Payments",
  RETURNS: "Returns",
  CAREERS: "Careers",
};

interface Faq {
  id: string;
  question: string;
  answer: string;
  tab: string;
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
    const tabs = Object.keys(TAB_MAP)
    const [activeTab, setActiveTab] = useState('GENERAL')
    const [openIdx, setOpenIdx] = useState<number | null>(0)

    const filtered = faqs.filter((f) => f.tab === activeTab)

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="flex-shrink-0 lg:w-[280px]">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase">FAQ's</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 mt-2 mb-6 lg:mb-8">How Can We Help You</h2>
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => { setActiveTab(tab); setOpenIdx(null); }}
                className={cn(
                  "h-[52px] lg:h-[60px] rounded-[50px] font-heading font-medium text-[16px] lg:text-[20px] transition-all duration-200 text-center lg:text-left px-6 flex-shrink-0 whitespace-nowrap",
                  activeTab === tab ? "bg-[#EF5B5B] text-white" : "border border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]"
                )}
              >
                {TAB_MAP[tab]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 lg:pt-[120px] relative">
          <Image src="/Rectangle 234 (1).svg" alt="" width={12} height={12} className="absolute top-[20px] left-[5%] hidden lg:block" />
          <Image src="/Rectangle 227 (1).svg" alt="" width={12} height={12} className="absolute top-[-20px] left-[30%] hidden lg:block" />
          <div className="flex flex-col divide-y divide-neutral-200">
            {filtered.map((faq, i) => (
              <div key={faq.id} className="py-5 lg:py-6">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between gap-4 text-left">
                  <span className="font-heading font-normal text-[18px] sm:text-[24px] leading-[150%] text-neutral-800">{faq.question}</span>
                  {openIdx === i ? <X size={20} className="text-[#EF5B5B] flex-shrink-0" /> : <Plus size={20} className="text-[#EF5B5B] flex-shrink-0" />}
                </button>
                {openIdx === i && (
                  <div className="mt-4 font-heading font-light text-[15px] lg:text-[16px] leading-[150%] text-neutral-700 whitespace-pre-line">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}