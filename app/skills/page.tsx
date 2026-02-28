"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { cardCSS, accentCSS, colors } from "@/lib/themes";
import { motion } from "framer-motion";
import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import DecryptedText from "@/components/reactbits/DecryptedText";
import LogoLoop, { type LogoItem } from "@/components/reactbits/LogoLoop";
import ClickSpark from "@/components/reactbits/ClickSpark";
import LazyComponent from "@/components/ui/LazyComponent";
import Skeleton from "@/components/ui/Skeleton";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];
  const themeColors = colors[theme];

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.25)",
    industrial: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(255, 255, 255, 0.15)",
    "dark-horse": "rgba(0, 255, 163, 0.18)",
  };

  const categoryStyle: Record<string, React.CSSProperties> = {
    aurora: { color: "#C084FC", fontWeight: 600, fontSize: "28px" },
    industrial: { color: "#FAFAFA", fontWeight: 700, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "28px" },
    glass: { color: "rgba(255,255,255,0.70)", fontWeight: 300, letterSpacing: "0.025em", fontSize: "28px" },
    "dark-horse": { color: "#34D399", fontWeight: 700, fontSize: "28px" },
  };

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const tagRadius: Record<string, string> = {
    aurora: "rounded-xl",
    industrial: "rounded-none",
    glass: "rounded-full",
    "dark-horse": "rounded-lg",
  };

  const cardClass = `border ${cardRadius[theme]} p-12 md:p-16`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  const logoItems: LogoItem[] = [
  /* ── Frontend & UI Engineering ─────────────────────────── */
  { title: "JavaScript", node: <img src="https://skillicons.dev/icons?i=js" alt="JS" /> }, //
  { title: "TypeScript", node: <img src="https://skillicons.dev/icons?i=ts" alt="TS" /> }, //
  { title: "React.js", node: <img src="https://skillicons.dev/icons?i=react" alt="React" /> }, //
  { title: "Next.js", node: <img src="https://skillicons.dev/icons?i=nextjs" alt="Next" /> }, //
  { title: "Vite", node: <img src="https://skillicons.dev/icons?i=vite" alt="Vite" /> }, // [cite: 24]
  { title: "Tailwind CSS", node: <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" /> }, //
  { title: "Redux.js", node: <img src="https://skillicons.dev/icons?i=redux" alt="Redux" /> }, //
  { title: "Three.js", node: <img src="https://skillicons.dev/icons?i=threejs" alt="Threejs" /> }, // [cite: 38]
  { title: "Framer Motion", node: <img src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg" className="w-8 h-8 align-middle align-center" alt="Framer" /> }, //
  { title: "Node.js", node: <img src="https://skillicons.dev/icons?i=nodejs" alt="Node" /> }, //
  { title: "Express.js", node: <img src="https://skillicons.dev/icons?i=express" alt="Express" /> }, //
  { title: "FastAPI", node: <img src="https://skillicons.dev/icons?i=fastapi" alt="FastAPI" /> }, //
  { title: "Flask", node: <img src="https://skillicons.dev/icons?i=flask" alt="Flask" /> }, //
  { title: "Socket.IO", node: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="SocketIO" /> }, // 
  { title: "MongoDB", node: <img src="https://skillicons.dev/icons?i=mongodb" alt="MongoDB" /> }, //
  { title: "PostgreSQL", node: <img src="https://skillicons.dev/icons?i=postgres" alt="Postgres" /> }, //
  { title: "MySQL", node: <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" /> }, //
  { title: "Firebase", node: <img src="https://skillicons.dev/icons?i=firebase" alt="Firebase" /> }, //
  { title: "Supabase", node: <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" /> }, //
  { title: "Redis", node: <img src="https://skillicons.dev/icons?i=redis" alt="Redis" /> }, 
  { title: "Python", node: <img src="https://skillicons.dev/icons?i=py" alt="Python" /> }, //
  { title: "TensorFlow", node: <img src="https://skillicons.dev/icons?i=tensorflow" alt="TensorFlow" /> }, //
  { title: "PyTorch", node: <img src="https://skillicons.dev/icons?i=pytorch" alt="PyTorch" /> }, //
  { title: "Scikit-learn", node: <img src="https://skillicons.dev/icons?i=sklearn" alt="Sklearn" /> }, 
  { title: "Git", node: <img src="https://skillicons.dev/icons?i=git" alt="Git" /> }, //
  { title: "GitHub", node: <img src="https://skillicons.dev/icons?i=github" alt="GitHub" /> }, //
  { title: "Docker", node: <img src="https://skillicons.dev/icons?i=docker" alt="Docker" /> }, //
  { title: "AWS", node: <img src="https://skillicons.dev/icons?i=aws" alt="AWS" /> }, //
  { title: "Vercel", node: <img src="https://skillicons.dev/icons?i=vercel" alt="Vercel" /> }, //
  { title: "Postman", node: <img src="https://skillicons.dev/icons?i=postman" alt="Postman" /> }, 
  { title: "C", node: <img src="https://skillicons.dev/icons?i=c" alt="C" /> }, //
  { title: "C++", node: <img src="https://skillicons.dev/icons?i=cpp" alt="C++" /> }, //
  { title: "Java", node: <img src="https://skillicons.dev/icons?i=java" alt="Java" /> }, //
];

  // Theme-specific fade out color
  const fadeOutColor: Record<string, string> = {
    aurora: themeColors.bg,
    industrial: themeColors.bg,
    glass: themeColors.bg,
    "dark-horse": themeColors.bg,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 py-12">
        <SectionHeading label="Technical" title="Skills" />

        {/* Logo Loop Section */}
        <LazyComponent
          fallback={
            <div className="mb-20 mt-16">
              <Skeleton variant="text" width="40%" height={32} className="mb-10 mx-auto" />
              <div className="flex items-center gap-8 overflow-hidden justify-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} variant="rounded" width={80} height={80} />
                ))}
              </div>
            </div>
          }
        >
          <div className="mb-20 mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">Technology Stack</h3>
            <LogoLoop 
              logos={logoItems}
              speed={80}
              direction="left"
              logoHeight={60}
              gap={40}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor={fadeOutColor[theme]}
              ariaLabel="Technology stack logos"
              className="max-w-[60%] mx-auto"
            />
          </div>
        </LazyComponent>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {Object.entries(data.skills).map(([category, skills]) => (
            <motion.div key={category} variants={fadeUp}>
              <ClickSpark sparkColor={ac.primary}>
                <SpotlightCard 
                  spotlightColor={spotlightColor[theme]} 
                  className={`${cardClass} hover:scale-[1.01] transition-transform duration-300`} 
                  style={cardStyle}
                >
              <h3 className="mb-10" style={categoryStyle[theme]}>
                <DecryptedText 
                  text={category} 
                  speed={35} 
                  maxIterations={10}
                  className="!text-inherit"
                />
              </h3>
              <div className="flex flex-wrap gap-6">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center px-6 py-3 text-lg md:text-xl font-medium border transition-all duration-200 cursor-default ${tagRadius[theme]}`}
                    style={{
                      color: "var(--heading)",
                      opacity: 0.8,
                      borderColor: cc.border,
                    }}
                  >
                    {skill.name}
                  </span>
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
