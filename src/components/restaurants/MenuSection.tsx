import { MenuItemCard } from "@/src/components/restaurants/MenuItemCard";

const MAIN_COURSE = [
  { name: "Gado - Gado",    image: "/Rectangle 698.png" },
  { name: "Banana Pancake", image: "/Rectangle 698 (1).png" },
  { name: "Grill Potato",   image: "/chicken-fillet-cooked-on-a-grill-with-a-garnish-of-2023-11-27-05-32-17-utc 1.png" },
  { name: "Supreme Burger", image: "/Rectangle 698 (2).png" },
].map((m) => ({ ...m, desc: "Thai Seafood Soup", price: 10.02, oldPrice: 32.10, discount: "Discount $12.08" }));

const DRINKS_DESSERTS = [
  { name: "Thai Tea Original", image: "/Rectangle 698 (3).png" },
  { name: "Blueberry Pancake", image: "/Rectangle 698 (4).png" },
  { name: "Kulfi Premium",     image: "/chicken-fillet-cooked-on-a-grill-with-a-garnish-of-2023-11-27-05-32-17-utc 1 (1).png" },
  { name: "Choco Biscuit",     image: "/Rectangle 698 (5).png" },
].map((m) => ({ ...m, desc: "Thai Seafood Soup", price: 10.02, oldPrice: 32.10, discount: "Discount $12.08" }));

export function MenuSection() {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col gap-12 lg:gap-16">
        <div>
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">
            Main Course
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {MAIN_COURSE.map((m, i) => <MenuItemCard key={i} {...m} />)}
          </div>
        </div>

        <div>
          <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6 lg:mb-8">
            Drinks &amp; Desserts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {DRINKS_DESSERTS.map((m, i) => <MenuItemCard key={i} {...m} />)}
          </div>
        </div>
      </div>
    </section>
  );
}