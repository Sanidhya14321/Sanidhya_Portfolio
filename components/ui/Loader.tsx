"use client";

import { useEffect, useState, useRef } from "react";

interface LoaderProps {
  done: boolean;
  onComplete: () => void;
}

export default function Loader({ done, onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

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
      const timer = setTimeout(() => { setHidden(true); onCompleteRef.current(); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400);
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
