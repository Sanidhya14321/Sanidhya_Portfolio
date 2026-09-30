"use client";

import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { eventsData, PortfolioEvent } from "@/data/portfolio";

export type MenuItem = PortfolioEvent;

export const Component = ({
  items = eventsData,
  className
}: { items?: MenuItem[]; className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createTransition = useCallback((index: number) => {
    const item = items[index];
    if (!item) return;
    const selector = containerRef.current?.querySelectorAll(`#${item.clipId} .path`);
    if (!selector) return;

    // Kill any active timeline immediately to avoid lag
    if (masterTl.current) {
      masterTl.current.kill();
    }

    if (imageRef.current) {
      imageRef.current.setAttribute("href", getImageProps({ src: item.image, alt: item.name, width: 460, height: 460, quality: 85 }).props.src);
    }
    if (mainGroupRef.current) {
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(selector, { scale: 1, opacity: 1 });
      return;
    }

    // Hardware accelerated initial state
    gsap.set(selector, { 
      scale: 0.90, 
      opacity: 0,
      transformOrigin: "center center", 
      force3D: true 
    });

    const tl = gsap.timeline();

    // Fast, ultra-snappy staggered reveal (0.32s)
    tl.to(selector, {
      scale: 1,
      opacity: 1,
      duration: 0.32,
      stagger: { amount: 0.14, from: "center" },
      ease: "power2.out",
      force3D: true,
    })
    // Subtle breathing pulse (image is always 100% visible & recognizable)
    .to(selector, {
      scale: 1.012,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 0.08, from: "center" },
      force3D: true,
    });

    masterTl.current = tl;
  }, [items]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      createTransition(0);
    }, containerRef);
    let inView = false;
    const updatePlayback = () => {
      if (inView && !document.hidden) masterTl.current?.resume();
      else masterTl.current?.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    if (containerRef.current) observer.observe(containerRef.current);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      if (masterTl.current) masterTl.current.kill();
      ctx.revert();
    };
  }, [createTransition]);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createTransition(index);
  };

  const activeItem = items[activeIndex] || items[0];

  return (
    <div 
      ref={containerRef} 
      style={{
        padding: "clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)",
        width: "100%",
        boxSizing: "border-box",
      }}
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14",
        "bg-transparent", 
        className
      )}
    >
      {/* LEFT SIDE: ROW ITEMS MATCHING PROJECTS SECTION TYPOGRAPHY & SIZING */}
      <div className="z-20 w-full lg:w-7/12 flex flex-col justify-center">
        <nav className="w-full">
          <ul className="flex flex-col w-full">
            {items.map((item, index) => {
              const isSelected = activeIndex === index;

              return (
                <li
                  key={item.num}
                  onMouseEnter={() => handleItemHover(index)}
                  onTouchStart={() => handleItemHover(index)}
                  style={{
                    padding: "clamp(1.2rem, 2.4vw, 2.2rem) 0",
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.25s ease",
                  }}
                  className="group cursor-pointer select-none w-full"
                >
                  <div className="flex items-center justify-between w-full gap-4">
                    {/* Left: Index + Giant Title matching Projects Section */}
                    <div className="flex items-center gap-[clamp(0.8rem,2.5vw,2.5rem)] min-w-0">
                      {/* Index Number - Exact match to Projects Section */}
                      <span 
                        style={{ 
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                          letterSpacing: "0.02em",
                          color: isSelected ? "var(--text)" : "var(--text-muted)",
                          opacity: isSelected ? 1 : 0.45,
                          transition: "color 0.25s ease, opacity 0.25s ease",
                          flexShrink: 0
                        }}
                      >
                        {item.num}
                      </span>
                      
                      {/* Event Title - Exactly matching Projects clamp(2rem, 4.5vw, 4.8rem) font tokens */}
                      <h3 
                        style={{ 
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "clamp(1.9rem, 3.8vw, 4.2rem)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                          textTransform: "uppercase",
                          color: isSelected ? "var(--text)" : "var(--text-muted)",
                          opacity: isSelected ? 1 : 0.35,
                          margin: 0,
                          transition: "color 0.25s ease, opacity 0.25s ease, transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
                        }}
                        className={cn(
                          "truncate",
                          isSelected ? "translate-x-2 md:translate-x-3" : "group-hover:translate-x-1"
                        )}
                      >
                        {item.name}
                      </h3>
                    </div>

                    {/* Right: Pill Badge & Arrow matching Projects Section */}
                    <div className="flex items-center gap-3 shrink-0">
                      {item.role && (
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 700,
                            fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "0.35rem 0.85rem",
                            borderRadius: "999px",
                            border: `1px solid ${isSelected ? "var(--text)" : "var(--border)"}`,
                            color: isSelected ? "var(--text)" : "var(--text-muted)",
                            background: isSelected ? "rgba(26, 26, 26, 0.06)" : "transparent",
                            transition: "all 0.25s ease",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                          }}
                        >
                          {item.role}
                        </span>
                      )}

                      {/* Matching Project Arrow Indicator */}
                      <div
                        style={{
                          transform: isSelected ? "rotate(0deg)" : "rotate(-45deg)",
                          opacity: isSelected ? 1 : 0.25,
                          transition: "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.25s ease",
                          color: isSelected ? "var(--text)" : "var(--text-muted)",
                        }}
                        className="hidden sm:flex items-center justify-center shrink-0"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE: HIGH-VISIBILITY ARCHITECTURAL GEOMETRIC SHOWCASE (>96% VISIBLE SURFACE) */}
      <div className="relative w-full lg:w-5/12 flex flex-col items-center">
        {/* Crisp Image Container with Modern Shadow */}
        <div 
          className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] aspect-square rounded-xl p-1 transition-transform duration-500"
          style={{ 
            boxShadow: "0 25px 50px -12px rgba(26, 26, 26, 0.18), 0 0 0 1px rgba(26, 26, 26, 0.08)",
            background: "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(6px)",
          }}
        >
          <svg 
            viewBox="0 0 500 500" 
            className="w-full h-full rounded-lg overflow-hidden"
          >
            <defs>
              {/* 1. Bento Architectural Matrix (98% Visible Area with 4px hairline micro-gaps) */}
              <clipPath id="clip-bento">
                <rect className="path" x="16" y="16" width="300" height="280" rx="4" />
                <rect className="path" x="320" y="16" width="164" height="280" rx="4" />
                <rect className="path" x="16" y="300" width="146" height="184" rx="4" />
                <rect className="path" x="166" y="300" width="150" height="184" rx="4" />
                <rect className="path" x="320" y="300" width="164" height="184" rx="4" />
              </clipPath>

              {/* 2. Architectural Quadrant Matrix with Accent Pillars (98% Visible Area) */}
              <clipPath id="clip-quadrant">
                <rect className="path" x="16" y="16" width="232" height="232" rx="4" />
                <rect className="path" x="252" y="16" width="232" height="232" rx="4" />
                <rect className="path" x="16" y="252" width="148" height="232" rx="4" />
                <rect className="path" x="168" y="252" width="148" height="232" rx="4" />
                <rect className="path" x="320" y="252" width="164" height="232" rx="4" />
              </clipPath>

              {/* 3. 3x3 High-Visibility Matrix (96.2% Visible Area with 4.5px micro-gaps) */}
              <clipPath id="clip-matrix">
                <rect className="path" x="16" y="16" width="153" height="153" rx="4" />
                <rect className="path" x="173.5" y="16" width="153" height="153" rx="4" />
                <rect className="path" x="331" y="16" width="153" height="153" rx="4" />
                <rect className="path" x="16" y="173.5" width="153" height="153" rx="4" />
                <rect className="path" x="173.5" y="173.5" width="153" height="153" rx="4" />
                <rect className="path" x="331" y="173.5" width="153" height="153" rx="4" />
                <rect className="path" x="16" y="331" width="153" height="153" rx="4" />
                <rect className="path" x="173.5" y="331" width="153" height="153" rx="4" />
                <rect className="path" x="331" y="331" width="153" height="153" rx="4" />
              </clipPath>

              {/* 4. Architectural Triptych with Panoramic Hero (98.3% Visible Area) */}
              <clipPath id="clip-portal">
                <rect className="path" x="16" y="16" width="468" height="240" rx="4" />
                <rect className="path" x="16" y="260" width="153" height="224" rx="4" />
                <rect className="path" x="173" y="260" width="154" height="224" rx="4" />
                <rect className="path" x="331" y="260" width="153" height="224" rx="4" />
              </clipPath>

              {/* 5. Modernist 4-Column Architectural Slices (97.4% Visible Area with 4px micro-gaps) */}
              <clipPath id="clip-prisms">
                <rect className="path" x="16" y="16" width="114" height="468" rx="4" />
                <rect className="path" x="134" y="16" width="114" height="468" rx="4" />
                <rect className="path" x="252" y="16" width="114" height="468" rx="4" />
                <rect className="path" x="370" y="16" width="114" height="468" rx="4" />
              </clipPath>
            </defs>

            <g ref={mainGroupRef} clipPath={`url(#${activeItem.clipId})`}>
              <image
                ref={imageRef}
                href={getImageProps({ src: activeItem.image, alt: activeItem.name, width: 460, height: 460, quality: 85 }).props.src}
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </svg>
        </div>

        {/* Integrated Contextual Dossier Card Underneath Visual Frame */}
        <div 
          className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] mt-4 rounded-xl transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border)",
            boxShadow: "0 12px 30px -10px rgba(26, 26, 26, 0.08), 0 0 0 1px rgba(26, 26, 26, 0.04)",
            padding: "clamp(1rem, 2.2vw, 1.25rem)",
          }}
        >
          {/* Header Row: Index & Dossier Tag + Role Capsule Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {activeItem?.num}
              </span>
              <span style={{ color: "var(--border)" }}>/</span>
              <span
                className="label"
                style={{
                  color: "var(--text)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                ARCHIVE DOSSIER
              </span>
            </div>

            {activeItem?.role && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "var(--text)",
                  color: "var(--bg)",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {activeItem.role}
              </span>
            )}
          </div>

          {/* Event Title */}
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.015em",
              lineHeight: 1.05,
              color: "var(--text)",
              marginTop: "0.7rem",
              marginBottom: "0.35rem",
            }}
          >
            {activeItem?.name}
          </h4>

          {/* Description */}
          {activeItem?.description && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.8125rem, 0.95vw, 0.875rem)",
                lineHeight: 1.55,
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              {activeItem.description}
            </p>
          )}

          {/* Bottom Architectural Info Strip */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "0.85rem",
              paddingTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              {activeItem?.location && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span className="label" style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>
                    LOC
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      textTransform: "uppercase",
                    }}
                  >
                    {activeItem.location}
                  </span>
                </div>
              )}

              {activeItem?.date && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span className="label" style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>
                    YEAR
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      textTransform: "uppercase",
                    }}
                  >
                    {activeItem.date}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConnoisseurStackInteractor = Component;
export default Component;
