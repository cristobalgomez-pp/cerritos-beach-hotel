"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/constants";

const SLIDES = [
  {
    subtitle: "CERRITOS BEACH",
    title: "WELCOME to DESERT MOON",
    gradient: "from-ocean to-sand",
  },
  {
    subtitle: "Desert Moon Hotel",
    title: "Located in the heart of Cerritos Beach",
    gradient: "from-terracotta to-gold",
  },
  {
    subtitle: "COME AND RELAX",
    title: "Escape the Ordinary",
    gradient: "from-sand to-ocean",
  },
  {
    subtitle: "For Every Surfer Level",
    title: "World Class Waves",
    gradient: "from-gold to-terracotta",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % SLIDES.length),
    []
  );

  const prev = useCallback(
    () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${SLIDES[current].gradient}`}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/80 mb-4">
              {SLIDES[current].subtitle}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-4xl leading-tight">
              {SLIDES[current].title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/rooms"
                className="border-2 border-white text-white px-8 py-3 font-semibold tracking-wider rounded hover:bg-white/10 transition-colors"
              >
                Our Rooms
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-white px-8 py-3 font-semibold tracking-wider rounded hover:bg-gold/90 transition-colors"
              >
                Book A Room
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-gold w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
