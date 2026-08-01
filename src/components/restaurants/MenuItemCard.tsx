import { Plus } from "lucide-react";

interface MenuItemCardProps {
  name: string;
  desc: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
}

export function MenuItemCard({ name, desc, price, oldPrice, discount, image }: MenuItemCardProps) {
  return (
    <div className="border border-neutral-300 rounded-[30px] sm:rounded-[40px] p-4 flex gap-4 bg-white">
      <img src={image} alt={name} className="w-[120px] sm:w-[180px] h-[120px] sm:h-[180px] object-cover rounded-[20px] flex-shrink-0" />
      <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1">
        <h3 className="font-heading font-medium text-[18px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">{name}</h3>
        <p className="font-heading font-light text-[14px] sm:text-[20px] text-neutral-500">{desc}</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-heading font-semibold text-[20px] sm:text-[31px] leading-[123%] tracking-[0.01em] text-[#EF5B5B]">${price.toFixed(2)}</span>
          <span className="font-heading font-normal text-[15px] sm:text-[24px] line-through text-neutral-500">${oldPrice.toFixed(2)}</span>
        </div>
        <span className="self-start font-heading font-normal text-[14px] sm:text-[18px] text-[#D8AC1C] bg-[#FFF6CC] rounded-[20px] px-4 py-1">{discount}</span>
        <button className="mt-1 border border-neutral-300 rounded-[50px] h-[48px] sm:h-[56px] flex items-center justify-center gap-2 font-heading font-medium text-[14px] sm:text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
          Add <Plus size={18} />
        </button>
      </div>
    </div>
  );
}