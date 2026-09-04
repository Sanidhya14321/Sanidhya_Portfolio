"use client";

import { featuredProjects, allProjects } from "@/data/portfolio";
import Link from "next/link";
import HoverImageReveal from "@/components/originkit/ui/hover-image-reveal";

export default function ProjectsSection() {
  const featured = featuredProjects.slice(0, 6);
  const totalProjectsCount = featuredProjects.length + allProjects.length;

  const hoverItems = featured.map((project, i) => {
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");
    return {
      text: project.title.toUpperCase(),
      image: { src: project.image, alt: project.title },
      link: `/projects/${slug}`,
      index: String(i + 1).padStart(2, "0"),
      category: project.field || "ENGINEERING",
      tech: project.tech,
      description: project.description,
    };
  });

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
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            className="label"
            style={{
              color: "var(--text)",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            FEATURED CASE STUDIES
          </span>
          <span style={{ color: "var(--border)" }}>/</span>
          <span
            className="label"
            style={{
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            HOVER TO REVEAL PREVIEW
          </span>
        </div>

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
            0{featured.length} CURATED HIGHLIGHTS
          </span>
        </div>
      </div>

      {/* ── Originkit Hover Image Reveal Showcase ── */}
      <div style={{ width: "100%", position: "relative" }}>
        <HoverImageReveal
          items={hoverItems}
          layout="rows"
          textColor="var(--text)"
          dimColor="rgba(26, 26, 26, 0.22)"
          borderColor="var(--border)"
          imageWidth={420}
          imageHeight={270}
          rounded={8}
          offsetX={180}
          offsetY={-30}
          followStrength={5}
          font={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        />
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
