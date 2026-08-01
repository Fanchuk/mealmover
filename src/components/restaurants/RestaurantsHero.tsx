import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";

export function RestaurantsHero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-500 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">Restaurants</span>
          </nav>

          <h1 className="font-heading font-bold text-[42px] sm:text-[61px] lg:text-[76px] leading-[121%] tracking-[0.01em] text-neutral-800">
            Restaurants
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[460px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur sit amet vehicula mi. Ut dapibus consequat accumsan.
          </p>

          <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-4 sm:px-6 py-3 sm:py-4 w-full max-w-[551px] h-[60px] sm:h-[72px]">
            <Search size={20} className="text-neutral-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Restaurant"
              className="flex-1 min-w-0 bg-transparent outline-none font-heading font-normal text-[16px] sm:text-[20px] tracking-[0.02em] text-neutral-700 placeholder:text-neutral-400"
            />
            <button className="inline-flex items-center justify-center h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[14px] sm:text-[16px] hover:bg-[#CD424E] transition-colors flex-shrink-0">
              Search
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[280px] sm:min-h-[400px] lg:min-h-[560px]">
          <div className="absolute w-[80%] max-w-[560px] aspect-square rounded-full border-2 border-dashed border-[#FDCEBE]" />
          <div className="absolute w-[70%] max-w-[480px] aspect-square bg-[#FEE9DE] rounded-[45%]" />
          <div className="relative z-10 w-[65%] max-w-[440px] aspect-square overflow-hidden shadow-xl">
            <Image src="/Group 1000002226.png" alt="Restaurant" fill className="object-cover" />
          </div>
          <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute top-[8%] right-[20%] w-2.5 h-2.5 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute bottom-[12%] left-[4%] w-3 h-3 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[35%] right-[6%] w-2.5 h-2.5 rounded-sm bg-[#EF5B5B] rotate-45" />
        </div>
      </div>
    </section>
  );
}