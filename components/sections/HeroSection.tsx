"use client";

import Image from "next/image";

import { useIntroReady } from "@/lib/intro-ready";
import { usePageTransition } from "@/components/ui/StaggeredColorTransition";
import { useMediaQuery } from "@/lib/use-media-query";
import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";
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
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const handleMouseEnter = async () => {
    if (reducedMotion || isFlipping.current || char === " ") return;
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
  const introReady = useIntroReady();
  const { isTransitioning } = usePageTransition();
  const visible = introReady && !isTransitioning;
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress inside the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.001,
  });

  // 1. Text Animation
  const leftX = useTransform(smoothProgress, [0, 0.75], ["-15vw", "0vw"]);
  const rightX = useTransform(smoothProgress, [0, 0.75], ["15vw", "0vw"]);

  // 2. Top Label Animation
  const labelLeftX = useTransform(smoothProgress, [0, 0.75], ["-7vw", "0vw"]);
  const labelRightX = useTransform(smoothProgress, [0, 0.75], ["7vw", "0vw"]);

  // 3. Central Media Animation
  // The media is an absolute layer covering the whole scene. The clip starts below
  // the headline block and expands to the full viewport edge-to-edge at the end,
  // where the headline sits on top of the photograph. It is driven by raw scroll
  // progress (not the text spring) so the reveal completes the instant the user
  // reaches the sticky release point, with no slow spring residual border.
  const mediaClip = useTransform(scrollYProgress, [0, 0.98], ["inset(28% 40% 30% 40%)", "inset(0% 0% 0% 0%)"]);

  // Auto-invert the text as the photograph takes over the scene: dark ink while
  // the image is only a card under the headline, cream over the scrimmed photo
  // once it covers the viewport. Held at the old value until the flip window so
  // parked mid-scroll states stay readable.
  const headlineTone = useTransform(scrollYProgress, [0.6, 0.82, 0.9], ["#1A1A1A", "#1A1A1A", "#E8E4DC"]);
  const labelTone = useTransform(scrollYProgress, [0.6, 0.82, 0.9], ["#6B6B6B", "#6B6B6B", "#E8E4DC"]);
  // With reduced motion the photo covers the scene from the start, so text is cream outright.
  const headlineColor = reducedMotion ? "#E8E4DC" : headlineTone;
  const labelColorValue = reducedMotion ? "#E8E4DC" : labelTone;

  return (
    <>
      {/* ── SECTION 1: Top Name Section ── */}
      <section
        id="home"
        style={{
          width: "100%",
          paddingTop: "35vh",
          paddingBottom: "clamp(2rem, 4vh, 3.5rem)",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          background: "transparent",
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
        data-hero-scroll
        style={{
          position: "relative",
          height: "auto",
          minHeight: reducedMotion ? "auto" : "220svh",
          background: "transparent",
        }}
      >
        <section
          data-hero-scene
          style={{
            position: reducedMotion ? "relative" : "sticky",
            top: 0,
            height: "100svh",
            background: "transparent",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // Clear the fixed navigation so the converged headline never sits under it.
            paddingTop: "4.5rem",
          }}
        >
          {/* Center Stage (Labels + Text, layered above the media layer) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
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
              <motion.span style={{ x: reducedMotion ? 0 : labelLeftX, display: "inline-block", color: labelColorValue }}>
                FULL STACK &amp;&nbsp;
              </motion.span>
              <motion.span style={{ x: reducedMotion ? 0 : labelRightX, display: "inline-block", color: labelColorValue }}>
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
                  x: reducedMotion ? 0 : leftX,
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4.4vw, 5.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: headlineColor,
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                A FULL STACK&nbsp;
              </motion.span>

              <motion.span
                style={{
                  x: reducedMotion ? 0 : rightX,
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4.4vw, 5.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.9,
                  color: headlineColor,
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                DEVELOPER
              </motion.span>
            </div>

          </div>

          {/* 2C: Media Layer — absolute full-scene cover, revealed by clip; text sits on top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <motion.div
              data-hero-media
              style={{
                width: "100%",
                height: "100%",
                clipPath: reducedMotion ? "none" : mediaClip,
                overflow: "hidden",
                border: "none",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                willChange: reducedMotion ? "auto" : "clip-path",
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
                <Image
                  src="/my_pics/DSC03737.JPG"
                  fill sizes="100vw" quality={85} priority
                  alt="Portfolio Visual Showcase"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    border: "none",
                  }}
                />
                {/* Scrim so the inverted (cream) headline stays readable over the photo */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(180deg, rgba(26,26,26,0.62) 0%, rgba(26,26,26,0.26) 20%, rgba(26,26,26,0.30) 55%, rgba(26,26,26,0.58) 100%)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}