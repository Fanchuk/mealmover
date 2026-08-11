"use client";

import { ArrowUpRight } from "lucide-react";

const CENTER = { lat: 40.6136, lng: -74.1502 };
const d = 0.01;
const BBOX = `${CENTER.lng - d},${CENTER.lat - d},${CENTER.lng + d},${CENTER.lat + d}`;
const EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${CENTER.lat},${CENTER.lng}`;
const LARGE_MAP_URL = `https://www.openstreetmap.org/?mlat=${CENTER.lat}&mlon=${CENTER.lng}#map=15/${CENTER.lat}/${CENTER.lng}`;

export function ContactMap() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[619px] rounded-[30px] lg:rounded-[40px] overflow-hidden">
          <iframe
            src={EMBED_SRC}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          <div className="absolute top-0 left-0 w-[220px] h-[40px] bg-white/0 pointer-events-none" />

          <div className="absolute top-8 left-8 sm:top-10 sm:left-10 z-10">
            <a
              href={LARGE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white rounded-[50px] h-[48px] px-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] font-heading font-bold text-[14px] sm:text-[16px] text-[#EF5B5B] hover:shadow-md transition-shadow"
            >
              View Large Map <ArrowUpRight size={18} className="text-[#EF5B5B]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}