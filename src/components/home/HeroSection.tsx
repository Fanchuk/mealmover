import Link from "next/link";
import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-3 self-start border-2 border-[#FFCF27] bg-[#FFF6CC] rounded-[50px] pl-5 sm:pl-6 pr-1 py-1">
            <span className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
              Welcome to <span className="font-medium text-[#EF5B5B]">MealMover</span>
            </span>
            <span className="w-10 h-10 rounded-[20px] bg-white shadow-[2px_4px_10px_0_rgba(0,0,0,0.11)] flex items-center justify-center text-lg flex-shrink-0">
              🍔
            </span>
          </div>

          <h1 className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800">
            We Are the Fastest In <span className="text-[#EF5B5B]">Delivering</span> Your <span className="text-[#EF5B5B]">Food</span>
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[520px]">
            Ordering is simple and convenient. Just browse our menu,
            select your favorites, and let us take care of the rest. Sit
            back, relax, and await the arrival of your delicious meal.
          </p>

          <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-4 sm:px-6 py-3 sm:py-4 w-full max-w-[551px] h-[60px] sm:h-[72px]">
            <Search size={20} className="text-neutral-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Restaurant"
              className="flex-1 min-w-0 bg-transparent outline-none font-heading font-normal text-[16px] sm:text-[20px] tracking-[0.02em] text-neutral-700 placeholder:text-neutral-400"
            />
            <Link href="/restaurants" className="inline-flex items-center justify-center h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[14px] sm:text-[16px] hover:bg-[#CD424E] transition-colors flex-shrink-0">
              Search
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
              <img src="/Frame 6.svg" alt="Courier" className="w-full h-full object-cover" />
            </div>
            <div className="w-[4px] h-[52px] rounded-[50px] bg-[#D8AC1C] flex-shrink-0" />
            <p className="font-heading font-normal text-[14px] sm:text-[16px] leading-[163%] tracking-[0.02em] text-neutral-700">
              When you are too lazy or<br />busy to cook, just click away!
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[420px] sm:min-h-[520px] lg:min-h-[652px]">
          <div className="absolute w-[85%] max-w-[540px] aspect-square rounded-full border border-dashed border-[#FFCF27]/70" />
          <div className="absolute w-[62%] max-w-[400px] aspect-square rounded-full bg-[#FFCF27]" />
          <img src="/015-spinach.png" alt="" className="absolute left-[2%] top-[28%] w-[90px] sm:w-[130px] lg:w-[150px] -rotate-12 z-20" />
          <div className="relative z-10 w-[52%] max-w-[300px]">
            <img src="/Group 1000002219.png" alt="MealMover App" className="w-full drop-shadow-2xl" />
          </div>
          <img src="/Rectangle 670 (2).jpg" alt="" className="absolute z-20 left-[8%] bottom-[6%] w-[70px] sm:w-[95px] lg:w-[110px] aspect-square object-cover rounded-full shadow-lg" />
          <img src="/Rectangle 670.jpg" alt="" className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[-2%] w-[75px] sm:w-[100px] lg:w-[120px] aspect-square object-cover rounded-full shadow-lg" />
          <img src="/bbq-dinner-with-top-sirloin-steak-2023-11-27-05-01-04-utc 2.jpg" alt="" className="absolute z-20 right-[6%] bottom-[8%] w-[70px] sm:w-[95px] lg:w-[110px] aspect-square object-cover rounded-full shadow-lg" />
          <div className="absolute top-[6%] left-[12%] w-2.5 h-2.5 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[42%] right-[2%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute bottom-[30%] left-[40%] w-3 h-3 rounded-sm bg-[#FFCF27] rotate-45" />
        </div>

      </div>
    </section>
  );
}