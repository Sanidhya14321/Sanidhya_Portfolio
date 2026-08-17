"use client";

import { useMemo, useState } from "react";
import {
  Boxes,
  Bot,
  Brain,
  ExternalLink,
  FolderKanban,
  Github,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import InteractiveSelector, {
  InteractiveSelectorOption,
} from "@/components/ui/interactive-selector";
import SectionHeading from "@/components/ui/SectionHeading";
import TimeLine_01, { type TimeLine_01Entry } from "@/components/ui/release-time-line";
import { portfolioData } from "@/data/portfolio";

const getProjectIcon = (field?: string) => {
  const normalized = (field || "").toLowerCase();

  if (normalized.includes("agent") || normalized.includes("ai")) {
    return <Bot size={20} />;
  }

  if (normalized.includes("ml")) {
    return <Brain size={20} />;
  }

  if (normalized.includes("web")) {
    return <Globe size={20} />;
  }

  if (normalized.includes("core")) {
    return <Boxes size={20} />;
  }

  return <FolderKanban size={20} />;
};

export default function ProjectsSection() {
  const featured = portfolioData.featuredProjects;
  const all = portfolioData.allProjects;

  const selectorProjects = featured.length > 0 ? featured : all.slice(0, 5);

  const selectorOptions = useMemo<InteractiveSelectorOption[]>(
    () =>
      selectorProjects.map((project) => ({
        title: project.title,
        description: project.description,
        image: project.image,
        icon: getProjectIcon(project.field),
      })),
    [selectorProjects]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = selectorProjects[activeIndex] || selectorProjects[0];
  const allProjectList = all.length > 0 ? all : featured;

  const projectJourneyEntries = useMemo<TimeLine_01Entry[]>(
    () =>
      allProjectList.map((project) => ({
        icon: getProjectIcon(project.field).type,
        title: project.title,
        subtitle: `${project.field || "Project"}${project.status ? ` • ${project.status}` : ""}`,
        description: project.detailedDescription || project.description,
        items: project.highlights && project.highlights.length > 0 ? project.highlights : project.tech,
        image:
          project.image ||
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        button: project.demo
          ? { url: project.demo, text: "Open Live Demo" }
          : project.github
            ? { url: project.github, text: "Open Repository" }
            : undefined,
      })),
    [allProjectList]
  );

  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-10 py-12 scroll-mt-12">
      <SectionHeading label="Builds" title="Projects" />

      <InteractiveSelector
        options={selectorOptions}
        title="Featured Work"
        subtitle="Focused builds across web systems, full-stack architecture, and machine learning."
        onActiveChange={setActiveIndex}
      />

      {activeProject ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 transition-all duration-300">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeProject.title}
              </h3>
              <p className="mt-1 text-xs font-mono text-neutral-400">
                {activeProject.field || "Project"}
                {activeProject.status ? ` • ${activeProject.status}` : ""}
              </p>
            </div>

            <div className="flex gap-2">
              {activeProject.github ? (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white hover:bg-white hover:text-black hover:border-white transition-all"
                >
                  <Github size={15} />
                  GitHub
                </a>
              ) : null}
              {activeProject.demo ? (
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white hover:bg-white hover:text-black hover:border-white transition-all"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-sm md:text-base text-neutral-300 leading-relaxed">
            {activeProject.detailedDescription || activeProject.description}
          </p>

          <div className="mt-5 flex items-start gap-2">
            <Layers size={18} className="mt-0.5 text-white shrink-0" />
            <div className="flex flex-wrap gap-2">
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {activeProject.highlights && activeProject.highlights.length > 0 ? (
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                <Sparkles size={14} className="text-white" /> Key Highlights
              </p>
              <ul className="space-y-2">
                {activeProject.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
