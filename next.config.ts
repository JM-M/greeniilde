import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://medusa-public-images.s3.eu-west-1.amazonaws.com/**"),
    ],
  },
};

export default nextConfig;
