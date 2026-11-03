"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/lib/constants";

/** Sticky "Book now" bar on phones, shown once the visitor scrolls past the hero */
export default function MobileBookBar({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-bone/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-center rounded-full bg-adobe py-3.5 text-base font-semibold text-white"
      >
        {label}
      </a>
    </div>
  );
}
