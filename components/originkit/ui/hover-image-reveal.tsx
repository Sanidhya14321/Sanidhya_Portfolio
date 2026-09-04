"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  type Transition as MotionTransition,
} from "framer-motion";

export interface HoverImageRevealItem {
  text?: string;
  image?: { src?: string; srcSet?: string; alt?: string };
  link?: string;
  index?: string;
  category?: string;
  field?: string;
  tech?: string[];
  description?: string;
}

export interface ItemsValue {
  itemCount?: number;
  [key: string]: unknown;
}

export interface FontValue {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  textAlign?: "left" | "center" | "right";
  textTransform?: CSSProperties["textTransform"];
  [key: string]: unknown;
}

export interface HoverImageRevealProps {
  items?: ItemsValue | HoverImageRevealItem[];
  font?: FontValue;
  textColor?: string;
  dimColor?: string;
  align?: "left" | "center" | "right";
  layout?: "rows" | "stack";
  rowGap?: number;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  offsetX?: number;
  offsetY?: number;
  followStrength?: number;
  transition?: MotionTransition;
  backgroundColor?: string;
  borderColor?: string;
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_ITEMS_DATA: { text: string; src: string }[] = [
  {
    text: "NEW SEASON DROP",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/8e0d22a8-ac82-4893-90d8-3403f80ec600/w=800",
  },
  {
    text: "ESSENTIAL COLLECTION",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/d6af07a0-4dc5-4de4-07b1-9d2ad6100000/w=800",
  },
  {
    text: "SUMMER EDITION",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c083d83a-f5a4-4434-989f-4eaa9bbe7500/w=800",
  },
  {
    text: "STREET ICONS",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/93bad0e0-e2ab-4e21-de9c-4cb54b028f00/w=800",
  },
  {
    text: "PREMIUM DENIM",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/09a59a65-3c07-4500-f72c-68c824168c00/w=800",
  },
  {
    text: "ARCHIVE PIECES",
    src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/8e0d22a8-ac82-4893-90d8-3403f80ec600/w=800",
  },
];

const DEFAULT_ITEMS: ItemsValue = {
  itemCount: 5,
  item1: {
    text: DEFAULT_ITEMS_DATA[0].text,
    image: { src: DEFAULT_ITEMS_DATA[0].src },
  },
  item2: {
    text: DEFAULT_ITEMS_DATA[1].text,
    image: { src: DEFAULT_ITEMS_DATA[1].src },
  },
  item3: {
    text: DEFAULT_ITEMS_DATA[2].text,
    image: { src: DEFAULT_ITEMS_DATA[2].src },
  },
  item4: {
    text: DEFAULT_ITEMS_DATA[3].text,
    image: { src: DEFAULT_ITEMS_DATA[3].src },
  },
  item5: {
    text: DEFAULT_ITEMS_DATA[4].text,
    image: { src: DEFAULT_ITEMS_DATA[4].src },
  },
};

const DEFAULT_FONT: FontValue = {
  fontFamily: "var(--font-display, Inter, sans-serif)",
  fontWeight: 900,
  fontSize: "clamp(2rem, 5vw, 5.5rem)",
  lineHeight: "0.92em",
  letterSpacing: "-0.02em",
  textAlign: "left",
  textTransform: "uppercase",
};

const DEFAULT_TRANSITION: MotionTransition = {
  type: "spring",
  stiffness: 400,
  damping: 38,
  mass: 0.8,
};

const alignToFlex: Record<string, CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const alignToText: Record<string, CSSProperties["textAlign"]> = {
  left: "left",
  center: "center",
  right: "right",
};

export default function HoverImageReveal({
  items = DEFAULT_ITEMS,
  font = DEFAULT_FONT,
  textColor = "var(--text, #1A1A1A)",
  dimColor = "rgba(26, 26, 26, 0.25)",
  align = "left",
  layout = "rows",
  rowGap = 0,
  imageWidth = 420,
  imageHeight = 270,
  rounded = 8,
  offsetX = 160,
  offsetY = -20,
  followStrength = 4,
  transition = DEFAULT_TRANSITION,
  backgroundColor = "transparent",
  borderColor = "var(--border, rgba(26, 26, 26, 0.15))",
  style,
  className,
}: HoverImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPositioned, setIsPositioned] = useState(false);
  const hasPositioned = useRef(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const stiffness = 85 + followStrength * 6;
  const springCfg = { stiffness, damping: 26, mass: 0.45 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  // Normalize items from either array or ItemsValue object
  const list: HoverImageRevealItem[] = [];
  if (Array.isArray(items)) {
    list.push(...items);
  } else {
    const data = items || DEFAULT_ITEMS;
    const count = Math.max(1, (data.itemCount as number) || 5);
    for (let i = 1; i <= count; i++) {
      const it = data[`item${i}`] as HoverImageRevealItem | undefined;
      const fallback = DEFAULT_ITEMS_DATA[(i - 1) % DEFAULT_ITEMS_DATA.length];
      list.push({
        text: it?.text ?? fallback?.text ?? `Item ${i}`,
        image: it?.image ?? (fallback ? { src: fallback.src } : undefined),
        link: it?.link,
        index: it?.index ?? String(i).padStart(2, "0"),
        category: it?.category ?? it?.field,
        tech: it?.tech,
        description: it?.description,
      });
    }
  }

  const anyActive =
    hovered !== null && hovered < list.length && isPositioned && hasFinePointer;

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Responsive preview width check
    const effectiveWidth = Math.min(imageWidth, Math.max(200, rect.width - 32));
    const halfImgW = effectiveWidth / 2;
    const halfImgH = imageHeight / 2;

    // Horizontal placement with flip and clamp
    let targetX = relX + offsetX;
    if (targetX + halfImgW > rect.width - 16) {
      targetX = relX - Math.abs(offsetX);
    }
    targetX = Math.max(halfImgW + 16, Math.min(rect.width - halfImgW - 16, targetX));

    // Vertical placement strictly clamped to container boundaries to prevent clipping
    let targetY = relY + offsetY;
    if (rect.height > imageHeight + 24) {
      targetY = Math.max(halfImgH + 12, Math.min(rect.height - halfImgH - 12, targetY));
    }

    if (!hasPositioned.current) {
      rawX.jump(targetX);
      x.jump(targetX);
      rawY.jump(targetY);
      y.jump(targetY);
      hasPositioned.current = true;
      setIsPositioned(true);
    } else {
      rawX.set(targetX);
      rawY.set(targetY);
    }
  };

  const onLeave = () => {
    setHovered(null);
    hasPositioned.current = false;
    setIsPositioned(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor,
        cursor: "default",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── Floating Cursor-Following Image Container ── */}
      {hasFinePointer && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            width: imageWidth,
            height: imageHeight,
            maxWidth: "calc(100vw - 32px)",
            borderRadius: rounded,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 30,
            background: "#161616",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          }}
          animate={{
            opacity: anyActive ? 1 : 0,
            scale: anyActive ? 1 : 0.85,
          }}
          transition={transition}
        >
          {list.map((item, i) => {
            const src = item.image?.src;
            const yPos =
              hovered === null
                ? "100%"
                : i < hovered
                ? "-100%"
                : i > hovered
                ? "100%"
                : "0%";

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ y: yPos }}
                transition={transition}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  zIndex: i === hovered ? 5 : 1,
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={item.image?.alt || item.text || `Project ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #2a2a2a, #111)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ── Item Rows / Stack Display ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: layout === "rows" ? "stretch" : alignToFlex[align],
          gap: `${rowGap}px`,
          width: "100%",
        }}
      >
        {list.map((item, i) => {
          const isHovered = hovered === i;
          const currentColor = anyActive
            ? isHovered
              ? textColor
              : dimColor
            : textColor;

          const itemIndex = item.index ?? String(i + 1).padStart(2, "0");
          const itemCategory = item.category || item.field;

          const titleStyle: CSSProperties = {
            fontFamily: font.fontFamily || "var(--font-display)",
            fontWeight: font.fontWeight || 900,
            fontSize: font.fontSize || "clamp(2rem, 4.5vw, 4.8rem)",
            lineHeight: font.lineHeight || 1.05,
            letterSpacing: font.letterSpacing || "-0.02em",
            textTransform: font.textTransform || "uppercase",
            whiteSpace: "nowrap",
            display: "block",
            color: currentColor,
            transition: "color 0.25s ease",
          };

          // Double-span vertical roll effect with natural in-flow text height
          const titleRoll = (
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              <motion.div
                style={{ position: "relative" }}
                animate={{ y: isHovered ? "-100%" : "0%" }}
                transition={transition}
              >
                <span style={titleStyle}>{item.text}</span>
                <span
                  aria-hidden
                  style={{
                    ...titleStyle,
                    color: textColor,
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                  }}
                >
                  {item.text}
                </span>
              </motion.div>
            </div>
          );

          if (layout === "rows") {
            const rowContent = (
              <div
                onMouseEnter={() => setHovered(i)}
                onTouchStart={() => setHovered(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding:
                    "clamp(1.2rem, 2.5vw, 2.4rem) clamp(1rem, 3vw, 2.5rem)",
                  borderBottom: `1px solid ${borderColor}`,
                  background: isHovered ? "rgba(26, 26, 26, 0.02)" : "transparent",
                  transition: "background 0.25s ease",
                  textDecoration: "none",
                  color: "inherit",
                  gap: "clamp(1rem, 2.5vw, 1.8rem)",
                }}
              >
                {/* Left group: Index + Kinetic Roll Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.8rem, 2.5vw, 2.5rem)",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                      color: isHovered ? textColor : dimColor,
                      transition: "color 0.25s ease",
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                    }}
                  >
                    {itemIndex}
                  </span>

                  <div style={{ minWidth: 0 }}>{titleRoll}</div>
                </div>

                {/* Right group: Category pill + Arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.6rem, 2vw, 1.8rem)",
                    flexShrink: 0,
                  }}
                >
                  {itemCategory && (
                    <span
                      className="label"
                      style={{
                        padding: "0.25rem 0.65rem",
                        borderRadius: "2px",
                        border: `1px solid ${
                          isHovered ? textColor : "transparent"
                        }`,
                        background: isHovered
                          ? "rgba(26, 26, 26, 0.05)"
                          : "rgba(26, 26, 26, 0.04)",
                        color: isHovered ? textColor : dimColor,
                        transition: "all 0.25s ease",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      {itemCategory}
                    </span>
                  )}

                  <motion.span
                    animate={{
                      x: isHovered ? 4 : 0,
                      y: isHovered ? -4 : 0,
                      color: isHovered ? textColor : dimColor,
                    }}
                    transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.2rem, 2vw, 2rem)",
                      lineHeight: 1,
                      display: "inline-block",
                    }}
                  >
                    ↗
                  </motion.span>
                </div>
              </div>
            );

            return (
              <div key={i} style={{ width: "100%" }}>
                {item.link ? (
                  item.link.startsWith("/") ? (
                    <Link
                      href={item.link}
                      data-transition-dir="right"
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      {rowContent}
                    </Link>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      {rowContent}
                    </a>
                  )
                ) : (
                  rowContent
                )}
              </div>
            );
          }

          // Fallback / standard stacked format
          const copyStyle: CSSProperties = {
            display: "block",
            color: currentColor,
            transition: "color 0.2s ease",
            whiteSpace: "pre",
            textAlign: alignToText[align],
            fontFamily: font.fontFamily,
            fontWeight: font.fontWeight,
            fontSize: font.fontSize,
            lineHeight: font.lineHeight,
            letterSpacing: font.letterSpacing,
            textTransform: font.textTransform,
          };

          const inner = (
            <motion.div
              style={{ position: "relative" }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={transition}
            >
              <span style={copyStyle}>{item.text}</span>
              <span
                aria-hidden
                style={{
                  ...copyStyle,
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                }}
              >
                {item.text}
              </span>
            </motion.div>
          );

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onTouchStart={() => setHovered(i)}
              style={{
                overflow: "hidden",
                cursor: item.link ? "pointer" : "default",
              }}
            >
              {item.link ? (
                item.link.startsWith("/") ? (
                  <Link
                    href={item.link}
                    data-transition-dir="right"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {inner}
                  </a>
                )
              ) : (
                inner
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}