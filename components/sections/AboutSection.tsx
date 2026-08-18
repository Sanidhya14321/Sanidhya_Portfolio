"use client";

import { portfolioData } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  const data = portfolioData;

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Section heading */}
      <div style={{ padding: "2rem 2rem 0" }}>
        <RevealBlock>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem, 8vw, 8rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "var(--text)",
              marginBottom: "3rem",
            }}
          >
            ABOUT SANIDHYA
          </h2>
        </RevealBlock>
      </div>

      {/* Responsive layout — side-by-side on desktop, naturally stacked on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "0",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Left — Profile image */}
        <div
          style={{
            borderRight: "1px solid var(--border)",
            overflow: "hidden",
            aspectRatio: "4/5",
            background: "#1a1a1a",
          }}
        >
          <img
            src="/DSC02945.JPG"
            alt="Sanidhya Vats"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "grayscale(0.2) contrast(1.05)",
            }}
          />
        </div>

        {/* Right — Bio + details */}
        <div
          style={{
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <RevealBlock delay={0.1}>
              <p
                className="label"
                style={{ marginBottom: "1.5rem" }}
              >
                WHO&apos;S THIS?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
                  lineHeight: 1.7,
                  color: "var(--text)",
                  maxWidth: "50ch",
                }}
              >
                {data.about.narrative}
              </p>
            </RevealBlock>
          </div>

          {/* Highlights */}
          <div style={{ marginTop: "3rem" }}>
            <RevealBlock delay={0.2}>
              <p className="label" style={{ marginBottom: "1rem" }}>HIGHLIGHTS</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {data.about.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--text)", flexShrink: 0 }}>—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>

          {/* Education */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <RevealBlock delay={0.3}>
              <p className="label" style={{ marginBottom: "0.5rem" }}>EDUCATION</p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  textTransform: "uppercase",
                  color: "var(--text)",
                  lineHeight: 1.1,
                }}
              >
                {data.education.institution}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginTop: "0.3rem",
                }}
              >
                {data.education.degree} · {data.education.period}
              </p>
            </RevealBlock>
          </div>
        </div>
      </div>

      {/* Achievements row */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {data.achievements.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "1rem 2rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              className="label"
              style={{ minWidth: "2ch", color: "var(--text-muted)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--text)",
                lineHeight: 1.5,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
