import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow higher-quality renders for the hover/zoom product images.
    qualities: [75, 90],
  },
};

export default nextConfig;
