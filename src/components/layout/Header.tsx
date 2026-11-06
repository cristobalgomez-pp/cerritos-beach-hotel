"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/i18n/config";
import { BOOKING_URL } from "@/lib/constants";
import MoonMark from "@/components/MoonMark";

export interface HeaderLabels {
  home: string;
  rooms: string;
  restaurant: string;
  activities: string;
  about: string;
  contact: string;
  forSale: string;
  book: string;
  menu: string;
  close: string;
  language: string;
  languageShort: string;
}

export default function Header({ lang, labels }: { lang: Locale; labels: HeaderLabels }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/rooms", label: labels.rooms },
    { href: "/restaurant", label: labels.restaurant },
    { href: "/activities", label: labels.activities },
    { href: "/about", label: labels.about },
    { href: "/for-sale", label: labels.forSale },
    { href: "/contact", label: labels.contact },
  ];

  const otherLang: Locale = lang === "en" ? "es" : "en";
  const switchHref = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${otherLang}`) || `/${otherLang}`;

  const isActive = (href: string) => pathname.startsWith(localePath(lang, href));
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-bone/95 text-ink shadow-[0_1px_0_rgba(29,35,43,0.08)] backdrop-blur" : "bg-gradient-to-b from-night/60 to-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:h-20 md:px-8">
        <Link href={localePath(lang)} className="flex items-center gap-2" aria-label="Desert Moon — home">
          <MoonMark className={`h-6 w-6 ${solid ? "text-adobe" : "text-moon"}`} />
          <span className="font-display text-xl font-extrabold tracking-tight">Desert Moon</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={localePath(lang, l.href)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-[15px] font-medium underline-offset-8 transition-opacity hover:opacity-70 ${
                isActive(l.href) ? "underline decoration-2" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            lang={otherLang}
            className="rounded-full px-2 py-1 text-sm font-semibold transition-opacity hover:opacity-70"
            title={labels.language}
          >
            {labels.languageShort}
            <span className="sr-only"> · {labels.language}</span>
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-adobe px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a83e23] sm:inline-flex"
          >
            {labels.book}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 p-2 lg:hidden"
          >
            <span className="sr-only">{open ? labels.close : labels.menu}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto bg-bone px-4 pb-10 pt-6 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ href: "/", label: labels.home }, ...links].map((l) => (
              <Link
                key={l.href}
                href={localePath(lang, l.href)}
                className="border-b border-ink/10 py-4 font-display text-3xl font-bold tracking-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full items-center justify-center rounded-full bg-adobe py-4 text-base font-semibold text-white"
          >
            {labels.book}
          </a>
        </div>
      )}
    </header>
  );
}
