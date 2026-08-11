"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MenuItemCard } from "./MenuItemCard";
import { DishModal } from "@/src/features/cart/components/DishModal";
import { ClearCartDialog } from "@/src/features/cart/components/ClearCartDialog";
import { useAddGuard } from "@/src/features/cart/hooks/useAddGuard";
import type { MenuItemCardData } from "@/src/lib/types/meals";
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface Props {
  mainCourse: MenuItemCardData[];
  drinksDesserts: MenuItemCardData[];
  restaurantId: string;
  restaurantName: string;
}

export function MenuSection({ mainCourse, drinksDesserts, restaurantId, restaurantName }: Props) {
  const [modalDish, setModalDish] = useState<MenuItemCardData | null>(null);
  const { guard, pending, confirm, cancel } = useAddGuard();
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");

  useEffect(() => {
    if (!highlight) return;
    const slug = highlight.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(`dish-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-[#EF5B5B]", "ring-offset-2");
      const t = setTimeout(() => el.classList.remove("ring-2", "ring-[#EF5B5B]", "ring-offset-2"), 3000);
      return () => clearTimeout(t);
    }
  }, [highlight]);

  return (
    <div className="bg-white py-8 lg:py-12 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "8%", left: "1%" },
        { top: "45%", right: "2%" },
        { top: "80%", left: "3%" },
        { top: "20%", right: "4%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col gap-12 lg:gap-16 relative z-10">
        <section id="main-course" className="scroll-mt-24">
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">Main Course</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {mainCourse.map((m) => (
              <MenuItemCard key={m.id} {...m} restaurantId={restaurantId} restaurantName={restaurantName} onOpenModal={() => setModalDish(m)} />
            ))}
          </div>
        </section>

        <section id="drinks-desserts" className="scroll-mt-24">
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">Drinks &amp; Desserts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {drinksDesserts.map((m) => (
              <MenuItemCard key={m.id} {...m} restaurantId={restaurantId} restaurantName={restaurantName} onOpenModal={() => setModalDish(m)} />
            ))}
          </div>
        </section>
      </div>

      <DishModal
        open={!!modalDish}
        dish={modalDish ? { id: modalDish.id, name: modalDish.name, desc: modalDish.desc, image: modalDish.image, basePrice: modalDish.price, restaurantId, restaurantName } : null}
        onClose={() => setModalDish(null)}
        onBeforeAdd={(rid, add) => guard(rid, restaurantName, add)}
      />

      <ClearCartDialog open={!!pending} restaurantName={pending?.restaurantName ?? ""} onConfirm={confirm} onCancel={cancel} />
    </div>
  );
}