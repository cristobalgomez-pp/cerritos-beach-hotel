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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
      {
        // Photos and videos never change under the same name: let browsers keep them
        source: "/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
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
