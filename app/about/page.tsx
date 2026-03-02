"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { sectionStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import GradientText from "@/components/reactbits/GradientText";
import ClickSpark from "@/components/reactbits/ClickSpark";

const reveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.07 },
  }),
} as any;

export default function AboutPage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.3)",
    industrial: "rgba(255,255,255,0.1)",
    glass: "rgba(255,255,255,0.18)",
    "dark-horse": "rgba(0,255,163,0.2)",
  };

  const r: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const gradientColors: [string, string] = (
    {
      aurora: ["#818CF8", "#A78BFA"],
      industrial: ["#FAFAFA", "#A3A3A3"],
      glass: ["#FFFFFF", "#9CA3AF"],
      "dark-horse": ["#00FFA3", "#00D9FF"],
    } as Record<string, [string, string]>
  )[theme];

  const cs: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <PageTransition>
      <div ref={containerRef} className="relative mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 py-12">
        <SectionHeading label="Background" title="About Me" />

        {/* ── SCROLL-DRIVEN SPINE ── */}
        <div className="absolute left-[2.75rem] md:left-[3.25rem] top-36 bottom-0 w-px overflow-hidden hidden md:block" style={{ backgroundColor: `${cc.border}` }}>
          <motion.div
            className="w-full origin-top"
            style={{ height: spineHeight, backgroundColor: ac.primary }}
          />
        </div>

        <div className="mt-16 md:pl-16 space-y-0">

          {/* ══════════════════════════════════════
              SECTION 1 — THE NARRATIVE
              Full-bleed typographic hero moment
          ══════════════════════════════════════ */}
          <div className="relative pb-20">
            {/* Spine dot */}
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 items-center justify-center"
              style={{ borderColor: ac.primary, backgroundColor: cc.bg }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ac.primary }} />
            </motion.div>

            {/* Section label */}
            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-2xl font-bold">
                <ShinyText text="01 - The Story" speed={4} className="!text-inherit" />
              </GradientText>
            </motion.div>

            {/* The narrative itself — NO card, just raw type on the page */}
            <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <ClickSpark sparkColor={ac.primary}>
                <SpotlightCard
                  spotlightColor={spotlightColor[theme]}
                  className={`group relative inline-flex items-start gap-3 border px-5 py-4 ${r[theme]} cursor-default hover:scale-[1.03] transition-transform duration-300`}
                  style={{
                    ...cs,
                    maxWidth: "",
                  }}
                >
                  <div className="relative group cursor-default">
                    {/* Hover background that bleeds in */}
                    <div
                      className={`absolute inset-0 -m-6 md:-m-8 ${r[theme]} opacity-100 transition-opacity duration-500`}
                      style={{ backgroundColor: `${cc.bg}`, border: `1px solid ${cc.border}` }}
                    />
                    <div className="relative">
                      <BlurText
                        text={data.about.narrative}
                        delay={22}
                        animateBy="words"
                        direction="top"
                        className="text-lg md:text-2xl lg:text-[1.6rem] leading-[1.75] font-light tracking-tight opacity-80"
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </ClickSpark>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════
              SECTION 2 — CORE FOCUS
              Horizontal "pill rail" — breaks card grid entirely
          ══════════════════════════════════════ */}
          <div className="relative pb-20">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 items-center justify-center"
              style={{ borderColor: ac.primary, backgroundColor: cc.bg }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ac.primary }} />
            </motion.div>

            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-2xl font-bold">
                <ShinyText text="02 - Core Focus Areas" speed={4} className="!text-inherit" />
              </GradientText>
            </motion.div>

            {/* The big flex wrap of oversized pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {data.about.highlights.map((h, i) => (
                <motion.div key={i} variants={reveal} custom={i}>
                  <ClickSpark sparkColor={ac.primary}>
                    <SpotlightCard
                      spotlightColor={spotlightColor[theme]}
                      className={`group relative inline-flex items-start gap-3 border px-5 py-4 ${r[theme]} cursor-default hover:scale-[1.03] transition-transform duration-300`}
                      style={{
                        ...cs,
                        maxWidth: "420px",
                      }}
                    >
                      {/* Animated fill on hover */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${ac.primary}18, transparent)`,
                          borderRadius: "inherit",
                        }}
                      />
                      <span className="mt-0.5 flex-shrink-0 relative z-10" style={{ color: ac.primary }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <p className="text-sm md:text-base leading-relaxed relative z-10" style={{ opacity: 0.75 }}>{h}</p>
                    </SpotlightCard>
                  </ClickSpark>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ══════════════════════════════════════
              SECTION 3 — EDUCATION
              "Receipt" / manifest aesthetic — raw data, no decorative card
          ══════════════════════════════════════ */}
          <div className="relative pb-20">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 items-center justify-center"
              style={{ borderColor: ac.primary, backgroundColor: cc.bg }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ac.primary }} />
            </motion.div>

            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-8"
            >
              <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-2xl font-bold">
                <ShinyText text="03 - Education" speed={4} className="!text-inherit" />
              </GradientText>
            </motion.div>

            <ClickSpark sparkColor={ac.primary}>
              <SpotlightCard
                spotlightColor={spotlightColor[theme]}
                className={`border ${r[theme]} overflow-hidden hover:scale-[1.005] transition-transform duration-300`}
                style={cs}
              >
                {/* Top bar — like a receipt header */}
                <div
                  className="px-6 md:px-10 py-4 flex items-center justify-between border-b"
                  style={{ borderColor: cc.border, backgroundColor: `${ac.primary}10` }}
                >
                  <DecryptedText
                    text="Education"
                    speed={35}
                    maxIterations={10}
                    className="text-xs font-black uppercase tracking-[0.3em] !text-inherit"
                  />
                  <span className="text-xs font-mono opacity-60" style={{ color: ac.primary }}>
                    {data.education.period}
                  </span>
                </div>

                {/* Main content */}
                <div className="px-6 md:px-10 py-8">
                  <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <p className="text-2xl md:text-3xl font-bold text-[var(--heading)] leading-tight tracking-tight">
                      {data.education.degree}
                    </p>
                    <p className="mt-3 text-base md:text-lg" style={{ opacity: 0.5 }}>
                      {data.education.institution}
                    </p>
                  </motion.div>

                  {data.education.achievements.length > 0 && (
                    <>
                      <div className="my-6 border-t border-dashed" style={{ borderColor: cc.border }} />
                      <motion.ul
                        className="space-y-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                      >
                        {data.education.achievements.map((a, i) => (
                          <motion.li
                            key={i}
                            variants={reveal}
                            custom={i}
                            className="flex items-start gap-3 text-xs md:text-sm"
                            style={{ opacity: 0.6 }}
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: ac.primary }} />
                            {a}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </>
                  )}
                </div>
              </SpotlightCard>
            </ClickSpark>
          </div>

          {/* ══════════════════════════════════════
              SECTION 4 — ACHIEVEMENTS
              Dense masonry-feel board, each tile
              sized by content, staggered reveal
          ══════════════════════════════════════ */}
          {data.achievements.length > 0 && (
            <div className="relative pb-8">
              <motion.div
                variants={reveal}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 items-center justify-center"
                style={{ borderColor: ac.primary, backgroundColor: cc.bg }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ac.primary }} />
              </motion.div>

              <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-center justify-between mb-10"
              >
                <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-2xl font-bold">
                <ShinyText text="04 - Achievements" speed={4} className="!text-inherit" />
              </GradientText>
              </motion.div>

              <motion.div
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {data.achievements.map((a, i) => (
                  <motion.div key={i} variants={reveal} custom={i} className="break-inside-avoid">
                    <ClickSpark sparkColor={ac.primary}>
                      <SpotlightCard
                        spotlightColor={spotlightColor[theme]}
                        className={`group relative border ${r[theme]} p-4 md:p-5 hover:scale-[1.02] transition-transform duration-250 cursor-default`}
                        style={cs}
                      >
                        {/* Accent corner */}
                        <span
                          className="absolute top-0 left-0 w-6 h-0.5 transition-all duration-300 group-hover:w-full"
                          style={{ backgroundColor: ac.primary, borderRadius: "0 0 2px 0" }}
                        />

                        <div className="flex items-start gap-3 pt-2">
                          <span className="flex-shrink-0 mt-0.5" style={{ color: ac.primary }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm leading-relaxed" style={{ opacity: 0.72 }}>{a}</p>
                        </div>
                      </SpotlightCard>
                    </ClickSpark>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}