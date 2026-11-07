import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import MoonMark from "@/components/MoonMark";
import SkyPanel from "@/components/sky/SkyPanel";
import SurfPanel from "@/components/surf/SurfPanel";
import WhalePanel from "@/components/whales/WhalePanel";
import OutlookTabs from "./OutlookTabs";

// Fixed pseudo-random star field (same on every render)
const STARS = Array.from({ length: 70 }, (_, i) => {
  const x = (i * 73.13) % 100;
  const y = (i * 37.71 + (i % 7) * 11) % 100;
  const r = i % 9 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.6;
  return { x, y, r, o: 0.25 + ((i * 17) % 50) / 100 };
});

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M2 16c2.5 0 3-2 5-2s2.5 2 5 2 3-2 5-2 2.5 2 5 2" />
      <path d="M4 11c1-4 4-7 8-7 3 0 5 2 5 4.5S15 12 13.5 11 13 8 15 8" />
    </svg>
  );
}

function TailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10.4 20 C10.9 17.6 11.2 15.6 11.3 13.6 C9.2 13.2 6.5 12.3 4.6 10.6 C3.4 9.5 2.6 8.2 2.2 6.4 C3.5 7.2 5 7.5 6.4 7.6 C8.4 8.3 10.4 9.4 12 10.9 C13.6 9.4 15.6 8.3 17.6 7.6 C19 7.5 20.5 7.2 21.8 6.4 C21.4 8.2 20.6 9.5 19.4 10.6 C17.5 12.3 14.8 13.2 12.7 13.6 C12.8 15.6 13.1 17.6 13.6 20 Z"
      />
    </svg>
  );
}

/** "From the rooftop": tonight's sky, the whales and the surf, as one slider over the dusk photo */
export default async function FromTheRooftop({ lang, t }: { lang: Locale; t: Dictionary }) {
  const r = t.rooftop;
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="rooftop-title">
      <div className="absolute inset-x-0 top-0 -z-20 h-[520px]" aria-hidden="true">
        <Image src="/images/hd/pergola-dusk.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-night/70 to-night" />
      </div>
      <svg className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100" aria-hidden="true">
        {STARS.map((st, i) => (
          <circle key={i} cx={st.x} cy={st.y} r={st.r * 0.12} fill="white" opacity={st.o} />
        ))}
      </svg>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-28">
        <div className="mb-6 max-w-2xl md:mb-10">
          <h2 id="rooftop-title" className="text-3xl font-bold md:text-5xl">
            {r.title}
          </h2>
          <p className="mt-3 text-white/75 md:mt-4 md:text-lg">{r.intro}</p>
        </div>

        <OutlookTabs
          labels={{ prev: r.prev, next: r.next }}
          tabs={[
            {
              id: r.tabs.sky.id,
              label: r.tabs.sky.label,
              icon: <MoonMark className="h-5 w-5" />,
              panel: <SkyPanel lang={lang} t={t} />,
            },
            {
              id: r.tabs.whales.id,
              label: r.tabs.whales.label,
              icon: <TailIcon />,
              panel: <WhalePanel lang={lang} t={t} />,
            },
            {
              id: r.tabs.surf.id,
              label: r.tabs.surf.label,
              icon: <WaveIcon />,
              panel: <SurfPanel lang={lang} t={t} />,
            },
          ]}
        />
      </div>
    </section>
  );
}
