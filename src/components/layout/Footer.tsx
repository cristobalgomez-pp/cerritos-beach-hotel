import Link from "next/link";
import { CONTACT, SOCIAL } from "@/lib/constants";

const ROOM_LINKS = [
  { label: "King Suite", href: "/rooms/king-suite" },
  { label: "Twin Suite", href: "/rooms/twin-suite" },
  { label: "Pent House A", href: "/rooms/pent-house-a" },
  { label: "Pent House B", href: "/rooms/pent-house-b" },
];

const SERVICES = [
  "Food & Restaurant",
  "Free Breakfast",
  "Ocean View Rooms",
  "Air Conditioning",
  "Car Parking",
];

export default function Footer() {
  return (
    <footer className="bg-ocean text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description */}
          <div>
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-2xl font-bold text-white tracking-wider">
                DESERT MOON
              </h3>
              <p className="text-xs tracking-[0.3em] text-white/50 uppercase mt-1">
                Cerritos Beach Hotel
              </p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              The closest hotel to the surf point in Cerritos Beach. Enjoy
              ocean views, an infinity pool, free breakfast, and the best
              sunsets in Baja California Sur.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {CONTACT.address}
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div>
                  <a href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                    {CONTACT.phonePrimary}
                  </a>
                  <br />
                  <a href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                    {CONTACT.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Rooms */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Our Rooms
            </h4>
            <ul className="space-y-2 text-sm">
              {ROOM_LINKS.map((room) => (
                <li key={room.href}>
                  <Link
                    href={room.href}
                    className="hover:text-gold transition-colors"
                  >
                    {room.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; 2026 DESERT MOON HOTEL. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL.instagram && (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}
            {SOCIAL.facebook && (
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
