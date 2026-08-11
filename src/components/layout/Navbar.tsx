"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/src/lib/utils";
import { useCartStore } from "@/src/features/cart/store";
import { useFlyToCart } from "@/src/features/restaurants/components/FlyToCartProvider";

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
  const [userMenu, setUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const { setOpen: setCartOpen } = useCartStore();
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const cartRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { registerCartTarget } = useFlyToCart();

  useEffect(() => {
    registerCartTarget(cartRef.current);
  }, [registerCartTarget]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenu(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isAuthed = status === "authenticated";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center gap-4 lg:gap-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/Logo.svg" alt="MealMover" className="h-8 w-auto" />
          <span className="hidden sm:inline font-heading font-semibold text-[20px] text-neutral-900 leading-none">
            Meal<span className="text-[#EF5B5B]">Mover</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 flex-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-heading font-medium text-[16px] leading-[150%] tracking-[0.02em] transition-colors pb-1 px-2 py-1 rounded-[8px]",
                  active
                    ? "text-[#EF5B5B] bg-[#EF5B5B]/8"
                    : "text-neutral-700 hover:text-[#EF5B5B] hover:bg-[#EF5B5B]/8"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EF5B5B]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0 ml-auto lg:ml-0">
          <button ref={cartRef} onClick={() => setCartOpen(true)} className="relative text-neutral-500 hover:text-[#EF5B5B] transition-colors">
            <img src="/shopping-cart.svg" alt="Cart" className="w-6 h-6" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 600, damping: 15 }} className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-[#EF5B5B] text-white text-[11px] font-bold flex items-center justify-center">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link href="/restaurants" className="hidden sm:inline-flex items-center h-[44px] px-5 lg:px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] hover:bg-[#CD424E] transition-colors whitespace-nowrap">
            Order Now
          </Link>

          {isAuthed ? (
            <div ref={menuRef} className="relative">
              <button onClick={() => setUserMenu((v) => !v)} className="w-10 h-10 rounded-full overflow-hidden bg-[#FFCF27] flex-shrink-0 hover:ring-2 hover:ring-[#EF5B5B]/30 transition-all">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <img src="/Frame 6.svg" alt="User" className="w-full h-full object-cover" />
                )}
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-2 w-[220px] rounded-[18px] bg-white border border-neutral-200 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] p-2 z-50">
                    <div className="px-3 py-2 border-b border-neutral-100">
                      <p className="font-heading font-semibold text-[15px] text-neutral-800 truncate">{session?.user?.name}</p>
                      <p className="font-heading text-[13px] text-neutral-400 truncate">{session?.user?.email}</p>
                    </div>
                    <Link href="/transactions" onClick={() => setUserMenu(false)} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[12px] font-heading text-[15px] text-neutral-700 hover:bg-neutral-50 transition-colors">
                      <UserIcon size={17} /> My orders
                    </Link>
                    <button onClick={() => signOut()} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[12px] font-heading text-[15px] text-[#EF5B5B] hover:bg-[#EF5B5B]/5 transition-colors">
                      <LogOut size={17} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/sign-in" className="inline-flex items-center h-[44px] px-5 rounded-[61px] border border-neutral-300 text-neutral-800 font-heading font-medium text-[16px] hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors whitespace-nowrap">
              Sign In
            </Link>
          )}

          <button className="lg:hidden text-neutral-700" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-t border-neutral-200 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] px-6 py-6 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-heading font-medium text-[20px] py-3 px-3 rounded-[12px] transition-colors",
                    active
                      ? "text-[#EF5B5B] bg-[#EF5B5B]/8"
                      : "text-neutral-700 hover:text-[#EF5B5B] hover:bg-[#EF5B5B]/8"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {!isAuthed && (
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center h-[48px] px-6 rounded-[61px] border border-neutral-300 text-neutral-800 font-heading font-medium text-[18px] hover:border-[#EF5B5B] hover:text-[#EF5B5B] transition-colors"
              >
                Sign In
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}