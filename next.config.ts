import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cerritosbeachhotel.com",
      },
    ],
  },
};

export default nextConfig;
