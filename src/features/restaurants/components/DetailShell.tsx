"use client";

import { ReactNode } from "react";
import { FlyToCartProvider } from "./FlyToCartProvider";
import { StickyMenuNav } from "./StickyMenuNav";
import { CartButton } from "./CartButton";

export function DetailShell({ children }: { children: ReactNode }) {
  return (
    <FlyToCartProvider>
      <StickyMenuNav />
      {children}
      <div className="fixed bottom-6 right-6 z-50">
        <CartButton />
      </div>
    </FlyToCartProvider>
  );
}