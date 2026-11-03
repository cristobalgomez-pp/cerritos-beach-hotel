"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Labels {
  close: string;
  prev: string;
  next: string;
  /** e.g. "King Suite, photo {n} of {total}" with {n} and {total} placeholders */
  photoOf: string;
}

export default function Gallery({ photos, labels }: { photos: string[]; labels: Labels }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const describe = (n: number) =>
    labels.photoOf.replace("{n}", String(n + 1)).replace("{total}", String(photos.length));

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-2xl bg-sand ${
              i === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={src}
              alt={describe(i)}
              fill
              sizes={i === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 20vw, 50vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={describe(active)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[active]} alt={describe(active)} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            {labels.close}
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={labels.prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={labels.next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {active + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
