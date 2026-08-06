export function PaymentSummary() {
  return (
    <div className="mt-10">
      <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6">
        Payment Summary
      </h2>

      <div className="border border-neutral-200 rounded-[24px] p-6 lg:p-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading font-light text-[20px] leading-[150%] text-neutral-800">Order Total</span>
          <div className="flex items-center gap-3">
            <span className="font-heading font-light text-[20px] line-through text-neutral-800">$32.10</span>
            <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">$32.10</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading font-light text-[20px] leading-[150%] text-neutral-800">Shipping Costs</span>
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">$2.12</span>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex items-center justify-between">
          <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">Total Payment</span>
          <div className="flex items-center gap-3">
            <span className="font-heading font-light text-[20px] line-through text-neutral-800">$32.10</span>
            <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">$32.10</span>
          </div>
        </div>
      </div>

      <button className="w-full h-[77px] rounded-[50px] bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors font-heading font-medium text-[20px] text-white uppercase tracking-wider mt-6 lg:mt-8">
        Order Now
      </button>
    </div>
  );
}