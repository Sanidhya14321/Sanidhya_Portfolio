"use client";

import { useEffect, useState, useRef } from "react";

interface LoaderProps {
  done: boolean;
}

export default function Loader({ done }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Fast snappy counter 0 -> 100 over ~450ms
    const duration = 450;
    const steps = 30;
    const interval = duration / steps;
    let current = 0;

    const id = setInterval(() => {
      current += Math.ceil(100 / steps);
      if (current >= 100) {
        current = 100;
        clearInterval(id);
      }
      setCount(current);
    }, interval);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setHidden(true), 400);
      return () => clearTimeout(timer);
    }
  }, [done]);

  if (hidden) return null;

  return (
    <div
      className="loader-overlay"
      style={{
        opacity: done ? 0 : 1,
        transition: "opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
        pointerEvents: done ? "none" : "all",
      }}
      aria-hidden="true"
    >
      <span className="loader-counter">{count}</span>
    </div>
  );
}
