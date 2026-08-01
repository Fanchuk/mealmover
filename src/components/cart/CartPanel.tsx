"use client";

import { useCartStore } from "@/src/stores/cart-store";
import { X } from "lucide-react";
import Link from "next/link";

const ITEMS = [
  { id: 1, name: "Tarik Noodle",  price: 10.02, perItem: 10.02, qty: 1, total: 10.02, image: "/Mask group (8).png" },
  { id: 2, name: "Tom Yum Koong", price: 11.04, perItem: 11.04, qty: 2, total: 10.02, image: "/Mask group (9).png" },
];

export function CartPanel() {
  const { open, setOpen } = useCartStore();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[447px] bg-white z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="border border-neutral-300 rounded-[50px] w-[76px] h-[60px] flex items-center justify-center hover:border-[#EF5B5B] transition-colors"
          >
            <X size={24} className="text-neutral-800" />
          </button>
          <h2 className="font-heading font-medium text-[25px] leading-[140%] tracking-[0.02em] text-neutral-900">
            My Cart
          </h2>
          <div className="w-[76px]" />
        </div>

        <div className="px-6 mb-4 flex-shrink-0">
          <div className="flex items-center justify-center gap-3 bg-[rgba(2,141,255,0.1)] rounded-[18px] h-[52px] px-6">
            <img src="/cart.svg" alt="" className="w-5 h-5 object-contain" />
            <span className="font-heading font-light text-[16px] leading-[150%] text-[#028DFF]">
              You have 3 items in your chart list
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="border border-neutral-200 rounded-[26px] p-5 flex flex-col gap-4">
            <h3 className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
              Oriental Restaurant 1
            </h3>

            <div className="w-full h-[1px] bg-neutral-200" />

            {ITEMS.map((item, idx) => (
              <div key={item.id}>
                <div className="flex items-start gap-3">
                  <img src="/Selected.svg" alt="selected" className="w-6 h-6 mt-1 flex-shrink-0" />

                  <img src={item.image} alt={item.name} className="w-[91px] h-[91px] object-cover rounded-[16px] flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">{item.name}</span>
                      <button className="border border-neutral-300 rounded-[50px] w-[56px] h-[40px] flex items-center justify-center flex-shrink-0 hover:border-[#EF5B5B] transition-colors">
                        <img src="/edit-2.svg" alt="edit" className="w-4 h-4 object-contain" />
                      </button>
                    </div>
                    <p className="font-heading font-light text-[14px] leading-[150%] text-neutral-800">
                      ${item.perItem.toFixed(2)} <span className="text-neutral-500">/ item</span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <img src="/Component 1.svg" alt="minus" className="w-7 h-7 object-contain cursor-pointer" />
                        <span className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800 min-w-[20px] text-center">
                          {item.qty}
                        </span>
                        <img src="/Component 2.svg" alt="plus" className="w-7 h-7 object-contain cursor-pointer" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-heading font-light text-[16px] text-neutral-600">Total :</span>
                        <span className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
                          ${item.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {idx < ITEMS.length - 1 && <div className="w-full h-[1px] bg-neutral-200 mt-4" />}
              </div>
            ))}

            <div className="w-full h-[1px] bg-neutral-200" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <img src="/checkmark-circle.svg" alt="promo" className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
                    FOODORI24
                  </p>
                  <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">
                    Promo applied successfully!
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <img src="/Frame 1000002712.svg" alt="remove" className="w-6 h-6 cursor-pointer" />
                <span className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-[#188F77]">
                  -$4.00
                </span>
              </div>
            </div>

            <button className="border border-neutral-300 rounded-[50px] h-[40px] w-[194px] font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
              Change Code
            </button>
          </div>
        </div>

        <div className="px-6 py-6 border-t border-neutral-100 shadow-[6px_0_25px_10px_rgba(0,0,0,0.06)] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/Frame 1000002712.svg" alt="select all" className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="font-heading font-light text-[18px] leading-[150%] text-neutral-800">All Items</span>
                <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-500">
                  Total : <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-[#EF5B5B]">$28.10</span>
                </p>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] px-10 flex items-center justify-center font-heading font-medium text-[16px] text-white uppercase tracking-wider"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}