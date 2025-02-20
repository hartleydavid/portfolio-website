import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,  // Prevents unnecessary re-renders
  output: "standalone",    // Ensures compatibility with Docker
};

export default nextConfig;