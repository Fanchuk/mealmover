import Link from "next/link";

interface City {
  id: string;
  name: string;
  slug: string;
}

export function CitiesSection({ cities }: { cities: City[] }) {
  const rows = [cities.slice(0, 7), cities.slice(7, 13), cities.slice(13)];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="w-full h-[50px] rounded-[20px] bg-[#EF5B5B]/10 flex items-center justify-center mb-10 lg:mb-12">
          <span className="font-heading font-medium text-[16px] sm:text-[20px] text-center text-[#EF5B5B] tracking-widest uppercase">Cities with MealMover</span>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          {rows.map((row, ri) => (
            <div key={ri} className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {row.map((city) => (
                <Link
                  key={city.id}
                  href={`/restaurants?city=${encodeURIComponent(city.slug)}`}
                  className="h-[56px] lg:h-[78px] px-6 lg:px-8 rounded-[50px] border border-neutral-300 flex items-center font-heading font-medium text-[16px] lg:text-[20px] leading-[150%] tracking-[0.02em] text-[#EF5B5B] hover:border-[#EF5B5B] hover:bg-[#FEE9DE] transition-all duration-200"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}