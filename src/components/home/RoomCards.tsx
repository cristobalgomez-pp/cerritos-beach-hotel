"use client";

import Link from "next/link";
import { BOOKING_URL } from "@/lib/constants";
import { ROOMS } from "@/lib/rooms-data";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function RoomCards() {
  return (
    <section className="py-20 md:py-28 bg-sand/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              Our Rooms
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ocean font-bold">
              Explore Our Rooms
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ROOMS.map((room, index) => (
            <ScrollReveal key={room.slug} delay={index * 0.1}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-sand overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-charcoal/15"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                  {/* Badge */}
                  <span className="absolute top-3 right-3 bg-ocean/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Max {room.maxPeople} People
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-ocean mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-charcoal/50 mb-3">
                    {room.beds} &middot; {room.baths} Bath &middot; Fast Wi-Fi
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-5 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="flex-1 text-center border border-ocean text-ocean py-2 rounded text-sm font-semibold hover:bg-ocean hover:text-white transition-colors"
                    >
                      View Detail
                    </Link>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-gold text-white py-2 rounded text-sm font-semibold hover:bg-gold/90 transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
