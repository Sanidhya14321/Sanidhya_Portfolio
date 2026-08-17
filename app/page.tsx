"use client";

import PageTransition from "@/components/ui/PageTransition";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EventsSection from "@/components/sections/EventsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full flex flex-col space-y-16 md:space-y-24">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EventsSection />
        <ContactSection />
      </div>
    </PageTransition>
  );
}