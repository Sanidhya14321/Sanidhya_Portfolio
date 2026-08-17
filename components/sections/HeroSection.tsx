"use client";

import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import BlurText from "@/components/reactbits/BlurText";
import RotatingText from "@/components/reactbits/RotatingText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import ThemedButton from "@/components/ui/ThemedButton";
import LazyComponent from "@/components/ui/LazyComponent";
import Skeleton from "@/components/ui/Skeleton";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroSection() {
  const data = portfolioData;

  const rotatingWords = ["Full Stack Developer", "AI-ML Engineer", "System Architect"];

  return (
    <section id="home" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-16 md:py-24">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center">
          {/* Name */}
          <motion.div variants={fadeUp} className="mb-4 text-center">
            <BlurText
              text={data.name}
              delay={80}
              animateBy="words"
              direction="bottom"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1]"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={fadeUp} className="mb-8 min-h-10 flex items-center justify-center overflow-hidden">
            <RotatingText
              texts={rotatingWords}
              className="text-lg md:text-xl font-mono text-neutral-400 font-medium tracking-wide"
              rotationInterval={3000}
              staggerFrom="first"
              staggerDuration={0.03}
            />
          </motion.div>

          {/* Bio & Profile Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start gap-10 lg:gap-14 w-full mt-4">
            <div className="max-w-2xl text-center lg:text-left flex flex-col justify-center">
              <motion.p variants={fadeUp} className="text-sm md:text-base lg:text-lg text-neutral-300 leading-relaxed opacity-90 mb-8">
                {data.about.narrative}
              </motion.p>
              {/* CTA Button */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <ClickSpark sparkColor="#FFFFFF">
                  <ThemedButton href="#projects" variant="primary">
                    View Projects
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </ThemedButton>
                </ClickSpark>
                <ClickSpark sparkColor="#FFFFFF">
                  <ThemedButton href="#contact" variant="secondary">
                    Get in Touch
                  </ThemedButton>
                </ClickSpark>
              </motion.div>
            </div>

            {/* Profile Image with subtle border and shadow */}
            <LazyComponent
              fallback={
                <div className="shrink-0">
                  <Skeleton variant="rounded" width={280} height={350} />
                </div>
              }
              rootMargin="200px"
            >
              <div className="shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02]">
                <img
                  src="/DSC02945.JPG"
                  alt="Sanidhya Vats"
                  className="object-cover w-[240px] sm:w-[280px] h-[300px] sm:h-[350px] grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </LazyComponent>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
