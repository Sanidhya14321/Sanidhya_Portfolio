"use client";

import { portfolioData } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
        transition: `opacity 0.7s cubic-bezier(0.19,1,0.22,1) ${delay}s, transform 0.7s cubic-bezier(0.19,1,0.22,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ExperienceSection() {
  const data = portfolioData;
  const pills = ["DEVELOPMENT", "COMMUNITY", "HACKATHONS"];

  return (
    <section id="experience" style={{ background: "var(--bg)", width: "100%" }}>
      {/* ── Giant EXPERIENCE Section Banner ── */}
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
          CAREER &amp; LEADERSHIP
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

      {/* ── Experience Timeline Rows ── */}
      <div>
        {data.experience.map((exp, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid var(--border)",
              padding: "clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)",
            }}
          >
            <RevealItem delay={i * 0.05}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                  gap: "clamp(1.5rem, 3vw, 3rem)",
                  alignItems: "start",
                }}
              >
                {/* Column 1: Role, Company & Period */}
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="label"
                      style={{
                        background: "rgba(26,26,26,0.06)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "2px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.015em",
                      lineHeight: 0.95,
                      color: "var(--text)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {exp.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {exp.company}
                  </p>
                </div>

                {/* Column 2: Narrative & Measurable Impact */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                      lineHeight: 1.65,
                      color: "var(--text)",
                      marginBottom: exp.impact ? "1.2rem" : "0",
                    }}
                  >
                    {exp.description}
                  </p>

                  {exp.impact && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        padding: "0.8rem 1rem",
                        background: "rgba(26,26,26,0.04)",
                        borderLeft: "2px solid var(--text)",
                        borderRadius: "0 4px 4px 0",
                      }}
                    >
                      <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>✦</span>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: "var(--text)",
                        }}
                      >
                        {exp.impact}
                      </p>
                    </div>
                  )}

                  {/* Tech stack pill tags */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                        marginTop: "1.5rem",
                      }}
                    >
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="label"
                          style={{
                            border: "1px solid var(--border)",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "2px",
                            color: "var(--text)",
                            fontSize: "0.625rem",
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
            </RevealItem>
          </div>
        ))}
      </div>
    </section>
  );
}
