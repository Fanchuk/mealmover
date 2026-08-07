import { type ModifierOption } from "../data/modifiers";
import { cn } from "@/src/lib/utils";

interface SizeCardProps {
  opt: ModifierOption;
  active: boolean;
  onClick: () => void;
}

export function SizeCard({ opt, active, onClick }: SizeCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-3 rounded-[16px] border-2 transition-colors",
        active ? "border-[#EF5B5B] bg-[#EF5B5B]/5" : "border-neutral-200 hover:border-[#EF5B5B]/50"
      )}
    >
      <img src={opt.image} alt={opt.name} className="w-10 h-10 object-contain" />
      <span className="font-heading font-medium text-[14px] text-neutral-800">{opt.name}</span>
      <span className="font-heading text-[12px] text-neutral-400">
        {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : "Free"}
      </span>
    </button>
  );
}