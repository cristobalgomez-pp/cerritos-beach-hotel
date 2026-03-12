"use client";

import { BOOKING_URL } from "@/lib/constants";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-ocean to-ocean/90 overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/10" />
      <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-gold/5" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 leading-tight">
            Desert Moon Hotel is located in the heart of Cerritos Beach
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Just steps from world-class surf breaks, 15 minutes from Todos
            Santos Pueblo Magico, and surrounded by the most stunning sunsets
            in Baja California Sur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
