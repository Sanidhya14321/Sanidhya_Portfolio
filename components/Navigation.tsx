"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Live clock with city, time, GMT offset
function LiveClock() {
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const tzOffset = -now.getTimezoneOffset();
      const sign = tzOffset >= 0 ? "+" : "-";
      const absOffset = Math.abs(tzOffset);
      const oh = Math.floor(absOffset / 60);
      setTime(`${hh}:${mm}`);
      setOffset(`GMT${sign}${oh}`);
    }
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {time} {offset}
    </span>
  );
}

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
];

export default function Navigation() {
  const pathname = usePathname();

  const city = "NEW DELHI, IN";
  const coords = "28.6139° N, 77.2090° E";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "none",
        borderBottom: "none",
        mixBlendMode: "difference",
        width: "100%",
      }}
    >
      <div
        className="flex items-center justify-between pointer-events-auto"
        style={{
          padding: "1rem clamp(0.75rem, 2.5vw, 2.5rem)",
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.6rem, 1.2vw, 0.6875rem)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#ffffff",
          width: "100%",
        }}
      >
        {/* Left — location + time + coords */}
        <div className="flex items-center" style={{ gap: "clamp(0.4rem, 1.5vw, 1rem)" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ffffff",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {city}
          </Link>
          <span style={{ color: "#ffffff", whiteSpace: "nowrap" }}>
            <LiveClock />
          </span>
          <span className="hidden md:inline" style={{ color: "#ffffff", opacity: 0.85, whiteSpace: "nowrap" }}>
            {coords}
          </span>
        </div>

        {/* Right — nav links matching reference */}
        <nav aria-label="Main navigation">
          <ul
            className="flex items-center list-none m-0 p-0"
            style={{ gap: "clamp(0.6rem, 2vw, 1.5rem)" }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.6rem, 1.2vw, 0.6875rem)",
                      fontWeight: isActive ? 800 : 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#ffffff",
                      textDecoration: "none",
                      borderBottom: isActive ? "1.5px solid #ffffff" : "none",
                      paddingBottom: "2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
