import type { MetadataRoute } from "next";
import { featuredProjects, allProjects } from "@/data/portfolio";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/works", "/resume", ...[...featuredProjects, ...allProjects].map(p => `/projects/${p.id || p.title.toLowerCase().replace(/\s+/g, "-")}`)];
  return paths.map(path => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.7 : 0.8 }));
}
