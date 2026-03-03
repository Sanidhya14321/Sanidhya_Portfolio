"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  const borderColor: Record<string, string> = {
    aurora: "border-purple-500/10",
    industrial: "border-neutral-800",
    glass: "border-white/[0.05]",
    "dark-horse": "border-emerald-500/10",
  };

  const mutedText: Record<string, string> = {
    aurora: "text-slate-500",
    industrial: "text-neutral-600",
    glass: "text-white/30",
    "dark-horse": "text-neutral-600",
  };

  const linkStyle: Record<string, string> = {
    aurora: "text-slate-400 hover:text-purple-400",
    industrial: "text-neutral-500 hover:text-white",
    glass: "text-white/40 hover:text-white/70",
    "dark-horse": "text-neutral-500 hover:text-emerald-400",
  };

  return (
    <footer className={`border-t ${borderColor[theme]}`}>
    </footer>
  );
}
