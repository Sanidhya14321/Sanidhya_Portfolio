"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData, PortfolioProject } from "@/data/portfolio";
import { cardCSS, accentCSS } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import Badge from "@/components/ui/Badge";
import ThemedButton from "@/components/ui/ThemedButton";

type ProjectModalItem = PortfolioProject & {
  key: string;
  group: "featured" | "other";
  statusLabel: string;
  deploymentState: "Deployed" | "Not Deployed";
  fieldLabel: string;
  fullDescription: string;
  featureList: string[];
  imageList: string[];
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const spotlightColorByTheme: Record<string, string> = {
  aurora: "rgba(124, 58, 237, 0.22)",
  industrial: "rgba(255, 255, 255, 0.12)",
  glass: "rgba(255, 255, 255, 0.15)",
  "dark-horse": "rgba(0, 255, 163, 0.18)",
};

const modalGlassByTheme: Record<string, CSSProperties> = {
  aurora: {
    background: "linear-gradient(150deg, rgba(76, 29, 149, 0.32), rgba(17, 24, 39, 0.74))",
    border: "1px solid rgba(168, 85, 247, 0.35)",
    boxShadow: "0 20px 80px rgba(15, 23, 42, 0.5)",
    backdropFilter: "blur(16px)",
  },
  industrial: {
    background: "linear-gradient(145deg, rgba(38, 38, 38, 0.84), rgba(10, 10, 10, 0.9))",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow: "0 16px 60px rgba(0, 0, 0, 0.65)",
    backdropFilter: "blur(8px)",
  },
  glass: {
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(20px)",
  },
  "dark-horse": {
    background: "linear-gradient(145deg, rgba(2, 44, 34, 0.62), rgba(0, 0, 0, 0.9))",
    border: "1px solid rgba(16, 185, 129, 0.34)",
    boxShadow: "0 24px 72px rgba(0, 0, 0, 0.72)",
    backdropFilter: "blur(14px)",
  },
};

function normalizeProjects(): ProjectModalItem[] {
  const featured = portfolioData.featuredProjects.map((project, index) => {
    const imageList = project.images && project.images.length > 0 ? project.images : project.image ? [project.image] : [];
    return {
      ...project,
      key: `featured-${project.id || index}`,
      group: "featured" as const,
      statusLabel: project.status || "Featured",
      deploymentState: (project.demo ? "Deployed" : "Not Deployed") as "Deployed" | "Not Deployed",
      fieldLabel: project.field || "General",
      fullDescription: project.detailedDescription || project.description,
      featureList: project.features || project.highlights || [],
      imageList,
    };
  });

  const all = (portfolioData.allProjects || portfolioData.allprojects || []).map((project, index) => {
    const imageList = project.images && project.images.length > 0 ? project.images : project.image ? [project.image] : [];
    return {
      ...project,
      key: `all-${project.id || project.title}-${index}`,
      group: "other" as const,
      statusLabel: project.status || "Project",
      deploymentState: (project.demo ? "Deployed" : "Not Deployed") as "Deployed" | "Not Deployed",
      fieldLabel: project.field || "General",
      fullDescription: project.detailedDescription || project.description,
      featureList: project.features || project.highlights || [],
      imageList,
    };
  });

  return [...featured, ...all];
}

export default function ProjectsPage() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];

  const projects = useMemo(() => normalizeProjects(), []);
  const [activeProject, setActiveProject] = useState<ProjectModalItem | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDeployment, setSelectedDeployment] = useState("All");
  const [selectedField, setSelectedField] = useState("All");

  const techOptions = useMemo(() => {
    const unique = Array.from(new Set(projects.flatMap((project) => project.tech))).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [projects]);

  const fieldOptions = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.fieldLabel))).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [projects]);

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const cardClass = `border ${cardRadius[theme]} p-5 md:p-6 h-full transition-all duration-300 cursor-pointer`;
  const cardStyle: CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  const filterControlStyle: CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    color: "var(--heading)",
    backdropFilter: cc.backdropFilter,
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
      if (!activeProject) {
        return;
      }
      if (event.key === "ArrowRight") {
        setCurrentImage((prev) => {
          const length = activeProject.imageList.length || 1;
          return (prev + 1) % length;
        });
      }
      if (event.key === "ArrowLeft") {
        setCurrentImage((prev) => {
          const length = activeProject.imageList.length || 1;
          return (prev - 1 + length) % length;
        });
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    setCurrentImage(0);

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const matchesFilter = (project: ProjectModalItem) => {
    const techMatch = selectedTech === "All" || project.tech.includes(selectedTech);
    const deploymentMatch = selectedDeployment === "All" || project.deploymentState === selectedDeployment;
    const fieldMatch = selectedField === "All" || project.fieldLabel === selectedField;
    return techMatch && deploymentMatch && fieldMatch;
  };

  const filteredFeatured = projects.filter((project) => project.group === "featured" && matchesFilter(project));
  const filteredOthers = projects.filter((project) => project.group === "other" && matchesFilter(project));

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1100px] 2xl:max-w-[1260px] px-6 md:px-8 lg:px-10 pb-12">
        <SectionHeading label="Work" title="Projects" />

        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-xs tracking-wide uppercase" style={{ opacity: 0.8 }}>
            Tech Stack
            <select
              value={selectedTech}
              onChange={(event) => setSelectedTech(event.target.value)}
              className="mt-2 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              style={filterControlStyle}
            >
              {techOptions.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs tracking-wide uppercase" style={{ opacity: 0.8 }}>
            Deployment
            <select
              value={selectedDeployment}
              onChange={(event) => setSelectedDeployment(event.target.value)}
              className="mt-2 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              style={filterControlStyle}
            >
              <option value="All">All</option>
              <option value="Deployed">Deployed</option>
              <option value="Not Deployed">Not Deployed</option>
            </select>
          </label>

          <label className="text-xs tracking-wide uppercase" style={{ opacity: 0.8 }}>
            Field
            <select
              value={selectedField}
              onChange={(event) => setSelectedField(event.target.value)}
              className="mt-2 w-full border rounded-lg px-3 py-2 text-sm outline-none"
              style={filterControlStyle}
            >
              {fieldOptions.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-[var(--heading)]">Featured Projects</h3>
        </div>

        {filteredFeatured.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2"
          >
            {filteredFeatured.map((project) => (
              <motion.button
                key={project.key}
                variants={fadeUp}
                type="button"
                className="group text-left"
                onClick={() => setActiveProject(project)}
              >
                <ClickSpark sparkColor={ac.primary}>
                  <SpotlightCard
                    spotlightColor={spotlightColorByTheme[theme]}
                    className={`${cardClass} hover:scale-[1.02]`}
                    style={cardStyle}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10 mb-4 bg-black/20">
                      {project.imageList.length > 0 ? (
                        <img
                          src={project.imageList[0]}
                          alt={`${project.title} preview`}
                          className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center text-xs tracking-wide uppercase" style={{ opacity: 0.65 }}>
                          Preview unavailable
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-semibold text-[var(--heading)]">{project.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-current/30" style={{ color: ac.primary }}>
                        {project.statusLabel}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed" style={{ opacity: 0.72 }}>
                      {project.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs" style={{ opacity: 0.75 }}>
                      <span>{project.fieldLabel}</span>
                      <span>{project.deploymentState}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <Badge key={`${project.key}-${tech}`} text={tech} />
                      ))}
                    </div>

                    <p className="mt-4 text-xs" style={{ color: ac.primary }}>
                      Click to open project details
                    </p>
                  </SpotlightCard>
                </ClickSpark>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <p className="text-sm" style={{ opacity: 0.7 }}>
            No featured projects match the selected filters.
          </p>
        )}

        <div className="mt-12 mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-[var(--heading)]">Other Projects</h3>
        </div>

        {filteredOthers.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredOthers.map((project) => (
              <motion.button
                key={project.key}
                variants={fadeUp}
                type="button"
                className="group text-left"
                onClick={() => setActiveProject(project)}
              >
                <ClickSpark sparkColor={ac.primary}>
                  <SpotlightCard
                    spotlightColor={spotlightColorByTheme[theme]}
                    className={`${cardClass} hover:scale-[1.02]`}
                    style={cardStyle}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10 mb-4 bg-black/20">
                      {project.imageList.length > 0 ? (
                        <img
                          src={project.imageList[0]}
                          alt={`${project.title} preview`}
                          className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center text-xs tracking-wide uppercase" style={{ opacity: 0.65 }}>
                          Preview unavailable
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-semibold text-[var(--heading)]">{project.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-current/30" style={{ color: ac.primary }}>
                        {project.statusLabel}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed" style={{ opacity: 0.72 }}>
                      {project.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs" style={{ opacity: 0.75 }}>
                      <span>{project.fieldLabel}</span>
                      <span>{project.deploymentState}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <Badge key={`${project.key}-${tech}`} text={tech} />
                      ))}
                    </div>

                    <p className="mt-4 text-xs" style={{ color: ac.primary }}>
                      Click to open project details
                    </p>
                  </SpotlightCard>
                </ClickSpark>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <p className="text-sm" style={{ opacity: 0.7 }}>
            No other projects match the selected filters.
          </p>
        )}
      </section>

      {activeProject && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
          <button
            type="button"
            aria-label="Close project modal"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setActiveProject(null)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} project details`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 md:p-8"
            style={modalGlassByTheme[theme]}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--heading)]">{activeProject.title}</h2>
                <p className="mt-2 text-sm" style={{ opacity: 0.78 }}>
                  {activeProject.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="h-9 w-9 rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                x
              </button>
            </div>

            <div className="mt-6">
              {activeProject.imageList.length > 0 ? (
                <div>
                  <div className="relative overflow-hidden rounded-2xl border border-white/15">
                    <img
                      src={activeProject.imageList[currentImage]}
                      alt={`${activeProject.title} screenshot ${currentImage + 1}`}
                      className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
                    />
                    {activeProject.imageList.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white border border-white/20"
                          onClick={() => setCurrentImage((prev) => (prev - 1 + activeProject.imageList.length) % activeProject.imageList.length)}
                          aria-label="Previous image"
                        >
                          {"<"}
                        </button>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white border border-white/20"
                          onClick={() => setCurrentImage((prev) => (prev + 1) % activeProject.imageList.length)}
                          aria-label="Next image"
                        >
                          {">"}
                        </button>
                      </>
                    )}
                  </div>

                  {activeProject.imageList.length > 1 && (
                    <div className="mt-3 flex justify-center gap-2">
                      {activeProject.imageList.map((img, index) => (
                        <button
                          key={`${img}-${index}`}
                          type="button"
                          onClick={() => setCurrentImage(index)}
                          className="h-2.5 w-2.5 rounded-full transition-all"
                          style={{ background: index === currentImage ? ac.primary : "rgba(255,255,255,0.35)" }}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[220px] md:h-[360px] rounded-2xl border border-dashed border-white/30 flex items-center justify-center text-sm" style={{ opacity: 0.7 }}>
                  No screenshots available
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold text-[var(--heading)]">Description</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.82 }}>
                  {activeProject.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[var(--heading)]">Features</h3>
                {activeProject.featureList.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {activeProject.featureList.map((feature) => (
                      <li key={feature} className="text-sm flex items-start gap-2" style={{ opacity: 0.82 }}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-current" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm" style={{ opacity: 0.62 }}>
                    Feature details will be added soon.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold text-[var(--heading)]">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.tech.map((tech) => (
                  <Badge key={`${activeProject.key}-${tech}-modal`} text={tech} />
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {(activeProject.demo || activeProject.github) ? (
                <ThemedButton href={activeProject.demo || activeProject.github} external>
                  Deployed Link
                </ThemedButton>
              ) : (
                <span className="text-sm px-4 py-2 border rounded-xl border-white/25" style={{ opacity: 0.65 }}>
                  Deployed link unavailable
                </span>
              )}

              {activeProject.github && activeProject.demo ? (
                <ThemedButton href={activeProject.github} external variant="secondary">
                  GitHub Link
                </ThemedButton>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
}
