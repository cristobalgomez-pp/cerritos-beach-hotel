"use client";

import { BOOKING_URL } from "@/lib/constants";
import type { Room } from "@/lib/rooms-data";
import AmenitiesGrid from "./AmenitiesGrid";
import PhotoGallery from "./PhotoGallery";
import ScrollReveal from "@/components/shared/ScrollReveal";

interface RoomDetailProps {
  room: Room;
  description: string;
}

export default function RoomDetail({ room, description }: RoomDetailProps) {
  // Placeholder photos array — will be replaced with real image paths
  const photos = Array.from({ length: 5 }, (_, i) => `/images/rooms/${room.slug}/photo-${i + 1}.jpg`);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Main content (2/3) */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl text-ocean font-bold mb-6">
                {room.name}
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-10">
                {description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="font-serif text-xl text-ocean font-semibold mb-4">
                Photo Gallery
              </h3>
              <PhotoGallery photos={photos} roomName={room.name} />
            </ScrollReveal>
          </div>

          {/* Right — Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="sticky top-28 bg-white rounded-xl shadow-sm p-6 space-y-6">
                {/* Capacity badge */}
                <div className="flex items-center gap-3 bg-ocean/5 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/50">Capacity</p>
                    <p className="font-semibold text-ocean">
                      Max {room.maxPeople} People
                    </p>
                  </div>
                </div>

                {/* Room specs */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-offwhite rounded-lg py-3">
                    <p className="text-lg font-bold text-ocean">{room.beds.split(" ")[0]}</p>
                    <p className="text-xs text-charcoal/50">
                      {room.beds.includes("King") ? "King Bed" : room.beds.includes("Queen") ? "Queen Beds" : "Bed"}
                    </p>
                  </div>
                  <div className="bg-offwhite rounded-lg py-3">
                    <p className="text-lg font-bold text-ocean">{room.baths}</p>
                    <p className="text-xs text-charcoal/50">Bath</p>
                  </div>
                  <div className="bg-offwhite rounded-lg py-3">
                    <svg className="w-5 h-5 text-ocean mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    <p className="text-xs text-charcoal/50">Fast Wi-Fi</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-serif text-lg font-semibold text-ocean mb-3">
                    Amenities
                  </h4>
                  <AmenitiesGrid amenities={room.amenities} />
                </div>

                {/* Note */}
                <p className="text-xs text-charcoal/40 italic">
                  * Ocean view rooms subject to availability
                </p>

                {/* Book Now */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gold text-white text-center py-4 rounded-lg font-semibold tracking-wider hover:bg-gold/90 transition-colors text-lg"
                >
                  Book Now
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
