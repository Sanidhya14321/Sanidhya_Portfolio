"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * LazyComponent - Renders children only when they're about to enter the viewport
 * Uses Intersection Observer for optimal performance
 */
export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback = null,
  rootMargin = "100px",
  threshold = 0.01,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className="lazy-component-wrapper">
      {isVisible ? <div className="lazy-load-fade-in">{children}</div> : fallback}
    </div>
  );
};

export default LazyComponent;
