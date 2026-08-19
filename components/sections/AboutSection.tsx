"use client";

import { portfolioData } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s, transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  const data = portfolioData;
  const pills = ["ENGINEER", "COMMUNITY", "CREATIVE TECH"];

  return (
    <section id="about" style={{ background: "var(--bg)", width: "100%" }}>
      {/* ── Giant ABOUT Section Banner ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(4.5rem, 15vw, 18rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.82,
            color: "var(--text)",
            margin: 0,
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          ABOUT
        </h2>
      </div>

      {/* ── Subheader Bar ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem clamp(1rem, 3vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          className="label"
          style={{
            color: "var(--text)",
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          BACKGROUND &amp; PHILOSOPHY
        </span>

        {/* Right Pill Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {pills.map((pill) => (
            <span
              key={pill}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--text)",
                color: "var(--bg)",
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                display: "inline-block",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── Editorial 2-Column Split: Portrait & Narrative ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left — Portrait */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            overflow: "hidden",
            aspectRatio: "4/5",
            background: "#161616",
          }}
        >
          <img
            src="/DSC02945.JPG"
            alt="Sanidhya Vats"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "grayscale(0.12) contrast(1.05)",
            }}
          />
        </div>

        {/* Right — Bio & Highlights */}
        <div
          style={{
            padding: "clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <RevealBlock delay={0.05}>
              <p
                className="label"
                style={{ marginBottom: "1.2rem", letterSpacing: "0.1em" }}
              >
                (THE NARRATIVE)
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  lineHeight: 1.75,
                  color: "var(--text)",
                  marginBottom: "2.5rem",
                }}
              >
                {data.about.narrative}
              </p>
            </RevealBlock>

            {/* Core Highlights */}
            <RevealBlock delay={0.1}>
              <p className="label" style={{ marginBottom: "1rem", letterSpacing: "0.1em" }}>CORE HIGHLIGHTS</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0 }}>
                {data.about.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      color: "var(--text)",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: "var(--text-muted)", flexShrink: 0, fontWeight: 700 }}>—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>

          {/* Education Milestone */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <RevealBlock delay={0.15}>
              <p className="label" style={{ marginBottom: "0.4rem" }}>ACADEMICS</p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  textTransform: "uppercase",
                  color: "var(--text)",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {data.education.institution}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: "0.3rem",
                }}
              >
                {data.education.degree} · {data.education.period}
              </p>
            </RevealBlock>
          </div>
        </div>
      </div>

      {/* ── Center Action Pill Button ── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(4.5rem, 8vw, 7.5rem) 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            padding: "1.1rem clamp(2.8rem, 6vw, 4.5rem)",
            borderRadius: "999px",
            border: "2px solid var(--text)",
            background: "transparent",
            color: "var(--text)",
            textDecoration: "none",
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
          EXPLORE FULL BIO
        </Link>
      </div>
    </section>
  );
}
