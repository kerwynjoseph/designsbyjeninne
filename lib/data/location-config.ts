/**
 * Central Trinidad service-area configuration.
 *
 * EDIT THE VALUES BELOW to adjust the free-travel service area or the fees
 * charged outside of it. Nothing else in the app needs to change.
 */

// Approximate geographic center of the Central Trinidad service area
// (Chaguanas). Used as the reference point for the radius check below.
export const CENTRAL_TRINIDAD_CENTER = {
  lat: 10.5195,
  lng: -61.4125,
};

// Radius (in kilometers) around the center point above that is considered
// "Central Trinidad" and therefore free of travel fees. At 12km this
// covers Chaguanas, Couva, Freeport, Longdenville, Enterprise, Charlieville,
// Cunupia, Felicity, California and Edinburgh. Increase/decrease to widen
// or narrow the free-travel zone.
export const CENTRAL_TRINIDAD_RADIUS_KM = 12;

// Travel fee rate (TT$ per kilometer) charged for the distance a location
// falls outside the Central Trinidad service area defined above. Editable
// via the NEXT_PUBLIC_TRAVEL_FEE_RATE_PER_KM environment variable (Vercel:
// Settings -> Environment Variables, then redeploy) without editing this
// file or any other code; falls back to TT$7/km below if the env var isn't set.
export const TRAVEL_FEE_RATE_PER_KM =
  Number(process.env.NEXT_PUBLIC_TRAVEL_FEE_RATE_PER_KM) || 7;

// Flat fee (TT$) charged per additional location requested beyond the
// primary location, regardless of travel fee.
export const ADDITIONAL_LOCATION_FEE = 150;

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

/** Haversine distance between two lat/lng points, in kilometers. */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function isWithinCentralTrinidad(lat: number, lng: number): boolean {
  return (
    distanceKm(
      lat,
      lng,
      CENTRAL_TRINIDAD_CENTER.lat,
      CENTRAL_TRINIDAD_CENTER.lng
    ) <= CENTRAL_TRINIDAD_RADIUS_KM
  );
}

/**
 * Returns the travel fee (TT$) for a given coordinate: TT$/km (see
 * TRAVEL_FEE_RATE_PER_KM above) multiplied by the distance the location
 * falls outside the Central Trinidad radius. Returns 0 if the location is
 * inside Central Trinidad or coordinates are unknown.
 */
export function calculateTravelFee(
  lat: number | null | undefined,
  lng: number | null | undefined
): number {
  if (lat == null || lng == null) return 0;
  const distanceFromCenter = distanceKm(
    lat,
    lng,
    CENTRAL_TRINIDAD_CENTER.lat,
    CENTRAL_TRINIDAD_CENTER.lng
  );
  const distanceOutsideCentral = distanceFromCenter - CENTRAL_TRINIDAD_RADIUS_KM;
  if (distanceOutsideCentral <= 0) return 0;
  return Math.round(distanceOutsideCentral * TRAVEL_FEE_RATE_PER_KM * 100) / 100;
}

// Services that manage their own scheduling and are exempt from the
// standard package-booking date/time/location requirement.
export const SCHEDULING_EXEMPT_SERVICE_IDS = ["storybook-editing"];
