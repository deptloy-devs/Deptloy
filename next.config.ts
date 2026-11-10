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
      { source: "/case-studies", destination: "/solutions", permanent: true },
      { source: "/case-studies/:path+", destination: "/solutions", permanent: true },
      // Solution blueprints lived under /projects before the Projects page took that URL.
      {
        source: "/projects/:slug(care-network|field-operations|commerce-platform|client-workspace)",
        destination: "/solutions/:slug",
        permanent: true,
      },
      { source: "/projects/muslim-daily-companion", destination: "/projects/akhirah", permanent: true },
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
