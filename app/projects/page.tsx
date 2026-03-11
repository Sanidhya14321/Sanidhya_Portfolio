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
  InteractiveSelectorTheme,
} from "@/components/ui/interactive-selector";
import {
  Testimonial,
  TestimonialCarousel,
} from "@/components/ui/profile-card-testimonial-carousel";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { cardCSS, colors } from "@/lib/themes";

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

const getSelectorTheme = (theme: string): InteractiveSelectorTheme => {
  if (theme === "industrial") {
    return {
      containerBackground: "linear-gradient(145deg, rgba(20,20,20,0.9), rgba(10,10,10,0.95))",
      borderColor: "rgba(255,255,255,0.16)",
      activeBorderColor: "rgba(255,255,255,0.5)",
      iconBackground: "rgba(18,18,18,0.75)",
      titleColor: "#FAFAFA",
      descriptionColor: "#D4D4D8",
      chipTextColor: "#FAFAFA",
      chipBorderColor: "rgba(255,255,255,0.28)",
      shadowActive: "0 22px 56px rgba(0,0,0,0.5)",
      shadowIdle: "0 8px 24px rgba(0,0,0,0.22)",
      mobileImageOverlay: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.26), rgba(0,0,0,0.1))",
      desktopImageOverlay: "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.28), rgba(0,0,0,0.4))",
    };
  }

  if (theme === "glass") {
    return {
      containerBackground: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
      borderColor: "rgba(255,255,255,0.16)",
      activeBorderColor: "rgba(255,255,255,0.4)",
      iconBackground: "rgba(255,255,255,0.16)",
      titleColor: "#FFFFFF",
      descriptionColor: "#E4E4E7",
      chipTextColor: "#FFFFFF",
      chipBorderColor: "rgba(255,255,255,0.25)",
      shadowActive: "0 20px 54px rgba(0,0,0,0.32)",
      shadowIdle: "0 8px 22px rgba(0,0,0,0.16)",
      mobileImageOverlay: "linear-gradient(to top, rgba(8,8,12,0.66), rgba(8,8,12,0.24), rgba(8,8,12,0.1))",
      desktopImageOverlay: "linear-gradient(to top, rgba(8,8,12,0.76), rgba(8,8,12,0.26), rgba(8,8,12,0.36))",
    };
  }

  if (theme === "dark-horse") {
    return {
      containerBackground: "linear-gradient(145deg, rgba(2,44,34,0.4), rgba(3,14,12,0.95))",
      borderColor: "rgba(16,185,129,0.25)",
      activeBorderColor: "rgba(52,211,153,0.55)",
      iconBackground: "rgba(6,78,59,0.6)",
      titleColor: "#ECFDF5",
      descriptionColor: "#A7F3D0",
      chipTextColor: "#D1FAE5",
      chipBorderColor: "rgba(52,211,153,0.35)",
      shadowActive: "0 22px 56px rgba(0,0,0,0.52)",
      shadowIdle: "0 8px 24px rgba(0,0,0,0.24)",
      mobileImageOverlay: "linear-gradient(to top, rgba(2,44,34,0.72), rgba(2,44,34,0.24), rgba(2,44,34,0.1))",
      desktopImageOverlay: "linear-gradient(to top, rgba(2,44,34,0.82), rgba(2,44,34,0.26), rgba(2,44,34,0.38))",
    };
  }

  return {
    containerBackground: "linear-gradient(145deg, rgba(25,18,45,0.85), rgba(10,11,22,0.94))",
    borderColor: "rgba(167,139,250,0.24)",
    activeBorderColor: "rgba(196,181,253,0.6)",
    iconBackground: "rgba(76,29,149,0.55)",
    titleColor: "#F5F3FF",
    descriptionColor: "#E9D5FF",
    chipTextColor: "#F5F3FF",
    chipBorderColor: "rgba(216,180,254,0.35)",
    shadowActive: "0 22px 56px rgba(0,0,0,0.5)",
    shadowIdle: "0 8px 24px rgba(0,0,0,0.24)",
    mobileImageOverlay: "linear-gradient(to top, rgba(25,18,45,0.74), rgba(25,18,45,0.26), rgba(25,18,45,0.1))",
    desktopImageOverlay: "linear-gradient(to top, rgba(25,18,45,0.84), rgba(25,18,45,0.28), rgba(25,18,45,0.4))",
  };
};

export default function ProjectsPage() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const palette = colors[theme];
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
  const additionalProjectTestimonials = useMemo<Testimonial[]>(
    () =>
      allProjectList.map((project) => ({
        name: project.title,
        title: `${project.field || "Project"}${project.status ? ` • ${project.status}` : ""}`,
        description: project.description,
        imageUrl: project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        githubUrl: project.github || undefined,
        demoUrl: project.demo || undefined,
      })),
    [allProjectList]
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 pb-12">
        <SectionHeading label="Builds" title="Projects" />

        <div
          className="mb-8 rounded-2xl border p-5 md:p-6"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <p className="max-w-3xl text-sm md:text-base" style={{ opacity: 0.8 }}>
            Featured projects are shown in an interactive layout. Select a card to inspect details,
            tech stack, impact highlights, and live repository links.
          </p>
        </div>

        <InteractiveSelector
          options={selectorOptions}
          title="Featured Work"
          subtitle="Focused builds from web engineering and AI systems."
          themeStyles={getSelectorTheme(theme)}
          onActiveChange={setActiveIndex}
        />

        {activeProject ? (
          <div
            className="mt-8 rounded-2xl border p-5 md:p-6"
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
              backdropFilter: cc.backdropFilter,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold" style={{ color: palette.heading }}>
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>
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
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: cc.border, color: palette.text }}
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                ) : null}
                {activeProject.demo ? (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: cc.border, color: palette.text }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>

            <p className="mt-4 text-sm md:text-base" style={{ color: palette.text }}>
              {activeProject.detailedDescription || activeProject.description}
            </p>

            <div className="mt-5 flex items-start gap-2">
              <Layers size={18} className="mt-0.5" style={{ color: palette.accent }} />
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3 py-1 text-xs md:text-sm"
                    style={{ borderColor: cc.border, color: palette.textSecondary }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {activeProject.highlights && activeProject.highlights.length > 0 ? (
              <div className="mt-5">
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium" style={{ color: palette.heading }}>
                  <Sparkles size={16} /> Highlights
                </p>
                <ul className="space-y-2">
                  {activeProject.highlights.map((point) => (
                    <li key={point} className="text-sm" style={{ color: palette.text }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 py-4 pb-14">
        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <p className="mb-4 text-sm font-medium" style={{ color: palette.heading }}>
            Additional Projects
          </p>

          <TestimonialCarousel testimonials={additionalProjectTestimonials} className="px-0" />
        </div>
      </section>
    </PageTransition>
  );
}
