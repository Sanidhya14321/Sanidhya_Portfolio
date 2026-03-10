"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  ReactNode,
  memo,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ZoomParallaxItem {
  src?: string;
  alt?: string;
  content?: ReactNode;
  className?: string;
}

// ─── Original ZoomParallax (exact same effect, no changes to layout) ──────────

const SCALES_CFG = [
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 5],
  [1, 6],
  [1, 8],
  [1, 9],
] as const;

// The original positional overrides, kept exactly as-is.
const SLOT_CLS: Record<number, string> = {
  1: "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
  2: "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
  3: "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
  4: "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
  5: "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
  6: "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]",
};

function ZoomParallax({
  items,
  containerHeightClass = "h-[300vh]",
}: {
  items: ZoomParallaxItem[];
  containerHeightClass?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // One transform per possible scale level — shared across all tiles
  const s4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [s4, s5, s6, s5, s6, s8, s9];

  return (
    <div ref={container} className={`relative ${containerHeightClass}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {items.map(({ src, alt, content, className }, i) => (
          <motion.div
            key={i}
            style={{ scale: scales[i % scales.length] }}
            className={[
              "absolute top-0 flex h-full w-full items-center justify-center",
              SLOT_CLS[i] ?? "",
            ].join(" ")}
          >
            <div className={`relative h-[25vh] w-[25vw] ${className ?? ""}`}>
              {content ?? (
                <img
                  src={src ?? "/placeholder.svg"}
                  alt={alt ?? `Parallax image ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Virtualized project list ─────────────────────────────────────────────────
//
// Strategy: each project section has a sentinel div of the same height as the
// ZoomParallax component.  An IntersectionObserver watches every sentinel and
// tracks which indices are "near the viewport".  We keep a window of
//   [activeIndex - 1 … activeIndex + 1]
// so at most 2-3 sections are mounted at any one time; the rest are replaced
// by cheap placeholder divs that hold the scroll height.

interface Project {
  key: string;
  title: string;
  items: ZoomParallaxItem[];
}

interface VirtualSectionProps {
  project: Project;
  height: string;         // must match ZoomParallax containerHeightClass
  isVisible: boolean;
  onEnter: (key: string) => void;
  onLeave: (key: string) => void;
}

const VirtualSection = memo(function VirtualSection({
  project,
  height,
  isVisible,
  onEnter,
  onLeave,
}: VirtualSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter(project.key);
        else onLeave(project.key);
      },
      // rootMargin extends the trigger zone so the *next* section starts
      // mounting before the user actually scrolls into it.
      { rootMargin: "0px 0px 200% 0px", threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [project.key, onEnter, onLeave]);

  return (
    <section ref={sentinelRef} className={`relative ${height}`}>
      {isVisible ? (
        // Absolutely fill the sentinel so the ZoomParallax sticky logic works
        // against the sentinel's bounding box, not the document root.
        <div className="absolute inset-0">
          <ZoomParallax items={project.items} containerHeightClass="h-full" />
        </div>
      ) : (
        // Placeholder: zero paint cost, preserves scroll height exactly.
        <div className="absolute inset-0" aria-hidden="true" />
      )}
    </section>
  );
});

// ─── Public API ───────────────────────────────────────────────────────────────

interface ProjectsParallaxListProps {
  projects: Project[];
  /** Height class applied to every section. Default: "h-[300vh]" */
  sectionHeightClass?: string;
}

export function ProjectsParallaxList({
  projects,
  sectionHeightClass = "h-[300vh]",
}: ProjectsParallaxListProps) {
  // Set of project keys currently near the viewport
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(
    () => new Set(projects.slice(0, 2).map((p) => p.key))
  );

  const onEnter = useCallback((key: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const onLeave = useCallback((key: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <VirtualSection
          key={project.key}
          project={project}
          height={sectionHeightClass}
          isVisible={visibleKeys.has(project.key)}
          onEnter={onEnter}
          onLeave={onLeave}
        />
      ))}
    </div>
  );
}

// ─── Demo / usage example ─────────────────────────────────────────────────────

const DEMO_PROJECTS: Project[] = [
  {
    key: "arch",
    title: "Architecture Showcase",
    items: [
      { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Architecture" },
      { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&auto=format&q=80", alt: "City" },
      { src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&auto=format&q=80", alt: "Pattern" },
      { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Mountain" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&auto=format&q=80", alt: "Minimal" },
      { src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Ocean" },
      { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Forest" },
    ],
  },
  {
    key: "nature",
    title: "Nature Gallery",
    items: [
      { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Nature" },
      { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Fog" },
      { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Trees" },
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Road" },
      { src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=800&fit=crop&auto=format&q=80", alt: "Leaves" },
      { src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1280&h=720&fit=crop&auto=format&q=80", alt: "River" },
      { src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Bird" },
    ],
  },
  {
    key: "urban",
    title: "Urban Life",
    items: [
      { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Skyline" },
      { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Street" },
      { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=800&fit=crop&auto=format&q=80", alt: "Lights" },
      { src: "https://images.unsplash.com/photo-1514565131-fce0801e6785?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Bridge" },
      { src: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800&h=800&fit=crop&auto=format&q=80", alt: "Subway" },
      { src: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Traffic" },
      { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1280&h=720&fit=crop&auto=format&q=80", alt: "Night city" },
    ],
  },
];

export default function Demo() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Scroll to explore projects</h1>
      </div>

      <ProjectsParallaxList projects={DEMO_PROJECTS} sectionHeightClass="h-[300vh]" />

      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-lg opacity-50">End of projects</p>
      </div>
    </main>
  );
}