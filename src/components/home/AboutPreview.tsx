"use client";

import { BOOKING_URL } from "@/lib/constants";
import ScrollReveal from "@/components/shared/ScrollReveal";

const STATS = [
  { value: "14", label: "Rooms" },
  { value: "3", label: "Max People" },
  { value: "Fast", label: "Wi-Fi" },
];

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <ScrollReveal>
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              About Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ocean font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="block">DESERT MOON</span>
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Nestled along the stunning coastline of Cerritos Beach in Baja
              California Sur, Desert Moon Hotel is the closest hotel to the
              surf point. Whether you&apos;re here to catch world-class waves,
              relax by our infinity pool, or explore the magic of Todos Santos,
              our 14-room boutique hotel offers the perfect blend of comfort
              and adventure. Start every morning with a complimentary breakfast
              and end each day watching the most beautiful sunsets in Mexico.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gold font-serif">
                    {stat.value}
                  </p>
                  <p className="text-sm text-charcoal/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-8 py-3 font-semibold tracking-wider rounded hover:bg-gold/90 transition-colors"
            >
              Book Now
            </a>
          </ScrollReveal>

          {/* Right — Photo Grid */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-sand rounded-lg flex items-center justify-center"
                >
                  <svg
                    className="w-10 h-10 text-charcoal/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
