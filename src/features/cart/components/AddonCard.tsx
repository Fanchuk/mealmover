import { Check } from "lucide-react";
import { type ModifierOption } from "../data/modifiers";
import { cn } from "@/src/lib/utils";

interface AddonCardProps {
  opt: ModifierOption;
  active: boolean;
  onClick: () => void;
}

export function AddonCard({ opt, active, onClick }: AddonCardProps) {
  const EMOJI: Record<string, string> = {
    "add-cheese": "🧀",
    "add-egg": "🍳",
    "add-sauce-bbq": "🫙",
    "add-sauce-chili": "🌶️",
    "add-salad": "🥗",
    "add-rice": "🍚",
    "add-fries": "🍟",
    "add-avocado": "🥑",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-1.5 p-3 rounded-[16px] border-2 transition-colors",
        active ? "border-[#EF5B5B] bg-[#EF5B5B]/5" : "border-neutral-200 hover:border-[#EF5B5B]/50"
      )}
    >
      {active && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#EF5B5B] flex items-center justify-center">
          <Check size={12} className="text-white" />
        </span>
      )}
      <span className="text-[32px]">{EMOJI[opt.id] ?? "🍴"}</span>
      <span className="font-heading font-medium text-[13px] text-neutral-800 text-center leading-tight">{opt.name}</span>
      <span className="font-heading text-[12px] text-neutral-400">+${opt.price.toFixed(2)}</span>
    </button>
  );
}