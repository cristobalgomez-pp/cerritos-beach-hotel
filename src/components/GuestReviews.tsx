import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { GOOGLE_REVIEWS_URL, REVIEW_SUMMARY, REVIEWS } from "@/lib/reviews";

const STAR = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

/** Row of 5 stars; `value` can be fractional (4.3 fills 4 and a third) */
function Stars({ value, className = "h-5 w-5", label }: { value: number; className?: string; label: string }) {
  return (
    <span className="relative inline-flex" role="img" aria-label={label} title={label}>
      <span className="flex gap-0.5 text-ink/15">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path d={STAR} fill="currentColor" />
          </svg>
        ))}
      </span>
      <span className="absolute inset-0 flex gap-0.5 overflow-hidden text-[#e0a526]" style={{ width: `${(value / 5) * 100}%` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
            <path d={STAR} fill="currentColor" />
          </svg>
        ))}
      </span>
    </span>
  );
}

export default function GuestReviews({ lang, t }: { lang: Locale; t: Dictionary }) {
  const r = t.reviews;
  const { rating, total, byStars } = REVIEW_SUMMARY;
  const topShare = Math.round(((byStars[0] + byStars[1]) / total) * 10);
  const max = Math.max(...byStars);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-labelledby="reviews-title">
      <div className="max-w-2xl">
        <h2 id="reviews-title" className="text-4xl font-bold md:text-5xl">
          {r.title}
        </h2>
        <p className="mt-4 text-lg text-ink/75">{r.intro}</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Google summary */}
        <div className="rounded-3xl bg-sand p-6 md:p-8 lg:col-span-4 lg:self-start">
          <div className="flex items-end gap-4">
            <p className="font-display text-6xl font-extrabold leading-none tracking-tight md:text-7xl">
              {rating.toLocaleString(lang === "es" ? "es-MX" : "en-US", { minimumFractionDigits: 1 })}
            </p>
            <div className="pb-1">
              <Stars value={rating} label={r.starsLabel(rating)} />
              <p className="mt-1 text-sm text-ink/70">{r.basedOn(total)}</p>
            </div>
          </div>

          <ul className="mt-6 hidden space-y-1.5 sm:block" aria-label={r.breakdown}>
            {byStars.map((count, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-3 text-right font-semibold text-ink/70">{5 - i}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <span className="block h-full rounded-full bg-[#e0a526]" style={{ width: `${(count / max) * 100}%` }} />
                </span>
                <span className="w-7 text-right tabular-nums text-ink/60">{count}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-display text-lg font-bold leading-snug sm:mt-6 sm:text-xl">{r.share(topShare)}</p>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/25 sm:mt-6 px-5 text-sm font-semibold transition-colors hover:bg-white"
          >
            {r.readAll}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        {/* Guest quotes */}
        <div className="lg:col-span-8">
          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {REVIEWS.map((rev, i) => (
              <li
                key={rev.name}
                className={`flex-col justify-between gap-6 rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(29,35,43,0.06)] ring-1 ring-ink/5 ${
                  i >= 4 ? "hidden sm:flex" : "flex"
                }`}
              >
                <figure className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <Stars value={rev.stars} className="h-4 w-4" label={r.starsLabel(rev.stars)} />
                      <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-ink/75">{r.topics[rev.topic]}</span>
                    </div>
                    <blockquote lang="en" className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight">
                      “{rev.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-adobe font-display text-sm font-bold uppercase text-white"
                      aria-hidden="true"
                    >
                      {rev.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{rev.name}</span>
                      <span className="block text-xs text-ink/60">{r.onSource(rev.source, rev.year)}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/60">{r.note}</p>
        </div>
      </div>
    </section>
  );
}
