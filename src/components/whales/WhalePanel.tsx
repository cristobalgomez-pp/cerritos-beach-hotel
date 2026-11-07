import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import DetailRow, { DetailList } from "@/components/outlook/DetailRow";
import MobileMore from "@/components/outlook/MobileMore";
import WhyHere from "./WhyHere";
import { formatWeekday } from "@/lib/sky";
import { getWhaleMornings, MONTH_ACTIVITY, seasonStatus, SPECIES, type SpeciesKey, type WhaleRating } from "@/lib/whales";

const RATING_DOTS: Record<WhaleRating, number> = { excellent: 4, good: 3, fair: 2, poor: 1 };

// Dev-only: WHALE_PREVIEW_DATE=2027-02-10 shows the in-season layout any time of year
function previewNow(): Date {
  const preview = process.env.NODE_ENV !== "production" ? process.env.WHALE_PREVIEW_DATE : undefined;
  return preview ? new Date(`${preview}T16:00:00Z`) : new Date();
}

function Fluke({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label={label} className={className}>
      <path
        fill="currentColor"
        d="M66 86 C70 76 73 68 74 60 C66 59 54 56 43 50 C33 44 26 37 22 27 C27 31 33 33 38 33 C42 36 46 36 50 36 C55 39 60 40 64 41 C70 43 75 46 80 50 C85 46 90 43 96 41 C100 40 105 39 110 36 C114 36 118 36 122 33 C127 33 133 31 138 27 C134 37 127 44 117 50 C106 56 94 59 86 60 C87 68 90 76 94 86 Z"
      />
      <g fill="white" opacity="0.85">
        <circle cx="26" cy="40" r="1.5" />
        <circle cx="29" cy="50" r="1.1" />
        <circle cx="25" cy="59" r="0.9" />
        <circle cx="31" cy="66" r="0.7" />
        <circle cx="134" cy="40" r="1.5" />
        <circle cx="131" cy="51" r="1.1" />
        <circle cx="135" cy="60" r="0.9" />
        <circle cx="129" cy="67" r="0.7" />
      </g>
      <g fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.6">
        <path d="M44 87 C52 83 60 83 66 86 M94 86 C100 83 108 83 116 87" opacity="0.7" />
        <path d="M14 96 C28 92 42 92 56 96 C68 99 80 99 92 96 C106 92 120 92 134 96 C138 97 142 97 146 96" opacity="0.45" />
        <path d="M26 105 C40 102 54 102 68 105 M92 105 C106 102 120 102 134 105" opacity="0.25" />
      </g>
    </svg>
  );
}

function SpeciesIcon({ k }: { k: SpeciesKey }) {
  if (k === "dolphins" || k === "orca") {
    // Dorsal fin over the water
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path
          d={k === "orca" ? "M8 17 C10 13 11 7 13 3 C13.5 8 15 13 18 17 Z" : "M7 17 C10 14 12 10 13 6 C14 10 16 14 19 17 Z"}
          fill="currentColor"
        />
        <path
          d="M3 18.5 C6 17.5 9 17.5 12 18.5 C15 19.5 18 19.5 21 18.5"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }
  // Tail fluke, bigger for the bigger whales
  const scale = k === "blue" ? 1 : k === "humpback" ? 0.9 : 0.8;
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <g transform={`translate(12 18) scale(${scale}) translate(-12 -18)`}>
        <path
          fill="currentColor"
          d="M10.4 18 C10.9 15.6 11.2 13.6 11.3 11.6 C9.2 11.2 6.5 10.3 4.6 8.6 C3.4 7.5 2.6 6.2 2.2 4.4 C3.5 5.2 5 5.5 6.4 5.6 C8.4 6.3 10.4 7.4 12 8.9 C13.6 7.4 15.6 6.3 17.6 5.6 C19 5.5 20.5 5.2 21.8 4.4 C21.4 6.2 20.6 7.5 19.4 8.6 C17.5 10.3 14.8 11.2 12.7 11.6 C12.8 13.6 13.1 15.6 13.6 18 Z"
        />
      </g>
      <path
        d="M3 19.5 C6 18.5 9 18.5 12 19.5 C15 20.5 18 20.5 21 19.5"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export default async function WhalePanel({ lang, t }: { lang: Locale; t: Dictionary }) {
  const w = t.whales;
  const now = previewNow();
  const season = seasonStatus(now);
  const mornings = season.inSeason ? await getWhaleMornings(7) : [];
  const best = mornings.reduce<(typeof mornings)[number] | undefined>(
    (a, m) => (!a || RATING_DOTS[m.rating] > RATING_DOTS[a.rating] || (m.rating === a.rating && m.windKmh < a.windKmh) ? m : a),
    undefined,
  );
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { month: "short", timeZone: "UTC" }).format(
      new Date(Date.UTC(2026, i, 1)),
    ),
  );

  const headline = season.inSeason ? (season.peak ? w.peak : w.inSeason) : w.startsIn(season.daysUntilStart);
  const subline = season.inSeason ? w.endsIn(season.daysUntilEnd) : w.seasonRange;

  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold md:text-4xl">{w.title}</h3>
        <p className="mt-3 hidden text-lg text-white/75 md:block">{w.intro}</p>
      </div>

      <div className="mt-6 grid gap-8 md:mt-14 md:gap-12 lg:grid-cols-12 lg:items-center">
        <div className="flex items-center gap-5 md:gap-6 lg:col-span-5">
          <Fluke label={w.illustration} className="w-24 shrink-0 text-moon md:w-44" />
          <div>
            <p className="font-display text-2xl font-bold text-moon md:text-3xl">{headline}</p>
            <p className="mt-1 text-sm text-white/75 md:text-base">{subline}</p>
          </div>
        </div>

        {/* Month-by-month chance of seeing them, with today marked */}
        <div className="lg:col-span-7">
          <h5 className="font-semibold text-white/85">{w.calendarTitle}</h5>
          <ol className="mt-5 grid grid-cols-12 items-end gap-1.5 sm:gap-2" aria-label={w.calendarTitle}>
            {MONTH_ACTIVITY.map((a, i) => {
              const current = i + 1 === season.month;
              return (
                <li key={i} className="flex flex-col items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide ${current ? "text-moon" : "text-transparent"}`}
                  >
                    {w.today}
                  </span>
                  <div className="flex h-16 w-full items-end md:h-24">
                    <div
                      className={`w-full rounded-t-md ${a >= 0.8 ? "bg-moon" : a >= 0.3 ? "bg-moon/50" : "bg-white/15"} ${
                        current ? "ring-2 ring-white ring-offset-2 ring-offset-night" : ""
                      }`}
                      style={{ height: `${Math.max(6, a * 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs ${current ? "font-bold text-white" : "text-white/60"}`}>
                    {monthNames[i].replace(".", "").slice(0, 3)}
                  </span>
                  <span className="sr-only">{a >= 0.8 ? w.levels.high : a >= 0.3 ? w.levels.some : w.levels.none}</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/65">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-moon" aria-hidden="true" /> {w.levels.high}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-moon/50" aria-hidden="true" /> {w.levels.some}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-white/15" aria-hidden="true" /> {w.levels.none}
            </span>
          </div>
        </div>
      </div>

      {/* Which species: one row each, details on tap */}
      <div className="mt-8 md:mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h4 className="text-lg font-bold md:text-xl">{w.species.title}</h4>
          <p className="text-sm text-white/60">{w.species.hint}</p>
        </div>
        <div className="mt-3">
          <DetailList
            rows={SPECIES.map((sp) => {
              const text = w.species.items[sp.key];
              const inSeasonNow = sp.months.includes(season.month) && sp.months.length < 12;
              return (
                <DetailRow
                  key={sp.key}
                  icon={<SpeciesIcon k={sp.key} />}
                  title={text.name}
                  meta={`${text.when} · ${w.species.levels[sp.level]}`}
                  badge={inSeasonNow ? w.species.now : undefined}
                >
                  <p>
                    <span className="font-semibold text-white">{w.species.size}: </span>
                    {text.size}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-white">{w.species.howTo}: </span>
                    {text.spot}
                  </p>
                  <p className="mt-2 text-white/70">
                    <span className="font-semibold text-moon/90">{w.species.fact}: </span>
                    {text.fact}
                  </p>
                </DetailRow>
              );
            })}
          />
        </div>
      </div>

      <WhyHere lang={lang} t={t} month={season.month} />

      {season.inSeason && (
        <div className="mt-8 border-t border-white/15 pt-6 md:mt-16 md:pt-12">
          <h4 className="text-lg font-bold md:text-2xl">{w.morningsTitle}</h4>
          <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">{w.morningsIntroShort}</p>
          {mornings.length ? (
            <ol className="mt-4 grid grid-cols-7 gap-1 sm:gap-3 md:mt-6">
              {mornings.map((m, i) => {
                const isBest = m.date === best?.date;
                return (
                  <li
                    key={m.date}
                    className={`flex flex-col items-center gap-1 rounded-xl px-0.5 py-3 text-center sm:gap-1.5 sm:rounded-2xl sm:px-2 sm:py-4 ${
                      isBest ? "bg-white/10 ring-1 ring-moon/60" : ""
                    }`}
                  >
                    <span className="text-[11px] font-semibold leading-tight text-white/80 sm:text-sm">
                      {i === 0 && m.date === new Date(now.getTime() - 7 * 3600_000).toISOString().slice(0, 10)
                        ? w.thisMorning
                        : formatWeekday(m.date, lang)}
                    </span>
                    <span className="font-display text-base font-bold sm:text-lg">{m.windKmh}</span>
                    <span className="-mt-1 text-[11px] text-white/60">km/h{m.rain ? ` · ${w.rain}` : ""}</span>
                    <span
                      className="flex gap-0.5 sm:gap-1"
                      role="img"
                      aria-label={w.ratings[m.rating]}
                      title={w.ratings[m.rating]}
                    >
                      {[1, 2, 3, 4].map((d) => (
                        <span
                          key={d}
                          className={`h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5 ${d <= RATING_DOTS[m.rating] ? "bg-moon" : "bg-white/20"}`}
                        />
                      ))}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="mt-6 text-white/70">{w.noForecast}</p>
          )}
          {best && (
            <p className="mt-4 text-sm font-semibold md:mt-5 md:text-base">
              {w.bestMorning(formatWeekday(best.date, lang))}{" "}
              <span className="font-normal text-white/70">· {w.ratings[best.rating]}</span>
            </p>
          )}
        </div>
      )}

      <MobileMore title={w.tipsTitle} className="mt-8 border-t border-white/15 pt-4 md:mt-16 md:pt-12">
        <ul className="mt-4 grid gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {w.tips.map((tip) => (
            <li key={tip.title}>
              <p className="font-display text-lg font-bold text-moon">{tip.title}</p>
              <p className="mt-2 leading-relaxed text-white/80">{tip.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-white/45 md:mt-10">{w.source}</p>
      </MobileMore>
    </div>
  );
}
