"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

const ADDRESSES = [
  { id: "home",   label: "Home",   address: "Front Lake Street, 09, Surabaya", note: "Stainless steel house fence" },
  { id: "office", label: "Office", address: "Papaya Street, 20-D, Surabaya",   note: null },
];

export function DeliveryAddress() {
  const [selected, setSelected] = useState("home");

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800">
          Delivery to
        </h2>
        <button className="flex items-center gap-2 border border-neutral-300 rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
          Add New Address <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {ADDRESSES.map((addr) => (
          <div key={addr.id} className="border border-neutral-200 rounded-[24px] p-5 lg:p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <button onClick={() => setSelected(addr.id)} className="flex items-center gap-3">
                <span className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selected === addr.id ? "border-[#EF5B5B]" : "border-neutral-300"
                )}>
                  {selected === addr.id && <span className="w-2.5 h-2.5 rounded-full bg-[#EF5B5B]" />}
                </span>
                <span className="font-heading font-medium text-[20px] sm:text-[25px] tracking-[0.02em] text-neutral-800">{addr.label}</span>
              </button>
              <button className="border border-neutral-300 rounded-[50px] w-[56px] h-[40px] flex items-center justify-center flex-shrink-0 hover:border-[#EF5B5B] transition-colors">
                <img src="/edit-2.svg" alt="edit" className="w-4 h-4 object-contain" />
              </button>
            </div>

            <p className="font-heading font-light text-[18px] sm:text-[20px] leading-[150%] text-neutral-700 pl-8">{addr.address}</p>

            {addr.note && (
              <div className="ml-8 bg-neutral-100 border border-neutral-200 rounded-[50px] h-[48px] px-6 flex items-center max-w-[303px]">
                <span className="font-heading font-normal text-[16px] text-neutral-800 truncate">{addr.note}</span>
              </div>
            )}

            <button className="ml-8 self-start flex items-center gap-2 border border-neutral-300 rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
              Change Note <img src="/edit-2.svg" alt="" className="w-4 h-4 object-contain" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}