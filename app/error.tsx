"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem", textAlign: "center", gap: "1.5rem" }}>
    <h1 className="display" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>Something went wrong.</h1>
    <p>Please try again, or return to the homepage.</p>
    <button onClick={reset} style={{ padding: ".8rem 1.6rem", border: "2px solid var(--text)", borderRadius: "999px", background: "var(--text)", color: "var(--bg)", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800 }}>TRY AGAIN ↻</button>
    <Link href="/">Return home →</Link>
  </div>;
}
