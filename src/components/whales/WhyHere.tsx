import type { Dictionary } from "@/i18n/dictionaries/en";
import MobileMore from "@/components/outlook/MobileMore";
import { SEA_POINTS, seaTemperature } from "@/lib/sea";

/** Stylized route: cold feeding waters up north → warm calving waters here, along the California Current */
function RouteArt({ north, south, labels }: { north?: number; south?: number; labels: { alaska: string; cerritos: string; current: string } }) {
  return (
    <svg viewBox="0 0 220 260" className="h-auto w-full max-w-[260px]" role="img" aria-label={`${labels.alaska} → ${labels.cerritos}`}>
      <defs>
        <linearGradient id="route-temp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc4e8" />
          <stop offset="1" stopColor="#e0864e" />
        </linearGradient>
      </defs>
      {/* Coastline, very simplified */}
      <path
        d="M70 18 C95 30 120 34 150 30 C160 60 158 90 166 120 C172 150 168 175 176 200 C180 215 186 228 196 240"
        fill="none"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* California Current, flowing south along the coast */}
      <path d="M138 70 C142 110 146 150 158 190" fill="none" stroke="#7cc4e8" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" />
      <text x="112" y="132" fill="#7cc4e8" fillOpacity="0.8" fontSize="8" transform="rotate(78 112 132)">
        {labels.current}
      </text>
      {/* Migration route */}
      <path d="M78 46 C100 90 122 140 150 186 C160 202 168 214 178 226" fill="none" stroke="url(#route-temp)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M172 216 L179 227 L166 224" fill="none" stroke="#e0864e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Places */}
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

export default async function WhyHere({ t }: { t: Dictionary }) {
  const y = t.whales.why;
  const [north, south] = await Promise.all([seaTemperature(SEA_POINTS.alaska), seaTemperature(SEA_POINTS.cerritos)]);

  const steps = (
    <ol className="mt-4 space-y-5 md:mt-6">
      {y.steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moon font-display text-sm font-bold text-night">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold">{step.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/75">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="mt-8 border-t border-white/15 pt-6 md:mt-16 md:pt-12">
      <h4 className="text-lg font-bold md:text-2xl">{y.title}</h4>
      <div className="mt-4 grid gap-6 md:mt-8 md:grid-cols-12 md:items-center md:gap-10">
        <div className="flex items-center gap-5 md:col-span-4 md:block">
          <div className="w-36 shrink-0 md:w-full">
            <RouteArt north={north} south={south} labels={{ alaska: y.alaska, cerritos: y.cerritos, current: y.current }} />
          </div>
          {north !== undefined && south !== undefined && (
            <p className="text-sm leading-relaxed text-white/75 md:mt-4">{y.tempNote(north, south)}</p>
          )}
        </div>
        <div className="md:col-span-8">
          {/* Phones: the story folds; larger screens: always open */}
          <MobileMore title={y.stepsTitle} titleClassName="text-sm font-semibold uppercase tracking-wide text-white/60">
            {steps}
          </MobileMore>
          <p className="mt-6 text-xs text-white/45">{y.source}</p>
        </div>
      </div>
    </div>
  );
}
