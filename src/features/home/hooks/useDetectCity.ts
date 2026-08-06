import { useState } from "react";

export function useDetectCity() {
  const [city, setCity] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  function detectCity() {
    if (!navigator.geolocation) return;
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const json = await res.json();
          const placeName = json.city || json.locality;

          if (placeName) {
            setCity(placeName);
            document.cookie = `city=${encodeURIComponent(placeName)}; path=/; max-age=2592000`;
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false)
    );
  }

  return { city, locating, detectCity, setCity };
}