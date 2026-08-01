import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-6 lg:py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative w-full rounded-[24px] lg:rounded-[40px] bg-[#3FA871] overflow-hidden flex flex-col md:flex-row items-stretch min-h-[300px] md:h-[454px]">
          <div className="relative w-full md:w-[40%] h-[200px] md:h-auto flex-shrink-0">
            <img src="/two-female-friends-relaxing-in-outdoor-cafe-2023-11-27-05-00-06-utc 1 (1).png" alt="Restaurant" className="w-full h-full object-cover" />
            <div className="hidden md:block absolute inset-y-0 -right-8 w-16 bg-[#3FA871]" style={{ clipPath: "ellipse(50% 100% at 100% 50%)" }} />
          </div>

          <div className="absolute top-0 right-0 hidden sm:flex items-center h-[52px] px-6 bg-[#2C7A52] rounded-bl-[20px] rounded-tr-[24px] lg:rounded-tr-[40px]">
            <span className="font-heading font-bold text-[14px] lg:text-[16px] text-white leading-tight text-center">Restaurant of<br />the Month</span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 lg:gap-4 px-6 lg:px-12 py-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#8FD3AC] flex items-center justify-center text-white">🍽</span>
              <span className="font-heading font-bold text-[20px] lg:text-[25px] text-white">Oriental Restaurant</span>
            </div>
            <h2 className="font-heading font-bold text-[34px] sm:text-[44px] lg:text-[55px] leading-[110%] text-white">
              Choose 2 Dinner<br /><span className="text-[#FFCF27]">Pay for One</span>
            </h2>
            <Link href="/restaurants" className="inline-flex items-center gap-2 font-heading font-medium text-[18px] lg:text-[20px] text-white mt-2 hover:gap-3 transition-all">
              Order Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}