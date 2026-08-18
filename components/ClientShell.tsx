"use client";

import { ReactNode, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Loader finishes after 550ms
    const timer = setTimeout(() => setLoaded(true), 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader done={loaded} />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen" />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
