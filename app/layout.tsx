import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "Sanidhya Vats — Full Stack Developer & ML Engineer",
  description:
    "Portfolio of Sanidhya Vats. Full-stack development, machine learning engineering, and technical leadership.",
  keywords: [
    "Full Stack Developer",
    "Machine Learning",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
  ],
  authors: [{ name: "Sanidhya Vats" }],
  openGraph: {
    title: "Sanidhya Vats — Full Stack Developer & ML Engineer",
    description:
      "Portfolio showcasing full-stack development and ML engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
