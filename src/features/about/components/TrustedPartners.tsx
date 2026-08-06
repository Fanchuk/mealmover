const PARTNERS = [
  { logo: "/Fictional company logo.svg",     name: "Layers" },
  { logo: "/Fictional company logo (1).svg", name: "Sisyphus" },
  { logo: "/Frame 313.svg",                  name: "Hourglass" },
  { logo: "/Frame 312.svg",                  name: "Command+R" },
];

export function TrustedPartners() {
  return (
    <section className="bg-[#FEE9DE]/40 py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center mb-8 lg:mb-10">
          Our Trusted Partners
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full items-center justify-items-center">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex items-center gap-3 opacity-80">
              <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain" />
              <span className="font-heading font-bold text-[24px] sm:text-[28px] text-[#E88B7D]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}