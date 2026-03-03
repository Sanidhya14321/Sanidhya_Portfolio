"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { colors } from "@/lib/themes";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { theme } = useTheme();
  const themeColors = colors[theme];

  useEffect(() => {
    // Simulate loading progress
    const intervals = [
      { time: 100, progress: 20 },
      { time: 300, progress: 40 },
      { time: 500, progress: 60 },
      { time: 700, progress: 80 },
      { time: 900, progress: 95 },
      { time: 1200, progress: 100 },
    ];

    const timers = intervals.map(({ time, progress }) =>
      setTimeout(() => setLoadingProgress(progress), time)
    );

    // Hide loading screen after animation completes
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, []);

  const progressBarColor: Record<string, string> = {
    aurora: "#7C3AED",
    industrial: "#FFFFFF",
    glass: "rgba(255, 255, 255, 0.7)",
    "dark-horse": "#00FFA3",
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, loadingProgress, setLoadingProgress }}
    >
      {isLoading && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500"
          style={{
            backgroundColor: themeColors.bg,
            opacity: loadingProgress === 100 ? 0 : 1,
            pointerEvents: loadingProgress === 100 ? "none" : "auto",
          }}
        >
          {/* Logo or Brand Name */}
          <div className="mb-8">
            <h1
              className="text-5xl font-bold tracking-tight"
              style={{ color: themeColors.heading }}
            >
              SV
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${loadingProgress}%`,
                backgroundColor: progressBarColor[theme],
                boxShadow: `0 0 10px ${progressBarColor[theme]}`,
              }}
            />
          </div>

          {/* Loading Text */}
          <p
            className="mt-4 text-sm font-medium"
            style={{ color: themeColors.textSecondary }}
          >
            Loading... {loadingProgress}%
          </p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
