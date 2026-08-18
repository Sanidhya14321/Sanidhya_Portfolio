"use client";

import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BreakTeaserSection from "@/components/sections/BreakTeaserSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import Marquee from "@/components/ui/Marquee";

const marqueeItems = [
  "FULL STACK DEVELOPER",
  "·",
  "ML ENGINEER",
  "·",
  "COMMUNITY LEADER",
  "·",
  "SYSTEM ARCHITECT",
  "·",
];

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Dark Manifesto Section (Matching Jasmine Gunarto's reference site) */}
      <ManifestoSection />

      {/* 3. Kinetic Marquee Separator */}
      <div
        style={{
          background: "var(--text)",
          overflow: "hidden",
          padding: "1.2rem 0",
          borderTop: "1px solid rgba(232,228,220,0.1)",
          borderBottom: "1px solid rgba(232,228,220,0.1)",
        }}
      >
        <Marquee
          items={marqueeItems}
          speed={20}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-cream)",
            gap: "2rem",
          }}
        />
      </div>

      {/* 4. Featured Works Section */}
      <ProjectsSection />

      {/* 5. Break / Experiments Section */}
      <BreakTeaserSection />

      {/* 6. Experience Timeline */}
      <ExperienceSection />

      {/* 7. Skills Matrix */}
      <SkillsSection />

      {/* 8. About Section */}
      <AboutSection />
    </div>
  );
}