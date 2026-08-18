"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef({
    tx: -100,
    ty: -100,
    cx: -100,
    cy: -100,
    visible: false,
    hoverType: "none" as "none" | "interactive" | "view",
  });

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const s = stateRef.current;
      if (!s.visible) {
        s.cx = e.clientX;
        s.cy = e.clientY;
        s.visible = true;
      }
      s.tx = e.clientX;
      s.ty = e.clientY;

      const target = e.target as Element | null;
      const viewCard = target?.closest(".work-tile, [data-cursor='view']");
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select");

      if (viewCard) {
        s.hoverType = "view";
      } else if (interactive) {
        s.hoverType = "interactive";
      } else {
        s.hoverType = "none";
      }
    };

    const onMouseLeave = () => {
      stateRef.current.visible = false;
    };

    const render = () => {
      const s = stateRef.current;
      const cursor = cursorRef.current;
      const text = textRef.current;

      if (cursor) {
        // Smooth lerp follow
        s.cx += (s.tx - s.cx) * 0.2;
        s.cy += (s.ty - s.cy) * 0.2;

        const vis = s.visible;
        let scale = 1;
        let width = "12px";
        let height = "12px";
        let label = "";

        if (s.hoverType === "view") {
          scale = 1;
          width = "80px";
          height = "80px";
          label = "VIEW";
        } else if (s.hoverType === "interactive") {
          scale = 1;
          width = "40px";
          height = "40px";
          label = "";
        }

        cursor.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0) translate(-50%, -50%) scale(${vis ? scale : 0})`;
        cursor.style.width = width;
        cursor.style.height = height;
        cursor.style.opacity = vis ? "1" : "0";

        if (text) {
          text.textContent = label;
          text.style.opacity = label ? "1" : "0";
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "width 0.25s cubic-bezier(0.19, 1, 0.22, 1), height 0.25s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s ease",
        willChange: "transform, width, height, opacity",
      }}
    >
      <span
        ref={textRef}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          color: "#000000",
          opacity: 0,
          transition: "opacity 0.15s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
