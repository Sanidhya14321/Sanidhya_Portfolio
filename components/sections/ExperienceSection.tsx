"use client";

import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ExperienceSection() {
  const data = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const items = data.experience;
  const totalItems = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  const colWidth = 540;
  const cardWidth = 440;
  const svgWidth = totalItems * colWidth + 800;
  const waveSpineY = 320; // Center Y of wave band
  const waveAmplitude = 120; // Wave weaves between Y=200 and Y=440

  // Horizontal translation for desktop track: centers on first card at start, centers on last card at end
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0px", `-${(totalItems - 1) * colWidth}px`]
  );

  const pills = ["DEVELOPMENT", "COMMUNITY", "HACKATHONS"];

  // Key wave nodes along the bezier spine:
  // Item 0: Top wave crest (y: 200) -> Card is placed BELOW the wave (top: 480px)
  // Item 1: Bottom wave trough (y: 440) -> Card is placed ABOVE the wave (top: 40px)
  // Item 2: Top wave crest (y: 200) -> Card is placed BELOW the wave (top: 480px)
  // Item 3: Bottom wave trough (y: 440) -> Card is placed ABOVE the wave (top: 40px)
  const nodePoints = items.map((_, i) => {
    const isTopNode = i % 2 === 0;
    const px = cardWidth / 2 + i * colWidth;
    const py = isTopNode ? waveSpineY - waveAmplitude : waveSpineY + waveAmplitude;
    return { x: px, y: py, isTopNode };
  });

  // Construct smooth continuous cubic bezier wave path
  let wavePath = `M -300 ${nodePoints[0].y} L 0 ${nodePoints[0].y}`;
  for (let i = 0; i < nodePoints.length; i++) {
    const pt = nodePoints[i];
    if (i === 0) {
      wavePath += ` Q ${pt.x / 2} ${pt.y} ${pt.x} ${pt.y}`;
    } else {
      const prev = nodePoints[i - 1];
      const cpX = (prev.x + pt.x) / 2;
      wavePath += ` C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
    }
  }
  const lastPt = nodePoints[nodePoints.length - 1];
  wavePath += ` L ${lastPt.x + 600} ${lastPt.y}`;

  return (
    <section id="experience" style={{ background: "var(--bg)", width: "100%", position: "relative" }}>
      {/* ── Giant Header Banner ── */}
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
          EXPERIENCE
        </h2>
      </div>

      {/* ── Subheader Bar with Live Journey Tracker ── */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            className="label"
            style={{
              color: "var(--text)",
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            CAREER &amp; LEADERSHIP
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            INTERACTIVE JOURNEY →
          </span>
        </div>

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

      {/* ── Desktop & Tablet View (Sticky Horizontal Wavy Scroll) ── */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          style={{
            position: "relative",
            height: `${totalItems * 85 + 100}vh`,
            minHeight: "340vh",
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              minHeight: "720px",
              maxHeight: "960px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {/* Top Linear Progress Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "rgba(26,26,26,0.08)",
                zIndex: 40,
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "var(--text)",
                  scaleX: smoothProgress,
                  transformOrigin: "left",
                }}
              />
            </div>

            {/* Horizontal Track with Centered Viewport Start */}
            <motion.div
              style={{
                x,
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: `${svgWidth}px`,
                height: "640px",
                willChange: "transform",
              }}
            >
              {/* ── Background SVG Wavy Curve ── */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: "calc(50vw - 220px)",
                  width: `${svgWidth}px`,
                  height: "640px",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
                viewBox={`0 0 ${svgWidth} 640`}
                fill="none"
              >
                {/* Background dashed path */}
                <path
                  d={wavePath}
                  stroke="rgba(26, 26, 26, 0.2)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  fill="none"
                />

                {/* Animated progress filled path */}
                <motion.path
                  d={wavePath}
                  stroke="var(--text)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: smoothProgress }}
                />

                {/* Milestone Nodes & Vertical Connector Pins */}
                {nodePoints.map((node, i) => {
                  const isTopNode = node.isTopNode;
                  const pinTargetY = isTopNode ? node.y + 70 : node.y - 70;

                  return (
                    <g key={i}>
                      {/* Vertical Connector Line linking wave node to card */}
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={node.x}
                        y2={pinTargetY}
                        stroke="rgba(26, 26, 26, 0.4)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Outer Ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="14"
                        fill="var(--bg)"
                        stroke="var(--text)"
                        strokeWidth="3"
                      />
                      {/* Inner Dot */}
                      <circle cx={node.x} cy={node.y} r="5" fill="var(--text)" />

                      {/* Node Label */}
                      <text
                        x={node.x}
                        y={isTopNode ? node.y - 20 : node.y + 28}
                        textAnchor="middle"
                        fill="var(--text)"
                        fontFamily="var(--font-display)"
                        fontWeight="900"
                        fontSize="14"
                        letterSpacing="0.05em"
                      >
                        0{i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* ── Alternating Cards Container (Zero Overlap Guaranteed) ── */}
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  zIndex: 10,
                  paddingLeft: "calc(50vw - 220px)",
                  height: "640px",
                }}
              >
                {items.map((exp, i) => {
                  const isTopNode = i % 2 === 0;
                  // When node is top (y:200), card is BELOW the wave (top: 310px)
                  // When node is bottom (y:440), card is ABOVE the wave (top: 30px)
                  const cardTop = isTopNode ? "310px" : "30px";

                  return (
                    <div
                      key={i}
                      style={{
                        width: `${colWidth}px`,
                        flexShrink: 0,
                        position: "relative",
                        height: "640px",
                      }}
                    >
                      {/* Experience Card */}
                      <div
                        style={{
                          position: "absolute",
                          top: cardTop,
                          left: 0,
                          width: `${cardWidth}px`,
                          background: "rgba(232, 228, 220, 0.96)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "1.5rem 1.8rem",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                          transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        }}
                      >
                        {/* Period & Milestone Tag */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.6rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 900,
                                fontSize: "1.1rem",
                                color: "var(--text)",
                              }}
                            >
                              0{i + 1}
                            </span>
                            <span
                              className="label"
                              style={{
                                background: "rgba(26,26,26,0.08)",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "2px",
                                fontWeight: 700,
                                color: "var(--text)",
                              }}
                            >
                              {exp.period}
                            </span>
                          </div>
                          <span className="label" style={{ fontWeight: 600 }}>
                            {exp.company}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                            textTransform: "uppercase",
                            letterSpacing: "-0.015em",
                            lineHeight: 0.95,
                            color: "var(--text)",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {exp.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            lineHeight: 1.5,
                            color: "var(--text)",
                            marginBottom: exp.impact ? "0.8rem" : "0",
                          }}
                        >
                          {exp.description}
                        </p>

                        {/* Impact */}
                        {exp.impact && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.5rem",
                              padding: "0.5rem 0.75rem",
                              background: "rgba(26,26,26,0.04)",
                              borderLeft: "2px solid var(--text)",
                              borderRadius: "0 3px 3px 0",
                              marginBottom: "0.8rem",
                            }}
                          >
                            <span style={{ fontWeight: 900, fontSize: "0.8rem" }}>✦</span>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.78rem",
                                lineHeight: 1.4,
                                color: "var(--text)",
                                margin: 0,
                              }}
                            >
                              {exp.impact}
                            </p>
                          </div>
                        )}

                        {/* Tech Tags */}
                        {exp.tech && exp.tech.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="label"
                                style={{
                                  border: "1px solid var(--border)",
                                  padding: "0.15rem 0.4rem",
                                  borderRadius: "2px",
                                  color: "var(--text)",
                                  fontSize: "0.6rem",
                                  fontWeight: 600,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile View: Vertical Timeline with Wavy Left Guide (100% Fluid & Clean) ── */}
      <div className="block md:hidden" style={{ padding: "2rem clamp(1rem, 3vw, 1.5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {items.map((exp, i) => (
            <div
              key={i}
              style={{
                background: "rgba(232, 228, 220, 0.95)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "1.4rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="label"
                    style={{
                      background: "rgba(26,26,26,0.08)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "2px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <span className="label" style={{ fontWeight: 600 }}>
                  {exp.company}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.015em",
                  lineHeight: 0.95,
                  color: "var(--text)",
                  marginBottom: "0.4rem",
                }}
              >
                {exp.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--text)",
                  marginBottom: exp.impact ? "0.8rem" : "0",
                }}
              >
                {exp.description}
              </p>

              {exp.impact && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    background: "rgba(26,26,26,0.04)",
                    borderLeft: "2px solid var(--text)",
                    borderRadius: "0 3px 3px 0",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: "0.8rem" }}>✦</span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      lineHeight: 1.4,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {exp.impact}
                  </p>
                </div>
              )}

              {exp.tech && exp.tech.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="label"
                      style={{
                        border: "1px solid var(--border)",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "2px",
                        color: "var(--text)",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
