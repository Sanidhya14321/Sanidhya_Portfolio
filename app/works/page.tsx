"use client";

import { useState } from "react";
import { featuredProjects, allProjects } from "@/data/portfolio";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const allCombined = [...featuredProjects, ...allProjects];

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const categories = [
    { label: "ALL", count: allCombined.length },
    { label: "AGENTIC AI", count: allCombined.filter((p) => (p.field || "").toUpperCase().includes("AGENTIC")).length },
    { label: "FULL STACK & ML", count: allCombined.filter((p) => (p.field || "").toUpperCase().includes("FULL STACK") || (p.field || "").toUpperCase().includes("ML")).length },
    { label: "WEB DEV", count: allCombined.filter((p) => (p.field || "").toUpperCase().includes("WEB")).length },
    { label: "SYSTEMS", count: allCombined.filter((p) => (p.field || "").toUpperCase().includes("SYSTEM") || (p.field || "").toUpperCase().includes("DATA")).length },
  ];

  const filteredProjects = allCombined.filter((p) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "AGENTIC AI") return (p.field || "").toUpperCase().includes("AGENTIC");
    if (activeFilter === "FULL STACK & ML") return (p.field || "").toUpperCase().includes("FULL STACK") || (p.field || "").toUpperCase().includes("ML");
    if (activeFilter === "WEB DEV") return (p.field || "").toUpperCase().includes("WEB");
    if (activeFilter === "SYSTEMS") return (p.field || "").toUpperCase().includes("SYSTEM") || (p.field || "").toUpperCase().includes("DATA");
    return true;
  });

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100svh",
        paddingTop: "clamp(4.5rem, 8vh, 7rem)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── 1. Page Header with Title & Filter Bar ── */}
      <section
        style={{
          padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: "0.5rem", letterSpacing: "0.12em" }}>
              ARCHIVE / 2023 — 2026
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(3.8rem, 14vw, 15rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 0.82,
                color: "var(--text)",
                margin: 0,
              }}
            >
              WORKS ({allCombined.length})
            </h1>
          </div>

          <span
            className="label"
            style={{
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "0.1em",
            }}
          >
            SHOWING {filteredProjects.length} OF {allCombined.length} PROJECTS
          </span>
        </div>

        {/* ── Elegant Interactive Filter Pills ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat.label;

            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveFilter(cat.label)}
                style={{
                  position: "relative",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "999px",
                  border: "1px solid var(--text)",
                  background: isActive ? "var(--text)" : "transparent",
                  color: isActive ? "var(--bg)" : "var(--text)",
                  cursor: "pointer",
                  transition: "color 0.2s ease, background-color 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="worksActiveFilterPill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "999px",
                      background: "var(--text)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    opacity: isActive ? 0.8 : 0.5,
                  }}
                >
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 2. Pure Editorial Gallery Grid ── */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: 0,
            width: "100%",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <motion.div
                  layout
                  key={slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.03,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  style={{
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    padding: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    background: "var(--bg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.3s ease",
                  }}
                >
                  <Link
                    href={`/projects/${slug}`}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    {/* Top Metadata Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            fontSize: "1rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="label"
                          style={{
                            background: "rgba(26,26,26,0.06)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "2px",
                            fontWeight: 700,
                            color: "var(--text)",
                          }}
                        >
                          {project.field || "ENGINEERING"}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          color: "var(--text)",
                        }}
                      >
                        ↗
                      </span>
                    </div>

                    {/* Framed Image Showcase */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/10",
                        background: "#161616",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                        marginBottom: "1.4rem",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                        }}
                        loading="lazy"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.015em",
                        lineHeight: 0.95,
                        color: "var(--text)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Narrative Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                        color: "var(--text)",
                        opacity: 0.85,
                        marginBottom: "1.2rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Minimalist Tech Tags */}
                    {project.tech && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="label"
                            style={{
                              border: "1px solid var(--border)",
                              padding: "0.15rem 0.45rem",
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
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
