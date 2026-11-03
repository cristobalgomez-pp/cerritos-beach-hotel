import { HOTEL } from "@/lib/constants";

/**
 * Illustrated map of the southern tip of Baja California Sur.
 * Coordinates are real (lon/lat) and projected to the SVG; the coastline is simplified.
 */

type LonLat = [number, number];

// Bounds of the drawing
const WEST = -111.15;
const EAST = -109.3;
const NORTH = 24.5;
const SOUTH = 22.75;
const W = 560;
const H = Math.round((W * (NORTH - SOUTH)) / ((EAST - WEST) * Math.cos((23.6 * Math.PI) / 180)));

const project = ([lon, lat]: LonLat): [number, number] => [
  ((lon - WEST) / (EAST - WEST)) * W,
  ((NORTH - lat) / (NORTH - SOUTH)) * H,
];

// Simplified peninsula outline (clockwise from the Pacific side)
const COAST: LonLat[] = [
  [-111.15, 24.5],
  [-111.15, 24.36],
  [-110.9, 24.17],
  [-110.66, 23.94],
  [-110.45, 23.7],
  [-110.29, 23.5],
  [-110.235, 23.43],
  [-110.19, 23.33],
  [-110.1, 23.17],
  [-109.98, 23.0],
  [-109.91, 22.88],
  [-109.82, 22.92],
  [-109.7, 23.03],
  [-109.47, 23.17],
  [-109.42, 23.4],
  [-109.47, 23.58],
  [-109.65, 23.75],
  [-109.85, 23.95],
  [-110.05, 24.08],
  [-110.29, 24.14],
  [-110.42, 24.2],
  [-110.36, 24.27],
  [-110.31, 24.34],
  [-110.38, 24.42],
  [-110.32, 24.5],
];

export const TRIP_COORDS: Record<string, LonLat> = {
  "todos-santos": [-110.225, 23.447],
  "las-palmas": [-110.232, 23.405],
  cabo: [-109.912, 22.89],
  balandra: [-110.327, 24.322],
};

// Which side each label goes, so nearby places don't collide
const LABEL_SIDE: Record<string, "left" | "right"> = {
  "todos-santos": "right",
  "las-palmas": "left",
  cabo: "right",
  balandra: "right",
};

export interface TripPin {
  id: string;
  title: string;
  time: string;
  number: number;
}

export default function TripsMap({
  trips,
  labels,
}: {
  trips: TripPin[];
  labels: { map: string; hotel: string; pacific: string; cortez: string };
}) {
  const coast = COAST.map((p) => project(p).join(",")).join(" ");
  const hotel = project([HOTEL.coordinates.lng, HOTEL.coordinates.lat]);
  const laPaz = project([-110.31, 24.142]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={labels.map} className="h-auto w-full">
      <rect width={W} height={H} rx="24" className="fill-pacific" />
      <polygon points={coast} className="fill-sand" />

      <text x={40} y={H * 0.72} className="fill-white/60 font-display text-[15px] font-semibold" style={{ letterSpacing: "0.02em" }}>
        {labels.pacific}
      </text>
      <text x={W - 40} y={H * 0.3} textAnchor="end" className="fill-white/60 font-display text-[15px] font-semibold">
        {labels.cortez}
      </text>

      {/* La Paz as a quiet reference point */}
      <circle cx={laPaz[0]} cy={laPaz[1]} r={3} className="fill-ink/40" />
      <text x={laPaz[0] + 8} y={laPaz[1] + 4} className="fill-ink/50 text-[12px]">
        La Paz
      </text>

      {trips.map((trip) => {
        const coords = TRIP_COORDS[trip.id];
        if (!coords) return null;
        const [x, y] = project(coords);
        const side = LABEL_SIDE[trip.id] ?? "right";
        const dx = side === "right" ? 16 : -16;
        return (
          <g key={trip.id}>
            <circle cx={x} cy={y} r={11} className="fill-adobe stroke-sand" strokeWidth={2} />
            <text x={x} y={y + 4} textAnchor="middle" className="fill-white text-[12px] font-bold">
              {trip.number}
            </text>
            <text
              x={x + dx}
              y={y - 2}
              textAnchor={side === "right" ? "start" : "end"}
              className={`text-[13px] font-semibold ${side === "left" ? "fill-white" : "fill-ink"}`}
            >
              {trip.title}
            </text>
            <text
              x={x + dx}
              y={y + 13}
              textAnchor={side === "right" ? "start" : "end"}
              className={`text-[12px] ${side === "left" ? "fill-white/75" : "fill-ink/60"}`}
            >
              {trip.time}
            </text>
          </g>
        );
      })}

      {/* The hotel */}
      <g>
        <circle cx={hotel[0]} cy={hotel[1]} r={14} className="fill-night stroke-moon" strokeWidth={2} />
        <path
          transform={`translate(${hotel[0] - 7} ${hotel[1] - 7}) scale(0.44)`}
          d="M20.5 3.2A13 13 0 1 0 28.8 22 11 11 0 0 1 20.5 3.2Z"
          className="fill-moon"
        />
        <text x={hotel[0] - 20} y={hotel[1] + 5} textAnchor="end" className="fill-white font-display text-[14px] font-bold">
          {labels.hotel}
        </text>
      </g>
    </svg>
  );
}
