import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
      ],
    }, {
      source: "/fonts/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }, {
      source: "/resume/download",
      headers: [
        { key: "Content-Type", value: "application/pdf" },
        { key: "X-Robots-Tag", value: "noindex" },
        { key: "Content-Disposition", value: 'attachment; filename="Sanidhya_Vats_Resume-AIML.pdf"' },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    }];
  },
  async rewrites() {
    return [{ source: "/resume/download", destination: "/resume/Sanidhya_Vats_Resume-AIML.pdf" }];
  },
  images: {
    qualities: [75, 85],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default nextConfig;
