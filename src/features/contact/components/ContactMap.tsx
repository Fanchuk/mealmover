"use client";

import { ArrowUpRight } from "lucide-react";

const CENTER = { lat: 40.6136, lng: -74.1502 };
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${CENTER.lat},${CENTER.lng}`;

const EMBED_SRC = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9!2d${CENTER.lng}!3d${CENTER.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2451a7c84d0c9%3A0x0!2zNDDCsDM2JzQ5LjAiTiA3NMKwMDgnNTguMSJX!5e0!3m2!1sen!2sus!4v1700000000000`;

export function ContactMap() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[619px] rounded-[30px] lg:rounded-[40px] overflow-hidden">
          <iframe
            src={EMBED_SRC}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute top-8 left-8 sm:top-10 sm:left-10 z-10">
            <a
              href={GOOGLE_MAPS_URL}
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