import { MenuItemCard } from "./MenuItemCard";
import type { MenuItemCardData } from "@/src/lib/types/meals";

export function MenuSection({ mainCourse, drinksDesserts }: { mainCourse: MenuItemCardData[]; drinksDesserts: MenuItemCardData[] }) {
  return (
    <div className="bg-white py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col gap-12 lg:gap-16">
        <section id="main-course" className="scroll-mt-24">
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">Main Course</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {mainCourse.map((m) => <MenuItemCard key={m.id} {...m} />)}
          </div>
        </section>
        <section id="drinks-desserts" className="scroll-mt-24">
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">Drinks &amp; Desserts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {drinksDesserts.map((m) => <MenuItemCard key={m.id} {...m} />)}
          </div>
        </section>
      </div>
    </div>
  );
}