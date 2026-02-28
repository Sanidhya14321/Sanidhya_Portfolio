"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { sectionStyles } from "@/lib/themes";
import { motion } from "framer-motion";
import ShinyText from "@/components/reactbits/ShinyText";
import BlurText from "@/components/reactbits/BlurText";

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, align = "left" }: SectionHeadingProps) {
  const { theme } = useTheme();
  const styles = sectionStyles[theme];
  const isCenter = align === "center";

  return (
    <motion.div
      className={`mb-24 ${isCenter ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <ShinyText 
        text={label}
        speed={4}
        className={`${styles.labelClass} !text-inherit`}
      />
      <BlurText 
        text={title}
        delay={50}
        animateBy="words"
        direction="top"
        className={`${styles.headingClass} mt-5 text-[var(--heading)]`}
      />
      <div className={`${styles.dividerClass} ${isCenter ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
