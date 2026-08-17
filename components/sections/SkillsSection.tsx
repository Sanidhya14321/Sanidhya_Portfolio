"use client";

import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

export default function SkillsSection() {
  const data = portfolioData;

  const logoItems: LogoItem[] = [
    { title: "JavaScript", node: <img src="https://skillicons.dev/icons?i=js" alt="JS" /> }, 
    { title: "TypeScript", node: <img src="https://skillicons.dev/icons?i=ts" alt="TS" /> }, 
    { title: "React.js", node: <img src="https://skillicons.dev/icons?i=react" alt="React" /> }, 
    { title: "Next.js", node: <img src="https://skillicons.dev/icons?i=nextjs" alt="Next" /> }, 
    { title: "Vite", node: <img src="https://skillicons.dev/icons?i=vite" alt="Vite" /> }, 
    { title: "Tailwind CSS", node: <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" /> }, 
    { title: "Redux.js", node: <img src="https://skillicons.dev/icons?i=redux" alt="Redux" /> }, 
    { title: "Three.js", node: <img src="https://skillicons.dev/icons?i=threejs" alt="Threejs" /> }, 
    { title: "Framer Motion", node: <img src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg" className="w-8 h-8 align-middle" alt="Framer" /> }, 
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

  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-10 py-12 md:py-16 scroll-mt-12">
      <SectionHeading label="Technical" title="Skills & Competencies" />
      
      {/* Categorized Skills */}
      <div className="mt-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-center mb-8 text-neutral-400">
          Skills by Domain
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
              <ClickSpark sparkColor="#FFFFFF">
                <SpotlightCard 
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 md:p-7 relative overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 h-full"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white opacity-60" />

                  <h4 className="mb-4 text-sm font-mono font-bold tracking-wider uppercase text-white">
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
                        className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border border-white/10 bg-white/[0.04] text-neutral-300 transition-all duration-200 hover:border-white/30 hover:text-white cursor-default"
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

      {/* Technology Logo Loop */}
      <LazyComponent
        fallback={
          <div className="mt-20 mb-8">
            <Skeleton variant="text" width="30%" height={20} className="mb-6 mx-auto" />
            <div className="flex items-center gap-6 overflow-hidden justify-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="rounded" width={56} height={56} />
              ))}
            </div>
          </div>
        }
      >
        <div className="mt-20 mb-8">
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-center mb-8 text-neutral-400">
            Technology Stack & Tools
          </h3>
          
          <div className="relative py-4 overflow-hidden">
            <LogoLoop
              logos={logoItems}
              speed={55}
              direction="left"
              logoHeight={40}
              gap={32}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#0A0A0A"
              ariaLabel="Technology stack logos"
              className="max-w-[90%] sm:max-w-[80%] mx-auto"
            />
          </div>
        </div>
      </LazyComponent>
    </section>
  );
}
