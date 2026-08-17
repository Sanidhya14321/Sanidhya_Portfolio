"use client";

import { useEffect, useRef, useState } from "react";

const interactiveSelector = [
  "a",
  "button",
  "[role='button']",
  "[data-cursor='interactive']",
  ".spotlight-card",
  ".cursor-pointer",
  "input",
  "textarea",
  "select",
  "summary",
].join(", ");

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, visible: false, interactive: false });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (coarsePointer || !finePointer) {
      setIsEnabled(false);
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const updateCursorState = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      if (!targetRef.current.visible) {
        currentRef.current.x = event.clientX;
        currentRef.current.y = event.clientY;
      }

      targetRef.current.visible = true;

      const target = event.target as Element | null;
      targetRef.current.interactive = Boolean(target?.closest(interactiveSelector));
    };

    const hideCursor = () => {
      targetRef.current.visible = false;
      targetRef.current.interactive = false;
    };

    const animate = () => {
      const halo = haloRef.current;
      const dot = dotRef.current;

      if (!halo || !dot) {
        rafRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const target = targetRef.current;
      const current = currentRef.current;
      const ease = reducedMotion ? 0.5 : 0.15;

      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      const isInteractive = target.visible && target.interactive;
      const haloScale = isInteractive ? 2 : 1;
      const haloOpacity = target.visible ? (isInteractive ? 0.15 : 0.35) : 0;
      const haloBlur = 8;
      const dotScale = isInteractive ? 1 : 0.4;

      const translate = `translate3d(${current.x}px, ${current.y}px, 0)`;

      halo.style.transform = `${translate} translate(-50%, -50%) scale(${haloScale})`;
      halo.style.opacity = `${haloOpacity}`;
      halo.style.filter = `blur(${haloBlur}px)`;

      dot.style.transform = `${translate} translate(-50%, -50%) scale(${dotScale})`;
      dot.style.opacity = target.visible ? "1" : "0";
      dot.style.backgroundColor = isInteractive ? "transparent" : "#FFFFFF";
      dot.style.border = isInteractive ? "2px solid #FFFFFF" : "0px solid transparent";
      dot.style.boxShadow = isInteractive ? "none" : "0 0 8px rgba(255, 255, 255, 0.4)";

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        hideCursor();
      }
    };

    const handleBlur = () => hideCursor();
    const handleVisibility = () => {
      if (document.hidden) hideCursor();
    };

    window.addEventListener("pointermove", updateCursorState, { passive: true });
    window.addEventListener("pointerdown", updateCursorState, { passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mouseout", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updateCursorState);
      window.removeEventListener("pointerdown", updateCursorState);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mouseout", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.documentElement.classList.remove("has-custom-cursor");

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        html.has-custom-cursor,
        html.has-custom-cursor *,
        html.has-custom-cursor *::before,
        html.has-custom-cursor *::after {
          cursor: none !important;
        }

        @media (pointer: coarse) {
          html.has-custom-cursor,
          html.has-custom-cursor *,
          html.has-custom-cursor *::before,
          html.has-custom-cursor *::after {
            cursor: auto !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{ contain: "layout style paint" }}
      >
        <div
          ref={haloRef}
          className="absolute left-0 top-0 h-6 w-6 rounded-full transition-[opacity,transform,filter] duration-200 ease-out"
          style={{
            opacity: 0,
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 45%, transparent 78%)",
            boxShadow: "0 0 20px rgba(255,255,255,0.15)",
            willChange: "transform, opacity, filter",
          }}
        />
        <div
          ref={dotRef}
          className="absolute left-0 top-0 h-5 w-5 rounded-full transition-[opacity,transform,background-color,border-color] duration-75 ease-out"
          style={{
            backgroundColor: "#FFFFFF",
            border: "0px solid transparent",
            boxSizing: "border-box",
            boxShadow: "0 0 8px rgba(255,255,255,0.3)",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </>
  );
}
