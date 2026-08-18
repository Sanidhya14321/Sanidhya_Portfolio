"use client";

import { featuredProjects } from "@/data/portfolio";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

function ProjectCard({
  project,
  index,
  aspectRatio = "16/10",
  isWide = false,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
  aspectRatio?: string;
  isWide?: boolean;
}) {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const slug = project.id || project.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/projects/${slug}`}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.7s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.08}s`,
          aspectRatio: aspectRatio,
          minHeight: isWide ? "clamp(300px, 42vw, 560px)" : "clamp(260px, 32vw, 440px)",
          background: "#161616",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {/* Project Image - Static, no hover zoom */}
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: "none",
          }}
          loading="lazy"
        />

        {/* Clean Static Bottom Title Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(1.5rem, 3.5vw, 3rem)",
          }}
        >
          <div>
            <p
              className="label"
              style={{
                color: "rgba(232, 228, 220, 0.75)",
                marginBottom: "0.5rem",
                letterSpacing: "0.12em",
              }}
            >
              {project.field || project.tech[0]}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: isWide
                  ? "clamp(2rem, 5vw, 4.5rem)"
                  : "clamp(1.6rem, 3.5vw, 3rem)",
                textTransform: "uppercase",
                color: "var(--text-cream)",
                lineHeight: 0.92,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Corner Badge */}
        <div
          style={{
            position: "absolute",
            top: "clamp(1rem, 2.5vw, 1.8rem)",
            left: "clamp(1rem, 2.5vw, 1.8rem)",
            zIndex: 3,
          }}
        >
          <span
            className="label"
            style={{
              background: "var(--bg)",
              padding: "0.3rem 0.8rem",
              borderRadius: "2px",
              color: "var(--text)",
              fontWeight: 600,
              fontSize: "0.6875rem",
            }}
          >
            {project.field || "ENGINEERING"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const featured = featuredProjects.slice(0, 4);

  const pills = ["CONCEPTUAL", "EXPRESSIVE", "IMMERSIVE"];

  return (
    <section id="projects" style={{ background: "var(--bg)", width: "100%" }}>
      {/* ── Signature Giant FEATURED WORKS Section Banner (Matching Reference Site) ── */}
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
          FEATURED WORKS
        </h2>
      </div>

      {/* ── Subheader Bar with Category Insights & Pill Tags ── */}
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
          DESIGN INSIGHTS
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

      {/* ── 1. Top Wide Hero Project Banner (e.g. Arizona Diamondbacks style) ── */}
      {featured[0] && (
        <div style={{ width: "100%" }}>
          <ProjectCard project={featured[0]} index={0} isWide={true} aspectRatio="21/9" />
        </div>
      )}

      {/* ── 2. Mid 2-Column Split Grid (e.g. Home in Hotpot & Find Your Community) ── */}
      {featured.length > 2 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: 0,
            width: "100%",
          }}
        >
          {featured[1] && (
            <div style={{ borderRight: "1px solid var(--border)" }}>
              <ProjectCard project={featured[1]} index={1} isWide={false} aspectRatio="16/10" />
            </div>
          )}
          {featured[2] && (
            <div>
              <ProjectCard project={featured[2]} index={2} isWide={false} aspectRatio="16/10" />
            </div>
          )}
        </div>
      )}

      {/* ── 3. Bottom Wide Full-Width Project Banner (e.g. Where Brilliant Minds...) ── */}
      {featured[3] && (
        <div style={{ width: "100%" }}>
          <ProjectCard project={featured[3]} index={3} isWide={true} aspectRatio="21/9" />
        </div>
      )}

      {/* ── 4. Prominent Center 'SEE ALL WORK' Pill Button ── */}
      <div
        style={{
          width: "100%",
          padding: "clamp(5rem, 10vw, 8.5rem) 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href="/works"
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
          SEE ALL WORK
        </Link>
      </div>
    </section>
  );
}
