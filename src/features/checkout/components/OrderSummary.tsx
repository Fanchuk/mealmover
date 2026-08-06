import { Plus } from "lucide-react";

const ITEMS = [
  { id: 1, name: "Tarik Noodle",  perItem: 10.02, qty: 1, total: 10.02, image: "/Mask group (8).png" },
  { id: 2, name: "Tom Yum Koong", perItem: 11.04, qty: 2, total: 10.02, image: "/Mask group (9).png" },
];

export function OrderSummary() {
  return (
    <div>
      <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6">
        Order Summary
      </h2>

      <div className="border border-neutral-200 rounded-[24px] p-5 lg:p-6 flex flex-col gap-4">
        {ITEMS.map((item, idx) => (
          <div key={item.id}>
            <div className="flex items-start gap-3">
              <img src={item.image} alt={item.name} className="w-[91px] h-[91px] object-cover rounded-[16px] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-heading font-normal text-[20px] leading-[150%] text-neutral-800">{item.name}</span>
                  <button className="border border-neutral-300 rounded-[50px] w-[56px] h-[40px] flex items-center justify-center flex-shrink-0 hover:border-[#EF5B5B] transition-colors">
                    <img src="/edit-2.svg" alt="edit" className="w-4 h-4 object-contain" />
                  </button>
                </div>
                <p className="font-heading font-light text-[14px] leading-[150%] text-neutral-800">
                  ${item.perItem.toFixed(2)} <span className="text-neutral-500">/ item</span>
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <img src="/Component 1.svg" alt="minus" className="w-6 h-6 object-contain cursor-pointer" />
                    <span className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800 min-w-[20px] text-center">{item.qty}</span>
                    <img src="/Component 2.svg" alt="plus" className="w-6 h-6 object-contain cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-heading font-light text-[16px] text-neutral-600">Total :</span>
                    <span className="font-heading font-semibold text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">${item.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            {idx < ITEMS.length - 1 && <div className="w-full h-[1px] bg-neutral-200 mt-4" />}
          </div>
        ))}

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex items-center justify-between gap-4">
          <p className="font-heading font-medium text-[16px] leading-[163%] tracking-[0.02em] text-neutral-800">
            Is there anything else<br />you want to buy?
          </p>
          <button className="flex items-center gap-2 border border-neutral-300 rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors flex-shrink-0">
            Add <Plus size={18} />
          </button>
        </div>

        <div className="w-full h-[1px] bg-neutral-200" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/checkmark-circle.svg" alt="promo" className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">FOODORI24</p>
              <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-600">Promo applied successfully!</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <img src="/Frame 1000002712.svg" alt="remove" className="w-6 h-6 cursor-pointer" />
            <span className="font-heading font-medium text-[20px] leading-[150%] tracking-[0.02em] text-[#188F77]">-$4.00</span>
          </div>
        </div>

        <button className="border border-neutral-300 rounded-[50px] h-[40px] w-[194px] font-heading font-medium text-[16px] text-[#EF5B5B] hover:border-[#EF5B5B] transition-colors">
          Change Code
        </button>
      </div>
    </div>
  );
}