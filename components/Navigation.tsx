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
  { href: "/break", label: "BREAK" },
  { href: "/about", label: "ABOUT" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const city = "NEW DELHI, IN";
  const coords = "28.6139° N, 77.2090° E";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(232, 228, 220, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26, 26, 26, 0.1)" : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: "1rem 1.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.6875rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
        }}
      >
        {/* Left — location + time + coords */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--text)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {city}
          </Link>
          <span>
            <LiveClock />
          </span>
          <span className="hidden md:inline">{coords}</span>
        </div>

        {/* Right — nav links matching reference */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: isActive ? 800 : 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--text)",
                      textDecoration: "none",
                      borderBottom: isActive ? "1.5px solid var(--text)" : "none",
                      paddingBottom: "2px",
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
