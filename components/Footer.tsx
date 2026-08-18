"use client";

import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

const marqueeText =
  "LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0LET'S TALK\u00A0\u00A0\u00A0\u00A0";

const socialLinks = [
  { label: "GITHUB", href: portfolioData.social.github },
  { label: "LINKEDIN", href: portfolioData.social.linkedin },
  { label: "EMAIL", href: `mailto:${portfolioData.social.email}` },
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "WORKS", href: "/works" },
  { label: "BREAK", href: "/break" },
  { label: "ABOUT", href: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Links section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Follow column */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            padding: "2rem 2rem",
          }}
        >
          <p className="label" style={{ marginBottom: "1rem" }}>(FOLLOW)</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                    textDecoration: "none",
                    display: "inline-block",
                    lineHeight: 1.2,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.5")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation column */}
        <div style={{ padding: "2rem 2rem" }}>
          <p className="label" style={{ marginBottom: "1rem", textAlign: "right" }}>(NAVIGATION)</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                    textDecoration: "none",
                    display: "inline-block",
                    lineHeight: 1.2,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.5")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back to top */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1.2rem 2rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="#"
          onClick={scrollToTop}
          className="label"
          style={{
            color: "var(--text)",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.5")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
        >
          BACK TO TOP ↑
        </a>
      </div>

      {/* Dark brown CTA marquee */}
      <div
        style={{
          background: "var(--bg-dark)",
          overflow: "hidden",
          padding: "2rem 0",
        }}
      >
        <div
          className="marquee-track"
          style={{ "--marquee-speed": "18s" } as React.CSSProperties}
        >
          <div
            className="marquee-inner"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(4rem, 11vw, 10rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "var(--text-cream)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ paddingRight: "1em" }}>{marqueeText}</span>
            <span style={{ paddingRight: "1em" }}>{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          padding: "1rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          background: "var(--bg-dark)",
          borderTop: "1px solid rgba(232,228,220,0.1)",
        }}
      >
        <span
          className="label"
          style={{ color: "rgba(232,228,220,0.5)", letterSpacing: "0.05em" }}
        >
          ● NEW DELHI, IN &nbsp;&nbsp; 28.6139° N, 77.2090° E
        </span>
        <span
          className="label"
          style={{ color: "rgba(232,228,220,0.5)", letterSpacing: "0.05em" }}
        >
          ©{year} ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
}
