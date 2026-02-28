"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "aurora" | "industrial" | "glass" | "dark-horse";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("aurora");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved && ["aurora", "industrial", "glass", "dark-horse"].includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
