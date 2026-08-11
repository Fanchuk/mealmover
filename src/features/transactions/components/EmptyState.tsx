import Link from "next/link";
import { Tab } from "../queries";

const CONTENT: Record<Tab, { emoji: string; title: string; text: string }> = {
  ongoing: { emoji: "🛵", title: "No active orders", text: "Your ongoing deliveries will appear here." },
  history: { emoji: "📦", title: "No past orders yet", text: "Once you complete an order, it shows up here." },
  draft: { emoji: "📝", title: "No drafts", text: "Saved but unplaced orders live here." },
};

export function EmptyState({ tab }: { tab: Tab }) {
  const c = CONTENT[tab];
  return (
    <div className="py-20 flex flex-col items-center text-center gap-4">
      <span className="text-6xl">{c.emoji}</span>
      <h2 className="font-heading font-bold text-[22px] text-neutral-800">{c.title}</h2>
      <p className="font-heading text-[15px] text-neutral-400 max-w-[360px]">{c.text}</p>
      <Link
        href="/restaurants"
        className="mt-2 h-[48px] px-6 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium flex items-center hover:bg-[#CD424E] transition-colors"
      >
        Browse restaurants
      </Link>
    </div>
  );
}