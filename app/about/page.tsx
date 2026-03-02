"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { sectionStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import GradientText from "@/components/reactbits/GradientText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import LazyComponent from "@/components/ui/LazyComponent";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutPage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.25)",
    industrial: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(255, 255, 255, 0.15)",
    "dark-horse": "rgba(0, 255, 163, 0.18)",
  };

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const cardClass = `border ${cardRadius[theme]} p-6 md:p-8 transition-all duration-300`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 py-12">
        <SectionHeading label="Background" title="About Me" />

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-10">
          {/* Narrative */}
          <motion.div variants={fadeUp}>
            <ClickSpark sparkColor={ac.primary}>
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.01]`} style={cardStyle}>
              <BlurText
                text={data.about.narrative}
                delay={30}
                animateBy="words"
                direction="top"
                className="text-base md:text-lg leading-relaxed opacity-75"
              />
            </SpotlightCard>
            </ClickSpark>
          </motion.div>

          {/* Highlights */}
          <motion.div variants={fadeUp}>
            <ClickSpark sparkColor={ac.primary}>
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.01]`} style={cardStyle}>
              <GradientText
                colors={[
                  theme === "aurora" ? "#818CF8" : theme === "industrial" ? "#FAFAFA" : theme === "glass" ? "#FFFFFF" : "#00FFA3",
                  theme === "aurora" ? "#A78BFA" : theme === "industrial" ? "#A3A3A3" : theme === "glass" ? "#9CA3AF" : "#00D9FF"
                ]}
                animationSpeed={6}
                className="text-lg md:text-xl font-semibold"
              >
                <ShinyText 
                  text="Core Focus Areas" 
                  speed={5} 
                  className="!text-inherit"
                />
              </GradientText>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {data.about.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0" style={{ color: ac.primary }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <p className="text-sm md:text-base leading-relaxed" style={{ opacity: 0.7 }}>{h}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
          </ClickSpark>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp}>
            <ClickSpark sparkColor={ac.primary}>
              <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.01]`} style={cardStyle}>
            <DecryptedText 
              text="Education" 
              speed={35} 
              maxIterations={10}
              className={`${sectionStyles[theme].labelClass} mb-6 !text-inherit text-sm md:text-base`}
            />
            <p className="text-lg md:text-xl font-medium text-[var(--heading)]">{data.education.degree}</p>
            <p className="mt-2 text-base md:text-lg" style={{ opacity: 0.6 }}>{data.education.institution}</p>
            <p className="mt-1.5 text-sm md:text-base" style={{ opacity: 0.4 }}>{data.education.period}</p>
            {data.education.achievements.length > 0 && (
              <ul className="mt-6 space-y-3">
                {data.education.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm" style={{ opacity: 0.6 }}>
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-current flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </SpotlightCard>
          </ClickSpark>
          </motion.div>

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <motion.div variants={fadeUp}>
              <ClickSpark sparkColor={ac.primary}>
                <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.01]`} style={cardStyle}>
              <ShinyText 
                text="Achievements" 
                speed={5} 
                className={`${sectionStyles[theme].labelClass} mb-6 !text-inherit text-sm md:text-base`} 
              />
              <ul className="space-y-3">
                {data.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs md:text-sm" style={{ opacity: 0.7 }}>
                    <span className="mt-1" style={{ color: ac.primary }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            </ClickSpark>
            </motion.div>
          )}
        </motion.div>
      </section>
    </PageTransition>
  );
}

