"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface Slide {
  src: string;
  alt: string;
}

/**
 * Full-bleed photos that slowly crossfade behind the hero copy.
 * Only the first photo loads with the page; the rest are added once it has settled,
 * so they don't compete with the first paint on phones.
 */
export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [mountedAll, setMountedAll] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mount = setTimeout(() => setMountedAll(true), 2500);
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => {
      clearTimeout(mount);
      clearInterval(id);
    };
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-night">
      {slides.map((slide, i) => {
        if (i > 0 && !mountedAll) return null;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "hero-zoom" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
}
