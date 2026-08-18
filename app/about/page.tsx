"use client";

import { portfolioData } from "@/data/portfolio";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";

export default function AboutPage() {
  const data = portfolioData;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(4rem, 7vh, 6rem)" }}>
      {/* Top Header */}
      <section style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)", borderBottom: "1px solid var(--border)" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 14vw, 15rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "var(--text)",
          }}
        >
          ABOUT SANIDHYA
        </h1>
      </section>

      {/* Main 2-Column Bio Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left — Portrait */}
        <div style={{ borderRight: "1px solid var(--border)", overflow: "hidden", background: "#1a1a1a", aspectRatio: "4/5" }}>
          <img
            src="/DSC02945.JPG"
            alt="Sanidhya Vats"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "grayscale(0.15) contrast(1.05)",
            }}
          />
        </div>

        {/* Right — Bio & Details */}
        <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p className="label" style={{ marginBottom: "1.5rem" }}>(PHILOSOPHY &amp; BACKGROUND)</p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                lineHeight: 1.75,
                color: "var(--text)",
                marginBottom: "3rem",
              }}
            >
              {data.about.narrative}
            </p>
          </div>

          <div>
            <p className="label" style={{ marginBottom: "1rem" }}>CORE HIGHLIGHTS</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {data.about.highlights.map((h, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.8rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--text)",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Matrix */}
      <SkillsSection />

      {/* Education & Achievements */}
      <section style={{ padding: "4rem 2rem", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
          <div>
            <p className="label" style={{ marginBottom: "1rem" }}>EDUCATION</p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                textTransform: "uppercase",
                color: "var(--text)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {data.education.institution}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              {data.education.degree} · {data.education.period}
            </p>
          </div>

          <div>
            <p className="label" style={{ marginBottom: "1rem" }}>LEADERSHIP &amp; RECOGNITION</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {data.achievements.map((item, idx) => (
                <li key={idx} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text)" }}>
                  ● {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
