"use client";

import { ReactNode, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import StaggeredColorTransitionProvider from "@/components/ui/StaggeredColorTransition";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Loader finishes after 550ms
    const timer = setTimeout(() => setLoaded(true), 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StaggeredColorTransitionProvider>
      <Loader done={loaded} />
      <CustomCursor />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000]" style={{ background: "var(--bg)", color: "var(--text)", padding: "0.75rem 1rem" }}>Skip to content</a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen" />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </StaggeredColorTransitionProvider>
  );
}
