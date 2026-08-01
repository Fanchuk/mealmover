import { OfferCard } from "@/src/components/restaurants/OfferCard";

const OFFERS = [
  { name: "Green Fried Rice",  desc: "fresh green chili mixture", image: "/Rectangle 670 (1).png" },
  { name: "Tom Yam Koong",     desc: "Thai Seafood Soup",        image: "/Rectangle 670 (2).png" },
  { name: "Tarik Noodle",      desc: "Thai Seafood Soup",        image: "/Rectangle 670 (3).png" },
  { name: "Hainan Chick Noodle", desc: "Thai Seafood Soup",      image: "/Rectangle 670 (7).png" },
  { name: "Green Fried Rice",  desc: "fresh green chili mixture", image: "/Rectangle 412.png" },
  { name: "Tom Yam Koong",     desc: "Thai Seafood Soup",        image: "/Rectangle 670 (5).png" },
  { name: "Tarik Noodle",      desc: "Thai Seafood Soup",        image: "/Rectangle 670 (6).png" },
  { name: "Beef Rendang",      desc: "Thai Seafood Soup",        image: "/Rectangle 670 (4).png" },
].map((o) => ({ ...o, price: 10.02, oldPrice: 32.10 }));

export function TodaysOffer() {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">
          Today&apos;s Offer
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {OFFERS.map((o, i) => (
            <div key={i} className="flex justify-center">
              <OfferCard {...o} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}