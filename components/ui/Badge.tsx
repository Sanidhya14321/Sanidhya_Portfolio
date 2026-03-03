"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { badgeCSS } from "@/lib/themes";
import { motion } from "framer-motion";

export default function Badge({ text }: { text: string }) {
  const { theme } = useTheme();
  const b = badgeCSS[theme];

  const radius: Record<string, string> = {
    aurora: "rounded-lg",
    industrial: "rounded-none",
    glass: "rounded-full",
    "dark-horse": "rounded-md",
  };

  return (
    <motion.span
      className={`inline-block px-3 py-1 text-xs font-medium ${radius[theme]}`}
      style={{
        backgroundColor: b.bg,
        color: b.color,
        borderColor: b.border,
        borderWidth: b.borderWidth,
        borderStyle: "solid",
        backdropFilter: b.backdropFilter,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
}
