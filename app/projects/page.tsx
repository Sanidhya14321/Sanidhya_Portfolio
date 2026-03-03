"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { sectionStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import Badge from "@/components/ui/Badge";
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

export default function ProjectsPage() {
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

  const starColor: Record<string, string> = {
    aurora: "#7c3aed",
    industrial: "#ffffff",
    glass: "#ffffff",
    "dark-horse": "#00ffa3",
  };

  const statusColors: Record<string, Record<string, React.CSSProperties>> = {
    aurora: {
      Live: { backgroundColor: "rgba(34, 211, 238, 0.15)", color: "#22D3EE", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(34, 211, 238, 0.20)" },
      "In Development": { backgroundColor: "rgba(168, 85, 247, 0.15)", color: "#C084FC", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(168, 85, 247, 0.20)" },
    },
    industrial: {
      Live: { backgroundColor: "rgba(255, 255, 255, 0.10)", color: "#FFFFFF", borderWidth: "2px", borderStyle: "solid", borderColor: "rgb(82, 82, 82)" },
      "In Development": { backgroundColor: "rgb(38, 38, 38)", color: "#A3A3A3", borderWidth: "2px", borderStyle: "solid", borderColor: "rgb(64, 64, 64)" },
    },
    glass: {
      Live: { backgroundColor: "rgba(255, 255, 255, 0.06)", color: "rgba(255, 255, 255, 0.70)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255, 255, 255, 0.10)" },
      "In Development": { backgroundColor: "rgba(255, 255, 255, 0.04)", color: "rgba(255, 255, 255, 0.40)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255, 255, 255, 0.06)" },
    },
    "dark-horse": {
      Live: { backgroundColor: "rgba(52, 211, 153, 0.10)", color: "#34D399", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(52, 211, 153, 0.20)" },
      "In Development": { backgroundColor: "rgba(34, 211, 238, 0.10)", color: "#22D3EE", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(34, 211, 238, 0.20)" },
    },
  };

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const cardClass = `border ${cardRadius[theme]} p-6 md:p-8 transition-all duration-300`;
  const smallCardClass = `border ${cardRadius[theme]} p-5 md:p-6 h-full transition-all duration-300`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 pb-12">
        <SectionHeading label="Work" title="Projects" />

        {/* Featured */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {data.featuredProjects.map((proj, i) => (
            <motion.div key={proj.id} variants={fadeUp}>
              <ClickSpark sparkColor={ac.primary}>
                  <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.01]`} style={cardStyle}>
                    <ProjectCardContent proj={proj} theme={theme} statusColors={statusColors} ac={ac} cc={cc} />
                  </SpotlightCard>
              </ClickSpark>
            </motion.div>
          ))}
        </motion.div>


        {/* Other projects */}
        {data.otherProjects.length > 0 && (
          <div className="mt-16">
            <GradientText
              colors={[
                theme === "aurora" ? "#818CF8" : theme === "industrial" ? "#FAFAFA" : theme === "glass" ? "#FFFFFF" : "#00FFA3",
                theme === "aurora" ? "#A78BFA" : theme === "industrial" ? "#A3A3A3" : theme === "glass" ? "#9CA3AF" : "#00D9FF"
              ]}
              animationSpeed={6}
              className="text-xl md:text-2xl font-bold"
            >
              <ShinyText text="Other Projects" speed={5} className="!text-inherit" />
            </GradientText>
            <div className="mt-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {data.otherProjects.map((proj, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <ClickSpark sparkColor={ac.primary}>
                    <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${smallCardClass} hover:scale-[1.02]`} style={cardStyle}>
                      <h4 className="text-base md:text-lg font-medium text-[var(--heading)]">{proj.title}</h4>
                      <p className="mt-3 text-xs md:text-sm leading-relaxed" style={{ opacity: 0.6 }}>{proj.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <Badge key={t} text={t} />
                        ))}
                      </div>
                      <div className="mt-4 flex gap-3">
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm transition-colors" style={{ color: ac.primary }}>
                            Source
                          </a>
                        )}
                        {proj.demo && (
                          <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm transition-colors" style={{ color: ac.primary }}>
                            Demo
                          </a>
                        )}
                      </div>
                    </SpotlightCard>
                    </ClickSpark>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ProjectCardContent({ proj, theme, statusColors, ac, cc }: {
  proj: any;
  theme: string;
  statusColors: Record<string, Record<string, React.CSSProperties>>;
  ac: { primary: string; dot: string; line: string; iconBg: string; impact: string };
  cc: { bg: string; border: string; hoverBorder: string; backdropFilter?: string };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <h3 className="text-lg md:text-xl font-semibold text-[var(--heading)]">{proj.title}</h3>
          <span
            className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
            style={statusColors[theme]?.[proj.status] || {}}
          >
            {proj.status}
          </span>
        </div>

        <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ lineHeight: 1.6, opacity: 0.7 }}>
          {proj.description}
        </p>

        {proj.highlights && proj.highlights.length > 0 && (
          <ul className="mt-6 space-y-3">
            {proj.highlights.map((h: string, j: number) => (
              <li key={j} className="flex items-start gap-3 text-xs md:text-sm" style={{ opacity: 0.6 }}>
                <span className="mt-2 h-1 w-1 rounded-full bg-current flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {proj.tech.map((t: string) => (
            <Badge key={t} text={t} />
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-shrink-0 mt-3 md:mt-0">
        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: ac.primary }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        )}
        {proj.demo && (
          <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: ac.primary }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}
