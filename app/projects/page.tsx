"use client";

import { CSSProperties, useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData, PortfolioProject } from "@/data/portfolio";
import { cardCSS, accentCSS } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import Badge from "@/components/ui/Badge";
import ThemedButton from "@/components/ui/ThemedButton";
import OptimizedImage from "@/components/ui/OptimizedImage";
import GradientText from "@/components/reactbits/GradientText";
import ShinyText from "@/components/reactbits/ShinyText";

type ProjectModalItem = PortfolioProject & {
    key: string;
    group: "featured" | "other";
    statusLabel: string;
    fullDescription: string;
    featureList: string[];
    imageList: string[];
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const spotlightColorByTheme: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.22)",
    industrial: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(255, 255, 255, 0.15)",
    "dark-horse": "rgba(0, 255, 163, 0.18)",
};

const heroGradientByTheme: Record<string, string> = {
    aurora: "linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(124, 58, 237, 0.18), rgba(6, 182, 212, 0.12))",
    industrial: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(163, 163, 163, 0.08), rgba(255, 255, 255, 0.04))",
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
    "dark-horse": "linear-gradient(135deg, rgba(0, 255, 163, 0.16), rgba(0, 217, 255, 0.1), rgba(0, 0, 0, 0.15))",
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
            fullDescription: project.detailedDescription || project.description,
            featureList: project.features || project.highlights || [],
            imageList,
        };
    });

    return [...featured, ...all];
}

function ProjectCard({
    project,
    cardClass,
    cardStyle,
    spotlightColor,
    cc,
    ac,
    onOpen,
}: {
    project: ProjectModalItem;
    cardClass: string;
    cardStyle: CSSProperties;
    spotlightColor: string;
    cc: { border: string };
    ac: { primary: string };
    onOpen: () => void;
}) {
    return (
        <motion.button variants={fadeUp} type="button" className="group text-left" onClick={onOpen}>
            <ClickSpark sparkColor={ac.primary}>
                <SpotlightCard spotlightColor={spotlightColor} className={`${cardClass} hover:scale-[1.015]`} style={cardStyle}>
                    <div className="relative overflow-hidden rounded-xl border mb-4 bg-black/20" style={{ borderColor: cc.border }}>
                        {project.imageList.length > 0 ? (
                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
                                <OptimizedImage
                                    src={project.imageList[0]}
                                    alt={`${project.title} preview`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                            </div>
                        ) : (
                            <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center text-xs tracking-wide uppercase" style={{ opacity: 0.65 }}>
                                Preview unavailable
                            </div>
                        )}
                    </div>

                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base md:text-lg font-semibold text-[var(--heading)]">{project.title}</h3>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-current/30" style={{ color: ac.primary }}>
                            {project.statusLabel}
                        </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ opacity: 0.72 }}>
                        {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                            <Badge key={`${project.key}-${tech}`} text={tech} />
                        ))}
                    </div>
                </SpotlightCard>
            </ClickSpark>
        </motion.button>
    );
}

export default function ProjectsPage() {
    const { theme } = useTheme();
    const cc = cardCSS[theme];
    const ac = accentCSS[theme];

    const projects = useMemo(() => normalizeProjects(), []);

    const [activeProject, setActiveProject] = useState<ProjectModalItem | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [carouselDirection, setCarouselDirection] = useState(1);
    const deferredSearchQuery = useDeferredValue(searchQuery);

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

    const filteredProjects = useMemo(() => {
        const query = deferredSearchQuery.trim().toLowerCase();
        if (!query) {
            return projects;
        }

        return projects.filter((project) => {
            const haystack = [
                project.title,
                project.description,
                project.fullDescription,
                project.field || "",
                ...project.tech,
                ...project.featureList,
            ]
                .join(" ")
                .toLowerCase();
            return haystack.includes(query);
        });
    }, [projects, deferredSearchQuery]);

    const filteredFeatured = filteredProjects.filter((project) => project.group === "featured");
    const filteredOthers = filteredProjects.filter((project) => project.group === "other");

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

    const moveCarousel = (direction: 1 | -1) => {
        if (!activeProject) {
            return;
        }
        const length = activeProject.imageList.length || 1;
        setCarouselDirection(direction);
        setCurrentImage((prev) => (prev + direction + length) % length);
    };

    const gradientColors: [string, string] = (
        {
            aurora: ["#818CF8", "#A78BFA"],
            industrial: ["#FAFAFA", "#A3A3A3"],
            glass: ["#FFFFFF", "#9CA3AF"],
            "dark-horse": ["#00FFA3", "#00D9FF"],
        } as Record<string, [string, string]>
    )[theme];

    return (
        <PageTransition>
            <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 pb-14">
                <SectionHeading label="Work" title="Projects" />

                <div
                    className="relative overflow-hidden rounded-2xl border p-5 md:p-6 mb-8"
                    style={{
                        background: heroGradientByTheme[theme],
                        borderColor: cc.border,
                        backdropFilter: cc.backdropFilter,
                    }}
                >
                    <div className="absolute -top-16 -right-20 h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: `${ac.primary}33` }} />
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading)]">Selected Work, Built to Ship</h3>
                            <p className="mt-2 text-sm md:text-base max-w-2xl" style={{ opacity: 0.78 }}>
                                Search instantly across project names, stack, features, and descriptions. Each card opens into a full project modal with animated screenshots, links, and details.
                            </p>
                        </div>
                        <div className="text-sm" style={{ opacity: 0.82 }}>
                            <span className="mr-4">Total: {projects.length}</span>
                            <span className="mr-4">Featured: {projects.filter((project) => project.group === "featured").length}</span>
                            <span>Filtered: {filteredProjects.length}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-3xl font-bold">
                        <ShinyText text="Featured Projects" speed={4} className="!text-inherit" />
                    </GradientText>
                </div>

                {filteredFeatured.length > 0 ? (
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-2">
                        {filteredFeatured.map((project) => (
                            <ProjectCard
                                key={project.key}
                                project={project}
                                cardClass={cardClass}
                                cardStyle={cardStyle}
                                spotlightColor={spotlightColorByTheme[theme]}
                                cc={cc}
                                ac={ac}
                                onOpen={() => setActiveProject(project)}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="border rounded-xl p-4" style={cardStyle}>
                        <p className="text-sm" style={{ opacity: 0.72 }}>
                            No featured projects match current filters.
                        </p>
                    </div>
                )}

                <div className="mb-6 mt-12">
                    <GradientText colors={gradientColors} animationSpeed={5} className="text-xl md:text-3xl font-bold">
                        <ShinyText text="Other Projects" speed={4} className="!text-inherit" />
                    </GradientText>
                </div>

                {filteredOthers.length > 0 ? (
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredOthers.map((project) => (
                            <ProjectCard
                                key={project.key}
                                project={project}
                                cardClass={cardClass}
                                cardStyle={cardStyle}
                                spotlightColor={spotlightColorByTheme[theme]}
                                cc={cc}
                                ac={ac}
                                onOpen={() => setActiveProject(project)}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="border rounded-xl p-4" style={cardStyle}>
                        <p className="text-sm" style={{ opacity: 0.72 }}>
                            No projects match current filters. Try resetting filters.
                        </p>
                    </div>
                )}
            </section>

            <AnimatePresence>
                {activeProject ? (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
                        <motion.button
                            type="button"
                            aria-label="Close project modal"
                            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
                            onClick={() => setActiveProject(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${activeProject.title} project details`}
                            initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: -4 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, y: 24, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 280, damping: 24 }}
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
                                    className="h-9 w-9 rounded-full border hover:bg-white/10 transition-colors"
                                    style={{ borderColor: cc.border, color: ac.primary }}
                                    aria-label="Close"
                                >
                                    x
                                </button>
                            </div>

                            <div className="mt-6">
                                {activeProject.imageList.length > 0 ? (
                                    <div>
                                        <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: cc.border }}>
                                            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px]">
                                                <AnimatePresence mode="wait" initial={false}>
                                                    <motion.div
                                                        key={`${activeProject.key}-${currentImage}`}
                                                        initial={{ opacity: 0, x: carouselDirection > 0 ? 32 : -32, scale: 1.02 }}
                                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                                        exit={{ opacity: 0, x: carouselDirection > 0 ? -24 : 24, scale: 0.99 }}
                                                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                                        className="absolute inset-0"
                                                    >
                                                        <OptimizedImage
                                                            src={activeProject.imageList[currentImage]}
                                                            alt={`${activeProject.title} screenshot ${currentImage + 1}`}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 900px"
                                                            className="absolute inset-0 h-full w-full object-cover"
                                                        />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                            {activeProject.imageList.length > 1 && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 border"
                                                        style={{ borderColor: cc.border, color: ac.primary }}
                                                        onClick={() => moveCarousel(-1)}
                                                        aria-label="Previous image"
                                                    >
                                                        {"<"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 border"
                                                        style={{ borderColor: cc.border, color: ac.primary }}
                                                        onClick={() => moveCarousel(1)}
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
                                                        onClick={() => {
                                                            setCarouselDirection(index >= currentImage ? 1 : -1);
                                                            setCurrentImage(index);
                                                        }}
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
                                {activeProject.demo ? (
                                    <ThemedButton href={activeProject.demo || activeProject.github} external>
                                        Deployed Link
                                    </ThemedButton>
                                ) : null}

                                {activeProject.github ? (
                                    <ThemedButton href={activeProject.github} external variant="secondary">
                                        GitHub Link
                                    </ThemedButton>
                                ) : null}
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </PageTransition>
    );
}
