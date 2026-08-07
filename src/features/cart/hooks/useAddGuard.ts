"use client";

import { useState, useCallback } from "react";
import { useCartStore } from "../store";

export function useAddGuard() {
  const [pending, setPending] = useState<null | { restaurantName: string; add: () => void }>(null);
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);

  const guard = useCallback(
    (restaurantId: string, restaurantName: string, add: () => void) => {
      const current = items[0]?.restaurantId ?? null;
      if (current && current !== restaurantId) {
        setPending({ restaurantName, add });
      } else {
        add();
      }
    },
    [items]
  );

  const confirm = useCallback(() => {
    if (!pending) return;
    clearCart();
    pending.add();
    setPending(null);
  }, [pending, clearCart]);

  const cancel = useCallback(() => setPending(null), []);

  return { guard, pending, confirm, cancel };
}