import type { NextConfig } from "next";

// Old static-site URLs (cerritosbeachhotel.com/*.html) → new pages, so Google links and bookmarks keep working
const LEGACY_PAGES: Record<string, string> = {
  "/index.html": "/en",
  "/rooms.html": "/en/rooms",
  "/king-suite.html": "/en/rooms/king-suite",
  "/double-suite.html": "/en/rooms/twin-suite",
  "/pent-house-A.html": "/en/rooms/pent-house-a",
  "/pent-house-B.html": "/en/rooms/pent-house-b",
  "/restaurant.html": "/en/restaurant",
  "/activities.html": "/en/activities",
  "/about.html": "/en/about",
  "/contact.html": "/en/contact",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return Object.entries(LEGACY_PAGES).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
