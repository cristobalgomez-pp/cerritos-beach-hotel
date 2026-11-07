import * as SunCalc from "suncalc";
import { HOTEL } from "./constants";
import type { Compass } from "./sky-sights";
import { average, DAY_MS, fetchMetForecast, localDay, TZ_OFFSET_H, type MetPoint } from "./met";

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

export interface SurfHour {
  hour: number; // local hour, 0–23
  faceM: [number, number]; // estimated wave size at the beach (range)
  size: SurfSize;
  windKmh?: number;
  wind?: WindQuality;
  score: number;
  rating: SurfRating;
  recommended: boolean;
}

export interface SurfDay {
  date: string; // YYYY-MM-DD, local
  isToday: boolean;
  hours: SurfHour[]; // daylight hours (today: from now until sunset)
  best?: { from: number; to: number }; // recommended window, local hours [from, to)
  faceM: [number, number]; // smallest–largest estimate during daylight
  size: SurfSize; // typical size during daylight
  rating: SurfRating; // best moment of the day
  swellM: number; // offshore swell, at the best moment
  periodS: number;
  direction: Compass; // where the swell comes from
  windKmh?: number; // average during the recommended window
}

type WavePoint = { t: number; hs: number; per: number; dir: number; swell: number; swellPer: number; swellDir: number };

async function fetchSwell(now: Date): Promise<WavePoint[]> {
  const from = new Date(now.getTime() - 3600_000).toISOString().slice(0, 13) + ":00:00Z";
  // Up to the end of the latest model run (about 7 days ahead)
  const range = `[(${from}):last]${POINT}`;
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

// Wind penalty: light wind keeps the waves clean, afternoon sea breeze chops them up
function windPenalty(kmh?: number) {
  if (kmh === undefined) return 0;
  return kmh < 10 ? 0 : kmh < 15 ? 8 : kmh < 20 ? 15 : kmh < 28 ? 30 : 45;
}

const SIZE_SCORE: Record<SurfSize, number> = { flat: 10, small: 60, medium: 90, big: 80, huge: 55 };

function ratingOf(score: number): SurfRating {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 35) return "fair";
  return "poor";
}

const localHourOf = (t: number) => new Date(t + TZ_OFFSET_H * 3600_000).getUTCHours();

/** Nearest wind reading within 3 h (MET is hourly for ~2.5 days, then every 6 h). */
function windAt(points: MetPoint[], t: number): number | undefined {
  let best: MetPoint | undefined;
  for (const p of points) if (!best || Math.abs(p.t - t) < Math.abs(best.t - t)) best = p;
  return best && Math.abs(best.t - t) <= 3 * 3600_000 ? Math.round(best.wind * 3.6) : undefined;
}

/** Daylight hours at the hotel for a local date (first full hour after sunrise … last before sunset). */
function daylight(day: number) {
  const { lat, lng } = HOTEL.coordinates;
  const noon = new Date(day + (12 - TZ_OFFSET_H) * 3600_000);
  const times = SunCalc.getTimes(noon, lat, lng);
  return { first: localHourOf(times.sunrise.getTime()) + 1, last: localHourOf(times.sunset.getTime()) - 1 };
}

function buildDay(day: number, isToday: boolean, fromHour: number, waves: WavePoint[], weather: MetPoint[]): SurfDay | undefined {
  const { first, last } = daylight(day);
  const hours: (SurfHour & { wave?: WavePoint })[] = [];
  for (let h = Math.max(first, fromHour); h <= last; h++) {
    const t = day + (h - TZ_OFFSET_H) * 3600_000;
    const wave = waves.find((p) => p.t === t);
    if (!wave) continue;
    const faceM = faceRange(wave.hs, wave.per, wave.dir);
    const size = sizeOf((faceM[0] + faceM[1]) / 2);
    const windKmh = windAt(weather, t);
    const score = SIZE_SCORE[size] - windPenalty(windKmh);
    hours.push({
      hour: h,
      faceM,
      size,
      windKmh,
      wind: windKmh === undefined ? undefined : windOf(windKmh),
      score,
      rating: ratingOf(score),
      recommended: false,
      wave,
    });
  }
  if (!hours.length) return undefined;

  // Recommended hours: close to the best of the day (and not poor); the window is the longest run of them
  const top = Math.max(...hours.map((h) => h.score));
  for (const h of hours) h.recommended = h.score >= top - 8 && h.rating !== "poor";
  let best: SurfDay["best"];
  for (let i = 0; i < hours.length; i++) {
    if (!hours[i].recommended) continue;
    let j = i;
    while (j + 1 < hours.length && hours[j + 1].recommended && hours[j + 1].hour === hours[j].hour + 1) j++;
    if (!best || hours[j].hour + 1 - hours[i].hour > best.to - best.from) best = { from: hours[i].hour, to: hours[j].hour + 1 };
    i = j;
  }

  const peak = hours.find((h) => h.score === top)!;
  const inBest = best ? hours.filter((h) => h.hour >= best.from && h.hour < best.to) : [];
  const winds = inBest.map((h) => h.windKmh).filter((w): w is number => w !== undefined);
  const mids = hours.map((h) => (h.faceM[0] + h.faceM[1]) / 2);

  return {
    date: new Date(day).toISOString().slice(0, 10),
    isToday,
    hours: hours.map((h) => ({ ...h, wave: undefined })),
    best,
    faceM: [Math.min(...hours.map((h) => h.faceM[0])), Math.max(...hours.map((h) => h.faceM[1]))],
    size: sizeOf(average(mids)),
    rating: peak.rating,
    swellM: Math.round(peak.wave!.swell * 10) / 10,
    periodS: Math.round(peak.wave!.per),
    direction: compass(peak.wave!.dir),
    windKmh: winds.length ? Math.round(average(winds)) : undefined,
  };
}

/**
 * Today in detail (from now until sunset, hour by hour, with the recommended hours),
 * then one summary per day. Once the sun is down, "today" becomes tomorrow.
 */
export async function getSurfOutlook(days = 7, now = new Date()): Promise<{ focus?: SurfDay; next: SurfDay[] }> {
  const [waves, weather] = await Promise.all([fetchSwell(now), fetchMetForecast()]);
  if (!waves.length) return { next: [] };

  const today = localDay(now).getTime();
  const nowHour = localHourOf(now.getTime());
  const out: SurfDay[] = [];
  const todayDay = buildDay(today, true, nowHour, waves, weather);
  if (todayDay) out.push(todayDay);
  for (let i = 1; out.length < days + 1 && i <= days + 1; i++) {
    const d = buildDay(today + i * DAY_MS, false, 0, waves, weather);
    if (!d) break;
    out.push(d);
  }
  const [focus, ...next] = out;
  return { focus, next: next.slice(0, days - 1) };
}
