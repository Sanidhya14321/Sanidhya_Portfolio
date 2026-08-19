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
        width: "100%",
      }}
    >
      {/* ── Follow & Navigation Columns ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Follow Column */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            padding: "clamp(2rem, 4vw, 3.5rem) clamp(1.2rem, 3vw, 2.5rem)",
          }}
        >
          <p className="label" style={{ marginBottom: "1.2rem", letterSpacing: "0.1em" }}>(FOLLOW)</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.015em",
                    color: "var(--text)",
                    textDecoration: "none",
                    display: "inline-block",
                    lineHeight: 1.1,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.45";
                    (e.target as HTMLElement).style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.transform = "translateX(0px)";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Column */}
        <div style={{ padding: "clamp(2rem, 4vw, 3.5rem) clamp(1.2rem, 3vw, 2.5rem)" }}>
          <p className="label" style={{ marginBottom: "1.2rem", letterSpacing: "0.1em" }}>(NAVIGATION)</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.015em",
                    color: "var(--text)",
                    textDecoration: "none",
                    display: "inline-block",
                    lineHeight: 1.1,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.45";
                    (e.target as HTMLElement).style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.transform = "translateX(0px)";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Signature Capsule Back To Top Button ── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(3.5rem, 6vw, 5.5rem) 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            padding: "1rem clamp(2.5rem, 5vw, 4rem)",
            borderRadius: "999px",
            border: "2px solid var(--text)",
            background: "transparent",
            color: "var(--text)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--text)";
            e.currentTarget.style.color = "var(--bg)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          BACK TO TOP ↑
        </button>
      </div>

      {/* ── Giant Dark CTA Marquee ── */}
      <div
        style={{
          background: "var(--bg-dark)",
          overflow: "hidden",
          padding: "clamp(2rem, 4vw, 3.5rem) 0",
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
              fontSize: "clamp(4.5rem, 14vw, 14rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.82,
              color: "var(--text-cream)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ paddingRight: "1em" }}>{marqueeText}</span>
            <span style={{ paddingRight: "1em" }}>{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Metadata Bar ── */}
      <div
        style={{
          padding: "1.2rem clamp(1rem, 3vw, 2.5rem)",
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
          style={{ color: "rgba(232,228,220,0.6)", letterSpacing: "0.08em" }}
        >
          ● NEW DELHI, IN &nbsp;&nbsp; 28.6139° N, 77.2090° E
        </span>
        <span
          className="label"
          style={{ color: "rgba(232,228,220,0.6)", letterSpacing: "0.08em" }}
        >
          ©{year} SANIDHYA VATS — ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
}
