"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ThemedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function ThemedButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  external = false,
}: ThemedButtonProps) {
  const baseClass = variant === "primary"
    ? "bg-white text-black hover:bg-neutral-200 border border-white font-medium shadow-md shadow-white/5"
    : "border border-white/20 bg-white/[0.03] text-white hover:border-white/50 hover:bg-white/[0.08] font-medium";

  const cls = `${baseClass} rounded-xl inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
