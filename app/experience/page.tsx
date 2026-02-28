"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { sectionStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Badge from "@/components/ui/Badge";
import ShinyText from "@/components/reactbits/ShinyText";
import GradientText from "@/components/reactbits/GradientText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import LazyComponent from "@/components/ui/LazyComponent";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ExperiencePage() {
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

  const cardClass = `border ${cardRadius[theme]} p-12 md:p-16 transition-all duration-300`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 pb-12">
        <SectionHeading label="Career" title="Experience" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {data.experience.map((exp, i) => (
            <motion.div key={i} variants={fadeUp}>
              <ClickSpark sparkColor={ac.primary}>
                <SpotlightCard
                  spotlightColor={spotlightColor[theme]}
                  className={`${cardClass} hover:scale-[1.01]`}
                  style={cardStyle}
                >
              {/* Period at top */}
              <div className="flex items-center gap-4 mb-7">
                <span
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: ac.dot }}
                />
                <span
                  className="text-lg md:text-xl font-semibold tracking-wider uppercase"
                  style={{ color: ac.primary }}
                >
                  <ShinyText 
                    text={exp.period} 
                    speed={4}
                    className="!text-inherit"
                  />
                </span>
              </div>

              {/* Title & Company */}
              <h3 className="text-3xl md:text-4xl font-semibold text-[var(--heading)]">
                <GradientText
                  colors={[
                    theme === "aurora" ? "#818CF8" : theme === "industrial" ? "#FFFFFF" : theme === "glass" ? "#FFFFFF" : "#00FFA3",
                    theme === "aurora" ? "#A78BFA" : theme === "industrial" ? "#D4D4D4" : theme === "glass" ? "#D1D5DB" : "#00D9FF"
                  ]}
                  animationSpeed={6}
                  className="!text-inherit"
                >
                  {exp.title}
                </GradientText>
              </h3>
              <p className="text-2xl md:text-3xl mt-3" style={{ opacity: 0.6 }}>
                {exp.company}
              </p>

              {/* Description */}
              <p className="mt-8 text-xl md:text-2xl" style={{ lineHeight: 1.8, opacity: 0.7 }}>
                {exp.description}
              </p>

              {/* Impact */}
              {exp.impact && (
                <p
                  className="mt-6 text-xl md:text-2xl font-medium"
                  style={{ color: ac.impact }}
                >
                  {exp.impact}
                </p>
              )}

              {/* Tech */}
              <div className="mt-10 flex flex-wrap gap-4">
                {exp.tech.map((t) => (
                  <Badge key={t} text={t} />
                ))}
              </div>
            </SpotlightCard>
            </ClickSpark>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
