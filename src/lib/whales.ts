import { HOTEL } from "./constants";

/**
 * Humpback whales off Cerritos Beach: where we are in the season, and how good the next
 * mornings look for spotting them from the rooftop (calm sea = blows and breaches are easy to see).
 * There is no live whale-sighting feed, so the "forecast" is season + sea conditions, never a promise.
 */

const TZ_OFFSET_H = -7; // Baja California Sur, UTC-7 all year (America/Mazatlan)
const DAY_MS = 86_400_000;
const MORNING = { from: 7, to: 11 }; // local hours, usually the calmest part of the day

// How often humpbacks are seen off this coast, by month (Jan … Dec), 0–1
export const MONTH_ACTIVITY = [1, 1, 0.85, 0.45, 0.05, 0, 0, 0, 0, 0, 0.05, 0.5];
const SEASON_START = { month: 12, day: 15 };
const SEASON_END = { month: 4, day: 15 };

export type WhaleRating = "excellent" | "good" | "fair" | "poor";

export interface SeasonStatus {
  inSeason: boolean;
  peak: boolean; // January – March
  month: number; // 1–12, local
  daysUntilStart: number; // 0 while in season
  daysUntilEnd: number; // 0 out of season
}

export interface WhaleMorning {
  date: string; // YYYY-MM-DD, local
  windKmh: number;
  rain: boolean;
  rating: WhaleRating;
}

/** Local calendar date at the hotel, as a UTC-midnight Date (handy for day math). */
function localDay(now: Date): Date {
  const local = new Date(now.getTime() + TZ_OFFSET_H * 3600_000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function seasonStatus(now = new Date()): SeasonStatus {
  const today = localDay(now);
  const y = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();

  const inSeason =
    (month === SEASON_START.month && day >= SEASON_START.day) ||
    month < SEASON_END.month ||
    (month === SEASON_END.month && day <= SEASON_END.day);

  const start = new Date(Date.UTC(y, SEASON_START.month - 1, SEASON_START.day));
  const endYear = month === 12 ? y + 1 : y;
  const end = new Date(Date.UTC(endYear, SEASON_END.month - 1, SEASON_END.day));

  return {
    inSeason,
    peak: month >= 1 && month <= 3,
    month,
    daysUntilStart: inSeason ? 0 : daysBetween(today, start),
    daysUntilEnd: inSeason ? daysBetween(today, end) : 0,
  };
}

// --- sea conditions (MET Norway, same feed as the sky section) ---------------

type Point = { t: number; wind: number; rain: number };

async function fetchForecast(): Promise<Point[]> {
  try {
    const { lat, lng } = HOTEL.coordinates;
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(4)}&lon=${lng.toFixed(4)}`,
      {
        headers: { "User-Agent": "DesertMoonHotel/1.0 cerritosbeachhotel.com info@desertmoonhotel.com" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    type Step = {
      time: string;
      data: {
        instant: { details: { wind_speed?: number } };
        next_1_hours?: { details?: { precipitation_amount?: number } };
      };
    };
    return (json?.properties?.timeseries ?? []).map((s: Step) => ({
      t: new Date(s.time).getTime(),
      wind: s.data.instant.details.wind_speed ?? 0,
      rain: s.data.next_1_hours?.details?.precipitation_amount ?? 0,
    }));
  } catch {
    return [];
  }
}

function rate(windKmh: number, rain: boolean): WhaleRating {
  let score = windKmh < 12 ? 90 : windKmh < 20 ? 70 : windKmh < 28 ? 45 : 20;
  if (rain) score -= 30;
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  return "poor";
}

/** Morning sea conditions for the next days (starting tomorrow once this morning is over). */
export async function getWhaleMornings(days = 7, now = new Date()): Promise<WhaleMorning[]> {
  const points = await fetchForecast();
  if (!points.length) return [];

  const localHour = new Date(now.getTime() + TZ_OFFSET_H * 3600_000).getUTCHours();
  const first = new Date(localDay(now).getTime() + (localHour >= MORNING.to ? DAY_MS : 0));

  const mornings: WhaleMorning[] = [];
  for (let i = 0; i < days; i++) {
    const day = new Date(first.getTime() + i * DAY_MS);
    const from = day.getTime() + (MORNING.from - TZ_OFFSET_H) * 3600_000;
    const to = day.getTime() + (MORNING.to - TZ_OFFSET_H) * 3600_000;
    const inside = points.filter((p) => p.t >= from && p.t <= to);
    if (!inside.length) break; // forecast doesn't reach this far
    const windKmh = Math.round((inside.reduce((a, p) => a + p.wind, 0) / inside.length) * 3.6);
    const rain = inside.some((p) => p.rain >= 0.5);
    mornings.push({ date: day.toISOString().slice(0, 10), windKmh, rain, rating: rate(windKmh, rain) });
  }
  return mornings;
}
