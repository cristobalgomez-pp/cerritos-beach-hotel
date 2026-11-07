import { average, DAY_MS, fetchMetForecast, localDay, nextMornings } from "./met";

/**
 * Humpback whales off Cerritos Beach: where we are in the season, and how good the next
 * mornings look for spotting them from the rooftop (calm sea = blows and breaches are easy to see).
 * There is no live whale-sighting feed, so the "forecast" is season + sea conditions, never a promise.
 */

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
  const points = await fetchMetForecast();
  if (!points.length) return [];
  const mornings: WhaleMorning[] = [];
  for (const m of nextMornings(days, now)) {
    const inside = points.filter((p) => p.t >= m.from && p.t <= m.to);
    if (!inside.length) break; // forecast doesn't reach this far
    const windKmh = Math.round(average(inside.map((p) => p.wind)) * 3.6);
    const rain = inside.some((p) => p.rain >= 0.5);
    mornings.push({ date: m.date, windKmh, rain, rating: rate(windKmh, rain) });
  }
  return mornings;
}

// --- which whales (and friends) you can see from Cerritos ------------------

export type SpeciesKey = "humpback" | "gray" | "blue" | "dolphins" | "orca";
export type SpeciesLevel = "common" | "sometimes" | "rare";

export interface Species {
  key: SpeciesKey;
  months: number[]; // 1–12, when they're around this coast
  level: SpeciesLevel; // how likely you are to see them from shore in those months
}

export const SPECIES: Species[] = [
  { key: "humpback", months: [12, 1, 2, 3, 4], level: "common" },
  { key: "gray", months: [1, 2, 3], level: "sometimes" },
  { key: "dolphins", months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], level: "common" },
  { key: "blue", months: [1, 2, 3, 4], level: "rare" },
  { key: "orca", months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], level: "rare" },
];
