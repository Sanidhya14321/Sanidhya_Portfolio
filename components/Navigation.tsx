"use client";

import Link from "next/link";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Dock from "@/components/reactbits/Dock";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/events-organized", label: "Events" },
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
    href: "/experience",
    label: "Experience",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
  },
  {
    href: "/projects",
    label: "Projects",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
  },
  {
    href: "/events-organized",
    label: "Events",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
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
  const [active, setActive] = useState<string | null>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = themes.find((t) => t.id === theme)!;

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

  const menuWrapClass = {
    aurora: "bg-[#0f1220]/85 border-purple-400/25",
    industrial: "bg-[#1a1a1a]/90 border-white/20",
    glass: "bg-white/10 border-white/20 backdrop-blur-xl",
    "dark-horse": "bg-black/90 border-emerald-400/25",
  }[theme];

  const menuTextClass = {
    aurora: "text-purple-100",
    industrial: "text-neutral-100",
    glass: "text-white",
    "dark-horse": "text-emerald-100",
  }[theme];

  const menuItemTextClass = {
    aurora: "cursor-pointer text-purple-100 hover:text-purple-200",
    industrial: "cursor-pointer text-neutral-100 hover:text-white",
    glass: "cursor-pointer text-white/90 hover:text-white",
    "dark-horse": "cursor-pointer text-emerald-100 hover:text-emerald-300",
  }[theme];

  const menuPanelClass = {
    aurora: "overflow-hidden rounded-2xl border border-purple-400/30 bg-[#0f1220] shadow-xl backdrop-blur-sm",
    industrial: "overflow-hidden rounded-2xl border border-white/20 bg-[#121212] shadow-xl",
    glass: "overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md",
    "dark-horse": "overflow-hidden rounded-2xl border border-emerald-400/35 bg-black/90 shadow-xl backdrop-blur-sm",
  }[theme];

  const hoverLinkClass = {
    aurora: "text-purple-100/90 hover:text-purple-200",
    industrial: "text-neutral-200 hover:text-white",
    glass: "text-white/80 hover:text-white",
    "dark-horse": "text-emerald-100/90 hover:text-emerald-300",
  }[theme];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-0 z-50"
      >
        <div className="mx-auto grid h-auto w-[90%] grid-cols-[1fr_auto_1fr] items-start py-4 pt-2 lg:w-[80%]">
          <Link href="/" className={`mt-5 justify-self-start text-xl ${logoStyle[theme]}`}>
            SV
          </Link>

          <div className="mt-4 hidden md:flex justify-center">
            <Menu setActive={setActive} className="relative flex justify-center space-x-4 rounded-full border border-transparent bg-transparent px-8 py-3 shadow-none">
              <div className={cn("rounded-full border px-5 py-3", menuWrapClass)}>
                <div className={cn("flex items-center gap-6", menuTextClass)}>
                  <MenuItem setActive={setActive} active={active} item="About" itemClassName={menuItemTextClass} panelClassName={menuPanelClass}>
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/about" className={hoverLinkClass}>About Me</HoveredLink>
                      <HoveredLink href="/experience" className={hoverLinkClass}>Experience</HoveredLink>
                    </div>
                  </MenuItem>
                  <MenuItem setActive={setActive} active={active} item="Work" itemClassName={menuItemTextClass} panelClassName={menuPanelClass}>
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/projects" className={hoverLinkClass}>Projects</HoveredLink>
                      <HoveredLink href="/events-organized" className={hoverLinkClass}>Events Organized</HoveredLink>
                      <HoveredLink href="/skills" className={hoverLinkClass}>Skills</HoveredLink>
                    </div>
                  </MenuItem>
                  <MenuItem setActive={setActive} active={active} item="Contact" itemClassName={menuItemTextClass} panelClassName={menuPanelClass}>
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/contact" className={hoverLinkClass}>Get in Touch</HoveredLink>
                      <HoveredLink href="https://github.com/Sanidhya14321" className={hoverLinkClass}>GitHub</HoveredLink>
                      <HoveredLink href="https://www.linkedin.com/in/sanidhya-vats-9344522b7/" className={hoverLinkClass}>LinkedIn</HoveredLink>
                    </div>
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>

          <div ref={themeRef} className="relative mt-5 justify-self-end">
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
