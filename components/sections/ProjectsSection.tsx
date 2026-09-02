"use client";

import { featuredProjects, allProjects } from "@/data/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const featured = featuredProjects.slice(0, 4);
  const totalProjectsCount = featuredProjects.length + allProjects.length;

  return (
    <section id="projects" style={{ background: "var(--bg)", width: "100%", position: "relative" }}>
      {/* ── Giant Header Banner ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
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
          SELECTED WORKS
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
          FEATURED CASE STUDIES
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
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
            04 CURATED HIGHLIGHTS
          </span>
        </div>
      </div>

      {/* ── Clean 2-Column Editorial Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
          gap: 0,
          width: "100%",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {featured.map((project, i) => {
          const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              style={{
                borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                padding: "clamp(2rem, 4vw, 3.5rem) clamp(1.2rem, 3vw, 2.8rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "var(--bg)",
                transition: "background 0.3s ease",
              }}
            >
              <Link
                href={`/projects/${slug}`}
                data-transition-dir="right"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {/* 1. Image Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/10",
                    background: "#161616",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    marginBottom: "1.6rem",
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

                {/* 2. Metadata Bar (Index + Category) */}
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
                        color: "var(--text-muted)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="label"
                      style={{
                        background: "rgba(26,26,26,0.06)",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "2px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
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

                {/* 3. Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.015em",
                    lineHeight: 0.95,
                    color: "var(--text)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {project.title}
                </h3>

                {/* 4. Narrative Summary */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: "var(--text)",
                    opacity: 0.85,
                    marginBottom: "1.2rem",
                  }}
                >
                  {project.description}
                </p>

                {/* 5. Minimalist Tech Stack Pills */}
                {project.tech && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="label"
                        style={{
                          border: "1px solid var(--border)",
                          padding: "0.18rem 0.48rem",
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
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Signature Centered Capsule Action Button ── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(4.5rem, 8vw, 7.5rem) 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/works"
          data-transition-dir="up"
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
          ALL PROJECTS ({totalProjectsCount}) →
        </Link>
      </div>
    </section>
  );
}
