import { Star } from "lucide-react";

const PURCHASE_ITEMS = [
  { name: "Tarik Noodle",  perItem: 10.02, qty: 1,  total: 10.02, image: "/Mask group (8).png" },
  { name: "Tom Yum Koong", perItem: 11.04, qty: 2,  total: 22.08, image: "/Mask group (9).png" },
];

export function OrderDetail() {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-[#EF5B5B]/10 rounded-[20px] h-[66px] px-6 flex items-center">
        <span className="font-heading font-bold text-[20px] leading-[150%] tracking-[0.02em] text-[#EF5B5B]">
          Oriental Restaurant
        </span>
      </div>

      <div className="pt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading font-semibold text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">Order Information</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <img src="/copy.svg" alt="" className="w-5 h-5 object-contain" />
              <span className="font-heading font-medium text-[16px] tracking-[0.02em] text-neutral-600">45YH875439</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/checkmark-circle.svg" alt="" className="w-5 h-5" />
              <span className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">Food has been delivered</span>
            </div>
            <span className="font-heading font-light text-[16px] text-neutral-600 flex-shrink-0">20 Jun 2024 | 10.05</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-semibold text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">
            How satisfied are our driver services?
          </h3>
          <div className="flex items-center gap-4">
            <img src="/Mask group (7).png" alt="John Doe" className="w-16 h-16 rounded-[20px] object-cover flex-shrink-0" />
            <div>
              <p className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">John Doe</p>
              <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">Driver-ASHY98435JK</p>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={20} className="text-[#FFCF27] fill-[#FFCF27]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-semibold text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">Delivery Details</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img src="/fast delivery.svg" alt="" className="w-6 h-6 object-contain mt-1 flex-shrink-0" />
              <div>
                <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">Restaurant Address</p>
                <p className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">Oriental Restaurant</p>
                <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">2.9 km</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-neutral-200" />
            <div className="flex items-start gap-3">
              <img src="/location.svg" alt="" className="w-6 h-6 object-contain mt-1 flex-shrink-0" />
              <div>
                <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">Delivery Address</p>
                <p className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">Front Lake Street, 09, Surabaya</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex flex-col gap-4">
          <h3 className="font-heading font-semibold text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">Purchase Details</h3>
          <div className="flex flex-col gap-4">
            {PURCHASE_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-[16px] object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">{item.name}</p>
                  <p className="font-heading font-light text-[14px] leading-[150%] text-neutral-800">
                    ${item.perItem.toFixed(2)} <span className="text-neutral-500">/ item</span>
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-heading font-light text-[16px] leading-[163%] tracking-[0.02em] text-neutral-600 text-right">{item.qty} Item</p>
                  <p className="font-heading font-light text-[16px] text-neutral-600">Total : <span className="font-semibold text-[20px] text-neutral-800">${item.total.toFixed(2)}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-semibold text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">Payment Details</h3>
          <div className="flex items-center justify-between">
            <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">Order Total</span>
            <div className="flex items-center gap-3">
              <span className="font-heading font-light text-[20px] line-through text-neutral-800">$32.10</span>
              <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">$32.10</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">Shipping Costs</span>
            <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">$2.12</span>
          </div>
          <div className="w-full h-[1px] bg-neutral-200" />
          <div className="flex items-center justify-between">
            <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">Total Payment</span>
            <div className="flex items-center gap-3">
              <span className="font-heading font-light text-[20px] line-through text-neutral-800">$32.10</span>
              <span className="font-heading font-semibold text-[20px] tracking-[0.02em] text-neutral-800">$32.10</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-heading font-medium text-[20px] tracking-[0.02em] text-neutral-800">Payment Method</span>
            <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">Credit Card</span>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button className="flex-1 border border-neutral-300 rounded-[50px] h-[77px] font-heading font-medium text-[20px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
            Download
          </button>
          <button className="flex-1 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[77px] font-heading font-medium text-[20px] text-white">
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
}