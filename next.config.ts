import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "tool", value: "hoa-ready" }],
        destination: "/hoa-check",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
