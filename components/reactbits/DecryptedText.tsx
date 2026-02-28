"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  characters = defaultChars,
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const iterationRef = useRef(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const getRevealIndex = useCallback(
    (progress: number, length: number) => {
      switch (revealDirection) {
        case "end":
          return length - Math.floor(progress * length);
        case "center": {
          const center = Math.floor(length / 2);
          const revealed = Math.floor(progress * length);
          const half = Math.floor(revealed / 2);
          return { start: Math.max(0, center - half), end: Math.min(length, center + half) };
        }
        default:
          return Math.floor(progress * length);
      }
    },
    [revealDirection]
  );

  useEffect(() => {
    // Scramble initially
    const scrambled = text
      .split("")
      .map((char) => (char === " " ? " " : getRandomChar()))
      .join("");
    setDisplayText(scrambled);
  }, [text, getRandomChar]);

  const runAnimation = useCallback(() => {
    iterationRef.current = 0;

    const interval = setInterval(() => {
      iterationRef.current += 1;
      const progress = iterationRef.current / maxIterations;

      if (sequential) {
        const revealData = getRevealIndex(progress, text.length);

        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (typeof revealData === "number") {
                if (revealDirection === "end") {
                  return i >= revealData ? char : getRandomChar();
                }
                return i < revealData ? char : getRandomChar();
              } else {
                return i >= revealData.start && i < revealData.end ? char : getRandomChar();
              }
            })
            .join("")
        );
      } else {
        setDisplayText(
          text
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              return Math.random() < progress ? char : getRandomChar();
            })
            .join("")
        );
      }

      if (iterationRef.current >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, getRandomChar, getRevealIndex, revealDirection]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [animateOn, hasAnimated, runAnimation]);

  useEffect(() => {
    if (animateOn !== "hover" || !isHovering) return;
    return runAnimation();
  }, [isHovering, animateOn, runAnimation]);

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={() => animateOn === "hover" && setIsHovering(true)}
      onMouseLeave={() => animateOn === "hover" && setIsHovering(false)}
    >
      {displayText.split("").map((char, i) => {
        const isRevealed = char === text[i];
        return (
          <span key={i} className={isRevealed ? className : `${className} ${encryptedClassName}`}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
