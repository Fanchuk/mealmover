import { useState } from "react";
import toast from "react-hot-toast";

export function useDetectCity() {
  const [city, setCity] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  function detectCity() {
    if (!navigator.geolocation) {
      toast.error("Your browser doesn't support location detection.");
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      toast.error("Location detection requires a secure (https) connection.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (!res.ok) throw new Error(`Geocoding API returned ${res.status}`);

          const json = await res.json();
          const placeName = json.city || json.locality;

          if (placeName) {
            setCity(placeName);
            document.cookie = `city=${encodeURIComponent(placeName)}; path=/; max-age=2592000`;
          } else {
            toast.error("Couldn't determine your city from this location.");
          }
        } catch (error) {
          console.warn("Geocoding failed:", error instanceof Error ? error.message : String(error));
          toast.error("Failed to detect your city. Please try again.");
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);

        const reason =
          error.code === error.PERMISSION_DENIED
            ? "permission denied"
            : error.code === error.POSITION_UNAVAILABLE
            ? "position unavailable"
            : error.code === error.TIMEOUT
            ? "timeout"
            : "unknown";

        console.warn(`Geolocation failed (${reason}), code=${error.code}`);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location access denied. Please allow it in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Your location is currently unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out. Please try again.");
            break;
          default:
            toast.error("Something went wrong while detecting your location.");
        }
      },
      { timeout: 15000, enableHighAccuracy: false }
    );
  }

  return { city, locating, detectCity, setCity };
}