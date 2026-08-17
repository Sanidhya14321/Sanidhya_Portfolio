"use client";

import { motion } from "framer-motion";
import ShinyText from "@/components/reactbits/ShinyText";
import BlurText from "@/components/reactbits/BlurText";

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${isCenter ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="inline-block mb-3">
        <ShinyText 
          text={label}
          speed={5}
          className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 !text-inherit"
        />
      </div>
      <BlurText 
        text={title}
        delay={50}
        animateBy="words"
        direction="top"
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
      />
      <div className={`w-12 h-0.5 bg-white/30 mt-4 ${isCenter ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
