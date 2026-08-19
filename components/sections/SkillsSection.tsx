"use client";

import { portfolioData } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skills = portfolioData.skills;
  const categories = Object.keys(skills);
  const subPills = ["LANGUAGES", "FRAMEWORKS", "AI / ML", "SYSTEMS"];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerX = useTransform(scrollYProgress, [0, 1], ["-2vw", "2vw"]);

  return (
    <section ref={sectionRef} id="skills" style={{ background: "var(--bg)", width: "100%" }}>
      {/* ── Giant SKILLS Section Banner ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <motion.h2
          style={{
            x: headerX,
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
          SKILLS
        </motion.h2>
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
          TECHNICAL CAPABILITIES
        </span>

        {/* Right Pill Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {subPills.map((pill) => (
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

      {/* ── Categorized Skills Grid (Zero metrics / No bars) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: 0,
        }}
      >
        {categories.map((cat, ci) => {
          const items = (skills as Record<string, { name: string; level: number }[]>)[cat];
          const catNum = String(ci + 1).padStart(2, "0");

          return (
            <div
              key={cat}
              style={{
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "clamp(2rem, 3.5vw, 3rem) clamp(1.2rem, 3vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <RevealBlock delay={ci * 0.05}>
                <div>
                  {/* Category Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                      paddingBottom: "0.8rem",
                      borderBottom: "1px solid var(--border)",
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
                      {catNum}
                    </span>
                    <h3
                      className="label"
                      style={{
                        color: "var(--text)",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        margin: 0,
                      }}
                    >
                      {cat}
                    </h3>
                  </div>

                  {/* Clean Skill Badges (No progress bars or percentages) */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {items.map((skill) => (
                      <span
                        key={skill.name}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)",
                          fontWeight: 500,
                          padding: "0.45rem 0.9rem",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          background: "rgba(26,26,26,0.03)",
                          color: "var(--text)",
                          display: "inline-block",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            </div>
          );
        })}
      </div>
    </section>
  );
}
