import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatTime, formatWeekday, getSkyOutlook, type Rating } from "@/lib/sky";
import { nextMeteorShower, seasonalHighlights, visiblePlanets } from "@/lib/sky-sights";
import MobileMore from "@/components/outlook/MobileMore";
import Constellations from "./Constellations";
import MoonPhase from "./MoonPhase";

const RATING_DOTS: Record<Rating, number> = { excellent: 4, good: 3, fair: 2, poor: 1 };

export default async function SkyPanel({ lang, t }: { lang: Locale; t: Dictionary }) {
  const nights = await getSkyOutlook(7);
  const tonight = nights[0];
  const s = t.sky;
  const best = nights.reduce((a, n) => (n.score > a.score ? n : a), nights[0]);
  const planets = visiblePlanets(tonight);
  const shower = nextMeteorShower();
  const highlights = seasonalHighlights();
  const brightness = (mag: number) =>
    mag < -1 ? s.brightness.veryBright : mag < 1 ? s.brightness.bright : s.brightness.visible;
  const showerMoon =
    shower.moonIllumination < 0.3 ? s.showerMoon.dark : shower.moonIllumination < 0.7 ? s.showerMoon.some : s.showerMoon.bright;
  const showerDate = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    timeZone: "America/Mazatlan",
    day: "numeric",
    month: "long",
  }).format(shower.peak);

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
    <div>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold md:text-4xl">{s.title}</h3>
        <p className="mt-3 hidden text-lg text-white/75 md:block">{s.intro}</p>
      </div>

      <div className="mt-6 grid gap-6 md:mt-14 md:gap-12 lg:grid-cols-12 lg:items-center">
        <div className="flex items-center gap-5 md:gap-8 lg:col-span-5">
          <MoonPhase
            illumination={tonight.moonIllumination}
            waxing={tonight.moonWaxing}
            size={168}
            className="h-20 w-20 shrink-0 drop-shadow-[0_0_40px_rgba(243,227,179,0.25)] md:h-[168px] md:w-[168px]"
            label={s.phases[tonight.moonPhase]}
          />
          <div>
            <p className="font-display text-2xl font-bold text-moon md:text-3xl">{s.phases[tonight.moonPhase]}</p>
            <p className="mt-1 text-white/70">
              {Math.round(tonight.moonIllumination * 100)}% {s.lit}
            </p>
            {/* On phones the night rating sits next to the moon */}
            <p className="mt-2 font-semibold lg:hidden">{s.ratings[tonight.rating]}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="hidden font-display text-2xl font-bold lg:block">{s.ratings[tonight.rating]}</p>
          <p className="mt-1 hidden text-white/70 md:block">{s.moonlessHours(tonight.moonlessDarkHours.toFixed(1).replace(".0", ""))}</p>
          <dl className="grid grid-cols-3 gap-x-4 gap-y-3 border-t border-white/15 pt-5 md:mt-6 md:gap-x-8 md:gap-y-4 md:pt-6">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-white/60 md:text-sm">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold md:text-base">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Constellations night={tonight} lang={lang} t={t} />

      <MobileMore title={s.seeTitle} className="mt-8 border-t border-white/15 pt-4 md:mt-20 md:pt-14">
        <div className="mt-4 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-12">
          <div>
            <h5 className="font-display text-lg font-bold text-moon">{s.planetsTitle}</h5>
            {planets.length ? (
              <ul className="mt-4 space-y-4">
                {planets.map((p) => (
                  <li key={p.key}>
                    <p className="font-semibold">
                      {s.planets[p.key]} <span className="font-normal text-white/60">· {brightness(p.magnitude)}</span>
                    </p>
                    <p className="text-sm text-white/70">
                      {formatTime(p.start, lang)} – {formatTime(p.end, lang)}
                    </p>
                    <p className="text-sm text-white/70">{s.planetLine(s.directions[p.direction], formatTime(p.best, lang))}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-white/70">{s.noPlanets}</p>
            )}
          </div>

          <div>
            <h5 className="font-display text-lg font-bold text-moon">{s.showerTitle}</h5>
            <p className="mt-4 font-display text-2xl font-bold">{s.showers[shower.key]}</p>
            <p className="mt-1 font-semibold">
              {s.showerWhen(shower.daysAway)} <span className="font-normal text-white/60">· {showerDate}</span>
            </p>
            <p className="mt-3 text-sm text-white/70">{s.showerRate(shower.perHour)}</p>
            <p className="mt-1 text-sm text-white/70">{showerMoon}</p>
          </div>

          <div>
            <h5 className="font-display text-lg font-bold text-moon">{s.seasonTitle}</h5>
            <ul className="mt-4 space-y-4">
              {highlights.map((h) => (
                <li key={h} className="leading-relaxed text-white/85">
                  {s.highlights[h]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MobileMore>

      <div className="mt-8 md:mt-16">
        <h4 className="text-lg font-bold md:text-xl">{s.weekTitle}</h4>
        <ol className="mt-4 grid grid-cols-7 gap-1 sm:gap-3 md:mt-6">
          {nights.map((n, i) => {
            const isBest = n.date === best.date;
            return (
              <li
                key={n.date}
                className={`flex flex-col items-center gap-2 rounded-xl px-0.5 py-3 text-center sm:rounded-2xl sm:px-2 sm:py-4 ${
                  isBest ? "bg-white/10 ring-1 ring-moon/60" : ""
                }`}
              >
                <span className="text-[11px] font-semibold leading-tight text-white/80 sm:text-sm">
                  {i === 0 ? s.tonight : formatWeekday(n.date, lang)}
                </span>
                <MoonPhase illumination={n.moonIllumination} waxing={n.moonWaxing} size={36} className="h-7 w-7 sm:h-9 sm:w-9" />
                <span className="flex gap-0.5 sm:gap-1" role="img" aria-label={s.ratings[n.rating]} title={s.ratings[n.rating]}>
                  {[1, 2, 3, 4].map((d) => (
                    <span
                      key={d}
                      className={`h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5 ${d <= RATING_DOTS[n.rating] ? "bg-moon" : "bg-white/20"}`}
                    />
                  ))}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 hidden text-xs text-white/45 md:block">{s.source}</p>
      </div>
    </div>
  );
}
