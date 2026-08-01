import { Plus } from "lucide-react";

interface OfferCardProps {
  name: string;
  desc: string;
  price: number;
  oldPrice: number;
  image: string;
}

export function OfferCard({ name, desc, price, oldPrice, image }: OfferCardProps) {
  return (
    <div className="border border-neutral-300 rounded-[30px] overflow-hidden flex flex-col bg-white flex-shrink-0 w-[240px] sm:w-[281px]">
      <img src={image} alt={name} className="w-full h-[200px] sm:h-[247px] object-cover" />
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-heading font-medium text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">{name}</h3>
        <p className="font-heading font-light text-[16px] sm:text-[20px] text-neutral-500">{desc}</p>
        <div className="flex items-center gap-3">
          <span className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[123%] tracking-[0.01em] text-[#EF5B5B]">${price.toFixed(2)}</span>
          <span className="font-heading font-normal text-[18px] sm:text-[24px] line-through text-neutral-500">${oldPrice.toFixed(2)}</span>
        </div>
        <button className="mt-2 border border-neutral-300 rounded-[50px] h-[56px] flex items-center justify-center gap-2 font-heading font-medium text-[18px] sm:text-[20px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
          Add <Plus size={20} />
        </button>
      </div>
    </div>
  );
}