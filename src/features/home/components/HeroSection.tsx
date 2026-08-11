"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin } from "lucide-react";

import { useDebounce } from "@/src/hooks/useDebounce";
import { Spinner } from "@/src/components/Spinner";
import { TITLE_WORDS, highlightMatch } from "../utils/heroUtils";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { useDetectCity } from "../hooks/useDetectCity";
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface SearchResult {
  id: string;
  name: string;
  image: string;
  type: "meal" | "drink" | "restaurant";
  restaurantName?: string;
  slug?: string;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useHeroAnimation(sectionRef);

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { city, locating, detectCity } = useDetectCity();

  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      return res.json() as Promise<{ results: SearchResult[] }>;
    },
    enabled: debouncedQuery.trim().length >= 2,
  });

  const results = data?.results ?? [];
  const dropdownVisible = showDropdown && debouncedQuery.trim().length >= 2;

  function goToSearch(value: string) {
    if (!value.trim()) return;
    setShowDropdown(false);
    router.push(`/restaurants?q=${encodeURIComponent(value.trim())}`);
  }

  function goToItem(item: SearchResult) {
    setShowDropdown(false);
    if (item.type === "restaurant") {
      router.push(`/restaurants/${item.slug}`);
    } else if (item.slug) {
      router.push(`/restaurants/${item.slug}?highlight=${encodeURIComponent(item.name)}&mealId=${item.id}`);
    } else {
      router.push(`/restaurants?q=${encodeURIComponent(item.name)}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") goToSearch(query);
  }

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden relative">
      <FloatingShapes positions={[
        { top: "10%", left: "5%" },
        { top: "60%", right: "8%" },
        { top: "30%", left: "48%" },
      ]} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1 relative">
          <div className="hero-fade inline-flex items-center gap-3 self-start border-2 border-[#FFCF27] bg-[#FFF6CC] rounded-[50px] pl-5 sm:pl-6 pr-1 py-1">
            <span className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-800">
              Welcome to <span className="font-medium text-[#EF5B5B]">MealMover</span>
            </span>
            <span className="w-10 h-10 rounded-[20px] bg-white shadow-[2px_4px_10px_0_rgba(0,0,0,0.11)] flex items-center justify-center text-lg flex-shrink-0">
              🍔
            </span>
          </div>

          <h1 className="relative font-heading font-bold text-[38px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800 z-10">
            <div className="hero-float absolute -z-10 top-[10%] right-[10%] w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]">
              <Image src="/Ellipse 19.svg" alt="" fill className="object-contain" />
            </div>
            {TITLE_WORDS.map((word, i) => (
              <span key={i} className={`hero-word inline-block mr-2 ${word.accent ? "text-[#EF5B5B]" : ""}`}>
                {word.text}
              </span>
            ))}
          </h1>

          <p className="hero-fade font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[520px]">
            Ordering is simple and convenient. Just browse our menu,
            select your favorites, and let us take care of the rest. Sit
            back, relax, and await the arrival of your delicious meal.
          </p>

          <div className="hero-fade w-full max-w-[551px] relative z-30">
            <div className="flex items-center gap-2 sm:gap-3 bg-neutral-100 border border-neutral-200 rounded-[50px] px-4 sm:px-6 py-3 sm:py-4 h-[60px] sm:h-[72px]">
              <Search size={20} className="text-neutral-500 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onKeyDown={handleKeyDown}
                placeholder="Search Restaurant"
                className="flex-1 min-w-0 bg-transparent outline-none font-heading font-normal text-[16px] sm:text-[20px] tracking-[0.02em] text-neutral-700 placeholder:text-neutral-400"
              />
              <button
                onClick={() => goToSearch(query)}
                className="inline-flex items-center justify-center h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-[61px] bg-[#EF5B5B] text-white font-heading font-medium text-[14px] sm:text-[16px] hover:bg-[#CD424E] transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>

            {dropdownVisible && (
              <div className="mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 max-h-[320px] overflow-y-auto absolute z-50 left-0 right-0">
                {isFetching && (
                  <div className="p-4 flex items-center justify-center gap-2 text-neutral-400 font-heading text-sm">
                    <Spinner size={16} color="#a3a3a3" /> Searching...
                  </div>
                )}
                {!isFetching && results.length === 0 && (
                  <div className="p-4 text-neutral-400 font-heading text-sm">No results found</div>
                )}
                {results.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onMouseDown={() => goToItem(item)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-left"
                  >
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading text-[15px] text-neutral-800 truncate">
                        {highlightMatch(item.name, debouncedQuery)}
                      </span>
                      {item.restaurantName && (
                        <span className="font-heading text-[12px] text-neutral-400 truncate">{item.restaurantName}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hero-fade">
            {city ? (
              <div className="inline-flex items-center gap-2 text-[#EF5B5B] font-heading text-[14px]">
                <MapPin size={16} />
                {city}
              </div>
            ) : (
              <button
                onClick={detectCity}
                disabled={locating}
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#EF5B5B] font-heading text-[14px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {locating ? (
                  <>
                    <Spinner size={16} color="#EF5B5B" />
                    <span className="text-[#EF5B5B]">Detecting...</span>
                  </>
                ) : (
                  <>
                    <MapPin size={16} />
                    Detect my city
                  </>
                )}
              </button>
            )}
          </div>

          <div className="hero-fade flex items-center gap-4 mt-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0 relative">
              <Image src="/Mask group (24).png" alt="Courier" fill className="object-cover" />
            </div>
            <div className="w-[4px] h-[52px] rounded-[50px] bg-[#D8AC1C] flex-shrink-0" />
            <p className="font-heading font-normal text-[14px] sm:text-[16px] leading-[163%] tracking-[0.02em] text-neutral-700">
              When you are too lazy or<br />busy to cook, just click away!
            </p>
          </div>
        </div>

        <div className="hero-phone relative flex items-center justify-center order-1 lg:order-2 w-full lg:min-h-[652px]">
          <Image
            src="/home.png"
            alt="MealMover App"
            width={600}
            height={600}
            className="w-full max-w-[540px] h-auto drop-shadow-2xl object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}