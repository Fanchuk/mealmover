import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spString = searchParams.toString();

  return function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(spString);

    if (key === "sort" && value === "distance") {
      if (params.get("sort") === "distance") {
        params.delete("sort");
        params.delete("lat");
        params.delete("lng");
        router.push(`/restaurants?${params.toString()}`, { scroll: false });
        return;
      }

      if (!navigator.geolocation) {
        params.set("sort", "distance");
        router.push(`/restaurants?${params.toString()}`, { scroll: false });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          params.set("sort", "distance");
          params.set("lat", String(pos.coords.latitude));
          params.set("lng", String(pos.coords.longitude));
          router.push(`/restaurants?${params.toString()}`, { scroll: false });
        },
        (error) => {
          console.warn("Geolocation denied:", error.message);
          params.set("sort", "distance");
          params.delete("lat");
          params.delete("lng");
          router.push(`/restaurants?${params.toString()}`, { scroll: false });
        }
      );
      return;
    }

    if (params.get(key) === value) params.delete(key);
    else params.set(key, value);
    router.push(`/restaurants?${params.toString()}`, { scroll: false });
  };
}