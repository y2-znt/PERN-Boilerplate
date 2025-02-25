import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["ui.shadcn.com"], // Allow images from this domain
  },
};

export default nextConfig;
