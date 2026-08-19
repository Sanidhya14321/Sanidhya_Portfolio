"use client";

import { portfolioData } from "@/data/portfolio";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationControls } from "framer-motion";

function HeroChar({
  char,
  index,
  visible,
}: {
  char: string;
  index: number;
  visible: boolean;
}) {
  const controls = useAnimationControls();
  const isFlipping = useRef(false);

  const handleMouseEnter = async () => {
    if (isFlipping.current || char === " ") return;
    isFlipping.current = true;
    await controls.start({
      rotateY: 360,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    });
    controls.set({ rotateY: 0 });
    isFlipping.current = false;
  };

  return (
    <span
      aria-hidden="true"
      className={`hero-char${visible ? " visible" : ""}`}
      style={{
        display: "inline-block",
        transitionDelay: `${0.015 * index}s`,
        perspective: "1000px",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <motion.span
        animate={controls}
        initial={{ rotateY: 0 }}
        style={{
          display: "inline-block",
          transformStyle: "preserve-3d",
          cursor: "default",
          userSelect: "none",
          transformOrigin: "center center",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

function HeroName({ name, visible }: { name: string; visible: boolean }) {
  const chars = name.split("");
  return (
    <div
      aria-label={name}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.015em",
        lineHeight: 0.85,
        fontSize: "clamp(2.8rem, 11.5vw, 13.5rem)",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        textAlign: "center",
      }}
    >
      {chars.map((char, i) => (
        <HeroChar key={i} char={char} index={i} visible={visible} />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const data = portfolioData;
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Track scroll progress inside the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Text Animation
  const leftX = useTransform(smoothProgress, [0, 0.75], ["-14vw", "0vw"]);
  const rightX = useTransform(smoothProgress, [0, 0.75], ["14vw", "0vw"]);

  // 2. Top Label Animation
  const labelLeftX = useTransform(smoothProgress, [0, 0.75], ["-7vw", "0vw"]);
  const labelRightX = useTransform(smoothProgress, [0, 0.75], ["7vw", "0vw"]);

  // 3. Central Media Animation
  const mediaWidth = useTransform(smoothProgress, [0, 1], ["20vw", "100vw"]);
  const mediaHeight = useTransform(smoothProgress, [0, 1], ["24vh", "100vh"]);
  const mediaY = useTransform(smoothProgress, [0, 1], ["1rem", "7rem"]);

  return (
    <>
      {/* ── SECTION 1: Top Name Section ── */}
      <section
        id="home"
        style={{
          width: "100%",
          paddingTop: "40vh",
          paddingBottom: "clamp(2rem, 4vh, 3.5rem)",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <HeroName name={data.name} visible={visible} />
        </div>
      </section>

      {/* ── SECTION 2: Center Interactive Showcase Section (Text + Media) ── */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "auto",
          minHeight: "220vh",
          background: "var(--bg)",
        }}
      >
        <section
          style={{
            position: "sticky",
            top: 0,
            height: "auto",
            minHeight: "128vh",
            background: "var(--bg)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Center Stage (Labels + Text + Media) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 2A: Top Labels ("FULL STACK & ML" and "AI Engineer") */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--text-muted)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <motion.span style={{ x: labelLeftX, display: "inline-block" }}>
                FULL STACK &amp;&nbsp;
              </motion.span>
              <motion.span style={{ x: labelRightX, display: "inline-block" }}>
                AI Engineer
              </motion.span>
            </div>

            {/* 2B: Merging Text ("A FULL STACK" + "DEVELOPER") */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                zIndex: 6,
                pointerEvents: "none",
              }}
            >
              <motion.span
                style={{
                  x: leftX,
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4.4vw, 5.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                A FULL STACK&nbsp;
              </motion.span>

              <motion.span
                style={{
                  x: rightX,
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4.4vw, 5.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                DEVELOPER
              </motion.span>
            </div>

            {/* 2C: Center Image / Video Slot */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "-3rem",
                zIndex: 2,
              }}
            >
              <motion.div
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  y: mediaY,
                  overflow: "hidden",
                  border: "none",
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  willChange: "width, height, transform",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    border: "none",
                  }}
                >
                  <img
                    src="/Debate-App/main.png"
                    alt="Portfolio Visual Showcase"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      border: "none",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}