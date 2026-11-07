"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface OutlookTab {
  id: string; // also the URL hash, e.g. #ballenas
  label: string;
  icon: ReactNode;
  panel: ReactNode;
}

/**
 * Tabs that also work as a slider: tap a tab, use the arrows, or swipe left/right on a phone.
 * Every panel is rendered on the server (good for Google); only the visible one is shown.
 */
export default function OutlookTabs({ tabs, labels }: { tabs: OutlookTab[]; labels: { prev: string; next: string } }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Open the tab named in the URL hash (#ballenas) so it can be linked directly
  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.id}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const go = (i: number, focus = false) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div role="tablist" aria-orientation="horizontal" className="flex gap-2 overflow-x-auto rounded-full bg-white/10 p-1">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(i + 1, true);
                if (e.key === "ArrowLeft") go(i - 1, true);
              }}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${
                i === active ? "bg-moon text-night" : "text-white/80 hover:text-white"
              }`}
            >
              <span aria-hidden="true" className="h-5 w-5">
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label={labels.prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label={labels.next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 60) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={i !== active}
            className="outlook-panel pt-12"
          >
            {t.panel}
          </div>
        ))}
      </div>

      {/* Dots: where you are in the slider (mostly for phones) */}
      <div className="mt-12 flex justify-center gap-2" aria-hidden="true">
        {tabs.map((t, i) => (
          <span key={t.id} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-moon" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>
    </div>
  );
}
