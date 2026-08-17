// ─── Unified Black & White Theme System ───────────────────────────────────

export const fonts = {
  heading: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
};

export const colors = {
  bg: "#0A0A0A",
  bgSecondary: "#141414",
  text: "#D4D4D4",
  textSecondary: "#8A8A8A",
  accent: "#FFFFFF",
  accentSecondary: "#A3A3A3",
  border: "rgba(255, 255, 255, 0.10)",
  card: "rgba(255, 255, 255, 0.03)",
  cardHover: "rgba(255, 255, 255, 0.06)",
  badge: "rgba(255, 255, 255, 0.06)",
  badgeText: "#E5E5E5",
  heading: "#FFFFFF",
  gradient: "linear-gradient(135deg, #FFFFFF, #737373)",
  gradientText: "linear-gradient(135deg, #FFFFFF, #A3A3A3)",
  navBg: "rgba(10, 10, 10, 0.85)",
  footerBg: "rgba(10, 10, 10, 0.6)",
};

export const cardStyles = {
  base: "border border-white/10 bg-white/[0.03] backdrop-blur-md",
  hover: "hover:border-white/20 hover:bg-white/[0.05]",
  radius: "rounded-2xl",
  shadow: "shadow-xl shadow-black/40",
};

export const sectionStyles = {
  labelClass: "text-neutral-400 tracking-[0.25em] uppercase text-xs font-mono font-bold",
  headingClass: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white",
  dividerClass: "w-12 h-0.5 bg-white/40 mt-4",
};

export const buttonStyles = {
  primary: "bg-white text-black hover:bg-neutral-200 border border-white font-medium",
  secondary: "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
  radius: "rounded-xl",
};

export const cardCSS = {
  bg: "rgba(20, 20, 20, 0.7)",
  border: "rgba(255, 255, 255, 0.10)",
  hoverBorder: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(12px)",
};

export const accentCSS = {
  primary: "#FFFFFF",
  dot: "#FFFFFF",
  line: "rgba(255, 255, 255, 0.15)",
  iconBg: "rgba(255, 255, 255, 0.06)",
  impact: "#E5E5E5",
};

export const cursorCSS = {
  dot: "#FFFFFF",
  glow: "rgba(255, 255, 255, 0.25)",
  glowSoft: "rgba(255, 255, 255, 0.08)",
};

export const badgeCSS = {
  bg: "rgba(255, 255, 255, 0.06)",
  color: "#E5E5E5",
  border: "rgba(255, 255, 255, 0.12)",
  borderWidth: "1px",
};
