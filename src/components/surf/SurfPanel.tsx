import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import MobileMore from "@/components/outlook/MobileMore";
import { formatTime, formatWeekday } from "@/lib/sky";
import { getSurfOutlook, SURFLINE_URL, type SurfDay, type SurfRating } from "@/lib/surf";

const RATING_DOTS: Record<SurfRating, number> = { excellent: 4, good: 3, fair: 2, poor: 1 };

function WaveArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M8 84 C30 84 40 62 52 44 C66 23 92 14 112 22 C128 28 134 44 126 56 C120 65 107 66 101 58 C96 51 101 42 109 43 C104 35 90 34 80 42 C66 53 64 74 74 84 Z"
      />
      <g fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.6">
        <path d="M74 84 C92 82 108 84 152 84" opacity="0.7" />
        <path d="M14 95 C28 91 42 91 56 95 C68 99 80 99 92 95 C106 91 120 91 134 95 C138 96 142 96 146 95" opacity="0.45" />
        <path d="M26 105 C40 102 54 102 68 105 M92 105 C106 102 120 102 134 105" opacity="0.25" />
      </g>
      <g fill="white" opacity="0.8">
        <circle cx="122" cy="30" r="1.4" />
        <circle cx="130" cy="38" r="1" />
        <circle cx="134" cy="47" r="0.8" />
      </g>
    </svg>
  );
}

export default async function SurfPanel({ lang, t }: { lang: Locale; t: Dictionary }) {
  const u = t.surf;
  const { focus, next } = await getSurfOutlook(7);
  const bestDay = next.reduce<SurfDay | undefined>((a, d) => (!a || RATING_DOTS[d.rating] > RATING_DOTS[a.rating] ? d : a), undefined);

  const fmt = (n: number) => n.toLocaleString(lang === "es" ? "es-MX" : "en-US", { maximumFractionDigits: 1 });
  const feet = (m: number) => Math.round(m * 3.28);
  const dirName = (d: keyof typeof t.sky.directions) => {
    const x = t.sky.directions[d].replace(/^el /, "");
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  const capital = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  const dayLabel = (d: SurfDay) => (d.isToday ? u.today : d === focus ? u.tomorrow : capital(formatWeekday(d.date, lang)));
  // Local hour → "4 p.m." / "4 PM", using the same clock format as the sky panel
  const hourLabel = (h: number, short = false) => {
    const label = formatTime(new Date(Date.UTC(2026, 0, 1, h + 7)), lang).replace(":00", "");
    return short ? label.replace(/\s?(a\.?\s?m\.?|p\.?\s?m\.?|AM|PM)$/i, "") : label;
  };
  const windowLabel = (w: { from: number; to: number }) => `${hourLabel(w.from)} – ${hourLabel(w.to)}`;
  const dots = (rating: SurfRating) => (
    <span className="flex gap-0.5 sm:gap-1" role="img" aria-label={u.ratings[rating]} title={u.ratings[rating]}>
      {[1, 2, 3, 4].map((d) => (
        <span key={d} className={`h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5 ${d <= RATING_DOTS[rating] ? "bg-moon" : "bg-white/20"}`} />
      ))}
    </span>
  );

  const surfline = (
    <a
      href={SURFLINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold transition-colors hover:bg-white/10"
    >
      {u.surfline}
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </a>
  );

  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold md:text-4xl">{u.title}</h3>
        <p className="mt-3 hidden text-lg text-white/75 md:block">{u.intro}</p>
      </div>

      {focus ? (
        <>
          {/* Today (or tomorrow once the sun is down), front and center */}
          <div className="mt-6 grid gap-6 md:mt-14 md:gap-12 lg:grid-cols-12 lg:items-center">
            <div className="flex items-center gap-5 md:gap-6 lg:col-span-5">
              <WaveArt className="w-24 shrink-0 text-moon md:w-44" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">{dayLabel(focus)}</p>
                <p className="font-display text-2xl font-bold text-moon md:text-3xl">{u.sizes[focus.size]}</p>
                <p className="mt-1 font-semibold">
                  {fmt(focus.faceM[0])}–{fmt(focus.faceM[1])} m{" "}
                  <span className="font-normal text-white/60">
                    ({feet(focus.faceM[0])}–{feet(focus.faceM[1])} ft)
                  </span>
                </p>
                <p className="mt-1 text-sm text-white/75 md:text-base">{u.levels[focus.size]}</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="rounded-2xl bg-moon px-4 py-3 font-display text-lg font-bold text-night md:text-xl">
                {focus.best ? u.bestToday(windowLabel(focus.best)) : u.noGoodWindow}
                {focus.best && focus.windKmh !== undefined && (
                  <span className="block text-sm font-semibold text-night/70">
                    {u.wind} {focus.windKmh} km/h · {u.windQuality[focus.windKmh < 12 ? "clean" : focus.windKmh < 22 ? "fair" : "choppy"]}
                  </span>
                )}
              </p>
              <dl className="mt-5 grid grid-cols-3 gap-x-4 gap-y-3 md:gap-x-8">
                <div>
                  <dt className="text-xs text-white/60 md:text-sm">{u.swell}</dt>
                  <dd className="mt-0.5 text-sm font-semibold md:text-base">
                    {fmt(focus.swellM)} m · {focus.periodS} s
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-white/60 md:text-sm">{u.from}</dt>
                  <dd className="mt-0.5 text-sm font-semibold md:text-base">{dirName(focus.direction)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/60 md:text-sm">{u.ratingLabel}</dt>
                  <dd className="mt-1.5">{dots(focus.rating)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Hour by hour until sunset; recommended hours highlighted */}
          <div className="mt-8 md:mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="text-lg font-bold md:text-xl">{u.hourlyTitle(dayLabel(focus))}</h4>
              <p className="text-xs text-white/60 md:text-sm">{u.hourlyHint}</p>
            </div>
            <ol className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12 sm:gap-2">
              {focus.hours.map((h) => (
                <li
                  key={h.hour}
                  className={`flex flex-col items-center gap-1 rounded-xl px-0.5 py-2.5 text-center ${
                    h.recommended ? "bg-moon/15 ring-1 ring-moon" : "bg-white/5"
                  }`}
                >
                  <span className="text-[11px] font-semibold text-white/80 sm:text-xs">{hourLabel(h.hour)}</span>
                  <span className="font-display text-base font-bold">{fmt((h.faceM[0] + h.faceM[1]) / 2)}</span>
                  <span className="-mt-1 text-[10px] text-white/60">m</span>
                  <span className="text-[10px] text-white/60 sm:text-[11px]">{h.windKmh ?? "—"} km/h</span>
                  {h.recommended && <span className="sr-only">{u.recommended}</span>}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {surfline}
            <Link
              href={localePath(lang, "/activities")}
              className="inline-flex min-h-11 items-center rounded-full bg-adobe px-5 text-sm font-semibold text-white transition-colors hover:bg-[#a83e23]"
            >
              {u.lessons}
            </Link>
          </div>

          {next.length > 0 && (
            <div className="mt-8 border-t border-white/15 pt-6 md:mt-16 md:pt-12">
              <h4 className="text-lg font-bold md:text-2xl">{u.daysTitle}</h4>
              <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">{u.daysIntro}</p>
              <ol className="mt-4 grid grid-cols-6 gap-1 sm:gap-3 md:mt-6">
                {next.map((d) => {
                  const isBest = d === bestDay;
                  return (
                    <li
                      key={d.date}
                      className={`flex flex-col items-center gap-1 rounded-xl px-0.5 py-3 text-center sm:gap-1.5 sm:rounded-2xl sm:px-2 sm:py-4 ${
                        isBest ? "bg-white/10 ring-1 ring-moon/60" : ""
                      }`}
                    >
                      <span className="text-[11px] font-semibold leading-tight text-white/80 sm:text-sm">{dayLabel(d)}</span>
                      <span className="font-display text-sm font-bold sm:text-lg">
                        {fmt(d.faceM[0])}–{fmt(d.faceM[1])}
                      </span>
                      <span className="-mt-1 text-[11px] text-white/60">m</span>
                      {dots(d.rating)}
                      <span className="text-[10px] leading-tight text-white/70 sm:text-xs">
                        {d.best ? `${hourLabel(d.best.from, true)}–${hourLabel(d.best.to)}` : "—"}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {bestDay && (
                <p className="mt-4 text-sm font-semibold md:mt-5 md:text-base">
                  {u.bestDay(dayLabel(bestDay))}{" "}
                  <span className="font-normal text-white/70">
                    · {u.sizes[bestDay.size]}
                    {bestDay.best ? `, ${windowLabel(bestDay.best)}` : ""}
                  </span>
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 md:mt-10">
          <p className="text-white/75">{u.noForecast}</p>
          <div className="mt-6">{surfline}</div>
        </div>
      )}

      <MobileMore title={u.guideTitle} className="mt-8 border-t border-white/15 pt-4 md:mt-16 md:pt-12">
        <ul className="mt-4 grid gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {u.guide.map((g) => (
            <li key={g.title}>
              <p className="font-display text-lg font-bold text-moon">{g.title}</p>
              <p className="mt-2 leading-relaxed text-white/80">{g.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-white/45 md:mt-10">{u.source}</p>
      </MobileMore>
    </div>
  );
}
