"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { FAQS } from "../data/faqs";
import { FloatingShapes } from "@/src/components/FloatingShapes";

const TABS = ["General", "Transaction", "Payments", "Returns", "Careers"];

export function AboutFaq() {
  const [activeTab, setActiveTab] = useState("General");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = FAQS.filter((f) => f.cat === activeTab);

  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "10%", left: "1%" },
        { top: "50%", right: "2%" },
        { top: "85%", left: "3%" },
      ]} />
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">FAQ&apos;s</span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[55px] leading-[110%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-10 lg:mb-12">
          How Can We Help You
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setOpen(null); }}
              className={cn(
                "rounded-[50px] h-[52px] px-8 font-heading font-medium text-[16px] transition-colors border",
                activeTab === tab ? "bg-[#EF5B5B] border-[#CD424E] text-white" : "border-neutral-300 text-[#EF5B5B] hover:border-[#EF5B5B]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col">
          {filtered.map((faq, i) => (
            <div key={i} className="border-b border-neutral-200 py-6">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 text-left">
                <span className="font-heading font-normal text-[18px] sm:text-[20px] leading-[150%] text-neutral-800">{faq.q}</span>
                {open === i
                  ? <X size={22} className="text-[#EF5B5B] flex-shrink-0" />
                  : <Plus size={22} className="text-[#EF5B5B] flex-shrink-0" />}
              </button>
              {open === i && faq.a && (
                <div className="mt-4 flex flex-col gap-4">
                  {faq.a.split("\n\n").map((p, j) => (
                    <p key={j} className="font-heading font-normal text-[16px] sm:text-[18px] leading-[160%] text-neutral-600">{p}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}