"use client";

import { ReactNode, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClickSpark from "@/components/reactbits/ClickSpark";
import PixelSnow from "@/components/reactbits/PixelSnow";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ClickSpark sparkColor="#FFFFFF" sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
      <CustomCursor />
      <PixelSnow particleCount={60} color="#FFFFFF" opacity={0.3} speed={0.4} />
      <Navigation />
      <main className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen animate-pulse" />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </ClickSpark>
  );
}
