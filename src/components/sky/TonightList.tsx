import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { CONSTELLATIONS, constellationsTonight, shapeOf, type ConstellationKey } from "@/lib/constellations";
import { formatTime, type Night } from "@/lib/sky";
import { nextMeteorShower, visiblePlanets, type Compass } from "@/lib/sky-sights";

/** Small star drawing of a constellation (stars sized by brightness, joined by lines) */
function ConstellationDrawing({ k, label, className = "" }: { k: ConstellationKey; label?: string; className?: string }) {
  const def = CONSTELLATIONS.find((c) => c.key === k)!;
  const shape = shapeOf(def);
  return (
    <svg viewBox="0 0 100 100" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} className={className}>
      {shape.lines.map(([a, b], i) => (
        <line
          key={i}
          x1={shape.stars[a].x}
          y1={shape.stars[a].y}
          x2={shape.stars[b].x}
          y2={shape.stars[b].y}
          stroke="white"
          strokeOpacity={0.35}
          strokeWidth={label ? 0.6 : 1.4}
        />
      ))}
      {shape.deepSky && (
        <ellipse
          cx={shape.deepSky.x}
          cy={shape.deepSky.y}
          rx={4}
          ry={1.8}
          fill="white"
          opacity={0.35}
          transform={`rotate(-35 ${shape.deepSky.x} ${shape.deepSky.y})`}
        />
      )}
      {shape.stars.map((st, i) => (
        <circle key={i} cx={st.x} cy={st.y} r={label ? st.r : st.r * 1.6} className="fill-moon" />
      ))}
    </svg>
  );
}

function Row({ icon, title, meta, badge, children }: { icon: ReactNode; title: string; meta: string; badge?: string; children: ReactNode }) {
  return (
    <li>
      <details className="group border-b border-white/10 lg:border-t">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 [&::-webkit-details-marker]:hidden">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center text-moon">{icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold leading-tight">
              {title}
              {badge && <span className="ml-2 rounded-full bg-moon px-2 py-0.5 align-middle text-[10px] font-bold text-night">{badge}</span>}
            </span>
            <span className="block text-sm text-white/65">{meta}</span>
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
        <div className="pb-5 pl-12 pr-2 text-sm leading-relaxed text-white/80">{children}</div>
      </details>
    </li>
  );
}

/** "What to look for tonight": constellations, planets, the Milky Way core and the next meteor shower, one row each */
export default function TonightList({ night, lang, t }: { night: Night; lang: Locale; t: Dictionary }) {
  const s = t.sky;
  const c = t.constellations;
  // "el oriente" → "oriente", for the short line under each name
  const dir = (d: Compass) => s.directions[d].replace(/^(el|la) /, "");
  const constellations = constellationsTonight(night, 3);
  const planets = visiblePlanets(night);
  const shower = nextMeteorShower();
  const showerDate = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    timeZone: "America/Mazatlan",
    day: "numeric",
    month: "short",
  }).format(shower.peak);
  const showerMoon =
    shower.moonIllumination < 0.3 ? s.showerMoon.dark : shower.moonIllumination < 0.7 ? s.showerMoon.some : s.showerMoon.bright;
  const brightness = (mag: number) => (mag < -1 ? s.brightness.veryBright : mag < 1 ? s.brightness.bright : s.brightness.visible);

  return (
    <ul className="grid border-t border-white/10 lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:border-t-0">
      {constellations.map((item) => {
        const text = c.items[item.key];
        const when = item.fromDusk ? c.fromDusk : c.from(formatTime(item.from, lang));
        const where = item.height === "overhead" ? c.heights.overhead : dir(item.direction);
        return (
          <Row
            key={item.key}
            icon={<ConstellationDrawing k={item.key} className="h-9 w-9" />}
            title={text.name}
            meta={`${where} · ${when}`}
            badge={item.southern ? c.rare : undefined}
          >
            <div className="flex gap-4">
              <ConstellationDrawing k={item.key} label={c.drawing(text.name)} className="hidden w-28 shrink-0 sm:block" />
              <div>
                <p>
                  <span className="font-semibold text-white">{c.howTo}: </span>
                  {text.tip}
                </p>
                <p className="mt-2 text-white/70">
                  <span className="font-semibold text-moon/90">{c.story}: </span>
                  {text.story}
                </p>
              </div>
            </div>
          </Row>
        );
      })}

      {planets.map((p) => (
        <Row
          key={p.key}
          icon={<span className="h-3.5 w-3.5 rounded-full bg-moon shadow-[0_0_12px_rgba(243,227,179,0.8)]" />}
          title={s.planets[p.key]}
          meta={`${dir(p.direction)} · ${formatTime(p.best, lang)}`}
        >
          <p>
            <span className="font-semibold text-white">{brightness(p.magnitude)}. </span>
            {s.planetWindow(formatTime(p.start, lang), formatTime(p.end, lang))} {s.planetLine(s.directions[p.direction], formatTime(p.best, lang))}.
          </p>
        </Row>
      ))}

      {night.milkyWay && (
        <Row
          icon={
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path d="M3 18 C8 14 14 10 21 5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
              <path d="M3 18 C8 14 14 10 21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
          title={s.milkyWay}
          meta={`${formatTime(night.milkyWay.start, lang)} – ${formatTime(night.milkyWay.end, lang)}`}
        >
          <p>{s.milkyWayTip}</p>
        </Row>
      )}

      <Row
        icon={
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l9 9M8 3l7 7M3 9l6 6" opacity="0.5" />
            <circle cx="17" cy="17" r="2.5" fill="currentColor" />
          </svg>
        }
        title={`${s.showers[shower.key]} · ${s.showerKind}`}
        meta={`${showerDate} · ${s.showerWhen(shower.daysAway)}`}
      >
        <p>
          {s.showerRate(shower.perHour)}. {showerMoon}.
        </p>
      </Row>
    </ul>
  );
}
