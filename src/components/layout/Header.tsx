"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BOOKING_URL, CONTACT, SOCIAL } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Rooms",
    href: "/rooms",
    children: [
      { label: "King Suite", href: "/rooms/king-suite" },
      { label: "Twin Suite", href: "/rooms/twin-suite" },
      { label: "Pent House A", href: "/rooms/pent-house-a" },
      { label: "Pent House B", href: "/rooms/pent-house-b" },
    ],
  },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Activities", href: "/activities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
      {/* Top Bar */}
      <div
        className={`hidden md:block w-full z-50 fixed top-0 left-0 transition-colors duration-300 ${
          scrolled ? "bg-offwhite" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className={`flex items-center gap-1 transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:text-gold"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <MailIcon />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
              className={`flex items-center gap-1 transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:text-gold"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <PhoneIcon />
              {CONTACT.phonePrimary}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {SOCIAL.instagram && (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-charcoal hover:text-gold"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            )}
            {SOCIAL.facebook && (
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-charcoal hover:text-gold"
                    : "text-white/90 hover:text-white"
                }`}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`fixed top-0 md:top-[40px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite shadow-md md:top-0"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span
              className={`font-serif text-2xl font-bold tracking-wider transition-colors duration-300 ${
                scrolled ? "text-ocean" : "text-white"
              }`}
            >
              DESERT MOON
            </span>
            <span
              className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                scrolled ? "text-charcoal/60" : "text-white/70"
              }`}
            >
              Cerritos Beach Hotel
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-1 ${
                      scrolled
                        ? "text-ocean hover:text-gold"
                        : "text-white hover:text-gold"
                    }`}
                  >
                    {link.label}
                    <ChevronDownIcon />
                  </Link>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-lg shadow-xl py-2 min-w-[180px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-charcoal hover:text-gold hover:bg-sand/30 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    scrolled
                      ? "text-ocean hover:text-gold"
                      : "text-white hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-white px-6 py-2.5 text-sm font-semibold tracking-wider rounded hover:bg-gold/90 transition-colors"
            >
              BOOK NOW
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2"
            aria-label="Open menu"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolled ? "text-ocean" : "text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

/* ── Inline SVG Icons ── */

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
