import { HOTEL } from "./constants";

/** Hourly weather at the hotel from MET Norway (free, needs a User-Agent), cached for an hour. */
export type MetPoint = { t: number; wind: number; rain: number }; // wind m/s, rain mm in the next hour

export async function fetchMetForecast(): Promise<MetPoint[]> {
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

// --- local mornings --------------------------------------------------------

export const TZ_OFFSET_H = -7; // Baja California Sur, UTC-7 all year (America/Mazatlan)
export const DAY_MS = 86_400_000;
export const MORNING = { from: 7, to: 11 }; // local hours, usually the calmest part of the day

/** Local calendar date at the hotel, as a UTC-midnight Date (handy for day math). */
export function localDay(now: Date): Date {
  const local = new Date(now.getTime() + TZ_OFFSET_H * 3600_000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()));
}

/** The next `days` mornings (today's if it isn't over yet), as UTC time windows. */
export function nextMornings(days: number, now = new Date()) {
  const localHour = new Date(now.getTime() + TZ_OFFSET_H * 3600_000).getUTCHours();
  const first = localDay(now).getTime() + (localHour >= MORNING.to ? DAY_MS : 0);
  return Array.from({ length: days }, (_, i) => {
    const day = first + i * DAY_MS;
    return {
      date: new Date(day).toISOString().slice(0, 10),
      from: day + (MORNING.from - TZ_OFFSET_H) * 3600_000,
      to: day + (MORNING.to - TZ_OFFSET_H) * 3600_000,
    };
  });
}

export const average = (xs: number[]) => xs.reduce((a, x) => a + x, 0) / xs.length;
