import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://medusa-public-images.s3.eu-west-1.amazonaws.com/**"),
      new URL("https://space-36-dev.s3.us-east-1.amazonaws.com/**"),
      new URL(
        "https://ucarecdn.com/c2d4dcb2-1483-47a5-ab14-447a990f5827/60dc7947195c0078fabff349_1200pxUnited_Parcel_Service_logo_2014svg.png",
      ),
      new URL("https://s3.us-east-1.amazonaws.com/space-36-dev/**"),
    ],
  },
};

export default withPayload(nextConfig);
