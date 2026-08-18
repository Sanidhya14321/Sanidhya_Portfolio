"use client";

import { allProjects, featuredProjects } from "@/data/portfolio";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Combine projects for the Break / Experiments showcase
const breakItems = [
  ...allProjects,
  featuredProjects[3], // DataPipeline
].filter(Boolean).slice(0, 5);

export default function BreakTeaserSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="break"
      style={{
        background: "#0c0c0c",
        color: "var(--text-cream)",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Giant BREAK Title Banner ── */}
      <div
        style={{
          borderTop: "1px solid rgba(232, 228, 220, 0.15)",
          padding: "clamp(3rem, 6vw, 5.5rem) clamp(1rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(5rem, 18vw, 22rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.8,
            color: "var(--text-cream)",
            margin: 0,
            textAlign: "center",
            width: "100%",
            userSelect: "none",
          }}
        >
          BREAK
        </h2>
      </div>

      {/* ── Subheader Bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(232, 228, 220, 0.15)",
          borderBottom: "1px solid rgba(232, 228, 220, 0.15)",
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
            color: "rgba(232, 228, 220, 0.7)",
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          SHORT, EXPERIMENTAL DESIGNS
        </span>

        {/* Pill Badge */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: "1px solid rgba(232, 228, 220, 0.4)",
            color: "var(--text-cream)",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            display: "inline-block",
          }}
        >
          SMALL SCALE VISUAL
        </span>
      </div>

      {/* ── Interactive Numbered Big Typography List ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "clamp(3.5rem, 6vw, 6rem) clamp(1rem, 3vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            gap: "clamp(0.5rem, 1.5vw, 1.5rem)",
          }}
        >
          {breakItems.map((item, i) => {
            const slug = item.id || item.title.toLowerCase().replace(/\s+/g, "-");
            const num = String(i + 1).padStart(2, "0");
            const isHovered = hoveredIndex === i;
            const tiltDeg = i % 2 === 0 ? -5 : 5;

            return (
              <div
                key={slug}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Link
                  href={`/projects/${slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "inline-flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: "clamp(0.5rem, 1.5vw, 1.5rem)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    opacity: hoveredIndex !== null && !isHovered ? 0.35 : 1,
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Number Prefix */}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.2rem, 3vw, 2.8rem)",
                      color: "rgba(232, 228, 220, 0.6)",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      transform: "translateY(-0.3em)",
                    }}
                  >
                    {num}
                  </span>

                  {/* Quoted Giant Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(2.8rem, 8vw, 8.5rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.025em",
                      lineHeight: 0.9,
                      color: "var(--text-cream)",
                      margin: 0,
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    &ldquo;{item.title === "Real-Time Web Data Ingestion Pipeline" ? "DATA PIPELINE" : item.title}&rdquo;
                  </h3>
                </Link>

                {/* ── Floating Angled Preview Card on Hover ── */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.75, rotate: tiltDeg * 1.5, y: 15 }}
                      animate={{ opacity: 1, scale: 1, rotate: tiltDeg, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: tiltDeg * 1.2, y: 10 }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                      style={{
                        position: "absolute",
                        left: i % 2 === 0 ? "8%" : "auto",
                        right: i % 2 !== 0 ? "8%" : "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "clamp(220px, 25vw, 360px)",
                        aspectRatio: "16/10",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.15)",
                        pointerEvents: "none",
                        zIndex: 20,
                        background: "#1a1a1a",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Prominent 'SEE ALL WORK' Pill Button ── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(3rem, 6vw, 6rem) 2rem clamp(5rem, 8vw, 7.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/break"
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
            border: "2px solid rgba(232, 228, 220, 0.8)",
            background: "transparent",
            color: "var(--text-cream)",
            textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--text-cream)";
            e.currentTarget.style.color = "#0c0c0c";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-cream)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          SEE ALL WORK
        </Link>
      </div>
    </section>
  );
}
