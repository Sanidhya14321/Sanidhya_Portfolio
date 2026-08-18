"use client";

import { allProjects } from "@/data/portfolio";
import Link from "next/link";

export default function BreakPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(4rem, 7vh, 6rem)" }}>
      {/* Header */}
      <section style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)", borderBottom: "1px solid var(--border)" }}>
        <p className="label" style={{ marginBottom: "1rem" }}>(PLAYGROUND &amp; SIDE PROJECTS)</p>
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
          BREAK &amp; EXPERIMENTS
        </h1>
      </section>

      {/* Grid of Break Projects */}
      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {allProjects.map((project, i) => {
            const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <div
                key={project.id || project.title}
                style={{
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  padding: "clamp(1.8rem, 3vw, 2.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "320px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                    <span className="label" style={{ color: "var(--text-muted)" }}>
                      EXPR — {String(i + 1).padStart(2, "0")}
                    </span>
                    {project.status && (
                      <span className="label" style={{ background: "rgba(26,26,26,0.06)", padding: "0.2rem 0.5rem", borderRadius: "2px" }}>
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                      color: "var(--text)",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      marginBottom: "2rem",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {project.tech.map((t) => (
                      <span key={t} className="label" style={{ border: "1px solid var(--border)", padding: "0.15rem 0.4rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <Link
                      href={`/projects/${slug}`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        textDecoration: "none",
                        borderBottom: "1.5px solid var(--text)",
                      }}
                    >
                      EXPLORE CASE STUDY →
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label"
                        style={{ color: "var(--text-muted)", textDecoration: "none" }}
                      >
                        GITHUB ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
