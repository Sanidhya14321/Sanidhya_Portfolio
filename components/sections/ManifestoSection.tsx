"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-dark)",
        color: "var(--text-cream)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(4rem, 8vw, 7.5rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
      >
        {/* Subtitle tag */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "rgba(232, 228, 220, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--text-cream)",
              display: "inline-block",
            }}
          />
          ENGINEERING MANIFESTO
        </div>

        {/* Main Display Statement */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 7.5vw, 8rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--text-cream)",
              marginBottom: "2.5rem",
            }}
          >
            BUILDING HIGH IMPACT <br />
            AGENTIC AI &amp; SCALABLE <br />
            SYSTEMS WITH PURPOSE
          </h2>
        </div>

        {/* Supporting Narrative Column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "2.5rem",
            borderTop: "1px solid rgba(232, 228, 220, 0.15)",
            paddingTop: "2rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.15s, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.15s",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "rgba(232, 228, 220, 0.85)",
              }}
            >
              {portfolioData.about.narrative.slice(0, 240)}...
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.8rem",
                letterSpacing: "-0.01em",
                color: "var(--text-cream)",
                lineHeight: 1.1,
              }}
            >
              15,000+ DEVELOPERS ENGAGED
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(232, 228, 220, 0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Geek Room &amp; GDG-MSIT Community Leadership
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
