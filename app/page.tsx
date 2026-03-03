"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { buttonStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import BlurText from "@/components/reactbits/BlurText";
import GradientText from "@/components/reactbits/GradientText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import Particles from "@/components/reactbits/Particles";
import DecryptedText from "@/components/reactbits/DecryptedText";
import RotatingText from "@/components/reactbits/RotatingText";
import ShinyText from "@/components/reactbits/ShinyText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import ThemedButton from "@/components/ui/ThemedButton";
import ProfileCard from "@/components/reactbits/ProfileCard";
import LazyComponent from "@/components/ui/LazyComponent";
import Skeleton from "@/components/ui/Skeleton";
import GitHubContributionWrapper from "@/components/GitHubContributionWrapper";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const { theme } = useTheme();
  const data = portfolioData;
  const ac = accentCSS[theme];
  const cc = cardCSS[theme];

  const topSkills = Object.values(data.skills).flat().sort((a, b) => b.level - a.level).slice(0, 6);

  /* ── Themes ───────────────────────────────── */
  const gradientColors: Record<string, string[]> = {
    aurora: ["#818CF8", "#A78BFA", "#22D3EE"],
    industrial: ["#FAFAFA", "#A3A3A3", "#D4D4D4"],
    glass: ["#FFFFFF", "#9CA3AF", "#D1D5DB"],
    "dark-horse": ["#00FFA3", "#00D9FF", "#34D399"],
  };

  const particleColors: Record<string, string[]> = {
    aurora: ["#7C3AED", "#818CF8", "#06B6D4"],
    industrial: ["#525252", "#737373", "#404040"],
    glass: ["#6B7280", "#9CA3AF", "#4B5563"],
    "dark-horse": ["#059669", "#10B981", "#06B6D4"],
  };

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.25)",
    industrial: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(255, 255, 255, 0.15)",
    "dark-horse": "rgba(0, 255, 163, 0.18)",
  };

  const nameClass: Record<string, string> = {
    aurora: "font-bold tracking-tight",
    industrial: "font-mono font-bold tracking-tighter uppercase",
    glass: "font-extralight tracking-tight",
    "dark-horse": "font-black tracking-tighter",
  };

  const labelClass: Record<string, string> = {
    aurora: "text-purple-400/80 tracking-widest uppercase text-xs md:text-sm font-semibold",
    industrial: "text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-mono",
    glass: "text-white/30 tracking-[0.15em] uppercase text-xs md:text-sm font-medium",
    "dark-horse": "text-emerald-400/80 tracking-[0.25em] uppercase text-xs md:text-sm font-mono font-bold",
  };

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const previewCardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  const rotatingWords: Record<string, string[]> = {
    aurora: ["Developer", "AI-ML Engineer"],
    industrial: ["Developer", "AI-ML Engineer"],
    glass: ["Developer", "AI-ML Engineer"],
    "dark-horse": ["Developer", "AI-ML Engineer"],
  };

  // Theme-specific contribution graph colors
  const contributionBrandColors: Record<string, string> = {
    aurora: "#A78BFA",
    industrial: "#FAFAFA",
    glass: "#22D3EE",
    "dark-horse": "#34D399",
  };

  const contributionPrimaryColors: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.08)",
    industrial: "rgba(255, 255, 255, 0.08)",
    glass: "rgba(34, 211, 238, 0.06)",
    "dark-horse": "rgba(52, 211, 153, 0.08)",
  };

  return (
    <PageTransition>
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 ">
        <LazyComponent
          fallback={<div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-transparent via-white/5 to-transparent" />}
        >
          <div className="absolute inset-0 z-0 opacity-40">
            <Particles
              particleCount={100}
              speed={0.05}
              particleColors={particleColors[theme]}
              moveParticlesOnHover
              alphaParticles
              className="w-full h-full"
            />
          </div>
        </LazyComponent>

        <div className="relative z-10 w-full mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center">
            {/* Status badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8 px-4 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: ac.dot }} />
              <ShinyText text="Available for work" speed={4} className={labelClass[theme]} />
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-6 text-center">
              <BlurText
                text={data.name}
                delay={80}
                animateBy="words"
                direction="bottom"
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.1] text-[var(--heading)] ${nameClass[theme]}`}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={fadeUp} className="mb-10 min-h-12 flex items-center justify-center overflow-hidden py-2">
              <RotatingText
                texts={rotatingWords[theme]}
                className={`text-lg md:text-xl font-semibold text-[var(--heading)] leading-normal`}
                rotationInterval={3000}
                staggerFrom={'first'}
                staggerDuration={0.03}
              />
            </motion.div>

            {/* Bio & Profile Card Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start gap-12 lg:gap-0 w-full">
              <div className="max-w-2xl text-center lg:text-left">
                <motion.p variants={fadeUp} className="text-sm md:text-2xl text-center leading-relaxed opacity-60 mb-8 pt-14 px-4 lg:px-0">
                  {data.about.narrative}
                </motion.p>
                {/* CTA Buttons */}
                <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center gap-4 text-center justify-center lg:justify-start">
                  <ClickSpark sparkColor={ac.primary}>
                    <ThemedButton href="/projects" variant="primary">
                      View Projects
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </ThemedButton>
                  </ClickSpark>

                  <ClickSpark sparkColor={ac.primary}>
                    <ThemedButton href="/contact" variant="secondary">
                      Get in Touch
                    </ThemedButton>
                  </ClickSpark>
                </motion.div>
              </div>

              {/* Profile Card with responsive padding */}
              <LazyComponent
                fallback={
                  <div className="lg:pl-20 shrink-0">
                    <Skeleton variant="rounded" width={300} height={400} />
                  </div>
                }
                rootMargin="200px"
              >
                <div className="lg:pl-20 shrink-0 scale-90 sm:scale-90">
                  <ProfileCard
                    name="Sanidhya Vats"
                    title="Engineer"
                    handle="sanidhyavats"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/Sanid.png"
                    showUserInfo={false}
                    enableTilt={true}
                    enableMobileTilt={false}
                    theme={theme as 'aurora' | 'industrial' | 'glass' | 'dark-horse'}
                    onContactClick={() => console.log('Contact clicked')}
                    iconUrl="https://imgs.search.brave.com/tV7e4_EfkUavEsoByLbDhawqLKYEqZHTxlBIe2H9Oto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9zb3VyY2Ut/Y29kZS1jaXJjbGUt/aWNvbi1zdmctZG93/bmxvYWQtcG5nLTEx/NDIzMDgzLnBuZz9m/PXdlYnAmdz0xMjg"
                    behindGlowEnabled
                  />
                </div>
              </LazyComponent>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ── Preview Grid Section ─────────────────────────── */}
      <section className="w-full mx-auto px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 text-center"
        >
          <GradientText colors={gradientColors[theme]} className="text-4xl md:text-6xl p-2 font-bold">
            <DecryptedText text="Explore My Work" speed={40} className="!text-inherit" />
          </GradientText>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[95%] lg:max-w-[85%] 2xl:max-w-[70%] mx-auto"
        >
          {/* About Card */}
          <motion.div variants={fadeUp}>
            <Link href="/about" className="group block h-full">
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`h-full border ${cardRadius[theme]} p-8 transition-transform hover:scale-[1.02]`} style={previewCardStyle}>
                <p className={`${labelClass[theme]} mb-4`}>About</p>
                <p className="text-xl opacity-60 line-clamp-4">{data.about.narrative}</p>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* Experience Card */}
          <motion.div variants={fadeUp}>
            <Link href="/experience" className="group block h-full">
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`h-full border ${cardRadius[theme]} p-8 transition-transform hover:scale-[1.02]`} style={previewCardStyle}>
                <p className={`${labelClass[theme]} mb-6`}>Recent Experience</p>
                <div className="space-y-6">
                  {data.experience.slice(0, 2).map((exp) => (
                    <div key={exp.company} className="border-l-2 border-white/10 pl-4">
                      <p className="font-semibold text-lg text-[var(--heading)]">{exp.title}</p>
                      <p className="text-sm opacity-50">{exp.company} • {exp.period}</p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={fadeUp}>
            <Link href="/skills" className="h-full group block">
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`h-full border ${cardRadius[theme]} p-8 transition-transform hover:scale-[1.02]`} style={previewCardStyle}>
                <p className={`${labelClass[theme]} mb-6`}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((s) => (
                    <span key={s.name} className="px-3 py-1 text-sm border rounded-full border-white/10 opacity-70">
                      {s.name}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}