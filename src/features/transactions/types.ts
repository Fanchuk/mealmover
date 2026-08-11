import type { getOrdersByTab, getOrderById } from "./queries";

export type OrderListItem = Awaited<ReturnType<typeof getOrdersByTab>>[number];
export type OrderDetail = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;

export const ORDER_STAGES = [
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "PREPARING", label: "Preparing" },
  { status: "ON_THE_WAY", label: "On the way" },
  { status: "DELIVERED", label: "Delivered" },
] as const;