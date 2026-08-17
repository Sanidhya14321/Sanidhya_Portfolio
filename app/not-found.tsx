"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BlurText from "@/components/reactbits/BlurText";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <BlurText
          text="404"
          delay={60}
          animateBy="words"
          direction="top"
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
        />
        <p className="mt-6 text-base md:text-lg text-neutral-400">Page not found</p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-black rounded-xl hover:bg-neutral-200 transition-all shadow-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Return to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
