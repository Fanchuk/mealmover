"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from 'sweetalert2'
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { Spinner } from "@/src/components/Spinner";

const CATEGORIES = [
  { id: "near",    label: "Near Me",     icon: "/🗺️.png" },
  { id: "best",    label: "Best Seller", icon: "/🏅.png" },
  { id: "loved",   label: "Most Loved",  icon: "/🫶.png" },
  { id: "24h",     label: "24 Hours",    icon: "/🏪.png" },
  { id: "healthy", label: "Healthy",     icon: "/🥗.png" },
];

export function ExploreSection() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const active = searchParams.get('category')

    const [locating, setLocating] = useState(false)

    function selectCategory(id: string) {
    if (id === "near") {
      if (!navigator.geolocation) {
        Swal.fire({
          icon: "error",
          title: "Помилка",
          text: "Геолокація не підтримується вашим браузером.",
          confirmButtonColor: "#EF5B5B",
        });
        return;
      }
      
      setLocating(true);
      
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocating(false);
          const params = new URLSearchParams(searchParams.toString());
          params.set("category", "near");
          params.set("sort", "distance");
          params.set("lat", String(pos.coords.latitude));
          params.set("lng", String(pos.coords.longitude));
          router.push(`/restaurants?${params.toString()}`);
        },
        (error) => {
          setLocating(false);
          Swal.fire({
            icon: "error",
            title: "Помилка доступу",
            text: `Не вдалося отримати локацію (${error.message}). Перевірте дозволи браузера.`,
            confirmButtonColor: "#EF5B5B",
          });
        }
      );
      return;
    }

    const params = new URLSearchParams(searchParams.toString())

    if (active === id) {
        params.delete('category')
    } else {
        params.set('category', id)
    }

    router.push(`/restaurants?${params.toString()}`)
}

  return (
    <section className="bg-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
        
        <Image src="/Rectangle 234 (1).svg" alt="" width={12} height={12} className="absolute top-[30px] left-[15%] hidden lg:block" />
        <Image src="/Rectangle 227 (1).svg" alt="" width={12} height={12} className="absolute top-[-10px] left-[25%] hidden lg:block" />
        <Image src="/Rectangle 234 (1).svg" alt="" width={12} height={12} className="absolute top-[30px] right-[20%] hidden lg:block" />
        <Image src="/Rectangle 227 (1).svg" alt="" width={12} height={12} className="absolute top-[-20px] right-[10%] hidden lg:block" />

        <span className="font-heading font-bold text-[16px] sm:text-[20px] tracking-[0.1em] text-[#EF5B5B] uppercase text-center">
          Explore Restaurant
        </span>
        <h2 className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[61px] leading-[123%] tracking-[0.01em] text-neutral-800 text-center mt-2 mb-10 lg:mb-14">
          Looking for Food? Start Here
        </h2>

        <div className="w-full flex flex-wrap justify-center gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-4 w-[140px] sm:w-[180px] lg:w-[213px] h-[150px] lg:h-[180px] rounded-[30px] border bg-white transition-all duration-200",
                active === cat.id
                  ? "border-[#EF5B5B] shadow-[0_8px_24px_-6px_rgba(239,91,91,0.25)]"
                  : "border-neutral-200 hover:border-[#EF5B5B]"
              )}
            >
              {cat.id === "near" && locating ? (
                <Spinner size={32} color="#EF5B5B" />
              ) : (
                <div className="relative w-[48px] h-[48px] lg:w-[60px] lg:h-[60px]">
                  <Image src={cat.icon} alt={cat.label} fill className="object-contain" />
                </div>
              )}
              <span className="font-heading font-medium text-[16px] lg:text-[20px] text-[#EF5B5B]">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}