import type { Metadata } from "next";
import "./globals.css";
import { pageMetadata, siteUrl, siteTitle, siteDescription } from "@/lib/seo";
import { portfolioData } from "@/data/portfolio";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata(siteTitle, siteDescription, "/"),
  applicationName: "Sanidhya Vats Portfolio",
  authors: [{ name: "Sanidhya Vats", url: siteUrl }],
  creator: "Sanidhya Vats",
  robots: { index: true, follow: true },
  keywords: ["Sanidhya Vats", "AI Engineer", "Full Stack Developer", "Machine Learning", "Delhi", "Harvest", "Oasis"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/barlow-condensed-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/barlow-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Person", "@id": `${siteUrl}/#person`, name: portfolioData.name, url: siteUrl, jobTitle: portfolioData.title, sameAs: [portfolioData.github, portfolioData.linkedin], knowsAbout: ["Full-stack development", "Machine learning", "Agentic AI", "Infrastructure testing"], affiliation: { "@type": "CollegeOrUniversity", name: portfolioData.education.institution } },
            { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteTitle, inLanguage: "en", author: { "@id": `${siteUrl}/#person` } },
          ],
        }).replace(/</g, "\\u003c") }} />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
