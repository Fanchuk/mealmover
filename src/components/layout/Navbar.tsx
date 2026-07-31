"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Transaction", href: "/transactions" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center gap-4 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/Logo.svg" alt="MealMover" className="h-8 w-auto" />
          <span className="hidden sm:inline font-heading font-semibold text-[20px] text-neutral-900 leading-none">
            Meal<span className="text-[#EF5B5B]">Mover</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-heading font-medium text-[16px] leading-[150%] tracking-[0.02em] transition-colors pb-1",
                  active ? "text-[#EF5B5B]" : "text-neutral-700 hover:text-[#EF5B5B]"
                )}
              >
                {link.label}
                {active && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EF5B5B]" />}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0 ml-auto lg:ml-0">
          <Link href="/cart" className="text-neutral-500 hover:text-[#EF5B5B] transition-colors">
            <ShoppingCart size={22} />
          </Link>

          <Link
            href="/restaurants"
            className="hidden sm:inline-flex items-center h-[44px] px-5 lg:px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] hover:bg-[#CD424E] transition-colors whitespace-nowrap"
          >
            Order Now
          </Link>

          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FFCF27] flex-shrink-0">
            <img src="/Frame 6.svg" alt="User" className="w-full h-full object-cover" />
          </div>

          {/* Burger */}
          <button className="lg:hidden text-neutral-700" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-neutral-200 bg-white px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-heading font-medium text-[16px] py-2 transition-colors",
                  active ? "text-[#EF5B5B]" : "text-neutral-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/restaurants" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center h-[44px] px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px]">
            Order Now
          </Link>
        </nav>
      )}
    </header>
  );
}