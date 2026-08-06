import { DeliveryAddress } from "@/src/features/checkout/components/DeliveryAddress";
import { OrderSummary } from "@/src/features/checkout/components/OrderSummary";
import { PaymentMethod } from "@/src/features/checkout/components/PaymentMethod";
import { PaymentSummary } from "@/src/features/checkout/components/PaymentSummary";

export function CheckoutContent() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h1 className="font-heading font-semibold text-[34px] sm:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800">
          Last Step - Delivery &amp; Payment
        </h1>
        <p className="font-heading font-medium text-[26px] sm:text-[39px] leading-[123%] tracking-[0.01em] text-neutral-800 mt-2">
          Oriental Restaurant 1
        </p>

        <div className="w-full border-t border-dashed border-neutral-300 my-8 lg:my-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex flex-col gap-10 lg:gap-12">
            <DeliveryAddress />
            <OrderSummary />
          </div>
          <div>
            <PaymentMethod />
            <PaymentSummary />
          </div>
        </div>
      </div>
    </section>
  );
}