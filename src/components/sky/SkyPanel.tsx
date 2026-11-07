import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatTime, formatWeekday, getSkyOutlook, type Rating } from "@/lib/sky";
import MoonPhase from "./MoonPhase";
import TonightList from "./TonightList";

const RATING_DOTS: Record<Rating, number> = { excellent: 4, good: 3, fair: 2, poor: 1 };

export default async function SkyPanel({ lang, t }: { lang: Locale; t: Dictionary }) {
  const nights = await getSkyOutlook(7);
  const tonight = nights[0];
  const s = t.sky;
  const best = nights.reduce((a, n) => (n.score > a.score ? n : a), nights[0]);
  const facts: [string, string][] = [
    [s.dark, formatTime(tonight.darkStart, lang)],
    [s.clouds, tonight.clouds === undefined ? s.cloudsUnknown : `${tonight.clouds}%`],
    [s.moonlessShort, `${tonight.moonlessDarkHours.toFixed(1).replace(".0", "")} h`],
  ];

  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold md:text-4xl">{s.title}</h3>
        <p className="mt-3 hidden text-lg text-white/75 md:block">{s.intro}</p>
      </div>

      {/* Tonight at a glance: one band (moon · key facts · the week) */}
      <div className="mt-6 grid gap-6 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="flex items-center gap-5 lg:col-span-4">
          <MoonPhase
            illumination={tonight.moonIllumination}
            waxing={tonight.moonWaxing}
            size={120}
            className="h-20 w-20 shrink-0 drop-shadow-[0_0_40px_rgba(243,227,179,0.25)] md:h-24 md:w-24"
            label={s.phases[tonight.moonPhase]}
          />
          <div>
            <p className="font-display text-2xl font-bold text-moon">{s.ratings[tonight.rating]}</p>
            <p className="mt-1 text-white/70">
              {s.phases[tonight.moonPhase]} · {Math.round(tonight.moonIllumination * 100)}% {s.lit}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-x-4 border-t border-white/15 pt-5 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {facts.map(([k, v]) => (
            <div key={k} className="lg:col-span-3 lg:flex lg:items-baseline lg:justify-between lg:gap-3 lg:py-1">
              <dt className="text-xs text-white/60 md:text-sm">{k}</dt>
              <dd className="mt-0.5 font-semibold lg:mt-0">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8">
          <h4 className="text-sm font-semibold text-white/80">{s.weekTitle}</h4>
          <ol className="mt-3 grid grid-cols-7 gap-1">
            {nights.map((n, i) => {
              const isBest = n.date === best.date;
              return (
                <li
                  key={n.date}
                  className={`flex flex-col items-center gap-1.5 rounded-xl px-0.5 py-2.5 text-center ${
                    isBest ? "bg-white/10 ring-1 ring-moon/60" : ""
                  }`}
                >
                  <span className="text-[11px] font-semibold leading-tight text-white/80">
                    {i === 0 ? s.tonight : formatWeekday(n.date, lang)}
                  </span>
                  <MoonPhase illumination={n.moonIllumination} waxing={n.moonWaxing} size={28} className="h-6 w-6" />
                  <span className="flex gap-0.5" role="img" aria-label={s.ratings[n.rating]} title={s.ratings[n.rating]}>
                    {[1, 2, 3, 4].map((d) => (
                      <span key={d} className={`h-1 w-1 rounded-full ${d <= RATING_DOTS[n.rating] ? "bg-moon" : "bg-white/20"}`} />
                    ))}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* What to look for: full width, two columns on large screens; details on tap */}
      <div className="mt-8 md:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h4 className="text-lg font-bold md:text-xl">{s.lookTitle}</h4>
          <p className="text-sm text-white/60">{s.lookHint}</p>
        </div>
        <div className="mt-3">
          <TonightList night={tonight} lang={lang} t={t} />
        </div>
        <p className="mt-6 hidden text-xs text-white/45 md:block">{s.source}</p>
      </div>
    </div>
  );
}
