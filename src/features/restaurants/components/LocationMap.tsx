import { MapPin } from "lucide-react";

interface Props {
  lat: number | null;
  lng: number | null;
  address: string;
  name: string;
}

export function LocationMap({ lat, lng, address, name }: Props) {
  if (lat == null || lng == null) {
    return (
      <div className="w-full h-[300px] rounded-[24px] bg-neutral-100 flex flex-col items-center justify-center gap-2">
        <MapPin size={32} className="text-[#EF5B5B]" />
        <span className="font-heading font-medium text-[16px] text-neutral-700">{name}</span>
        <span className="font-heading text-[14px] text-neutral-500">{address}</span>
      </div>
    );
  }

  const d = 0.008;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <section id="location" className="bg-white py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-semibold text-[24px] sm:text-[31px] leading-[132%] tracking-[0.02em] text-neutral-800 mb-6">Location</h2>
        <div className="relative w-full h-[360px] rounded-[24px] overflow-hidden border border-neutral-200">
          <iframe title={`Map of ${name}`} src={src} className="w-full h-full" loading="lazy" />
          <div className="absolute bottom-4 left-4 bg-white rounded-[16px] px-4 py-3 shadow-lg flex items-center gap-2 max-w-[80%]">
            <MapPin size={18} className="text-[#EF5B5B] flex-shrink-0" />
            <span className="font-heading text-[14px] text-neutral-700 truncate">{address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}