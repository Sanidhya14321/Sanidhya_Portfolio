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
    <div style={{ background: "var(--bg)", minHeight: "100svh", paddingTop: "clamp(3.5rem, 6vh, 5rem)" }}>
      {/* ── Top Hero Section ── */}
      <section style={{ padding: "clamp(2rem, 3vw, 3rem) clamp(1.2rem, 3vw, 2.5rem) 2rem", borderBottom: "1px solid var(--border)" }}>
        {/* Back Link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/works"
            className="label"
            style={{
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ← ALL WORKS
          </Link>
        </div>

        {/* Title & Category Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              className="label"
              style={{
                border: "1px solid var(--border)",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
                color: "var(--text)",
              }}
            >
              {project.field || "ENGINEERING"}
            </span>
            {project.status && (
              <span className="label" style={{ color: "var(--text-muted)" }}>
                ● {project.status}
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 10vw, 11rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "var(--text)",
            }}
          >
            {project.title}
          </h1>
        </div>

        {/* Metadata Bar & Action Links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              maxWidth: "45ch",
              color: "var(--text)",
              lineHeight: 1.5,
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  padding: "0.8rem 1.8rem",
                  background: "var(--text)",
                  color: "var(--bg)",
                  textDecoration: "none",
                  display: "inline-block",
                  letterSpacing: "0.05em",
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
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  padding: "0.8rem 1.8rem",
                  border: "1px solid var(--text)",
                  color: "var(--text)",
                  textDecoration: "none",
                  display: "inline-block",
                  letterSpacing: "0.05em",
                }}
              >
                GITHUB REPO ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Banner Image Showcase ── */}
      <section style={{ width: "100%", background: "#1a1a1a", borderBottom: "1px solid var(--border)" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            maxHeight: "75vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </section>

      {/* ── Detailed Architecture & Tech Stack Grid ── */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 3vw, 2.5rem)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          {/* Tech Stack */}
          <div>
            <h3 className="label" style={{ marginBottom: "1.5rem" }}>TECHNOLOGY STACK</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    padding: "0.4rem 0.8rem",
                    background: "rgba(26,26,26,0.06)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {project.detailedDescription && (
              <div style={{ marginTop: "3rem" }}>
                <h3 className="label" style={{ marginBottom: "1rem" }}>PROJECT OVERVIEW</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text)" }}>
                  {project.detailedDescription}
                </p>
              </div>
            )}
          </div>

          {/* Highlights & Achievements */}
          <div>
            <h3 className="label" style={{ marginBottom: "1.5rem" }}>KEY HIGHLIGHTS</h3>
            {project.highlights && project.highlights.length > 0 ? (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {project.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "var(--text)",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "var(--text-muted)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Built with scalable architecture, high performance standards, and production-grade code.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Secondary Gallery Showcase ── */}
      {imagesList.length > 1 && (
        <section style={{ padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 3vw, 2.5rem)", borderBottom: "1px solid var(--border)" }}>
          <h3 className="label" style={{ marginBottom: "2rem" }}>VISUAL GALLERY</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "1.5rem" }}>
            {imagesList.map((imgSrc, idx) => (
              <div key={idx} style={{ background: "#1a1a1a", border: "1px solid var(--border)", overflow: "hidden" }}>
                <img
                  src={imgSrc}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Next Project Transition Footer (matching reference) ── */}
      <Link
        href={`/projects/${nextSlug}`}
        style={{
          textDecoration: "none",
          display: "block",
          background: "var(--bg-dark)",
          color: "var(--text-cream)",
          padding: "5rem 2rem",
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <span
            className="label"
            style={{ color: "rgba(232,228,220,0.5)", display: "block", marginBottom: "1rem" }}
          >
            NEXT PROJECT →
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem, 9vw, 9rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--text-cream)",
            }}
          >
            {nextProject.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
