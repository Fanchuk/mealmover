import { getOrdersByTab, type Tab } from "@/src/features/transactions/queries";
import { TransactionsContent } from "@/src/features/transactions/components/TransactionsContent";

const VALID_TABS: Tab[] = ["history", "ongoing", "draft"];

export default async function TransactionsPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string; order?: string }>
}) {
    const sp = await searchParams
    const tab: Tab = VALID_TABS.includes(sp.tab as Tab) ? (sp.tab as Tab) : 'ongoing'
    const orders = await getOrdersByTab(tab)

  return <TransactionsContent tab={tab} orders={orders} selectedId={sp.order} />;
}