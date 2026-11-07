/**
 * Sea surface temperature from satellites (NOAA/NASA JPL MUR SST, daily, ~1 km), via NOAA CoastWatch ERDDAP.
 * Public data; cached for 12 hours. Returns undefined if the service doesn't answer.
 */
const MUR = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.json";

// Open water just off Playa Cerritos, and the Gulf of Alaska where humpbacks feed in summer
export const SEA_POINTS = {
  cerritos: [23.3, -110.22],
  alaska: [57.5, -137.0],
} as const;

export async function seaTemperature(point: readonly [number, number]): Promise<number | undefined> {
  const [lat, lon] = point;
  const query = `analysed_sst[(last)][(${lat}):1:(${lat})][(${lon}):1:(${lon})]`;
  try {
    const res = await fetch(`${MUR}?${encodeURI(query)}`, { next: { revalidate: 12 * 3600 } });
    if (!res.ok) return undefined;
    const json = await res.json();
    const value = json?.table?.rows?.[0]?.[3];
    return typeof value === "number" ? Math.round(value) : undefined;
  } catch {
    return undefined;
  }
}
