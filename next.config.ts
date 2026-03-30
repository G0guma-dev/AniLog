import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eimctazerkmjaxhqrzzi.supabase.co",
      },
    ],
  },
};

export default nextConfig;