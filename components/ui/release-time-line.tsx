"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS, accentCSS, colors } from "@/lib/themes";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

export const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Advanced Component Pack",
    subtitle: "Version 2.1.0 • Feb 2025",
    description:
      "Ruixen UI now ships with an advanced component pack including complex layouts, enterprise-ready data tables, and animated navigation menus.",
    items: [
      "New Data Grid with sorting, filtering, and pagination",
      "Kanban board with drag-and-drop support",
      "Animated mega menu component",
      "Masonry grid layout for galleries and portfolios",
      "Extended accessibility support across all components",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    button: {
      url: "https://ruixenui.com",
      text: "Explore Components",
    },
  },
  {
    icon: Sparkles,
    title: "Theme Builder & Design Tokens",
    subtitle: "Version 2.0.0 • Jan 2025",
    description:
      "We've introduced a fully customizable theme builder powered by design tokens so you can tailor Ruixen UI to match any brand identity.",
    items: [
      "Real-time theme preview in the dashboard",
      "Customizable color palettes, typography, and spacing",
      "Preset themes for quick project setup",
      "Export tokens to CSS variables or JSON",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: Zap,
    title: "Motion & Interaction Update",
    subtitle: "Version 1.8.0 • Dec 2024",
    description:
      "Micro-interactions across Ruixen UI have been enhanced with Framer Motion, delivering a smoother and more engaging user experience.",
    items: [
      "Animated dropdown menus and modals",
      "Smooth transitions between pages",
      "Custom easing curves for a premium feel",
      "Reduced layout shift for better stability",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    icon: Calendar,
    title: "Initial Pro Release",
    subtitle: "Version 1.5.0 • Oct 2024",
    description:
      "Ruixen UI Pro is here - a premium set of components, templates, and utilities designed for production-grade applications.",
    items: [
      "Full Figma design kit",
      "Extended form components with validation",
      "Chart components with Recharts integration",
      "Ready-to-use dashboard layouts",
    ],
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80",
    button: {
      url: "https://ruixenui.com/pro",
      text: "View Ruixen UI Pro",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "Ruixen UI Release Notes",
  description = "Stay up to date with the latest components, features, and performance enhancements in Ruixen UI - built to help you design and ship faster.",
  entries = defaultEntries,
  className,
}: TimeLine_01Props) {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];
  const palette = colors[theme];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className={"py-32 " + (className || "") }>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: palette.heading }}>
            {title}
          </h1>
          <p className="mb-6 text-base md:text-lg" style={{ color: palette.textSecondary }}>
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                aria-current={isActive ? "true" : "false"}
              >
                <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg p-2 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? ac.primary : ac.iconBg,
                        color: isActive ? palette.bg : ac.primary,
                      }}
                    >
                      <entry.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ color: isActive ? palette.heading : palette.text }}
                      >
                        {entry.title}
                      </span>
                      <span
                        className="text-xs transition-colors duration-300"
                        style={{ color: palette.textSecondary }}
                      >
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                <article
                  className="flex flex-col rounded-2xl border p-3 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? cc.bg : `${palette.bg}80`,
                    borderColor: isActive ? ac.primary : cc.border,
                    backdropFilter: cc.backdropFilter,
                    boxShadow: isActive ? `0 20px 40px ${ac.primary}15` : "none",
                  }}
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-4 h-72 w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2
                        className="text-md font-medium leading-tight tracking-tight transition-colors duration-200 md:text-lg"
                        style={{ color: isActive ? palette.heading : palette.text }}
                      >
                        {entry.title}
                      </h2>

                      <p
                        className={
                          "text-xs leading-relaxed transition-all duration-300 md:text-sm " +
                          (isActive ? "line-clamp-none" : "line-clamp-2")
                        }
                        style={{ color: palette.textSecondary }}
                      >
                        {entry.description}
                      </p>
                    </div>

                    <div
                      aria-hidden={!isActive}
                      className={
                        "grid transition-all duration-500 ease-out " +
                        (isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div
                              className="rounded-lg border p-4"
                              style={{
                                backgroundColor: `${ac.primary}10`,
                                borderColor: cc.border,
                              }}
                            >
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2 text-sm"
                                    style={{ color: palette.text }}
                                  >
                                    <div
                                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                      style={{ backgroundColor: ac.primary }}
                                    />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                className="group font-normal transition-all duration-200"
                                style={{
                                  backgroundColor: ac.primary,
                                  color: palette.bg,
                                }}
                                asChild
                              >
                                <a href={entry.button.url} target="_blank" rel="noreferrer">
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
