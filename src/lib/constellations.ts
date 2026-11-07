import * as Astronomy from "astronomy-engine";
import { HOTEL } from "./constants";
import type { Night } from "./sky";
import type { Compass } from "./sky-sights";

/**
 * A short list of constellations that are easy to spot from Cerritos (23° N), with their main stars
 * (J2000 right ascension in hours, declination in degrees, magnitude) and the lines between them.
 * Each night we pick the ones that sit best in the evening sky.
 */

export type ConstellationKey =
  | "orion"
  | "taurus"
  | "canisMajor"
  | "gemini"
  | "leo"
  | "bigDipper"
  | "bootes"
  | "crux"
  | "scorpius"
  | "sagittarius"
  | "summerTriangle"
  | "pegasus"
  | "cassiopeia";

type Star = [ra: number, dec: number, mag: number];

export interface ConstellationDef {
  key: ConstellationKey;
  stars: Star[];
  lines: [number, number][];
  /** Which star marks "where it is" for visibility (default: the middle of all stars) */
  anchor?: number;
  /** Small bonus for the ones most worth pointing out */
  weight?: number;
  /** Low on the southern horizon from here: shown when it's up at all (it's a rare treat this far north) */
  southern?: boolean;
  /** Extra object to mark (e.g. the Andromeda galaxy) */
  deepSky?: [ra: number, dec: number];
}

export const CONSTELLATIONS: ConstellationDef[] = [
  {
    key: "orion",
    weight: 1.15,
    stars: [
      [5.919, 7.41, 0.5], // 0 Betelgeuse
      [5.419, 6.35, 1.6], // 1 Bellatrix
      [5.679, -1.94, 1.8], // 2 Alnitak
      [5.603, -1.2, 1.7], // 3 Alnilam
      [5.533, -0.3, 2.2], // 4 Mintaka
      [5.796, -9.67, 2.1], // 5 Saiph
      [5.242, -8.2, 0.1], // 6 Rigel
      [5.585, 9.93, 3.4], // 7 Meissa
    ],
    lines: [[7, 0], [7, 1], [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
    anchor: 3,
  },
  {
    key: "taurus",
    weight: 1.1,
    stars: [
      [4.599, 16.51, 0.9], // 0 Aldebaran
      [5.438, 28.61, 1.6], // 1 Elnath
      [5.627, 21.14, 3.0], // 2 Zeta Tauri
      [4.33, 15.63, 3.6], // 3 Gamma
      [4.382, 17.54, 3.8], // 4 Delta
      [4.477, 19.18, 3.5], // 5 Epsilon
      [4.478, 15.87, 3.4], // 6 Theta
      [3.791, 24.11, 2.9], // 7 Alcyone (Pleiades)
      [3.819, 24.05, 3.6], // 8 Atlas
      [3.748, 24.11, 3.7], // 9 Electra
      [3.763, 24.37, 3.9], // 10 Maia
      [3.772, 23.95, 4.2], // 11 Merope
      [3.754, 24.47, 4.3], // 12 Taygeta
    ],
    lines: [[3, 4], [4, 5], [5, 1], [3, 6], [6, 0], [0, 2]],
    anchor: 7,
  },
  {
    key: "canisMajor",
    weight: 1.1,
    stars: [
      [6.752, -16.72, -1.46], // 0 Sirius
      [6.378, -17.96, 2.0], // 1 Mirzam
      [6.977, -28.97, 1.5], // 2 Adhara
      [7.14, -26.39, 1.8], // 3 Wezen
      [7.402, -29.3, 2.4], // 4 Aludra
      [7.062, -15.63, 4.1], // 5 Muliphein
    ],
    lines: [[1, 0], [0, 5], [0, 3], [3, 2], [3, 4]],
    anchor: 0,
  },
  {
    key: "gemini",
    weight: 0.95,
    stars: [
      [7.577, 31.89, 1.6], // 0 Castor
      [7.755, 28.03, 1.1], // 1 Pollux
      [6.629, 16.4, 1.9], // 2 Alhena
      [6.732, 25.13, 3.0], // 3 Mebsuta
      [7.335, 21.98, 3.5], // 4 Wasat
      [6.383, 22.51, 2.9], // 5 Tejat
    ],
    lines: [[0, 1], [0, 3], [3, 5], [1, 4], [4, 2]],
  },
  {
    key: "leo",
    stars: [
      [10.139, 11.97, 1.4], // 0 Regulus
      [10.122, 16.76, 3.5], // 1 Eta
      [10.333, 19.84, 2.0], // 2 Algieba
      [10.278, 23.42, 3.4], // 3 Adhafera
      [9.764, 23.77, 3.0], // 4 Epsilon
      [11.235, 20.52, 2.6], // 5 Zosma
      [11.818, 14.57, 2.1], // 6 Denebola
      [11.237, 15.43, 3.3], // 7 Chertan
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [7, 0]],
  },
  {
    key: "bigDipper",
    stars: [
      [11.062, 61.75, 1.8], // 0 Dubhe
      [11.031, 56.38, 2.4], // 1 Merak
      [11.897, 53.69, 2.4], // 2 Phecda
      [12.257, 57.03, 3.3], // 3 Megrez
      [12.9, 55.96, 1.8], // 4 Alioth
      [13.399, 54.93, 2.2], // 5 Mizar
      [13.792, 49.31, 1.9], // 6 Alkaid
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    key: "bootes",
    stars: [
      [14.261, 19.18, -0.05], // 0 Arcturus
      [14.75, 27.07, 2.4], // 1 Izar
      [15.258, 33.31, 3.5], // 2 Delta
      [15.032, 40.39, 3.5], // 3 Nekkar
      [14.535, 38.31, 3.0], // 4 Seginus
      [13.911, 18.4, 2.7], // 5 Muphrid
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5]],
    anchor: 0,
  },
  {
    key: "crux",
    southern: true,
    stars: [
      [12.443, -63.1, 0.8], // 0 Acrux
      [12.795, -59.69, 1.3], // 1 Mimosa
      [12.519, -57.11, 1.6], // 2 Gacrux
      [12.252, -58.75, 2.8], // 3 Delta Crucis
    ],
    lines: [[2, 0], [1, 3]],
    anchor: 2,
  },
  {
    key: "scorpius",
    weight: 1.4,
    stars: [
      [16.091, -19.81, 2.6], // 0 Graffias
      [16.006, -22.62, 2.3], // 1 Dschubba
      [15.981, -26.11, 2.9], // 2 Pi
      [16.49, -26.43, 1.0], // 3 Antares
      [16.598, -28.22, 2.8], // 4 Tau
      [16.836, -34.29, 2.3], // 5 Epsilon
      [16.864, -38.05, 3.0], // 6 Mu
      [16.91, -42.36, 3.6], // 7 Zeta
      [17.203, -43.24, 3.3], // 8 Eta
      [17.622, -43.0, 1.9], // 9 Sargas
      [17.793, -40.13, 3.0], // 10 Iota
      [17.708, -39.03, 2.4], // 11 Kappa
      [17.56, -37.1, 1.6], // 12 Shaula
      [17.513, -37.3, 2.7], // 13 Lesath
    ],
    lines: [[0, 1], [2, 1], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13]],
    anchor: 3,
  },
  {
    key: "sagittarius",
    weight: 1.45,
    stars: [
      [18.403, -34.38, 1.8], // 0 Kaus Australis
      [18.35, -29.83, 2.7], // 1 Kaus Media
      [18.466, -25.42, 2.8], // 2 Kaus Borealis
      [18.921, -26.3, 2.1], // 3 Nunki
      [19.044, -29.88, 2.6], // 4 Ascella
      [19.116, -27.67, 3.3], // 5 Tau
      [18.761, -26.99, 3.2], // 6 Phi
      [18.097, -30.42, 3.0], // 7 Alnasl
    ],
    lines: [[7, 1], [1, 0], [7, 0], [1, 2], [2, 6], [1, 6], [6, 3], [3, 5], [5, 4], [4, 6], [4, 0]],
  },
  {
    key: "summerTriangle",
    weight: 1.05,
    stars: [
      [18.616, 38.78, 0.0], // 0 Vega
      [20.69, 45.28, 1.3], // 1 Deneb
      [19.846, 8.87, 0.8], // 2 Altair
      [20.37, 40.26, 2.2], // 3 Sadr
      [19.512, 27.96, 3.1], // 4 Albireo
      [20.77, 33.97, 2.5], // 5 Gienah
      [19.75, 45.13, 2.9], // 6 Delta Cygni
    ],
    lines: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [6, 3], [3, 5]],
  },
  {
    key: "pegasus",
    weight: 1.05,
    stars: [
      [23.079, 15.21, 2.5], // 0 Markab
      [23.063, 28.08, 2.4], // 1 Scheat
      [24.14, 29.09, 2.1], // 2 Alpheratz (RA past 24h to keep the shape continuous)
      [24.22, 15.18, 2.8], // 3 Algenib
      [24.656, 30.86, 3.3], // 4 Delta Andromedae
      [25.162, 35.62, 2.1], // 5 Mirach
      [26.065, 42.33, 2.1], // 6 Almach
      [24.946, 38.5, 3.9], // 7 Mu Andromedae
      [22.691, 10.83, 3.4], // 8 Homam
      [21.736, 9.88, 2.4], // 9 Enif
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 6], [5, 7], [0, 8], [8, 9]],
    deepSky: [24.712, 41.27], // Andromeda galaxy (M31)
  },
  {
    key: "cassiopeia",
    stars: [
      [0.153, 59.15, 2.3], // 0 Caph
      [0.675, 56.54, 2.2], // 1 Schedar
      [0.945, 60.72, 2.2], // 2 Gamma
      [1.43, 60.24, 2.7], // 3 Ruchbah
      [1.907, 63.67, 3.4], // 4 Segin
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
];

// --- where and when tonight ------------------------------------------------

const OBSERVER = new Astronomy.Observer(HOTEL.coordinates.lat, HOTEL.coordinates.lng, 20);
const COMPASS: Compass[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const toCompass = (az: number) => COMPASS[Math.round(az / 45) % 8];

export type Height = "low" | "mid" | "high" | "overhead";

export interface ConstellationTonight {
  key: ConstellationKey;
  /** When it's a good time to look (it's already up at dusk if this equals dusk) */
  from: Date;
  fromDusk: boolean;
  direction: Compass;
  height: Height;
  southern: boolean;
}

function center(def: ConstellationDef): [number, number] {
  if (def.anchor !== undefined) return [def.stars[def.anchor][0], def.stars[def.anchor][1]];
  const ra = def.stars.reduce((a, s) => a + s[0], 0) / def.stars.length;
  const dec = def.stars.reduce((a, s) => a + s[1], 0) / def.stars.length;
  return [ra, dec];
}

function altAz(t: Date, raH: number, dec: number) {
  const h = Astronomy.Horizon(t, OBSERVER, ((raH % 24) + 24) % 24, dec, "normal");
  return { alt: h.altitude, az: h.azimuth };
}

const heightOf = (alt: number): Height => (alt < 25 ? "low" : alt < 50 ? "mid" : alt < 72 ? "high" : "overhead");

/**
 * The best constellations for the evening (from dusk until about 4 hours later, when most people are out).
 * Picks the highest ones, with a small nudge for the classics, and always includes the Southern Cross when it's up.
 */
export function constellationsTonight(night: Night, count = 3): ConstellationTonight[] {
  const start = night.darkStart.getTime() - 30 * 60_000; // late twilight is fine for bright stars
  const steps = Array.from({ length: 10 }, (_, i) => new Date(start + i * 30 * 60_000));

  const scored = CONSTELLATIONS.map((def) => {
    const [ra, dec] = center(def);
    const track = steps.map((t) => ({ t, ...altAz(t, ra, dec) }));
    const best = track.reduce((a, b) => (b.alt > a.alt ? b : a));
    const threshold = def.southern ? 4 : 30;
    const firstGood = track.find((p) => p.alt >= threshold);
    if (!firstGood) return null;
    // Point people to the moment it's best placed, but no later than needed
    const when = def.southern ? best : firstGood.alt >= 45 ? firstGood : best;
    // Anything above 60° is equally easy to see, so low southern classics (Sirius, the Teapot) get a fair chance
    const score = def.southern ? 1000 : Math.min(best.alt, 60) * (def.weight ?? 1);
    return {
      score,
      result: {
        key: def.key,
        from: when.t,
        fromDusk: when.t.getTime() === steps[0].getTime(),
        direction: toCompass(when.az),
        height: heightOf(when.alt),
        southern: !!def.southern,
      } satisfies ConstellationTonight,
    };
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.result);
}

// --- drawing ---------------------------------------------------------------

export interface ConstellationShape {
  stars: { x: number; y: number; r: number }[];
  lines: [number, number][];
  deepSky?: { x: number; y: number };
}

/** Flat projection of the stars into a 100×100 box (east to the left, as seen when facing it). */
export function shapeOf(def: ConstellationDef): ConstellationShape {
  const ra0 = def.stars.reduce((a, s) => a + s[0], 0) / def.stars.length;
  const dec0 = def.stars.reduce((a, s) => a + s[1], 0) / def.stars.length;
  const k = Math.cos((dec0 * Math.PI) / 180);
  const project = (ra: number, dec: number) => ({ x: -(ra - ra0) * 15 * k, y: -(dec - dec0) });
  const pts = def.stars.map(([ra, dec]) => project(ra, dec));
  const deep = def.deepSky ? project(def.deepSky[0], def.deepSky[1]) : undefined;

  const all = deep ? [...pts, deep] : pts;
  const minX = Math.min(...all.map((p) => p.x));
  const maxX = Math.max(...all.map((p) => p.x));
  const minY = Math.min(...all.map((p) => p.y));
  const maxY = Math.max(...all.map((p) => p.y));
  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const pad = 12;
  const scale = (100 - pad * 2) / span;
  const offX = pad + (100 - pad * 2 - (maxX - minX) * scale) / 2;
  const offY = pad + (100 - pad * 2 - (maxY - minY) * scale) / 2;
  const fit = (p: { x: number; y: number }) => ({ x: offX + (p.x - minX) * scale, y: offY + (p.y - minY) * scale });

  return {
    stars: pts.map((p, i) => ({ ...fit(p), r: Math.max(0.9, 3.4 - def.stars[i][2] * 0.6) })),
    lines: def.lines,
    deepSky: deep ? fit(deep) : undefined,
  };
}
