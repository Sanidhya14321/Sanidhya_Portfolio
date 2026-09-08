"use client";

import { ConnoisseurStackInteractor } from "@/components/ui/connoisseur-stack-interactor";
import { eventsData } from "@/data/portfolio";

export default function EventsSection() {
  return (
    <section 
      id="events" 
      style={{ 
        background: "transparent", 
        width: "100%", 
        position: "relative" 
      }}
    >
      {/* ── Giant Header Banner — Exactly matching ProjectsSection ── */}
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
          EVENTS & TALKS
        </h2>
      </div>

      {/* ── Subheader Bar — Exactly matching ProjectsSection ── */}
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
            COMMUNITY ARCHIVES
          </span>
          <span style={{ color: "var(--border)" }}>/</span>
          <span
            className="label"
            style={{
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            HOVER TO REVEAL KEYNOTES
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
            }}
          >
            05 KEYNOTES & MEETS
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              padding: "0.35rem 0.6rem",
            }}
          >
            15,000+ REACH
          </span>
        </div>
      </div>

      {/* ── Interactive High-Performance Geometric Morphing Interactor ── */}
      <div style={{ width: "100%" }}>
        <ConnoisseurStackInteractor items={eventsData} />
      </div>

      {/* ── Sub-Footer Info Banner matching Projects Section ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem clamp(1rem, 3vw, 2.5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.2rem",
          background: "rgba(26, 26, 26, 0.02)"
        }}
      >
        <div className="flex items-center gap-6 text-[11px] md:text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <span>✦ 15,000+ REGISTRATIONS</span>
          <span>✦ 5+ COMMUNITY SUMMITS</span>
          <span>✦ KEYNOTES & WORKSHOPS</span>
        </div>
        <div className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          INTERACTIVE GSAP MORPHING ARCHIVE
        </div>
      </div>
    </section>
  );
}
