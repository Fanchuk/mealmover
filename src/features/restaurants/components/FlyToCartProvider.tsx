"use client";

import { createContext, useContext, useRef, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

interface FlyingItem {
  key: number;
  image: string;
  from: { x: number; y: number; w: number; h: number };
  to: { x: number; y: number };
}

interface FlyToCartContextValue {
  fly: (image: string, fromRect: DOMRect) => void;
  registerCartTarget: (el: HTMLElement | null) => void;
}

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error("useFlyToCart must be used inside FlyToCartProvider");
  return ctx;
}

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FlyingItem[]>([]);
  const cartTargetRef = useRef<HTMLElement | null>(null);
  const keyRef = useRef(0);

  const registerCartTarget = useCallback((el: HTMLElement | null) => {
    cartTargetRef.current = el;
  }, []);

  const fly = useCallback((image: string, fromRect: DOMRect) => {
    const cartEl = cartTargetRef.current;
    if (!cartEl) return;
    const cartRect = cartEl.getBoundingClientRect();
    const key = keyRef.current++;
    setItems((prev) => [
      ...prev,
      {
        key,
        image,
        from: { x: fromRect.left, y: fromRect.top, w: fromRect.width, h: fromRect.height },
        to: { x: cartRect.left + cartRect.width / 2, y: cartRect.top + cartRect.height / 2 },
      },
    ]);
  }, []);

  const removeItem = useCallback((key: number) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  return (
    <FlyToCartContext.Provider value={{ fly, registerCartTarget }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <AnimatePresence>
          {items.map((item) => (
            <motion.img
              key={item.key}
              src={item.image}
              alt=""
              initial={{ left: item.from.x, top: item.from.y, width: item.from.w, height: item.from.h, opacity: 1, borderRadius: 20 }}
              animate={{ left: item.to.x - 12, top: item.to.y - 12, width: 24, height: 24, opacity: 0.2, borderRadius: 12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => removeItem(item.key)}
              className="fixed object-cover shadow-lg"
              style={{ position: "fixed" }}
            />
          ))}
        </AnimatePresence>
      </div>
    </FlyToCartContext.Provider>
  );
}