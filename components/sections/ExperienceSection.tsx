"use client";

import { portfolioData } from "@/data/portfolio";
import Badge from "@/components/ui/Badge";
import { Timeline } from "@/components/ui/timeline";

export default function ExperienceSection() {
  const data = portfolioData;

  const timelineData = data.experience.map((exp) => ({
    title: exp.period,
    content: (
      <div
        className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/30"
      >
        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{exp.title}</h3>
        <p className="text-xs md:text-sm font-mono text-neutral-400 mt-1 mb-3">
          {exp.company}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300 opacity-90">
          {exp.description}
        </p>

        {exp.impact ? (
          <p className="mt-4 text-xs md:text-sm font-medium text-white border-l-2 border-white/60 pl-3">
            {exp.impact}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <Badge key={`${exp.company}-${t}`} text={t} />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section id="experience" className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-10 py-12 scroll-mt-12">
      <Timeline
        data={timelineData}
        heading="Experience Timeline"
        subheading="Roles, impact, and technical stacks across my journey."
      />
    </section>
  );
}
