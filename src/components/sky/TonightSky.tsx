import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatTime, formatWeekday, getSkyOutlook, type Rating } from "@/lib/sky";
import MoonPhase from "./MoonPhase";

const RATING_DOTS: Record<Rating, number> = { excellent: 4, good: 3, fair: 2, poor: 1 };

// Fixed pseudo-random star field (same on every render)
const STARS = Array.from({ length: 70 }, (_, i) => {
  const x = (i * 73.13) % 100;
  const y = (i * 37.71 + (i % 7) * 11) % 100;
  const r = i % 9 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.6;
  return { x, y, r, o: 0.25 + ((i * 17) % 50) / 100 };
});

export default async function TonightSky({ lang, t }: { lang: Locale; t: Dictionary }) {
  const nights = await getSkyOutlook(7);
  const tonight = nights[0];
  const s = t.sky;
  const best = nights.reduce((a, n) => (n.score > a.score ? n : a), nights[0]);

  const rows: [string, string][] = [
    [s.sunset, formatTime(tonight.sunset, lang)],
    [s.dark, formatTime(tonight.darkStart, lang)],
    [s.moonrise, formatTime(tonight.moonrise, lang)],
    [s.moonset, formatTime(tonight.moonset, lang)],
    [s.clouds, tonight.clouds === undefined ? s.cloudsUnknown : `${tonight.clouds}%`],
    [
      s.milkyWay,
      tonight.milkyWay
        ? `${formatTime(tonight.milkyWay.start, lang)} – ${formatTime(tonight.milkyWay.end, lang)}`
        : s.milkyWayNo,
    ],
  ];

  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="sky-title">
      <svg className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        {STARS.map((st, i) => (
          <circle key={i} cx={st.x} cy={st.y} r={st.r * 0.12} fill="white" opacity={st.o} />
        ))}
      </svg>

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <h2 id="sky-title" className="text-4xl font-bold md:text-5xl">
            {s.title}
          </h2>
          <p className="mt-4 text-lg text-white/75">{s.intro}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="flex items-center gap-8 lg:col-span-5">
            <MoonPhase
              illumination={tonight.moonIllumination}
              waxing={tonight.moonWaxing}
              size={168}
              className="shrink-0 drop-shadow-[0_0_40px_rgba(243,227,179,0.25)]"
              label={s.phases[tonight.moonPhase]}
            />
            <div>
              <p className="font-display text-3xl font-bold text-moon">{s.phases[tonight.moonPhase]}</p>
              <p className="mt-1 text-white/70">
                {Math.round(tonight.moonIllumination * 100)}% {s.lit}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-display text-2xl font-bold">{s.ratings[tonight.rating]}</p>
            <p className="mt-1 text-white/70">{s.moonlessHours(tonight.moonlessDarkHours.toFixed(1).replace(".0", ""))}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-3">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-white/60">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold">{s.weekTitle}</h3>
          <ol className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-7">
            {nights.map((n, i) => {
              const isBest = n.date === best.date;
              return (
                <li
                  key={n.date}
                  className={`flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center ${
                    isBest ? "bg-white/10 ring-1 ring-moon/60" : ""
                  }`}
                >
                  <span className="text-sm font-semibold text-white/80">
                    {i === 0 ? s.tonight : formatWeekday(n.date, lang)}
                  </span>
                  <MoonPhase illumination={n.moonIllumination} waxing={n.moonWaxing} size={36} />
                  <span className="flex gap-1" aria-label={s.ratings[n.rating]} title={s.ratings[n.rating]}>
                    {[1, 2, 3, 4].map((d) => (
                      <span
                        key={d}
                        className={`h-1.5 w-1.5 rounded-full ${d <= RATING_DOTS[n.rating] ? "bg-moon" : "bg-white/20"}`}
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-xs text-white/45">{s.source}</p>
        </div>
      </div>
    </section>
  );
}
