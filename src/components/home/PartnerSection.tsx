import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CARDS = [
  { title: "Join Courier",  href: "/join-courier",  image: "/General Card.png" },
  { title: "Join Merchant", href: "/join-merchant", image: "/General Card (1).png" },
];

export function PartnerSection() {
  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">
          Join Partnership
        </span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-10 lg:mb-14 max-w-[720px]">
          Join Us to Expand Your Restaurant Market
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card) => (
            <Link key={card.title} href={card.href} className="group relative h-[300px] lg:h-[419px] rounded-[32px] lg:rounded-[40px] overflow-hidden block">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-6 right-6 w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#EF5B5B] flex items-center justify-center text-white group-hover:bg-[#CD424E] transition-colors">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}