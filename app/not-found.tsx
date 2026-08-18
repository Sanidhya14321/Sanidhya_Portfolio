"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "2rem",
        background: "var(--bg)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(8rem, 20vw, 18rem)",
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: "var(--text)",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--text-muted)",
          marginTop: "2rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Page not found
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text)",
          textDecoration: "none",
          borderBottom: "2px solid var(--text)",
          paddingBottom: "2px",
          transition: "opacity 0.2s ease",
        }}
      >
        RETURN HOME →
      </Link>
    </div>
  );
}
