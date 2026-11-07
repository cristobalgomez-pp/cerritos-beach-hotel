import type { Compass } from "./sky-sights";
import { average, fetchMetForecast, nextMornings } from "./met";

/**
 * Best-effort surf outlook for Playa Cerritos, from free public data:
 * - Swell: NOAA WaveWatch III global model (served by PacIOOS ERDDAP), grid point just off the beach.
 * - Wind: MET Norway at the hotel.
 * Offshore swell is turned into a rough wave size at the beach. It's an estimate, not a surf report:
 * for the real thing we link to Surfline.
 */

export const SURFLINE_URL = "https://www.surfline.com/surf-report/cerritos/5842041f4e65fad6a7708bd5";

// Nearest open-water grid point (0.5°) to Cerritos: 23.0 N, 110.5 W
const WW3 = "https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ww3_global.json";
const POINT = "[(0.0)][(23.0)][(249.5)]";

export type SurfSize = "flat" | "small" | "medium" | "big" | "huge";
export type WindQuality = "clean" | "fair" | "choppy";
export type SurfRating = "excellent" | "good" | "fair" | "poor";

export interface SurfMorning {
  date: string; // YYYY-MM-DD, local
  swellM: number; // offshore swell height
  periodS: number;
  direction: Compass; // where the swell comes from
  faceM: [number, number]; // estimated wave size at the beach (range)
  size: SurfSize;
  windKmh?: number;
  wind?: WindQuality;
  rating: SurfRating;
}

type WavePoint = { t: number; hs: number; per: number; dir: number; swell: number; swellPer: number; swellDir: number };

async function fetchSwell(now: Date): Promise<WavePoint[]> {
  const from = new Date(now.getTime() - 3600_000).toISOString().slice(0, 13) + ":00:00Z";
  const to = new Date(now.getTime() + 7 * 86_400_000).toISOString().slice(0, 13) + ":00:00Z";
  const range = `[(${from}):(${to})]${POINT}`;
  const vars = ["Thgt", "Tper", "Tdir", "shgt", "sper", "sdir"].map((v) => `${v}${range}`).join(",");
  try {
    const res = await fetch(`${WW3}?${encodeURI(vars)}`, { next: { revalidate: 3 * 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const rows: (string | number | null)[][] = json?.table?.rows ?? [];
    return rows
      .filter((r) => typeof r[4] === "number")
      .map((r) => ({
        t: new Date(r[0] as string).getTime(),
        hs: r[4] as number,
        per: r[5] as number,
        dir: r[6] as number,
        swell: (r[7] as number) ?? (r[4] as number),
        swellPer: (r[8] as number) ?? (r[5] as number),
        swellDir: (r[9] as number) ?? (r[6] as number),
      }));
  } catch {
    return [];
  }
}

const compass = (deg: number): Compass => (["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const)[Math.round(deg / 45) % 8];

/**
 * Cerritos faces southwest: south and west swells hit straight on; northwest swells
 * wrap in smaller; anything from the north or east barely reaches the beach.
 */
function exposure(dir: number) {
  if (dir >= 170 && dir <= 285) return 1;
  if (dir > 285 && dir <= 320) return 0.75;
  if (dir >= 150 && dir < 170) return 0.8;
  return 0.4;
}

function faceRange(hs: number, period: number, dir: number): [number, number] {
  // Longer period swells grow more as they reach shallow water
  const shoaling = period >= 14 ? 1.3 : period >= 11 ? 1.15 : period >= 8 ? 1 : 0.8;
  const mid = hs * shoaling * exposure(dir);
  const round = (x: number) => Math.round(x * 10) / 10;
  return [round(mid * 0.8), round(mid * 1.2)];
}

function sizeOf(midM: number): SurfSize {
  if (midM < 0.3) return "flat";
  if (midM < 0.8) return "small";
  if (midM < 1.5) return "medium";
  if (midM < 2.5) return "big";
  return "huge";
}

function windOf(kmh: number): WindQuality {
  return kmh < 12 ? "clean" : kmh < 22 ? "fair" : "choppy";
}

function rate(size: SurfSize, wind?: WindQuality): SurfRating {
  const sizeScore = { flat: 10, small: 60, medium: 90, big: 80, huge: 55 }[size];
  const windScore = wind === undefined ? 0 : { clean: 0, fair: -15, choppy: -40 }[wind];
  const score = sizeScore + windScore;
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 35) return "fair";
  return "poor";
}

/** Surf outlook for the next mornings (7–11 am, before the afternoon wind). */
export async function getSurfMornings(days = 7, now = new Date()): Promise<SurfMorning[]> {
  const [waves, weather] = await Promise.all([fetchSwell(now), fetchMetForecast()]);
  if (!waves.length) return [];

  const out: SurfMorning[] = [];
  for (const m of nextMornings(days, now)) {
    const w = waves.filter((p) => p.t >= m.from && p.t <= m.to);
    if (!w.length) break;
    const hs = average(w.map((p) => p.hs));
    const per = average(w.map((p) => p.per));
    const dir = w[Math.floor(w.length / 2)].dir;
    const faceM = faceRange(hs, per, dir);
    const size = sizeOf((faceM[0] + faceM[1]) / 2);
    const met = weather.filter((p) => p.t >= m.from && p.t <= m.to);
    const windKmh = met.length ? Math.round(average(met.map((p) => p.wind)) * 3.6) : undefined;
    const wind = windKmh === undefined ? undefined : windOf(windKmh);
    out.push({
      date: m.date,
      swellM: Math.round(average(w.map((p) => p.swell)) * 10) / 10,
      periodS: Math.round(per),
      direction: compass(dir),
      faceM,
      size,
      windKmh,
      wind,
      rating: rate(size, wind),
    });
  }
  return out;
}
