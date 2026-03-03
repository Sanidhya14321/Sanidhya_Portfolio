"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { colors } from "@/lib/themes";

/**
 * RouteLoadingIndicator - Shows a loading bar at the top during route transitions
 */
export const RouteLoadingIndicator = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const themeColors = colors[theme];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const barColor: Record<string, string> = {
    aurora: "#7C3AED",
    industrial: "#FFFFFF",
    glass: "rgba(255, 255, 255, 0.7)",
    "dark-horse": "#00FFA3",
  };

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-1">
      <div
        className="h-full animate-pulse"
        style={{
          background: `linear-gradient(90deg, transparent, ${barColor[theme]}, transparent)`,
          animation: "loading-bar 1s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default RouteLoadingIndicator;
