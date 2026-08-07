"use client";

import { useState } from "react";
import { OfferCard } from "./OfferCard";
import { DishModal } from "@/src/features/cart/components/DishModal";
import { ClearCartDialog } from "@/src/features/cart/components/ClearCartDialog";
import { useAddGuard } from "@/src/features/cart/hooks/useAddGuard";
import type { OfferCardData } from "@/src/lib/types/meals";

interface Props {
  offers: OfferCardData[];
  restaurantId: string;
  restaurantName: string;
}

export function TodaysOffer({ offers, restaurantId, restaurantName }: Props) {
  const [modalDish, setModalDish] = useState<OfferCardData | null>(null);
  const { guard, pending, confirm, cancel } = useAddGuard();

  return (
    <section id="todays-offer" className="bg-white py-8 lg:py-12 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">
          Today&apos;s Offer
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {offers.map((o) => (
            <div key={o.id} className="flex justify-center">
              <OfferCard
                {...o}
                restaurantId={restaurantId}
                restaurantName={restaurantName}
                onOpenModal={() => setModalDish(o)}
              />
            </div>
          ))}
        </div>
      </div>

      <DishModal
        open={!!modalDish}
        dish={
          modalDish
            ? {
                id: modalDish.id,
                name: modalDish.name,
                desc: modalDish.desc,
                image: modalDish.image,
                basePrice: modalDish.price,
                restaurantId,
                restaurantName,
              }
            : null
        }
        onClose={() => setModalDish(null)}
        onBeforeAdd={(rid, add) => guard(rid, restaurantName, add)}
      />

      <ClearCartDialog
        open={!!pending}
        restaurantName={pending?.restaurantName ?? ""}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </section>
  );
}