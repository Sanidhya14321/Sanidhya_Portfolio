"use client";

import { portfolioData } from "@/data/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import GitHubContributionWrapper from "@/components/GitHubContributionWrapper";
import ThemedButton from "@/components/ui/ThemedButton";

const reveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.05 },
  }),
} as any;

export default function AboutSection() {
  const data = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative scroll-mt-12">
      <div ref={containerRef} className="relative mx-auto max-w-[1200px] px-6 md:px-8 lg:px-10 py-12">
        <SectionHeading label="Background" title="About Me" />

        {/* ── SCROLL-DRIVEN SPINE ── */}
        <div className="absolute left-[2.75rem] md:left-[3.25rem] top-36 bottom-0 w-px overflow-hidden hidden md:block bg-white/10">
          <motion.div
            className="w-full origin-top bg-white"
            style={{ height: spineHeight }}
          />
        </div>

        <div className="mt-12 md:pl-16 space-y-0">

          {/* SECTION 1 — THE NARRATIVE */}
          <div className="relative pb-16">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-black items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <ShinyText text="01 - The Story" speed={4} className="text-xl md:text-2xl font-bold text-white tracking-tight" />
            </motion.div>

            <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <ClickSpark sparkColor="#FFFFFF">
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className="group relative inline-flex items-start gap-3 border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-6 rounded-2xl cursor-default hover:border-white/20 transition-all duration-300 w-full"
                >
                  <div className="relative">
                    <BlurText
                      text={data.about.narrative}
                      delay={20}
                      animateBy="words"
                      direction="top"
                      className="text-base md:text-lg lg:text-xl leading-relaxed text-neutral-300 font-normal tracking-normal opacity-90"
                    />
                  </div>
                </SpotlightCard>
              </ClickSpark>
            </motion.div>
          </div>

          {/* SECTION 2 — CORE FOCUS */}
          <div className="relative pb-16">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-black items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <ShinyText text="02 - Core Focus Areas" speed={4} className="text-xl md:text-2xl font-bold text-white tracking-tight" />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {data.about.highlights.map((h, i) => (
                <motion.div key={i} variants={reveal} custom={i}>
                  <ClickSpark sparkColor="#FFFFFF">
                    <SpotlightCard
                      spotlightColor="rgba(255, 255, 255, 0.08)"
                      className="group relative inline-flex items-start gap-3 border border-white/10 bg-white/[0.03] px-5 py-4 rounded-xl cursor-default hover:border-white/25 hover:scale-[1.01] transition-all duration-300"
                      style={{ maxWidth: "420px" }}
                    >
                      <span className="mt-0.5 flex-shrink-0 relative z-10 text-white">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <p className="text-sm md:text-base leading-relaxed text-neutral-300 relative z-10">{h}</p>
                    </SpotlightCard>
                  </ClickSpark>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SECTION 3 — EDUCATION */}
          <div className="relative pb-16">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-black items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-6"
            >
              <ShinyText text="03 - Education" speed={4} className="text-xl md:text-2xl font-bold text-white tracking-tight" />
            </motion.div>

            <ClickSpark sparkColor="#FFFFFF">
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.08)"
                className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div className="px-6 md:px-8 py-3.5 flex items-center justify-between border-b border-white/10 bg-white/[0.04]">
                  <DecryptedText
                    text="Academic Background"
                    speed={35}
                    maxIterations={10}
                    className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-300"
                  />
                  <span className="text-xs font-mono text-neutral-400">
                    {data.education.period}
                  </span>
                </div>

                <div className="px-6 md:px-8 py-6">
                  <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <p className="text-xl md:text-2xl font-bold text-white leading-snug">
                      {data.education.degree}
                    </p>
                    <p className="mt-2 text-sm md:text-base text-neutral-400">
                      {data.education.institution}
                    </p>
                  </motion.div>

                  {data.education.achievements.length > 0 && (
                    <>
                      <div className="my-5 border-t border-dashed border-white/10" />
                      <motion.ul
                        className="space-y-2.5"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                      >
                        {data.education.achievements.map((a, i) => (
                          <motion.li
                            key={i}
                            variants={reveal}
                            custom={i}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-400"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-white" />
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

          {/* SECTION 4 — ACHIEVEMENTS */}
          {data.achievements.length > 0 && (
            <div className="relative pb-16">
              <motion.div
                variants={reveal}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="hidden md:flex absolute -left-[3.6rem] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-black items-center justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>

              <motion.div variants={reveal} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-center justify-between mb-6"
              >
                <ShinyText text="04 - Key Achievements" speed={4} className="text-xl md:text-2xl font-bold text-white tracking-tight" />
              </motion.div>

              <motion.div
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              >
                {data.achievements.map((a, i) => (
                  <motion.div key={i} variants={reveal} custom={i} className="break-inside-avoid">
                    <ClickSpark sparkColor="#FFFFFF">
                      <SpotlightCard
                        spotlightColor="rgba(255, 255, 255, 0.08)"
                        className="group relative border border-white/10 bg-white/[0.02] rounded-xl p-4 md:p-5 hover:border-white/25 hover:scale-[1.01] transition-all duration-300 cursor-default"
                      >
                        <span
                          className="absolute top-0 left-0 w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
                        />
                        <div className="flex items-start gap-3 pt-1">
                          <span className="flex-shrink-0 mt-0.5 text-white">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm leading-relaxed text-neutral-300">{a}</p>
                        </div>
                      </SpotlightCard>
                    </ClickSpark>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* SECTION 5 — GITHUB ACTIVITY */}
          <div className="relative py-12">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="hidden md:flex absolute -left-[3.6rem] top-14 w-3 h-3 rounded-full border-2 border-white bg-black items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <ShinyText text="05 - GitHub Activity" speed={4} className="text-xl md:text-2xl font-bold text-white tracking-tight" />
            </motion.div>

            <div className="w-full mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="w-full mx-auto"
              >
                <ClickSpark sparkColor="#FFFFFF">
                  <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                    <a
                      href="https://github.com/Sanidhya14321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
                    >
                      <span>@Sanidhya14321</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>

                    {/* GitHub Streak Stats with monochrome dark styling */}
                    <div className="w-full flex justify-center">
                      <img
                        src="https://github-readme-streak-stats.herokuapp.com/?user=Sanidhya14321&theme=dark&hide_border=true&background=0A0A0A&ring=FFFFFF&fire=FAFAFA&currStreakLabel=D4D4D4&sideLabels=A3A3A3&currStreakNum=FAFAFA&sideNums=FAFAFA&dates=737373"
                        alt="GitHub Streak Stats"
                        className="w-full max-w-2xl h-auto rounded-xl border border-white/10"
                      />
                    </div>

                    {/* GitHub Contribution Heatmap in monochrome */}
                    <div className="w-full md:w-[85%] flex flex-col items-center gap-4">
                      <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">Contribution Activity</p>
                      <div className="w-full flex justify-center">
                        <GitHubContributionWrapper
                          username="Sanidhya14321"
                          days={365}
                          brandColor="#FFFFFF"
                          primaryColor="rgba(255, 255, 255, 0.08)"
                          showLegend={true}
                          showTooltips={true}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <ThemedButton href="https://github.com/Sanidhya14321" variant="secondary" external>
                      View GitHub Profile
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </ThemedButton>
                  </div>
                </ClickSpark>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
