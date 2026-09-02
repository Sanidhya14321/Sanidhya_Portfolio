"use client";

import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

// ── 2D Rotating SVG Compass Stamp ─────────────────────────────────────────────
function RotatingCompassStamp() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      style={{
        width: "clamp(62px, 12vw, 78px)",
        height: "clamp(62px, 12vw, 78px)",
        position: "absolute",
        top: "-10px",
        right: "-10px",
        zIndex: 20,
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        <path
          id="pageStampPath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "9.2px",
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fill: "var(--text)",
          }}
        >
          <textPath href="#pageStampPath" startOffset="0%">
            ✦ FULL STACK · ML ENGINEER · LEAD ✦
          </textPath>
        </text>
        <circle cx="50" cy="50" r="13" fill="var(--text)" />
        <text
          x="50"
          y="54.5"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 900,
            fill: "var(--bg)",
          }}
        >
          SV
        </text>
      </svg>
    </motion.div>
  );
}

export default function AboutPage() {
  const data = portfolioData;

  const stats = [
    { label: "DEVS IMPACTED", value: "15,000+" },
    { label: "PROD APPS", value: "04+" },
    { label: "HACKATHONS LED", value: "03+" },
    { label: "ACADEMICS", value: "MSIT '27" },
  ];

  const pillars = [
    {
      index: "01",
      tag: "FULL STACK",
      title: "Systems & Web Apps",
      desc: "Robust full-stack platforms with Next.js, Node.js, TypeScript, and high-throughput real-time APIs. Designing scalable state and data architectures.",
      tech: ["Next.js", "TypeScript", "Node.js", "FastAPI", "MongoDB", "PostgreSQL"],
    },
    {
      index: "02",
      tag: "AI / ML",
      title: "Agentic AI Pipelines",
      desc: "Applied ML systems, LangChain/LangGraph workflows, semantic retrieval, and PyTorch pipelines. Orchestrating vector search and knowledge graphs.",
      tech: ["PyTorch", "LangChain", "LangGraph", "Qdrant", "Kafka", "Hugging Face"],
    },
    {
      index: "03",
      tag: "COMMUNITY",
      title: "Developer Leadership",
      desc: "Directing 15k+ participants across Geek Room & GDG-MSIT flagship national hackathons. Mentoring developer communities and organizing tech summits.",
      tech: ["Codeक्षेत्र 2.0", "Code Cubicle 5.0", "HackAvensis", "Mentorship"],
    },
    {
      index: "04",
      tag: "INFRASTRUCTURE",
      title: "Cloud & Reliability",
      desc: "Production deployments on AWS, Docker, Kafka, and Qdrant clusters with CI/CD automation. Ensuring low latency, resilience, and high availability.",
      tech: ["Docker", "AWS", "Kafka", "Vercel", "GitHub Actions", "Redis"],
    },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(4rem, 7vh, 6rem)" }}>
      {/* ── 1. Dossier Header Section ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "clamp(1.5rem, 3.5vw, 2.8rem) clamp(1rem, 3vw, 2.5rem) clamp(1.2rem, 2.5vw, 2rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
              }}
            />
            <span
              className="label"
              style={{
                color: "var(--text)",
                fontWeight: 700,
                letterSpacing: "0.14em",
              }}
            >
              DOSSIER &amp; ARCHITECTURAL PHILOSOPHY
            </span>
          </div>
          <span className="label" style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            28.6139° N, 77.2090° E · NEW DELHI, IN
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3.8rem, 11vw, 12rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.82,
            color: "var(--text)",
            margin: 0,
          }}
        >
          ABOUT SANIDHYA
        </h1>

        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--text)",
              margin: 0,
            }}
          >
            FULL-STACK ARCHITECT · MACHINE LEARNING ENGINEER · COMMUNITY LEAD
          </p>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["FULL STACK", "AGENTIC AI", "COMMUNITY"].map((pill) => (
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
                  padding: "0.22rem 0.65rem",
                  borderRadius: "999px",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Running 2D Technical Marquee Tape ── */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-dark)",
          overflow: "hidden",
          padding: "0.6rem 0",
        }}
      >
        <div
          className="marquee-track"
          style={{ "--marquee-speed": "24s" } as React.CSSProperties}
        >
          <div
            className="marquee-inner"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "0.95rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--text-cream)",
              whiteSpace: "nowrap",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ paddingRight: "2rem" }}>
                ✦ FULL-STACK ARCHITECTURE ✦ AGENTIC AI PIPELINES ✦ 15,000+ DEVS REACHED ✦ DISTRIBUTED SYSTEMS ✦ MSIT COMPUTER SCIENCE '27 ✦ PRODUCTION-GRADE CODE ✦
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Dual Blueprint Profile Dossier (Zero Blank Space, Perfectly Aligned) ── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left Column: Portrait & 4 Stats Matching Main Section */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "1.2rem",
            background: "rgba(26, 26, 26, 0.015)",
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
            <RotatingCompassStamp />

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                background: "#161616",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src="/DSC02945.JPG"
                alt="Sanidhya Vats"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  display: "block",
                  filter: "grayscale(0.12) contrast(1.05)",
                }}
              />

              {/* Technical Corner Markers */}
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  zIndex: 5,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(232, 228, 220, 0.85)", fontSize: "9px", fontFamily: "var(--font-display)", fontWeight: 700, background: "rgba(26,26,26,0.55)", padding: "2px 6px", borderRadius: "2px" }}>
                    [ 01 // DOSSIER ]
                  </span>
                  <span style={{ color: "rgba(232, 228, 220, 0.85)", fontSize: "9px", fontFamily: "var(--font-display)", fontWeight: 700, background: "rgba(26,26,26,0.55)", padding: "2px 6px", borderRadius: "2px" }}>
                    28.61° N, 77.20° E
                  </span>
                </div>
              </div>

              {/* Bottom Operational Status Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  right: "10px",
                  background: "rgba(26, 26, 26, 0.88)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "4px",
                  padding: "0.42rem 0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(232, 228, 220, 0.15)",
                  zIndex: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ position: "relative", display: "flex", height: "8px", width: "8px" }}>
                    <span
                      style={{
                        position: "absolute",
                        display: "inline-flex",
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                        opacity: 0.75,
                        animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        borderRadius: "50%",
                        height: "8px",
                        width: "8px",
                        backgroundColor: "#22c55e",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "#E8E4DC",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    AVAILABLE FOR NEW ROLES
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "rgba(232, 228, 220, 0.6)",
                  }}
                >
                  DELHI, IN
                </span>
              </div>
            </div>
          </div>

          {/* 4-Cell Architectural Stats Matrix Matching Main Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.55rem",
              paddingTop: "0.7rem",
              borderTop: "1px solid var(--border)",
              maxWidth: "340px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "0.55rem 0.75rem",
                  background: "rgba(26, 26, 26, 0.025)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                    color: "var(--text)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="label"
                  style={{
                    fontSize: "0.58rem",
                    color: "var(--text-muted)",
                    marginTop: "0.2rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Executive Narrative & Manifesto (Tight, natural spacing) */}
        <div
          style={{
            padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "1.2rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
              <span style={{ color: "var(--text)", fontWeight: 900 }}>✦</span>
              <span className="label" style={{ letterSpacing: "0.12em" }}>(EXECUTIVE NARRATIVE &amp; PHILOSOPHY)</span>
            </div>

            {/* Headline rendered directly without invisible opacity delay */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.015em",
                lineHeight: 1.05,
                color: "var(--text)",
                marginTop: "0.4rem",
                marginBottom: "1rem",
              }}
            >
              ARCHITECTING HIGH-THROUGHPUT WEB SYSTEMS &amp; AGENTIC AI
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.92rem, 1.25vw, 1.05rem)",
                lineHeight: 1.7,
                color: "var(--text)",
                opacity: 0.9,
                marginBottom: "1.2rem",
              }}
            >
              {data.about.narrative}
            </p>

            <div
              style={{
                padding: "0.85rem 1.1rem",
                background: "rgba(26, 26, 26, 0.04)",
                borderLeft: "3px solid var(--text)",
                borderRadius: "0 4px 4px 0",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "var(--text)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "Dedicated to transforming cutting-edge artificial intelligence and robust full-stack architecture into intuitive, high-performance digital reality."
              </p>
            </div>
          </div>

          {/* Action Strip Matching Main Section */}
          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <a
              href={`mailto:${data.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                padding: "0.65rem 1.6rem",
                borderRadius: "999px",
                border: "2px solid var(--text)",
                background: "var(--text)",
                color: "var(--bg)",
                textDecoration: "none",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span>GET IN TOUCH</span>
              <span>→</span>
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <a
                href={data.social.github}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.6rem" }}
              >
                GITHUB ↗
              </a>
              <span style={{ color: "var(--border)" }}>/</span>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.6rem" }}
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. The Four Technical Pillars (Guaranteed Line Between 02 and 03) ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            padding: "1rem clamp(1rem, 3vw, 2.5rem)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text)", display: "inline-block" }} />
            <span className="label" style={{ letterSpacing: "0.12em" }}>CORE TECHNICAL PILLARS</span>
          </div>
          <span className="label" style={{ letterSpacing: "0.08em" }}>[ 04 DOMAINS ]</span>
        </div>

        {/* CSS grid with explicit border-right on cards 1, 2, 3 -> Guarantees line between 2 and 3 */}
        <div className="grid-pillars-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card"
              style={{
                padding: "clamp(1.8rem, 3vw, 2.5rem) clamp(1.2rem, 2.5vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "var(--bg)",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg)";
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                  <span
                    className="label"
                    style={{
                      background: "rgba(26,26,26,0.08)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "2px",
                      fontWeight: 700,
                      color: "var(--text)",
                      fontSize: "0.625rem",
                    }}
                  >
                    {pillar.tag}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.1rem", color: "var(--text-muted)" }}>
                    {pillar.index}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.05,
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    color: "var(--text)",
                    opacity: 0.88,
                    marginBottom: "1.2rem",
                  }}
                >
                  {pillar.desc}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {pillar.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      padding: "0.18rem 0.45rem",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      color: "var(--text)",
                      background: "rgba(26,26,26,0.02)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Experience Section (100% Identical to Main Page) ── */}
      <ExperienceSection />

      {/* ── 6. Skills Section (100% Identical to Main Page) ── */}
      <SkillsSection />

      {/* ── 7. Academic Credentials & Honors ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 3vw, 2.5rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {/* Education Block */}
          <div
            style={{
              padding: "1.5rem 1.8rem",
              background: "rgba(26, 26, 26, 0.025)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span className="label" style={{ fontWeight: 700, color: "var(--text)" }}>ACADEMIC CREDENTIALS</span>
              <span className="label">{data.education.period}</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                textTransform: "uppercase",
                color: "var(--text)",
                lineHeight: 1.05,
                marginBottom: "0.4rem",
              }}
            >
              {data.education.institution}
            </h3>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              {data.education.degree}
            </p>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {data.education.achievements.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text)",
                  }}
                >
                  <span style={{ color: "var(--text)", fontWeight: 900 }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Honors & Hackathon Leadership */}
          <div
            style={{
              padding: "1.5rem 1.8rem",
              background: "rgba(26, 26, 26, 0.025)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span className="label" style={{ fontWeight: 700, color: "var(--text)" }}>KEY HONORS &amp; COMMUNITY IMPACT</span>
              <span className="label">2023 — PRESENT</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                textTransform: "uppercase",
                color: "var(--text)",
                lineHeight: 1.05,
                marginBottom: "1rem",
              }}
            >
              LEADERSHIP HIGHLIGHTS
            </h3>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {data.achievements.map((ach, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    lineHeight: 1.45,
                  }}
                >
                  <span style={{ color: "var(--text)", fontWeight: 900 }}>✦</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 8. Bottom Action Banner: Back to Works or Home ── */}
      <section
        style={{
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.2rem, 3vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.8rem",
          background: "var(--bg)",
        }}
      >
        <span className="label" style={{ letterSpacing: "0.14em" }}>NEXT STEPS</span>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            color: "var(--text)",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          READY TO EXPLORE PRODUCTION WORK OR START A PROJECT?
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/works"
            data-transition-dir="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              padding: "0.85rem 2.2rem",
              borderRadius: "999px",
              border: "2px solid var(--text)",
              background: "var(--text)",
              color: "var(--bg)",
              textDecoration: "none",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span>VIEW ALL WORKS (6)</span>
            <span>→</span>
          </Link>

          <Link
            href="/"
            data-transition-dir="down"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              padding: "0.85rem 2.2rem",
              borderRadius: "999px",
              border: "2px solid var(--text)",
              background: "transparent",
              color: "var(--text)",
              textDecoration: "none",
              transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(26, 26, 26, 0.06)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span>RETURN HOME</span>
            <span>↑</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
