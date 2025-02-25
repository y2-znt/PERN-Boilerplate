import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["ui.shadcn.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
