"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { buttonStyles } from "@/lib/themes";
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
  const { theme } = useTheme();
  const bs = buttonStyles[theme];
  const style = variant === "primary" ? bs.primary : bs.secondary;

  const cls = `${style} ${bs.radius} inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        whileHover={{ scale: 1.02 }}
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
