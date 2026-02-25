import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alfapaintingcarpentry.com",
      },
    ],
  },
};

export default nextConfig;
