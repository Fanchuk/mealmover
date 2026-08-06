import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Restaurant {
  name: string;
  slug: string;
  promoTitle: string | null;
  promoSubtitle: string | null;
}

export function PromoBanner({ restaurant }: { restaurant: Restaurant | null }) {
  const name = restaurant?.name ?? "Oriental Restaurant";
  const slug = restaurant?.slug ?? "oriental-restaurant";
  const title = restaurant?.promoTitle ?? "Choose 2 Dinner";
  const subtitle = restaurant?.promoSubtitle ?? "Pay for One";

  return (
    <section className="py-6 lg:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative w-full rounded-[24px] lg:rounded-[40px] bg-[#1AA163] overflow-hidden flex flex-col md:flex-row items-center justify-end min-h-[300px] md:min-h-[340px]">
          <div className="absolute left-0 top-0 bottom-0 w-[55%] md:w-[48%] h-full z-10 hidden md:block">
            <Image src="/Vector(3).png" alt="Restaurant" fill className="object-cover object-left" priority />
          </div>
          <div className="relative w-full h-[220px] md:hidden z-10">
            <Image src="/Vector(3).png" alt="Restaurant" fill className="object-cover object-top" />
          </div>
          <div className="absolute top-0 right-0 z-20 w-[140px] lg:w-[170px] h-[64px] hidden sm:block">
            <Image src="/Frame 1000002766.png" alt="Restaurant of the Month" fill className="object-contain object-right-top" />
          </div>
          <div className="absolute -bottom-10 -right-10 z-0 w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] opacity-40">
            <Image src="/Star 2 (1).png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute -bottom-6 -right-6 z-0 w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] opacity-20">
            <Image src="/Star 2 (1).png" alt="" fill className="object-contain" />
          </div>
          <div className="relative z-20 w-full md:w-[55%] lg:w-[52%] flex flex-col justify-center gap-3 lg:gap-4 p-6 lg:p-10 md:pl-0">
            <div className="flex items-center gap-3">
              <Image src="/Logomark.svg" alt="Logo" width={32} height={32} className="w-6 h-6 lg:w-8 lg:h-8 object-contain" />
              <span className="font-heading font-bold text-[18px] lg:text-[22px] text-white">{name}</span>
            </div>
            <div className="relative inline-block self-start">
              <div className="absolute inset-0 z-0 flex items-center justify-center translate-y-3 opacity-90 w-[110%] -left-[5%]">
                <Image src="/Vector 32.svg" alt="" fill className="object-contain object-left-bottom" />
              </div>
              <h2 className="relative z-10 font-heading font-bold text-[34px] sm:text-[44px] lg:text-[52px] leading-[120%] text-white">
                {title}<br /><span className="text-[#FFCF27]">{subtitle}</span>
              </h2>
            </div>
            <Link href={`/restaurants/${slug}`} className="inline-flex items-center gap-2 font-heading font-medium text-[16px] lg:text-[18px] text-white mt-1 hover:gap-3 transition-all">
              Order Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}