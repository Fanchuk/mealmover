import { OfferCard } from "./OfferCard";
import type { OfferCardData } from "@/src/lib/types/meals";

export function TodaysOffer({ offers }: { offers: OfferCardData[] }) {
  return (
    <section id="todays-offer" className="bg-white py-8 lg:py-12 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">
          Today&apos;s Offer
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {offers.map((o) => (
            <div key={o.id} className="flex justify-center">
              <OfferCard {...o} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}