import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  async redirects() {
    return [
      { source: "/services/ai-receptionist", destination: "/demo", permanent: true },
      { source: "/services", destination: "/how-it-works", permanent: true },
      { source: "/services/:path+", destination: "/how-it-works", permanent: true },
      { source: "/industries", destination: "/how-it-works", permanent: true },
      { source: "/industries/:path+", destination: "/how-it-works", permanent: true },
      { source: "/case-studies", destination: "/projects", permanent: true },
      { source: "/case-studies/:path+", destination: "/projects", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:path+", destination: "/blogs/:path+", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
