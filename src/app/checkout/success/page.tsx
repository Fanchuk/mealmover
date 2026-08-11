import { SuccessContent } from "@/src/features/checkout/components/SuccessContent";
import { sendOrderEmail } from "@/src/features/checkout/services/emailActions";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderNumber = order ?? "UNKNOWN";

  await sendOrderEmail(orderNumber);

  return <SuccessContent orderNumber={orderNumber} />;
}