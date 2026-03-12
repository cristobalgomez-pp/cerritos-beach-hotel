"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Angela Sosna",
    text: "Great location. Wonderful staff. Awesome margarita's.",
  },
  {
    name: "Tracey Anne Mcewing",
    text: "The staff was incredibly accommodating, the rooms were spacious and clean, and we had a lovely ocean view. Would definitely stay again.",
  },
  {
    name: "Stephanie Kunz",
    text: "Thank you Bobby and team for an unforgettable stay. The best margaritas we've ever had!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-20 md:py-28 bg-sand/30">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              Testimonials
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ocean font-bold">
              What Our Guests Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote icon */}
              <svg
                className="w-12 h-12 text-gold mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>

              <p className="text-lg md:text-xl text-charcoal/80 italic leading-relaxed mb-8 max-w-2xl mx-auto">
                &ldquo;{TESTIMONIALS[current].text}&rdquo;
              </p>

              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-sand mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-serif font-bold text-charcoal/30">
                  {TESTIMONIALS[current].name[0]}
                </span>
              </div>

              <p className="font-serif font-bold text-ocean text-lg">
                {TESTIMONIALS[current].name}
              </p>
              <p className="text-sm text-charcoal/50">Guest</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-gold w-7" : "bg-charcoal/20 hover:bg-charcoal/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
