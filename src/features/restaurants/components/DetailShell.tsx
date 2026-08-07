"use client";

import { ReactNode } from "react";
import { StickyMenuNav } from "./StickyMenuNav";
import { FloatingDots } from "@/src/components/ui/FloatingDots";

export function DetailShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <FloatingDots />
      <StickyMenuNav />
      <div className="relative z-10">{children}</div>
    </div>
  );
}