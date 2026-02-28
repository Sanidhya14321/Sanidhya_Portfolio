"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cardStyles } from "@/lib/themes";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export default function ThemedCard({ children, className = "", delay = 0, onClick }: ThemedCardProps) {
  const { theme } = useTheme();
  const cs = cardStyles[theme];

  return (
    <motion.div
      className={`${cs.base} ${cs.hover} ${cs.radius} ${cs.shadow} p-7 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
