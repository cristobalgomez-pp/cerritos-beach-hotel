import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import MobileMore from "@/components/outlook/MobileMore";
import { CONSTELLATIONS, constellationsTonight, shapeOf, type ConstellationTonight } from "@/lib/constellations";
import { formatTime, type Night } from "@/lib/sky";

function Drawing({ item, label, galaxy }: { item: ConstellationTonight; label: string; galaxy: string }) {
  const def = CONSTELLATIONS.find((c) => c.key === item.key)!;
  const shape = shapeOf(def);
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={label} className="aspect-square w-full max-w-[160px]">
      {shape.lines.map(([a, b], i) => (
        <line
          key={i}
          x1={shape.stars[a].x}
          y1={shape.stars[a].y}
          x2={shape.stars[b].x}
          y2={shape.stars[b].y}
          stroke="white"
          strokeOpacity={0.35}
          strokeWidth={0.6}
        />
      ))}
      {shape.deepSky && (
        <ellipse cx={shape.deepSky.x} cy={shape.deepSky.y} rx={4} ry={1.8} fill="white" opacity={0.35} transform={`rotate(-35 ${shape.deepSky.x} ${shape.deepSky.y})`}>
          <title>{galaxy}</title>
        </ellipse>
      )}
      {shape.stars.map((st, i) => (
        <circle key={i} cx={st.x} cy={st.y} r={st.r} className="fill-moon" style={{ filter: "drop-shadow(0 0 2px rgba(243,227,179,0.6))" }} />
      ))}
    </svg>
  );
}

function Card({ item, lang, t }: { item: ConstellationTonight; lang: Locale; t: Dictionary }) {
  const c = t.constellations;
  const text = c.items[item.key];
  const when = item.fromDusk ? c.fromDusk : c.from(formatTime(item.from, lang));
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <div className="flex items-center gap-4">
        <div className="w-24 shrink-0 md:w-28">
          <Drawing item={item} label={c.drawing(text.name)} galaxy={c.galaxy} />
        </div>
        <div>
          {item.southern && (
            <span className="mb-1.5 inline-block rounded-full bg-moon px-2 py-0.5 text-[11px] font-bold text-night">{c.rare}</span>
          )}
          <h5 className="font-display text-xl font-bold text-moon">{text.name}</h5>
          <p className="mt-1 text-sm font-semibold text-white/85">
            {item.height === "overhead"
              ? c.heights.overhead.charAt(0).toUpperCase() + c.heights.overhead.slice(1)
              : c.where(t.sky.directions[item.direction], c.heights[item.height])}
          </p>
          <p className="text-sm text-white/65">{when}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/80">
        <span className="font-semibold text-white">{c.howTo}: </span>
        {text.tip}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        <span className="font-semibold text-moon/90">{c.story}: </span>
        {text.story}
      </p>
    </article>
  );
}

/** Tonight's best constellations: the top one always visible, the rest folded on phones. */
export default function Constellations({ night, lang, t }: { night: Night; lang: Locale; t: Dictionary }) {
  const c = t.constellations;
  const items = constellationsTonight(night, 3);
  if (!items.length) return null;
  const [first, ...rest] = items;

  return (
    <div className="mt-8 border-t border-white/15 pt-6 md:mt-20 md:pt-14">
      <h4 className="text-lg font-bold md:text-2xl">{c.title}</h4>
      <p className="mt-2 hidden max-w-2xl text-white/75 md:block">{c.intro}</p>

      <div className="mt-4 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
        <Card item={first} lang={lang} t={t} />
        {/* Desktop: all three side by side */}
        {rest.map((item) => (
          <div key={item.key} className="hidden md:block">
            <Card item={item} lang={lang} t={t} />
          </div>
        ))}
      </div>

      {/* Phones: the others behind a tap */}
      {rest.length > 0 && (
        <MobileMore title={c.more} className="mt-4 md:hidden" titleClassName="hidden">
          <div className="mt-3 grid gap-4">
            {rest.map((item) => (
              <Card key={item.key} item={item} lang={lang} t={t} />
            ))}
          </div>
        </MobileMore>
      )}
    </div>
  );
}
