import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spString = searchParams.toString();

  return function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(spString);

    if (key === "sort" && value === "distance") {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        if (params.get("sort") === "distance") {
          params.delete("sort");
        } else {
          params.set("sort", "distance");
          params.set("lat", String(pos.coords.latitude));
          params.set("lng", String(pos.coords.longitude));
        }
        router.push(`/restaurants?${params.toString()}`, { scroll: false });
      });
      return;
    }

    if (params.get(key) === value) params.delete(key);
    else params.set(key, value);
    router.push(`/restaurants?${params.toString()}`, { scroll: false });
  };
}