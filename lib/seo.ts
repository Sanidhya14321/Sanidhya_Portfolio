import type { Metadata } from "next";

export const siteUrl = "https://sanidhyavats.me";
export const siteTitle = "Sanidhya Vats — Full Stack Developer & ML Engineer";
export const siteDescription = "Portfolio of Sanidhya Vats, a full-stack developer and AI/ML engineer in Delhi. Explore coding agents, data pipelines, infrastructure tools, and community leadership.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: "Sanidhya Vats", type: "website", locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
