"use client";

import { useState, useEffect } from "react";
import { BOOKING_URL } from "@/lib/constants";

export default function BookNowFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 lg:hidden p-3 bg-offwhite/80 backdrop-blur-sm">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gold text-white text-center py-3.5 rounded-lg font-semibold tracking-wider text-sm hover:bg-gold/90 transition-colors shadow-lg"
      >
        BOOK NOW
      </a>
    </div>
  );
}
