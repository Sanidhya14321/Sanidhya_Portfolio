"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { LumaSpin } from "@/components/ui/luma-spin";

/**
 * RouteLoadingIndicator - Shows a loading bar at the top during route transitions
 */
export const RouteLoadingIndicator = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const bgColor: Record<string, string> = {
    aurora: "rgba(15, 18, 32, 0.55)",
    industrial: "rgba(0, 0, 0, 0.55)",
    glass: "rgba(10, 10, 20, 0.35)",
    "dark-horse": "rgba(0, 12, 8, 0.55)",
  };

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-[2px]"
      style={{ backgroundColor: bgColor[theme] }}
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <LumaSpin />
    </div>
  );
};

export default RouteLoadingIndicator;
