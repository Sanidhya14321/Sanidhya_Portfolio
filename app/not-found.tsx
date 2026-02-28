"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import BlurText from "@/components/reactbits/BlurText";
import Magnet from "@/components/reactbits/Magnet";
import { buttonStyles } from "@/lib/themes";

export default function NotFound() {
  const { theme } = useTheme();
  const bs = buttonStyles[theme];

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <BlurText
          text="404"
          delay={60}
          animateBy="words"
          direction="top"
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--heading)]"
        />
        <p className="mt-8 text-lg opacity-60">Page not found</p>
        <div className="mt-12">
          <Magnet padding={40} magnetStrength={2}>
            <Link
              href="/"
              className={`inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold ${bs.primary} ${bs.radius}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Go Home
            </Link>
          </Magnet>
        </div>
      </motion.div>
    </div>
  );
}
