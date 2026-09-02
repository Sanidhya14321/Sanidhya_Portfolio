"use client";

import { portfolioData } from "@/data/portfolio";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// ── 2D Kinetic Word Reveal ───────────────────────────────────────────────────
function KineticWords({
  text,
  className = "",
  style = {},
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span style={{ display: "inline", ...style }} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: "0.26em",
          }}
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.025,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── 2D Rotating Architectural Stamp ──────────────────────────────────────────
function RotatingStamp() {
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
          id="aboutStampPath"
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
          <textPath href="#aboutStampPath" startOffset="0%">
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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const data = portfolioData;
  const [activeTab, setActiveTab] = useState<"narrative" | "pillars" | "leadership">("narrative");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], ["-2.5vw", "2.5vw"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

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
      desc: "Robust full-stack platforms with Next.js, Node.js, TypeScript, and high-throughput real-time APIs.",
    },
    {
      index: "02",
      tag: "AI / ML",
      title: "Agentic AI Pipelines",
      desc: "Applied ML systems, LangChain/LangGraph workflows, semantic retrieval, and PyTorch pipelines.",
    },
    {
      index: "03",
      tag: "COMMUNITY",
      title: "Developer Leadership",
      desc: "Directing 15k+ participants across Geek Room & GDG-MSIT flagship national hackathons.",
    },
    {
      index: "04",
      tag: "INFRASTRUCTURE",
      title: "Cloud & Reliability",
      desc: "Production deployments on AWS, Docker, Kafka, and Qdrant clusters with CI/CD automation.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: "var(--bg)",
        width: "100%",
        position: "relative",
      }}
    >
      {/* ── 1. Editorial 2D Section Header with Kinetic Drift ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "clamp(1.2rem, 2.4vw, 2.2rem) clamp(1rem, 3vw, 2.5rem) clamp(0.5rem, 1.2vw, 0.9rem)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <motion.h2
          style={{
            x: headerX,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3.8rem, 10vw, 11rem)",
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
        </motion.h2>
      </div>

      {/* ── 2. Technical Blueprint Metadata Ribbon ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem clamp(1rem, 3vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--text)",
              display: "inline-block",
            }}
          />
          <span
            className="label"
            style={{
              color: "var(--text)",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            DOSSIER &amp; ARCHITECTURAL PHILOSOPHY
          </span>
        </div>

        {/* Technical Coordinate & Category Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          {["FULL STACK", "AGENTIC AI", "LEADERSHIP"].map((pill) => (
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
                display: "inline-block",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. Proportional 2-Column Blueprint Grid ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(320px,380px)_1fr]"
        style={{
          gap: 0,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* ── LEFT COLUMN: Natural 4:5 Portrait Frame + 4-Cell Stats ── */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "clamp(1.2rem, 2.2vw, 1.8rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.2rem",
            background: "rgba(26, 26, 26, 0.015)",
          }}
        >
          {/* Portrait Container */}
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
            <RotatingStamp />

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
              {/* Parallax Image */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-5%",
                  left: 0,
                  width: "100%",
                  height: "110%",
                  y: imageY,
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
              </motion.div>

              {/* Technical Dossier Corner Crosshairs */}
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

          {/* 4-Cell Architectural Stats Matrix */}
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
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -2, background: "rgba(26, 26, 26, 0.05)" }}
                style={{
                  padding: "0.55rem 0.75rem",
                  background: "rgba(26, 26, 26, 0.025)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "background 0.2s ease, transform 0.2s ease",
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Kinetic Typography & 3-Mode Blueprint Switcher ── */}
        <div
          style={{
            padding: "clamp(1.2rem, 2.5vw, 2.2rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.2rem",
          }}
        >
          <div>
            {/* Minimalist 2D Architectural Tab Switcher */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem",
                background: "rgba(26, 26, 26, 0.05)",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                marginBottom: "1.2rem",
                width: "fit-content",
                maxWidth: "100%",
                flexWrap: "wrap",
              }}
            >
              {[
                { id: "narrative", label: "01 // THE NARRATIVE" },
                { id: "pillars", label: "02 // CORE PILLARS" },
                { id: "leadership", label: "03 // LEADERSHIP & ACADEMICS" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      position: "relative",
                      border: "none",
                      background: "transparent",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "6px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: isActive ? "var(--bg)" : "var(--text)",
                      cursor: "pointer",
                      transition: "color 0.25s ease",
                      zIndex: 1,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="aboutSectionTab"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "var(--text)",
                          borderRadius: "6px",
                          zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 2D Tab Panels */}
            <AnimatePresence mode="wait">
              {activeTab === "narrative" && (
                <motion.div
                  key="panel-narrative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.45rem, 2.2vw, 2.1rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.05,
                      color: "var(--text)",
                      marginBottom: "0.8rem",
                    }}
                  >
                    ARCHITECTING HIGH-THROUGHPUT WEB SYSTEMS &amp; AGENTIC AI
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                      lineHeight: 1.65,
                      color: "var(--text)",
                      opacity: 0.9,
                      marginBottom: "1rem",
                    }}
                  >
                    {data.about.narrative}
                  </p>

                  <div
                    style={{
                      padding: "0.75rem 0.95rem",
                      background: "rgba(26, 26, 26, 0.04)",
                      borderLeft: "3px solid var(--text)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        fontStyle: "italic",
                        color: "var(--text)",
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      "Dedicated to transforming cutting-edge artificial intelligence and robust full-stack architecture into intuitive, high-performance digital reality."
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "pillars" && (
                <motion.div
                  key="panel-pillars"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
                    gap: "0.6rem",
                  }}
                >
                  {pillars.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                      style={{
                        padding: "0.85rem 0.9rem",
                        background: "rgba(26, 26, 26, 0.03)",
                        border: "1px solid var(--border)",
                        borderRadius: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(26, 26, 26, 0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(26, 26, 26, 0.03)";
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                          <span
                            className="label"
                            style={{
                              background: "rgba(26,26,26,0.08)",
                              padding: "0.15rem 0.4rem",
                              borderRadius: "2px",
                              fontWeight: 700,
                              color: "var(--text)",
                              fontSize: "0.58rem",
                            }}
                          >
                            {item.tag}
                          </span>
                          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            {item.index}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            fontSize: "1.05rem",
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            color: "var(--text)",
                            marginBottom: "0.25rem",
                            lineHeight: 1.1,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.76rem",
                            lineHeight: 1.4,
                            color: "var(--text)",
                            opacity: 0.85,
                            margin: 0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "leadership" && (
                <motion.div
                  key="panel-leadership"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                >
                  {/* Education Tile */}
                  <div
                    style={{
                      padding: "0.85rem 1rem",
                      background: "rgba(26, 26, 26, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                      <span className="label" style={{ fontWeight: 700, color: "var(--text)" }}>ACADEMIC FOUNDATION</span>
                      <span className="label">{data.education.period}</span>
                    </div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        lineHeight: 1.1,
                      }}
                    >
                      {data.education.institution}
                    </h4>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                      {data.education.degree} · Software Engineering &amp; AI Systems
                    </p>
                  </div>

                  {/* Leadership Achievements */}
                  <div
                    style={{
                      padding: "0.85rem 1rem",
                      background: "rgba(26, 26, 26, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                      <span className="label" style={{ fontWeight: 700, color: "var(--text)" }}>COMMUNITY DIRECTorship</span>
                      <span className="label">2023 — PRESENT</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {data.achievements.map((ach, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.45rem",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.78rem",
                            color: "var(--text)",
                            lineHeight: 1.35,
                          }}
                        >
                          <span style={{ color: "var(--text)", fontWeight: 900 }}>✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Action Strip: Explore Full Dossier Button + Social Coordinates ── */}
          <div
            style={{
              paddingTop: "0.9rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <Link
              href="/about"
              data-transition-dir="left"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "2px solid var(--text)",
                background: "transparent",
                color: "var(--text)",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.19, 1, 0.22, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--text)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span>EXPLORE FULL DOSSIER</span>
              <span style={{ fontSize: "1.1em", lineHeight: 1 }}>→</span>
            </Link>

            {/* Minimalist Social Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <a
                href={data.social.github}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                style={{
                  fontSize: "0.72rem",
                  padding: "0.3rem 0.5rem",
                }}
              >
                GITHUB ↗
              </a>
              <span style={{ color: "var(--border)" }}>/</span>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                style={{
                  fontSize: "0.72rem",
                  padding: "0.3rem 0.5rem",
                }}
              >
                LINKEDIN ↗
              </a>
              <span style={{ color: "var(--border)" }}>/</span>
              <a
                href={`mailto:${data.email}`}
                className="nav-link"
                style={{
                  fontSize: "0.72rem",
                  padding: "0.3rem 0.5rem",
                }}
              >
                EMAIL ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
