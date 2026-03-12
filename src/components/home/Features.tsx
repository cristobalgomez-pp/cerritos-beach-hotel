"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const FEATURES = [
  { icon: "\u{1F3C4}", label: "Closest Hotel To The Surf Point" },
  { icon: "\u{1F3CA}", label: "Infinity Pool" },
  { icon: "\u{1F373}", label: "Free Breakfast" },
  { icon: "\u{1F379}", label: "Drinks" },
  { icon: "\u{1F37D}\uFE0F", label: "Restaurant" },
  { icon: "\u{1F17F}\uFE0F", label: "Car Parking" },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-ocean">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              Our Services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold">
              Hotel Features
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {FEATURES.map((feature, index) => (
            <ScrollReveal key={feature.label} delay={index * 0.08}>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="text-4xl md:text-5xl" role="img" aria-label={feature.label}>
                  {feature.icon}
                </span>
                <p className="text-white text-sm font-medium leading-snug">
                  {feature.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
