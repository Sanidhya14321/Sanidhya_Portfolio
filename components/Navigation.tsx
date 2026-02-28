"use client";

import Link from "next/link";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import CardNav, { type CardNavItem } from "@/components/reactbits/CardNav";
import Dock from "@/components/reactbits/Dock";
import { colors } from "@/lib/themes";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

const dockItems = [
  {
    href: "/",
    label: "Home",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  },
  {
    href: "/about",
    label: "About",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  },
  {
    href: "/projects",
    label: "Projects",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
  },
  {
    href: "/skills",
    label: "Skills",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  },
  {
    href: "/contact",
    label: "Contact",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  },
];

const themes: { id: Theme; label: string; color: string }[] = [
  { id: "aurora", label: "Aurora", color: "#7C3AED" },
  { id: "industrial", label: "Industrial", color: "#E5E5E5" },
  { id: "glass", label: "Glass", color: "#6B7280" },
  { id: "dark-horse", label: "Dark Horse", color: "#00FFA3" },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const themeColors = colors[theme];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = themes.find((t) => t.id === theme)!;

  const navBg: Record<string, string> = {
    aurora: "bg-[#0B0D17]/85 border-purple-500/10",
    industrial: "bg-[#141414]/90 border-neutral-800",
    glass: "bg-[#08080C]/60 border-white/[0.06]",
    "dark-horse": "bg-black/85 border-emerald-500/10",
  };

  const logoStyle: Record<string, string> = {
    aurora: "text-purple-400 font-bold",
    industrial: "text-white font-mono font-bold tracking-wider",
    glass: "text-white/90 font-light tracking-widest",
    "dark-horse": "text-emerald-400 font-black",
  };

  const activeColors: Record<string, string> = {
    aurora: "#818CF8",
    industrial: "#000000",
    glass: "#000000",
    "dark-horse": "#00FFA3",
  };

  // CardNav items with theme-specific colors
  const getCardNavItems = (): CardNavItem[] => {
    const accentColor = themeColors.accent;
    const cardBg = themeColors.card;
    const textColor = themeColors.heading;

    // Create gradient variations of card backgrounds
    const cardColors = theme === 'aurora'
      ? ['rgba(124, 58, 237, 0.12)', 'rgba(99, 102, 241, 0.12)', 'rgba(6, 182, 212, 0.12)']
      : theme === 'industrial'
        ? ['rgba(38, 38, 38, 0.9)', 'rgba(64, 64, 64, 0.9)', 'rgba(82, 82, 82, 0.9)']
        : theme === 'glass'
          ? ['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.10)']
          : ['rgba(0, 255, 163, 0.08)', 'rgba(0, 217, 255, 0.08)', 'rgba(52, 211, 153, 0.08)'];

    return [
      {
        label: "About",
        bgColor: cardColors[0],
        textColor: textColor,
        links: [
          { label: "My Story", href: "/about", ariaLabel: "About me" },
          { label: "Experience", href: "/experience", ariaLabel: "Work experience" }
        ]
      },
      {
        label: "Work",
        bgColor: cardColors[1],
        textColor: textColor,
        links: [
          { label: "Projects", href: "/projects", ariaLabel: "My projects" },
          { label: "Skills", href: "/skills", ariaLabel: "Technical skills" }
        ]
      },
      {
        label: "Connect",
        bgColor: cardColors[2],
        textColor: textColor,
        links: [
          { label: "Contact", href: "/contact", ariaLabel: "Get in touch" },
          { label: "GitHub", href: "https://github.com/Sanidhya14321", ariaLabel: "GitHub profile" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/sanidhya-vats-9344522b7/", ariaLabel: "LinkedIn profile" }
        ]
      }
    ];
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-0 left-0 right-0 z-50 `}
      >
        <div className="mx-auto flex h-auto py-4 w-[80%] pt-2 justify-between ">
          <Link href="/" className={`text-xl mt-5 ${logoStyle[theme]}`}>
            SV
          </Link>
          {/* Desktop Card Navigation */}
          <div className="hidden md:flex w-[50%]">
            <CardNav
              logo={
                <Link href="/" className={`text-xl ${logoStyle[theme]}`}>
                  
                </Link>
              }
              items={getCardNavItems()}
              ease="elastic.out(1,1.7)"
              showCTA={true}
              ctaText="Get in Touch"
              ctaHref="/contact"
            />
          </div>


          {/* Theme Switcher */}
          <div ref={themeRef} className="relative mt-5">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white/90 hover:border-white/[0.15] transition-all duration-200"
            >
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: currentTheme.color,
                  boxShadow: `0 0 8px ${currentTheme.color}50`,
                }}
              />
              <span className="hidden sm:inline">{currentTheme.label}</span>
              <svg className={`h-3 w-3 text-white/30 transition-transform duration-200 ${themeOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
            </button>

            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/[0.12] bg-neutral-950/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                >
                  <div className="p-1.5 space-y-0.5">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-150 ${theme === t.id
                            ? "bg-white/[0.1] text-white"
                            : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
                          }`}
                      >
                        <span
                          className={`h-3 w-3 rounded-full flex-shrink-0 ring-1 ring-offset-1 ring-offset-neutral-950 ${theme === t.id ? "" : "ring-transparent"}`}
                          style={{
                            backgroundColor: t.color,
                            ...(theme === t.id ? { "--tw-ring-color": t.color } as React.CSSProperties : {}),
                          }}
                        />
                        {t.label}
                        {theme === t.id && (
                          <svg className="ml-auto h-3 w-3 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Dock for Mobile/Scrolled */}
      <Dock
        items={dockItems}
        activeColor={activeColors[theme]}
        showOnScroll={true}
      />
    </>
  );
}
