"use client";

import { useState } from "react";
import { featuredProjects, allProjects } from "@/data/portfolio";
import Link from "next/link";

const allCombined = [...featuredProjects, ...allProjects];

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const categories = ["ALL", "AGENTIC AI", "FULL STACK & ML", "WEB DEVELOPMENT", "ML CORE"];

  const filteredProjects = allCombined.filter((p) => {
    if (activeFilter === "ALL") return true;
    return (p.field || "").toUpperCase().includes(activeFilter);
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(4rem, 7vh, 6rem)" }}>
      {/* Page Heading Header */}
      <section style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 13vw, 14rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
              color: "var(--text)",
            }}
          >
            WORKS ({allCombined.length})
          </h1>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginTop: "2rem",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "999px",
                  border: "1px solid var(--text)",
                  background: isActive ? "var(--text)" : "transparent",
                  color: isActive ? "var(--bg)" : "var(--text)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of Work Cards */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: 0,
          }}
        >
          {filteredProjects.map((project) => {
            const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  className="work-tile"
                  data-cursor="view"
                  style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    background: "#1a1a1a",
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    overflow: "hidden",
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
                      transition: "transform 0.7s cubic-bezier(0.19, 1, 0.22, 1)",
                    }}
                    loading="lazy"
                  />

                  {/* Corner Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      left: "1.2rem",
                      zIndex: 2,
                    }}
                  >
                    <span
                      className="label"
                      style={{
                        background: "var(--bg)",
                        padding: "0.25rem 0.7rem",
                        borderRadius: "2px",
                        color: "var(--text)",
                      }}
                    >
                      {project.field || "Engineering"}
                    </span>
                  </div>

                  {/* Bottom Title Bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "1.5rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                      color: "var(--text-cream)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        lineHeight: 0.9,
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
