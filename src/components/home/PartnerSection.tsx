import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CARDS = [
  { title: "Join Courier",  href: "/join-courier",  image: "/General Card.png" },
  { title: "Join Merchant", href: "/join-merchant", image: "/General Card (1).png" },
];

export function PartnerSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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