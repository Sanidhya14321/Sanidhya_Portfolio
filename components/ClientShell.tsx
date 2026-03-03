"use client";

import { ReactNode, Suspense, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClickSpark from "@/components/reactbits/ClickSpark";
import PixelSnow from "@/components/reactbits/PixelSnow";
import RouteLoadingIndicator from "@/components/ui/RouteLoadingIndicator";

const sparkColor: Record<string, string> = {
  aurora: "#a855f7",
  industrial: "#ffffff",
  glass: "#ffffff",
  "dark-horse": "#00ffa3",
};

const snowColor: Record<string, string> = {
  aurora: "#a855f7",
  industrial: "#ffffff",
  glass: "#ffffff",
  "dark-horse": "#00ffa3",
};

export default function ClientShell({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as loaded after hydration
    setIsLoaded(true);
  }, []);

  return (
    <ClickSpark sparkColor={sparkColor[theme]} sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
      <RouteLoadingIndicator />
      <PixelSnow particleCount={80} color={snowColor[theme]} opacity={0.4} speed={0.5} />
      <Navigation />
      <div className="pt-20 min-h-screen">
        <Suspense fallback={<div className="min-h-screen animate-pulse" />}>
          {children}
        </Suspense>
      </div>
      <Footer />
    </ClickSpark>
  );
}
