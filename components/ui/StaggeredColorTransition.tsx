"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export type TransitionDirection = "up" | "down" | "left" | "right";

interface TransitionContextType {
  navigateWithTransition: (url: string, direction?: TransitionDirection) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

// Signature brand color layers
const layers = [
  { color: "#141414", zIndex: 100 },
  { color: "#24150A", zIndex: 101 },
  { color: "#544032", zIndex: 102 },
  { color: "#E8E4DC", zIndex: 103 },
];

export function StaggeredColorTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const transitionActive = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingRoute = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishTransition = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    pendingRoute.current = null;
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = "none";
      containerRef.current.style.visibility = "hidden";
    }
    transitionActive.current = false;
    setIsTransitioning(false);
  }, []);

  // Resume the reveal only after React has committed the destination route.
  useEffect(() => {
    if (pendingRoute.current !== pathname) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      secondFrame = requestAnimationFrame(() => timelineRef.current?.play());
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);

  useEffect(() => () => {
    timelineRef.current?.kill();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Direction assignment helper based on route intent
  const getDirectionForRoute = useCallback(
    (targetUrl: string): TransitionDirection => {
      if (targetUrl === "/") return "down";
      if (targetUrl.includes("/works")) return "up";
      if (targetUrl.includes("/projects")) return "right";
      if (targetUrl.includes("/about")) return "left";

      // Cyclic fallback
      const directions: TransitionDirection[] = ["right", "left", "up", "down"];
      const hash = targetUrl.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
      return directions[hash % directions.length];
    },
    []
  );

  const navigateWithTransition = useCallback(
    (url: string, customDirection?: TransitionDirection) => {
      if (transitionActive.current) return;
      const targetUrl = new URL(url, window.location.origin);
      if (targetUrl.origin !== window.location.origin) return;
      if (url === `${pathname}${window.location.search}`) {
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        return;
      }

      // Check for prefers-reduced-motion
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(url);
        window.scrollTo(0, 0);
        return;
      }

      router.prefetch(url);
      const direction = customDirection || getDirectionForRoute(url);
      const validLayers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validLayers.length === 0 || !containerRef.current) {
        router.push(url);
        return;
      }

      transitionActive.current = true;
      setIsTransitioning(true);
      pendingRoute.current = targetUrl.pathname;
      containerRef.current.style.pointerEvents = "auto";
      containerRef.current.style.visibility = "visible";

      // Coordinate properties based on direction
      const enterProps = {
        up: { xPercent: 0, yPercent: 100 },
        down: { xPercent: 0, yPercent: -100 },
        left: { xPercent: 100, yPercent: 0 },
        right: { xPercent: -100, yPercent: 0 },
      }[direction];

      const exitProps = {
        up: { xPercent: 0, yPercent: -100 },
        down: { xPercent: 0, yPercent: 100 },
        left: { xPercent: -100, yPercent: 0 },
        right: { xPercent: 100, yPercent: 0 },
      }[direction];

      // Prepare initial positions
      gsap.set(validLayers, enterProps);
      if (watermarkRef.current) {
        gsap.set(watermarkRef.current, { opacity: 0, scale: 0.94 });
      }

      timelineRef.current?.kill();
      const tl = gsap.timeline({ onComplete: finishTransition });
      timelineRef.current = tl;
      // Release the veil even if a navigation is interrupted or fails.
      timeoutRef.current = setTimeout(() => {
        tl.kill();
        finishTransition();
      }, 10_000);

      // ── Step 1: Cascading Enter Sweep ──
      tl.to(validLayers, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.44,
        stagger: 0.055,
        ease: "expo.inOut",
        force3D: true,
      });

      // ── Step 2: Typographic Watermark Reveal at 100% Eclipse ──
      if (watermarkRef.current) {
        tl.to(
          watermarkRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // ── Step 3: The Swap (Execute Route Change & Scroll Reset Behind Veil) ──
      tl.addPause("route-ready", () => {
        // Query-only navigation keeps the same pathname, so it has no pathname effect.
        if (targetUrl.pathname === pathname) {
          router.push(url);
          tl.play();
        } else {
          router.push(url);
        }
      });

      // Fade out watermark
      if (watermarkRef.current) {
        tl.to(
          watermarkRef.current,
          {
            opacity: 0,
            scale: 1.04,
            duration: 0.16,
            ease: "power2.in",
          },
          "+=0.02"
        );
      }

      // ── Step 4: The Reveal (Continuation in Same Direction) ──
      tl.to(
        validLayers,
        {
          ...exitProps,
          duration: 0.44,
          stagger: 0.055,
          ease: "expo.inOut",
          force3D: true,
        },
        "-=0.06"
      );
    },
    [pathname, router, getDirectionForRoute, finishTransition]
  );

  // Global click interception for internal links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = (e.target as Element | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.includes("#") &&
        !target.hasAttribute("download") &&
        !target.hasAttribute("data-no-transition") &&
        !/\.(pdf|zip|png|jpe?g|webp|svg)(?:[?#]|$)/i.test(href) &&
        href.split(/[?#]/)[0] !== "/resume/download" &&
        (!target.getAttribute("target") || target.getAttribute("target") === "_self")
      ) {
        e.preventDefault();
        const customDir = target.getAttribute("data-transition-dir") as TransitionDirection | null;
        navigateWithTransition(href, customDir && ["up", "down", "left", "right"].includes(customDir) ? customDir : undefined);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, navigateWithTransition]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* ── Multi-Layer Staggered Overlay Stack ── */}
      <div
        ref={containerRef}
        data-page-transition
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: "none",
          visibility: "hidden",
          overflow: "hidden",
        }}
      >
        {layers.map((layer, index) => (
          <div
            key={index}
            ref={(el) => {
              layerRefs.current[index] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              backgroundColor: layer.color,
              zIndex: layer.zIndex,
              willChange: "transform",
            }}
          />
        ))}

        {/* ── Signature Eclipse Watermark ── */}
        <div
          ref={watermarkRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 105,
            pointerEvents: "none",
            textAlign: "center",
            opacity: 0,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(26, 26, 26, 0.08)",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              marginBottom: "0.8rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--text)",
                display: "inline-block",
              }}
            />
            <span
              className="label"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              SANIDHYA VATS
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            TRANSITIONING
          </div>

          <div
            className="label"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "0.6rem",
            }}
          >
            28.6139° N, 77.2090° E · NEW DELHI, IN
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export default StaggeredColorTransitionProvider;
