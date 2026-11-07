import * as Astronomy from "astronomy-engine";
import * as SunCalc from "suncalc";
import { HOTEL } from "./constants";
import { SKY_TIMEZONE, type Night } from "./sky";

/**
 * What you can see from Desert Moon: planets tonight, the next meteor shower,
 * and seasonal highlights that are special at this latitude (23° N).
 */

const OBSERVER = new Astronomy.Observer(HOTEL.coordinates.lat, HOTEL.coordinates.lng, 20);
const STEP_MIN = 10;
const MIN_ALT = 10; // degrees above the horizon to be comfortably visible
const DAY_MS = 86_400_000;

export type PlanetKey = "mercury" | "venus" | "mars" | "jupiter" | "saturn";
export type Compass = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export interface PlanetSighting {
  key: PlanetKey;
  start: Date;
  end: Date;
  best: Date;
  direction: Compass;
  magnitude: number;
}

const PLANETS: { key: PlanetKey; body: Astronomy.Body; maxMag: number }[] = [
  { key: "venus", body: Astronomy.Body.Venus, maxMag: 5 },
  { key: "jupiter", body: Astronomy.Body.Jupiter, maxMag: 5 },
  { key: "mars", body: Astronomy.Body.Mars, maxMag: 2 },
  { key: "saturn", body: Astronomy.Body.Saturn, maxMag: 2 },
  // Mercury hugs the twilight; only list it when it's bright
  { key: "mercury", body: Astronomy.Body.Mercury, maxMag: 0.5 },
];

const compass = (az: number): Compass => (["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const)[Math.round(az / 45) % 8];

function altAz(body: Astronomy.Body, t: Date) {
  const eq = Astronomy.Equator(body, t, OBSERVER, true, true);
  return Astronomy.Horizon(t, OBSERVER, eq.ra, eq.dec, "normal");
}

/** Planets above 10° while the sky is dark enough to see them (sun below −8°), between this sunset and the next sunrise */
export function visiblePlanets(night: Night): PlanetSighting[] {
  const from = night.sunset.getTime();
  const to = night.darkEnd.getTime() + 60 * 60_000;
  const times: Date[] = [];
  for (let t = from; t <= to; t += STEP_MIN * 60_000) times.push(new Date(t));
  const darkEnough = times.map((t) => altAz(Astronomy.Body.Sun, t).altitude < -8);

  const result: PlanetSighting[] = [];
  for (const p of PLANETS) {
    let start: Date | undefined;
    let end: Date | undefined;
    let best: { t: Date; alt: number; az: number } | undefined;
    times.forEach((t, i) => {
      if (!darkEnough[i]) return;
      const h = altAz(p.body, t);
      if (h.altitude < MIN_ALT) return;
      start ??= t;
      end = t;
      if (!best || h.altitude > best.alt) best = { t, alt: h.altitude, az: h.azimuth };
    });
    if (!start || !end || !best || end.getTime() - start.getTime() < 30 * 60_000) continue;
    const magnitude = Astronomy.Illumination(p.body, best.t).mag;
    if (magnitude > p.maxMag) continue;
    result.push({ key: p.key, start, end, best: best.t, direction: compass(best.az), magnitude });
  }
  return result.sort((a, b) => a.magnitude - b.magnitude);
}

// --- Meteor showers --------------------------------------------------------

export type ShowerKey = "quadrantids" | "lyrids" | "etaAquariids" | "perseids" | "orionids" | "leonids" | "geminids";

// Typical peak night (local evening date) and rate under a perfectly dark sky
const SHOWERS: { key: ShowerKey; month: number; day: number; perHour: number }[] = [
  { key: "quadrantids", month: 1, day: 3, perHour: 80 },
  { key: "lyrids", month: 4, day: 22, perHour: 18 },
  { key: "etaAquariids", month: 5, day: 5, perHour: 40 },
  { key: "perseids", month: 8, day: 12, perHour: 100 },
  { key: "orionids", month: 10, day: 21, perHour: 20 },
  { key: "leonids", month: 11, day: 17, perHour: 15 },
  { key: "geminids", month: 12, day: 13, perHour: 120 },
];

export interface ShowerOutlook {
  key: ShowerKey;
  peak: Date; // local noon of the peak evening
  daysAway: number;
  perHour: number;
  moonIllumination: number; // 0–1 on the peak night
}

function localDate(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: SKY_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

export function nextMeteorShower(now = new Date()): ShowerOutlook {
  const today = new Date(`${localDate(now)}T12:00:00-07:00`).getTime();
  const year = Number(localDate(now).slice(0, 4));
  const candidates = [year, year + 1].flatMap((y) =>
    SHOWERS.map((s) => ({ ...s, peak: new Date(`${y}-${String(s.month).padStart(2, "0")}-${String(s.day).padStart(2, "0")}T12:00:00-07:00`) }))
  );
  const next = candidates.filter((c) => c.peak.getTime() >= today).sort((a, b) => a.peak.getTime() - b.peak.getTime())[0];
  // Moon around 1 a.m. of the peak night, when meteor rates climb
  const moon = SunCalc.getMoonIllumination(new Date(next.peak.getTime() + 13 * 3600_000));
  return {
    key: next.key,
    peak: next.peak,
    daysAway: Math.round((next.peak.getTime() - today) / DAY_MS),
    perHour: next.perHour,
    moonIllumination: moon.fraction,
  };
}

// --- Seasonal highlights ---------------------------------------------------

export type HighlightKey = "canopus" | "southernCross" | "milkyWaySeason" | "andromeda" | "orion";

// Months (1–12) when each highlight applies
const HIGHLIGHTS: { key: HighlightKey; months: number[] }[] = [
  { key: "orion", months: [11, 12, 1, 2, 3] },
  { key: "canopus", months: [12, 1, 2, 3] },
  { key: "southernCross", months: [3, 4, 5, 6] },
  { key: "milkyWaySeason", months: [5, 6, 7, 8, 9] },
  { key: "andromeda", months: [9, 10, 11, 12] },
];

export function seasonalHighlights(now = new Date()): HighlightKey[] {
  const month = Number(localDate(now).slice(5, 7));
  return HIGHLIGHTS.filter((h) => h.months.includes(month)).map((h) => h.key);
}
