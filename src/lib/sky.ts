import * as SunCalc from "suncalc";
import { HOTEL } from "./constants";

/**
 * Night-sky outlook for Cerritos Beach: moon, darkness, Milky Way core and clouds.
 * Astronomy is computed locally (suncalc); cloud cover comes from MET Norway
 * (free, commercial use allowed with attribution).
 */

export const SKY_TIMEZONE = "America/Mazatlan"; // Baja California Sur, UTC-7 all year
const { lat: LAT, lng: LNG } = HOTEL.coordinates;
const SAMPLE_MIN = 15;

export type MoonPhase =
  | "new"
  | "waxingCrescent"
  | "firstQuarter"
  | "waxingGibbous"
  | "full"
  | "waningGibbous"
  | "lastQuarter"
  | "waningCrescent";

export type Rating = "excellent" | "good" | "fair" | "poor";

export interface Night {
  /** Local calendar date of the evening, e.g. "2026-11-02" */
  date: string;
  sunset: Date;
  darkStart: Date; // astronomical dusk
  darkEnd: Date; // astronomical dawn
  moonPhase: MoonPhase;
  moonPhaseValue: number; // 0 new → 0.5 full → 1 new
  moonIllumination: number; // 0–1
  moonWaxing: boolean;
  moonrise?: Date;
  moonset?: Date;
  /** Dark hours with the moon below the horizon (or too thin to matter) */
  moonlessDarkHours: number;
  darkHours: number;
  /** Window when the Milky Way core is >10° high in a dark, moonless sky */
  milkyWay?: { start: Date; end: Date };
  /** Average cloud cover (%) during darkness, if the forecast covers this night */
  clouds?: number;
  score: number; // 0–100
  rating: Rating;
}

// --- helpers ---------------------------------------------------------------

const DAY_MS = 86_400_000;
const rad = Math.PI / 180;

function localParts(d: Date) {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: SKY_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => p.find((x) => x.type === t)!.value;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) };
}

/** Noon (local) of a local calendar date, as a Date */
const localNoon = (date: string) => new Date(`${date}T12:00:00-07:00`);

function phaseName(p: number): MoonPhase {
  const names: MoonPhase[] = [
    "new",
    "waxingCrescent",
    "firstQuarter",
    "waxingGibbous",
    "full",
    "waningGibbous",
    "lastQuarter",
    "waningCrescent",
  ];
  return names[Math.floor(((p + 1 / 16) % 1) * 8)];
}

/** Altitude (degrees) of the Milky Way core (Sgr A*: RA 266.4°, Dec −29.0°) */
function galacticCoreAltitude(t: Date) {
  const d = (t.getTime() - Date.UTC(2000, 0, 1, 12)) / DAY_MS;
  const gmst = (280.46061837 + 360.98564736629 * d) % 360;
  const ha = (gmst + LNG - 266.4 + 720) % 360;
  const dec = -29.0;
  const sinAlt = Math.sin(LAT * rad) * Math.sin(dec * rad) + Math.cos(LAT * rad) * Math.cos(dec * rad) * Math.cos(ha * rad);
  return Math.asin(sinAlt) / rad;
}

function rate(score: number): Rating {
  if (score >= 75) return "excellent";
  if (score >= 55) return "good";
  if (score >= 35) return "fair";
  return "poor";
}

// --- clouds (MET Norway) ---------------------------------------------------

type CloudPoint = { t: number; cloud: number };

async function fetchClouds(): Promise<CloudPoint[]> {
  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT.toFixed(4)}&lon=${LNG.toFixed(4)}`,
      {
        headers: { "User-Agent": "DesertMoonHotel/1.0 cerritosbeachhotel.com info@desertmoonhotel.com" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.properties?.timeseries ?? []).map(
      (s: { time: string; data: { instant: { details: { cloud_area_fraction: number } } } }) => ({
        t: new Date(s.time).getTime(),
        cloud: s.data.instant.details.cloud_area_fraction,
      })
    );
  } catch {
    return [];
  }
}

function averageClouds(points: CloudPoint[], start: Date, end: Date): number | undefined {
  if (!points.length) return undefined;
  const last = points[points.length - 1].t;
  if (start.getTime() > last) return undefined; // forecast doesn't reach this night
  const inside = points.filter((p) => p.t >= start.getTime() - 3 * 3600_000 && p.t <= end.getTime());
  if (!inside.length) return undefined;
  return Math.round(inside.reduce((a, p) => a + p.cloud, 0) / inside.length);
}

// --- main ------------------------------------------------------------------

function computeNight(date: string, clouds: CloudPoint[]): Night {
  const noon = localNoon(date);
  const today = SunCalc.getTimes(noon, LAT, LNG);
  const tomorrow = SunCalc.getTimes(new Date(noon.getTime() + DAY_MS), LAT, LNG);
  // At this latitude the sun always sets and the sky always gets fully dark, so these are never null
  const sunset = today.sunset!;
  const darkStart = today.night!;
  const darkEnd = tomorrow.nightEnd!;

  const mid = new Date((darkStart.getTime() + darkEnd.getTime()) / 2);
  const illum = SunCalc.getMoonIllumination(mid);
  const moonToday = SunCalc.getMoonTimes(noon, LAT, LNG);
  const moonTomorrow = SunCalc.getMoonTimes(new Date(noon.getTime() + DAY_MS), LAT, LNG);
  // Next rise/set after sunset
  const after = (d?: Date) => (d && d.getTime() >= sunset.getTime() - 3600_000 ? d : undefined);
  const moonrise = after(moonToday.rise) ?? moonTomorrow.rise;
  const moonset = after(moonToday.set) ?? moonTomorrow.set;

  let darkMin = 0;
  let moonlessMin = 0;
  let mwStart: Date | undefined;
  let mwEnd: Date | undefined;
  for (let t = darkStart.getTime(); t < darkEnd.getTime(); t += SAMPLE_MIN * 60_000) {
    const at = new Date(t);
    darkMin += SAMPLE_MIN;
    const moonAlt = SunCalc.getMoonPosition(at, LAT, LNG).altitude / rad;
    const moonless = moonAlt < 0 || illum.fraction < 0.1;
    if (moonless) moonlessMin += SAMPLE_MIN;
    if (moonless && galacticCoreAltitude(at) > 10) {
      mwStart ??= at;
      mwEnd = new Date(t + SAMPLE_MIN * 60_000);
    }
  }

  const darkHours = darkMin / 60;
  const moonlessDarkHours = moonlessMin / 60;
  const cloud = averageClouds(clouds, darkStart, darkEnd);
  const darkness = darkHours ? moonlessDarkHours / darkHours : 0;
  const clear = cloud === undefined ? 0.75 : 1 - cloud / 100;
  // Moonless darkness and clear skies matter equally; a bright moon still leaves some value
  const score = Math.round(100 * (0.55 * darkness + 0.45 * clear) * (0.85 + 0.15 * (1 - illum.fraction)));

  return {
    date,
    sunset,
    darkStart,
    darkEnd,
    moonPhase: phaseName(illum.phase),
    moonPhaseValue: illum.phase,
    moonIllumination: illum.fraction,
    moonWaxing: illum.phase < 0.5,
    moonrise,
    moonset,
    moonlessDarkHours,
    darkHours,
    milkyWay: mwStart && mwEnd && mwEnd.getTime() - mwStart.getTime() >= 30 * 60_000 ? { start: mwStart, end: mwEnd } : undefined,
    clouds: cloud,
    score,
    rating: rate(score),
  };
}

/** Tonight plus the next nights (7 by default). "Tonight" stays the current night until dawn. */
export async function getSkyOutlook(nights = 7, now = new Date()): Promise<Night[]> {
  const clouds = await fetchClouds();
  const { date, hour } = localParts(now);
  const startNoon = localNoon(date).getTime() - (hour < 6 ? DAY_MS : 0);
  return Array.from({ length: nights }, (_, i) => {
    const d = localParts(new Date(startNoon + i * DAY_MS)).date;
    return computeNight(d, clouds);
  });
}

export function formatTime(d: Date | undefined, lang: string) {
  if (!d) return "—";
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    timeZone: SKY_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function formatWeekday(date: string, lang: string) {
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    timeZone: SKY_TIMEZONE,
    weekday: "short",
    day: "numeric",
  }).format(localNoon(date));
}
