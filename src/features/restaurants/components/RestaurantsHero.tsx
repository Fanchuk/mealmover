"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Search } from "lucide-react";

import { useDebounce } from "@/src/hooks/useDebounce";
import { Spinner } from "@/src/components/Spinner";
import { highlightMatch } from "@/src/features/restaurants/restaurantsUtils";

interface SearchResult {
  id: string;
  name: string;
  image: string;
  type: "meal" | "drink";
}

export function RestaurantsHero() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") goToSearch(query);
  }

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
          <nav className="flex items-center gap-2 font-heading text-[14px] sm:text-[16px]">
            <Link href="/" className="text-neutral-500 hover:text-[#EF5B5B] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-neutral-400" />
            <span className="text-[#FFCF27] font-medium">Restaurants</span>
          </nav>

          <h1 className="font-heading font-bold text-[42px] sm:text-[61px] lg:text-[76px] leading-[121%] tracking-[0.01em] text-neutral-800">
            Restaurants
          </h1>

          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700 max-w-[460px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur sit amet vehicula mi. Ut dapibus consequat accumsan.
          </p>

          <div className="relative w-full max-w-[551px]">
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
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-neutral-100 max-h-[320px] overflow-y-auto z-30">
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
                    onMouseDown={() => goToSearch(item.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-left"
                  >
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <span className="font-heading text-[15px] text-neutral-800">
                      {highlightMatch(item.name, debouncedQuery)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[300px] sm:min-h-[420px] lg:min-h-[560px] mt-12 sm:mt-16 lg:mt-0">
          <div className="absolute w-[80%] max-w-[560px] aspect-square rounded-full border-2 border-dashed border-[#FDCEBE]" />
          <div className="absolute w-[70%] max-w-[480px] aspect-square bg-[#FEE9DE] rounded-[45%]" />
          <div className="relative z-10 w-[65%] max-w-[440px] aspect-square overflow-hidden rounded-[20%] shadow-xl">
            <Image src="/Group 1000002226.png" alt="Restaurant" fill className="object-cover" priority />
          </div>
          <div className="absolute top-[15%] left-[8%] w-3 h-3 rounded-sm bg-[#EF5B5B] rotate-45" />
          <div className="absolute top-[8%] right-[20%] w-2.5 h-2.5 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute bottom-[12%] left-[4%] w-3 h-3 rounded-sm bg-[#FFCF27] rotate-45" />
          <div className="absolute top-[35%] right-[6%] w-2.5 h-2.5 rounded-sm bg-[#EF5B5B] rotate-45" />
        </div>
      </div>
    </section>
  );
}