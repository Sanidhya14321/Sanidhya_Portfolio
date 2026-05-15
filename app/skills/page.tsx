"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { cardCSS, accentCSS, colors } from "@/lib/themes";
import { motion } from "framer-motion";
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
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function SkillsPage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];
  const themeColors = colors[theme];

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.18)",
    industrial: "rgba(255, 255, 255, 0.08)",
    glass: "rgba(255, 255, 255, 0.12)",
    "dark-horse": "rgba(0, 255, 163, 0.12)",
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

  const cardClass = `border ${cardRadius[theme]} p-6 md:p-8`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  const logoItems: LogoItem[] = [
    /* ── Frontend & UI Engineering ─────────────────────────── */
    { title: "JavaScript", node: <img src="https://skillicons.dev/icons?i=js" alt="JS" /> }, 
    { title: "TypeScript", node: <img src="https://skillicons.dev/icons?i=ts" alt="TS" /> }, 
    { title: "React.js", node: <img src="https://skillicons.dev/icons?i=react" alt="React" /> }, 
    { title: "Next.js", node: <img src="https://skillicons.dev/icons?i=nextjs" alt="Next" /> }, 
    { title: "Vite", node: <img src="https://skillicons.dev/icons?i=vite" alt="Vite" /> }, 
    { title: "Tailwind CSS", node: <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" /> }, 
    { title: "Redux.js", node: <img src="https://skillicons.dev/icons?i=redux" alt="Redux" /> }, 
    { title: "Three.js", node: <img src="https://skillicons.dev/icons?i=threejs" alt="Threejs" /> }, 
    { title: "Framer Motion", node: <img src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg" className="w-8 h-8 align-middle align-center" alt="Framer" /> }, 
    { title: "Node.js", node: <img src="https://skillicons.dev/icons?i=nodejs" alt="Node" /> }, 
    { title: "Express.js", node: <img src="https://skillicons.dev/icons?i=express" alt="Express" /> }, 
    { title: "FastAPI", node: <img src="https://skillicons.dev/icons?i=fastapi" alt="FastAPI" /> }, 
    { title: "Flask", node: <img src="https://skillicons.dev/icons?i=flask" alt="Flask" /> }, 
    { title: "Socket.IO", node: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="SocketIO" /> }, 
    { title: "MongoDB", node: <img src="https://skillicons.dev/icons?i=mongodb" alt="MongoDB" /> }, 
    { title: "PostgreSQL", node: <img src="https://skillicons.dev/icons?i=postgres" alt="Postgres" /> }, 
    { title: "MySQL", node: <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" /> }, 
    { title: "Firebase", node: <img src="https://skillicons.dev/icons?i=firebase" alt="Firebase" /> }, 
    { title: "Supabase", node: <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" /> }, 
    { title: "Redis", node: <img src="https://skillicons.dev/icons?i=redis" alt="Redis" /> },
    { title: "Python", node: <img src="https://skillicons.dev/icons?i=py" alt="Python" /> }, 
    { title: "TensorFlow", node: <img src="https://skillicons.dev/icons?i=tensorflow" alt="TensorFlow" /> }, 
    { title: "PyTorch", node: <img src="https://skillicons.dev/icons?i=pytorch" alt="PyTorch" /> }, 
    { title: "Scikit-learn", node: <img src="https://skillicons.dev/icons?i=sklearn" alt="Sklearn" /> },
    { title: "Git", node: <img src="https://skillicons.dev/icons?i=git" alt="Git" /> }, 
    { title: "GitHub", node: <img src="https://skillicons.dev/icons?i=github" alt="GitHub" /> }, 
    { title: "Docker", node: <img src="https://skillicons.dev/icons?i=docker" alt="Docker" /> }, 
    { title: "AWS", node: <img src="https://skillicons.dev/icons?i=aws" alt="AWS" /> }, 
    { title: "Vercel", node: <img src="https://skillicons.dev/icons?i=vercel" alt="Vercel" /> }, 
    { title: "Postman", node: <img src="https://skillicons.dev/icons?i=postman" alt="Postman" /> },
    { title: "C", node: <img src="https://skillicons.dev/icons?i=c" alt="C" /> }, 
    { title: "C++", node: <img src="https://skillicons.dev/icons?i=cpp" alt="C++" /> }, 
    { title: "Java", node: <img src="https://skillicons.dev/icons?i=java" alt="Java" /> }, 
  ];

  const fadeOutColor: Record<string, string> = {
    aurora: themeColors.bg,
    industrial: themeColors.bg,
    glass: themeColors.bg,
    "dark-horse": themeColors.bg,
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16">
        <SectionHeading label="Technical" title="Skills" />
        
        {/* Categorized Skills Segment */}
        <div className="mt-6 md:mt-10">
          <h3 
            className="text-base md:text-lg font-bold uppercase tracking-wider text-center mb-10 opacity-70"
            style={{ color: themeColors.textSecondary }}
          >
            Skills by Category
          </h3>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Object.entries(data.skills).map(([category, skills]) => (
              <motion.div key={category} variants={fadeUp} className="h-full">
                <ClickSpark sparkColor={ac.primary}>
                  <SpotlightCard 
                    spotlightColor={spotlightColor[theme] || "rgba(255,255,255,0.1)"}
                    className={`${cardClass} relative overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1] will-change-transform transform-gpu hover:-translate-y-1.5 hover:shadow-xl h-full`}
                    style={cardStyle}
                  >
                    {/* Subtle Internal Border Left Accent */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[3px] opacity-60"
                      style={{ backgroundColor: ac.primary }}
                    />

                    <h4 className="mb-5 text-sm md:text-base font-bold tracking-tight uppercase" style={{ color: ac.primary }}>
                      <DecryptedText
                        text={category}
                        speed={35}
                        maxIterations={10}
                        className="!text-inherit"
                      />
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold border border-opacity-60 transition-all duration-300 ease-[0.16,1,0.3,1] transform-gpu hover:scale-[1.03] cursor-default ${tagRadius[theme]}`}
                          style={{
                            backgroundColor: `${themeColors.text}04`,
                            color: themeColors.heading,
                            borderColor: `${cc.border}`,
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
        </div>

        {/* Dynamic Logo Marquee Horizontal Loop */}
        <LazyComponent
          fallback={
            <div className="mb-12 my-8">
              <Skeleton variant="text" width="30%" height={20} className="mb-6 mx-auto" />
              <div className="flex items-center gap-6 overflow-hidden justify-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} variant="rounded" width={56} height={56} />
                ))}
              </div>
            </div>
          }
        >
          <div className="mt-24 mb-12">
            <h3 
              className="text-base md:text-lg font-bold uppercase tracking-wider text-center mb-10 opacity-70"
              style={{ color: themeColors.textSecondary }}
            >
              Technology Stack
            </h3>
            
            <div className="relative py-4 overflow-hidden mask-image-horizontal">
              <LogoLoop
                logos={logoItems}
                speed={60}
                direction="left"
                logoHeight={44}
                gap={36}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor={fadeOutColor[theme]}
                ariaLabel="Technology stack logos"
                className="max-w-[85%] sm:max-w-[75%] mx-auto"
              />
            </div>
          </div>
        </LazyComponent>
      </section>
    </PageTransition>
  );
}