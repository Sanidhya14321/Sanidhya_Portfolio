"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { sectionStyles, buttonStyles, cardCSS, accentCSS } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import ShinyText from "@/components/reactbits/ShinyText";
import GradientText from "@/components/reactbits/GradientText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CenteredFeedbackDrawer from "@/components/ui/centered-feedback-drawer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ContactPage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const bs = buttonStyles[theme];
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

  const contactItems = [
    {
      label: "Email",
      value: data.social.email,
      href: `mailto:${data.social.email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/sanidhyavats",
      href: data.social.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/sanidhyavats",
      href: data.social.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      ),
    },
    {
      label: "Twitter / X",
      value: "twitter.com/sanidhyavats",
      href: data.social.twitter,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      ),
    },
  ];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const cardClass = `border ${cardRadius[theme]} p-6 md:p-8 transition-all duration-300 group`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 py-16 md:py-20">
        <SectionHeading label="Connect" title="Get in Touch" />

        {/* 2x2 grid for contact items */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          {contactItems.map((item, i) => (
            <motion.div key={item.label} variants={fadeUp} custom={i}>
              <ClickSpark sparkColor={ac.primary}>
                <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="block h-full">
                  <SpotlightCard spotlightColor={spotlightColor[theme]} className={`${cardClass} hover:scale-[1.02]`} style={cardStyle}>
                    <div
                      className="flex h-16 w-16 items-center justify-center flex-shrink-0 mb-6 text-lg"
                      style={{
                        backgroundColor: ac.iconBg,
                        color: ac.primary,
                        borderRadius: theme === "industrial" ? 0 : theme === "glass" ? 16 : 12,
                        borderWidth: theme === "industrial" ? 2 : undefined,
                        borderColor: theme === "industrial" ? "rgb(64, 64, 64)" : undefined,
                        borderStyle: theme === "industrial" ? "solid" : undefined,
                      }}
                    >
                      {item.icon}
                    </div>
                    <ShinyText
                      text={item.label}
                      speed={4}
                      className={`text-base md:text-lg font-semibold ${sectionStyles[theme].labelClass} !text-inherit`}
                    />
                    <p className="text-lg md:text-xl text-[var(--heading)] mt-3 font-medium">{item.value}</p>
                    <p
                      className="mt-4 text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: ac.primary }}
                    >
                      Open &rarr;
                    </p>
                  </SpotlightCard>
                </a>
              </ClickSpark>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <ClickSpark sparkColor={ac.primary}>
            <SpotlightCard
              spotlightColor={spotlightColor[theme]}
              className={`border ${cardRadius[theme]} py-16 px-10 transition-all duration-300 hover:scale-[1.01]`}
              style={cardStyle}
            >
              <p className="text-3xl md:text-4xl font-semibold text-[var(--heading)]">
                <GradientText
                  colors={[
                    theme === "aurora" ? "#818CF8" : theme === "industrial" ? "#FFFFFF" : theme === "glass" ? "#FFFFFF" : "#00FFA3",
                    theme === "aurora" ? "#A78BFA" : theme === "industrial" ? "#D4D4D4" : theme === "glass" ? "#D1D5DB" : "#00D9FF"
                  ]}
                  animationSpeed={6}
                  className="!text-inherit"
                >
                  Open to opportunities
                </GradientText>
              </p>
              <p className="mt-6 text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0.55 }}>
                Currently interested in full-stack roles, ML engineering positions, and collaborative open-source projects.
              </p>
            </SpotlightCard>
          </ClickSpark>
        </motion.div>
        <div className="mt-8 mb-12 flex w-full justify-center border py-6 hover:bg-white/10 rounded-xl align-center content-center text-center">
          <CenteredFeedbackDrawer />
        </div>
      </section>
    </PageTransition>
  );
}
