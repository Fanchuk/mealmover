export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

export function shippingCost(distanceKm: number): number {
  const base = 2.12;
  const perKm = 0.35;
  return Math.round((base + distanceKm * perKm) * 100) / 100;
}

export function estimateEta(distanceKm: number, weatherCode = 0): number {
  const speedKmh = weatherCode >= 51 ? 18 : 28; 
  const mins = (distanceKm / speedKmh) * 60 + 12; 
  return Math.round(mins);
}