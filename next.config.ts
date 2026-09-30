import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/resume/download",
      headers: [
        { key: "Content-Type", value: "application/pdf" },
        { key: "Content-Disposition", value: 'attachment; filename="Sanidhya_Vats_Resume-AIML.pdf"' },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    }];
  },
  async rewrites() {
    return [{ source: "/resume/download", destination: "/resume/Sanidhya_Vats_Resume-AIML.pdf" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
