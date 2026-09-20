import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@mygolfpassport/shared"],
  async headers() {
    return [
      {
        // The file has no extension, so without this it's served as
        // application/octet-stream. Apple wants JSON.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
