import { featuredProjects, allProjects, PortfolioProject } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const combinedProjects: PortfolioProject[] = [...featuredProjects, ...allProjects];

// Pre-generate static params for static site optimization
export function generateStaticParams() {
  return combinedProjects.map((p) => ({
    id: p.id || p.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const project = combinedProjects.find(
      (p) => (p.id || p.title.toLowerCase().replace(/\s+/g, "-")) === id
    );
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} — Sanidhya Vats`,
      description: project.description,
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentIndex = combinedProjects.findIndex(
    (p) => (p.id || p.title.toLowerCase().replace(/\s+/g, "-")) === id
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project = combinedProjects[currentIndex];
  const nextIndex = (currentIndex + 1) % combinedProjects.length;
  const nextProject = combinedProjects[nextIndex];
  const nextSlug = nextProject.id || nextProject.title.toLowerCase().replace(/\s+/g, "-");

  const imagesList = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(4rem, 7vh, 6.5rem)" }}>
      {/* ── 1. Header & Title Section ── */}
      <section
        style={{
          padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3.5rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Back Crumb */}
        <div style={{ marginBottom: "1.8rem" }}>
          <Link
            href="/works"
            className="label"
            style={{
              color: "var(--text)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              transition: "opacity 0.2s ease",
            }}
          >
            ← ALL WORKS ({combinedProjects.length})
          </Link>
        </div>

        {/* Category & Status Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "var(--text)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.3rem 0.8rem",
              borderRadius: "999px",
            }}
          >
            {project.field || "ENGINEERING"}
          </span>

          {project.status && (
            <span
              className="label"
              style={{
                background: "rgba(26,26,26,0.06)",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                color: "var(--text)",
                fontWeight: 600,
              }}
            >
              ● {project.status}
            </span>
          )}
        </div>

        {/* Giant Display Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 11vw, 12rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            color: "var(--text)",
            margin: "0 0 2rem 0",
          }}
        >
          {project.title}
        </h1>

        {/* Narrative & Action Capsule Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
              maxWidth: "50ch",
              color: "var(--text)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {project.description}
          </p>

          {/* Action Capsule Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  padding: "0.85rem 2rem",
                  borderRadius: "999px",
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "2px solid var(--text)",
                  textDecoration: "none",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                LIVE DEMO ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  padding: "0.85rem 2rem",
                  borderRadius: "999px",
                  border: "2px solid var(--text)",
                  background: "transparent",
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                GITHUB REPO ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. Full-Width Main Media Banner Showcase ── */}
      <section
        style={{
          width: "100%",
          background: "#141414",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ── 3. Editorial Architecture & System Specifications ── */}
      <section
        style={{
          padding: "clamp(3rem, 6vw, 5.5rem) clamp(1.2rem, 3vw, 2.5rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          {/* Column 1: Tech Stack & Overview */}
          <div>
            <p className="label" style={{ marginBottom: "1.2rem", letterSpacing: "0.1em" }}>
              (SYSTEM DELIVERABLES &amp; TECH)
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "0.35rem 0.8rem",
                    background: "rgba(26,26,26,0.06)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    color: "var(--text)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {project.detailedDescription && (
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.8rem" }}>
                <p className="label" style={{ marginBottom: "0.8rem", letterSpacing: "0.1em" }}>
                  ARCHITECTURE DEEP DIVE
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "var(--text)",
                  }}
                >
                  {project.detailedDescription}
                </p>
              </div>
            )}
          </div>

          {/* Column 2: Key Capabilities & Highlights */}
          <div>
            <p className="label" style={{ marginBottom: "1.2rem", letterSpacing: "0.1em" }}>
              (KEY CAPABILITIES &amp; HIGHLIGHTS)
            </p>

            {project.highlights && project.highlights.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {project.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.9rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "var(--text)",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Architected with high scalability, fault tolerance, and clean user-centric interactive interfaces.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Secondary Screenshot Gallery ── */}
      {imagesList.length > 1 && (
        <section
          style={{
            padding: "clamp(3rem, 6vw, 5.5rem) clamp(1.2rem, 3vw, 2.5rem)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <p className="label" style={{ marginBottom: "2rem", letterSpacing: "0.1em" }}>
              VISUAL GALLERY &amp; SCREENSHOTS
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: "1.5rem",
              }}
            >
              {imagesList.map((imgSrc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#161616",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    aspectRatio: "16/10",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Next Project Transition Banner ── */}
      <Link
        href={`/projects/${nextSlug}`}
        style={{
          textDecoration: "none",
          display: "block",
          background: "var(--bg-dark)",
          color: "var(--text-cream)",
          padding: "clamp(4.5rem, 8vh, 7rem) clamp(1.2rem, 3vw, 2.5rem)",
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <span
            className="label"
            style={{
              color: "rgba(232,228,220,0.6)",
              display: "block",
              marginBottom: "1rem",
              letterSpacing: "0.12em",
            }}
          >
            NEXT PROJECT →
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.2rem, 10vw, 10rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "var(--text-cream)",
              margin: 0,
            }}
          >
            {nextProject.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
