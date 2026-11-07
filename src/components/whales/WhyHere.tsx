import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SEA_POINTS, seaTemperature } from "@/lib/sea";
import { MIGRATION_BY_MONTH, MIGRATION_ORDER, type MigrationPhase } from "@/lib/whales";

const PHASE_COLOR: Record<MigrationPhase, string> = {
  here: "bg-moon",
  back: "bg-moon/45",
  north: "bg-[#7cc4e8]",
  south: "bg-moon/45",
};

/** Stylized route: cold feeding waters up north → warm calving waters here, along the California Current */
function RouteArt({ north, south, labels }: { north?: number; south?: number; labels: { alaska: string; cerritos: string; current: string } }) {
  return (
    <svg viewBox="0 0 220 260" className="h-auto w-full max-w-[220px]" role="img" aria-label={`${labels.alaska} → ${labels.cerritos}`}>
      <defs>
        <linearGradient id="route-temp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc4e8" />
          <stop offset="1" stopColor="#e0864e" />
        </linearGradient>
      </defs>
      <path
        d="M70 18 C95 30 120 34 150 30 C160 60 158 90 166 120 C172 150 168 175 176 200 C180 215 186 228 196 240"
        fill="none"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path d="M138 70 C142 110 146 150 158 190" fill="none" stroke="#7cc4e8" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" />
      <text x="112" y="132" fill="#7cc4e8" fillOpacity="0.8" fontSize="8" transform="rotate(78 112 132)">
        {labels.current}
      </text>
      <path
        d="M78 46 C100 90 122 140 150 186 C160 202 168 214 178 226"
        fill="none"
        stroke="url(#route-temp)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path d="M172 216 L179 227 L166 224" fill="none" stroke="#e0864e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="74" cy="40" r="5" fill="#7cc4e8" />
      <text x="20" y="28" fill="white" fontSize="11" fontWeight="700">
        {labels.alaska}
      </text>
      {north !== undefined && (
        <text x="20" y="62" fill="#7cc4e8" fontSize="18" fontWeight="800">
          {north}°C
        </text>
      )}
      <circle cx="182" cy="232" r="5" fill="#e0864e" />
      <text x="100" y="246" fill="white" fontSize="11" fontWeight="700" textAnchor="end">
        {labels.cerritos}
      </text>
      {south !== undefined && (
        <text x="100" y="226" fill="#e0864e" fontSize="18" fontWeight="800" textAnchor="end">
          {south}°C
        </text>
      )}
    </svg>
  );
}

/**
 * "Why do they come here?" — folded by default. The summary already says where the humpbacks are right now
 * and today's sea temperatures; inside: the route, their year month by month, and each stage explained.
 */
export default async function WhyHere({ lang, t, month }: { lang: Locale; t: Dictionary; month: number }) {
  const y = t.whales.why;
  const [north, south] = await Promise.all([seaTemperature(SEA_POINTS.alaska), seaTemperature(SEA_POINTS.cerritos)]);
  const phaseNow = MIGRATION_BY_MONTH[month];
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { month: "short", timeZone: "UTC" })
      .format(new Date(Date.UTC(2026, i, 1)))
      .replace(".", "")
      .slice(0, 3)
  );

  return (
    <details className="group mt-8 rounded-2xl bg-white/5 ring-1 ring-white/10 md:mt-14">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 md:p-6 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold md:text-xl">{y.title}</span>
          <span className="mt-1 block text-sm font-semibold text-moon">{y.now[phaseNow]}</span>
          {north !== undefined && south !== undefined && (
            <span className="mt-0.5 block text-sm text-white/65">{y.temps(north, south)}</span>
          )}
        </span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-white/60 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-white/10 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex items-center gap-4 md:col-span-4 md:flex-col md:items-start">
            <div className="w-32 shrink-0 md:w-full">
              <RouteArt north={north} south={south} labels={{ alaska: y.alaska, cerritos: y.cerritos, current: y.current }} />
            </div>
            {north !== undefined && south !== undefined && <p className="text-sm leading-relaxed text-white/70">{y.tempNote(north, south)}</p>}
          </div>

          <div className="md:col-span-8">
            {/* Their year as a strip of 12 months, colored by where they are */}
            <p className="text-sm font-semibold text-white/80">{y.yearTitle}</p>
            <ol className="mt-3 grid grid-cols-12 gap-0.5" aria-label={y.yearTitle}>
              {monthNames.map((name, i) => {
                const phase = MIGRATION_BY_MONTH[i + 1];
                const current = i + 1 === month;
                return (
                  <li key={i} className="flex flex-col items-center gap-1.5">
                    <span
                      className={`h-3 w-full ${PHASE_COLOR[phase]} ${i === 0 ? "rounded-l-full" : ""} ${i === 11 ? "rounded-r-full" : ""} ${
                        current ? "ring-2 ring-white ring-offset-2 ring-offset-night" : ""
                      }`}
                    />
                    <span className={`text-[10px] sm:text-xs ${current ? "font-bold text-white" : "text-white/55"}`}>{name}</span>
                    <span className="sr-only">{y.phases[phase].label}</span>
                  </li>
                );
              })}
            </ol>

            {/* The four stages, in the order they happen from here */}
            <ul className="mt-6 space-y-4">
              {MIGRATION_ORDER.map((phase) => {
                const p = y.phases[phase];
                const isNow = phase === phaseNow;
                return (
                  <li key={phase} className={`flex gap-3 rounded-xl p-3 ${isNow ? "bg-white/10 ring-1 ring-moon/50" : ""}`}>
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${PHASE_COLOR[phase]}`} aria-hidden="true" />
                    <div>
                      <p className="font-semibold">
                        {p.label} <span className="font-normal text-white/60">· {p.months}</span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">{p.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs text-white/45">{y.source}</p>
          </div>
        </div>
      </div>
    </details>
  );
}
