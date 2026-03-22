"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import { cardCSS, accentCSS } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { Timeline } from "@/components/ui/timeline";

export default function ExperiencePage() {
  const { theme } = useTheme();
  const data = portfolioData;
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];

  const timelineData = data.experience.map((exp) => ({
    title: exp.period,
    content: (
      <div
        className="rounded-2xl border p-6 md:p-8"
        style={{
          backgroundColor: cc.bg,
          borderColor: cc.border,
          backdropFilter: cc.backdropFilter,
        }}
      >
        <h3 className="text-base md:text-lg font-semibold text-[var(--heading)]">{exp.title}</h3>
        <p className="text-sm md:text-base mt-1.5 mb-3" style={{ opacity: 0.68 }}>
          {exp.company}
        </p>
        <p className="mt-3 text-xs md:text-sm" style={{ lineHeight: 1.7, opacity: 0.78 }}>
          {exp.description}
        </p>

        {exp.impact ? (
          <p className="mt-4 text-xs md:text-sm font-medium" style={{ color: ac.impact }}>
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
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 pb-12">
        <Timeline
          data={timelineData}
          heading="Experience Timeline"
          subheading="Roles, impact, and technical stacks across my journey."
        />
      </section>
    </PageTransition>
  );
}
