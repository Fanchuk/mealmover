const FEATURES = [
  { icon: "/takoyaki.svg",       title: "Fresh Food",    desc: "Fast delivery guaranteed. Get it fast" },
  { icon: "/fast delivery.svg",  title: "Fast Delivery", desc: "Our restaurant partners have been carefully" },
  { icon: "/award.svg",          title: "Quality Food",  desc: "Our couriers have proven their friendliness" },
  { icon: "/smile.svg",          title: "24/7 Service",  desc: "Our couriers have proven their friendliness" },
];

export function WhySection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        <div className="relative order-2 lg:order-1">
          <img src="/Layer_9.svg" alt="Why MealMover" className="w-full max-w-[500px] mx-auto" />
        </div>

        <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] leading-[150%] tracking-[0.1em] text-[#EF5B5B] uppercase">
            Why Choose Us
          </span>
          <h2 className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800">
            Why We Are the Best
          </h2>
          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700">
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            sollicitudin convallis enim sed vehicula. Ut scelerisque gravida elit,
            at porttitor nulla. Vestibulum tellus mi, posuere vel turpis consequat.&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] rounded-full bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                  <img src={f.icon} alt="" className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">
                    {f.title}
                  </h3>
                  <p className="font-heading font-normal text-[14px] lg:text-[16px] leading-[163%] tracking-[0.02em] text-neutral-700">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}