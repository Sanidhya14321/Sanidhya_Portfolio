import { Theme } from "@/contexts/ThemeContext";

// ─── Typography tokens per theme ───────────────────────────────────────
export const fonts: Record<Theme, { heading: string; body: string; mono: string }> = {
  aurora: {
    heading: "'Syne', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  industrial: {
    heading: "'Space Grotesk', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  glass: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'Fira Code', monospace",
  },
  "dark-horse": {
    heading: "'Space Grotesk', sans-serif",
    body: "'Lexend', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
};

// ─── Color systems per theme ───────────────────────────────────────────
export const colors: Record<Theme, {
  bg: string;
  bgSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  border: string;
  card: string;
  cardHover: string;
  badge: string;
  badgeText: string;
  heading: string;
  gradient: string;
  gradientText: string;
  navBg: string;
  footerBg: string;
}> = {
  aurora: {
    bg: "#0B0D17",
    bgSecondary: "#111328",
    text: "#CBD5E1",
    textSecondary: "#8892B0",
    accent: "#7C3AED",
    accentSecondary: "#06B6D4",
    border: "rgba(124, 58, 237, 0.25)",
    card: "rgba(124, 58, 237, 0.06)",
    cardHover: "rgba(124, 58, 237, 0.12)",
    badge: "rgba(124, 58, 237, 0.15)",
    badgeText: "#A78BFA",
    heading: "#E2E8F0",
    gradient: "linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)",
    gradientText: "linear-gradient(135deg, #818CF8, #A78BFA, #22D3EE)",
    navBg: "rgba(11, 13, 23, 0.85)",
    footerBg: "rgba(11, 13, 23, 0.6)",
  },
  industrial: {
    bg: "#141414",
    bgSecondary: "#1C1C1C",
    text: "#A3A3A3",
    textSecondary: "#737373",
    accent: "#E5E5E5",
    accentSecondary: "#A3A3A3",
    border: "rgba(255, 255, 255, 0.08)",
    card: "rgba(255, 255, 255, 0.03)",
    cardHover: "rgba(255, 255, 255, 0.06)",
    badge: "rgba(255, 255, 255, 0.06)",
    badgeText: "#D4D4D4",
    heading: "#FAFAFA",
    gradient: "linear-gradient(135deg, #E5E5E5, #A3A3A3)",
    gradientText: "linear-gradient(135deg, #FAFAFA, #A3A3A3)",
    navBg: "rgba(20, 20, 20, 0.9)",
    footerBg: "rgba(20, 20, 20, 0.6)",
  },
  glass: {
    bg: "#08080C",
    bgSecondary: "#12121A",
    text: "#D1D5DB",
    textSecondary: "#9CA3AF",
    accent: "#FFFFFF",
    accentSecondary: "#D1D5DB",
    border: "rgba(255, 255, 255, 0.08)",
    card: "rgba(255, 255, 255, 0.04)",
    cardHover: "rgba(255, 255, 255, 0.08)",
    badge: "rgba(255, 255, 255, 0.08)",
    badgeText: "#E5E7EB",
    heading: "#FFFFFF",
    gradient: "linear-gradient(135deg, #FFFFFF, #9CA3AF)",
    gradientText: "linear-gradient(135deg, #FFFFFF, #6B7280)",
    navBg: "rgba(8, 8, 12, 0.6)",
    footerBg: "rgba(8, 8, 12, 0.4)",
  },
  "dark-horse": {
    bg: "#000000",
    bgSecondary: "#0A0A0A",
    text: "#A3A3A3",
    textSecondary: "#737373",
    accent: "#00FFA3",
    accentSecondary: "#00D9FF",
    border: "rgba(0, 255, 163, 0.12)",
    card: "rgba(0, 255, 163, 0.03)",
    cardHover: "rgba(0, 255, 163, 0.08)",
    badge: "rgba(0, 255, 163, 0.1)",
    badgeText: "#00FFA3",
    heading: "#FFFFFF",
    gradient: "linear-gradient(135deg, #00FFA3, #00D9FF)",
    gradientText: "linear-gradient(135deg, #00FFA3, #00D9FF)",
    navBg: "rgba(0, 0, 0, 0.85)",
    footerBg: "rgba(0, 0, 0, 0.6)",
  },
};

// ─── Card style tokens per theme ──────────────────────────────────────
export const cardStyles: Record<Theme, {
  base: string;
  hover: string;
  radius: string;
  shadow: string;
}> = {
  aurora: {
    base: "border border-purple-500/20 bg-purple-500/[0.04]",
    hover: "hover:border-purple-500/40 hover:bg-purple-500/[0.08]",
    radius: "rounded-2xl",
    shadow: "",
  },
  industrial: {
    base: "border-2 border-neutral-800 bg-neutral-900",
    hover: "hover:border-neutral-700",
    radius: "rounded-none",
    shadow: "",
  },
  glass: {
    base: "border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
    hover: "hover:bg-white/[0.06] hover:border-white/[0.15]",
    radius: "rounded-3xl",
    shadow: "shadow-2xl shadow-black/20",
  },
  "dark-horse": {
    base: "border border-white/[0.06] bg-black",
    hover: "hover:border-emerald-500/30",
    radius: "rounded-lg",
    shadow: "",
  },
};

// ─── Section heading styles per theme ─────────────────────────────────
export const sectionStyles: Record<Theme, {
  labelClass: string;
  headingClass: string;
  dividerClass: string;
}> = {
  aurora: {
    labelClass: "text-purple-400 tracking-[0.2em] uppercase text-xs font-semibold",
    headingClass: "text-2xl md:text-3xl font-bold tracking-tight",
    dividerClass: "w-16 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 mt-4",
  },
  industrial: {
    labelClass: "text-neutral-500 tracking-[0.3em] uppercase text-xs font-mono",
    headingClass: "text-2xl md:text-3xl font-bold tracking-tighter",
    dividerClass: "w-24 h-[3px] bg-white mt-4",
  },
  glass: {
    labelClass: "text-white/40 tracking-[0.15em] uppercase text-xs font-medium",
    headingClass: "text-2xl md:text-3xl font-light tracking-tight",
    dividerClass: "w-12 h-px bg-white/20 mt-4",
  },
  "dark-horse": {
    labelClass: "text-emerald-400 tracking-[0.25em] uppercase text-xs font-mono font-bold",
    headingClass: "text-2xl md:text-3xl font-black tracking-tight",
    dividerClass: "w-8 h-1 bg-emerald-400 mt-4",
  },
};

// ─── Button styles per theme ──────────────────────────────────────────
export const buttonStyles: Record<Theme, {
  primary: string;
  secondary: string;
  radius: string;
}> = {
  aurora: {
    primary: "bg-purple-600 text-white hover:bg-purple-500 border border-purple-500",
    secondary: "border border-purple-500/40 text-purple-300 hover:bg-purple-500/10",
    radius: "rounded-xl",
  },
  industrial: {
    primary: "bg-white text-black hover:bg-neutral-200 border-2 border-white",
    secondary: "border-2 border-neutral-600 text-neutral-300 hover:border-neutral-400",
    radius: "rounded-none",
  },
  glass: {
    primary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
    secondary: "border border-white/10 text-white/70 hover:bg-white/5",
    radius: "rounded-full",
  },
  "dark-horse": {
    primary: "bg-emerald-400 text-black hover:bg-emerald-300 border border-emerald-400 font-bold",
    secondary: "border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10",
    radius: "rounded-lg",
  },
};

// ─── Inline CSS card colors (bypasses Tailwind class scanning) ────────
export const cardCSS: Record<Theme, {
  bg: string;
  border: string;
  hoverBorder: string;
  backdropFilter?: string;
}> = {
  aurora: {
    bg: "rgba(168, 85, 247, 0.06)",
    border: "rgba(168, 85, 247, 0.25)",
    hoverBorder: "rgba(168, 85, 247, 0.40)",
  },
  industrial: {
    bg: "rgba(23, 23, 23, 0.8)",
    border: "rgb(64, 64, 64)",
    hoverBorder: "rgb(82, 82, 82)",
  },
  glass: {
    bg: "rgba(255, 255, 255, 0.04)",
    border: "rgba(255, 255, 255, 0.10)",
    hoverBorder: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(16px)",
  },
  "dark-horse": {
    bg: "rgba(2, 44, 34, 0.20)",
    border: "rgba(16, 185, 129, 0.20)",
    hoverBorder: "rgba(52, 211, 153, 0.40)",
  },
};

// ─── Inline accent colors ─────────────────────────────────────────────
export const accentCSS: Record<Theme, {
  primary: string;
  dot: string;
  line: string;
  iconBg: string;
  impact: string;
}> = {
  aurora: {
    primary: "#C084FC",
    dot: "#8B5CF6",
    line: "rgba(168, 85, 247, 0.20)",
    iconBg: "rgba(168, 85, 247, 0.10)",
    impact: "#22D3EE",
  },
  industrial: {
    primary: "#FAFAFA",
    dot: "#FFFFFF",
    line: "rgb(64, 64, 64)",
    iconBg: "rgb(38, 38, 38)",
    impact: "#FAFAFA",
  },
  glass: {
    primary: "rgba(255, 255, 255, 0.70)",
    dot: "rgba(255, 255, 255, 0.40)",
    line: "rgba(255, 255, 255, 0.08)",
    iconBg: "rgba(255, 255, 255, 0.04)",
    impact: "rgba(255, 255, 255, 0.70)",
  },
  "dark-horse": {
    primary: "#34D399",
    dot: "#34D399",
    line: "rgba(16, 185, 129, 0.15)",
    iconBg: "rgba(52, 211, 153, 0.10)",
    impact: "#34D399",
  },
};

// ─── Badge inline styles ──────────────────────────────────────────────
export const badgeCSS: Record<Theme, {
  bg: string;
  color: string;
  border: string;
  borderWidth: string;
  backdropFilter?: string;
}> = {
  aurora: {
    bg: "rgba(168, 85, 247, 0.15)",
    color: "#D8B4FE",
    border: "rgba(168, 85, 247, 0.20)",
    borderWidth: "4px",
  },
  industrial: {
    bg: "rgb(38, 38, 38)",
    color: "#D4D4D4",
    border: "rgb(64, 64, 64)",
    borderWidth: "4px",
  },
  glass: {
    bg: "rgba(255, 255, 255, 0.06)",
    color: "rgba(255, 255, 255, 0.70)",
    border: "rgba(255, 255, 255, 0.10)",
    borderWidth: "4px",
    backdropFilter: "blur(4px)",
  },
  "dark-horse": {
    bg: "rgba(16, 185, 129, 0.10)",
    color: "#34D399",
    border: "rgba(16, 185, 129, 0.20)",
    borderWidth: "4px",
  },
};
