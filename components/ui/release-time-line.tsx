"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

export default function TimeLine_01({
  title = "Project Milestones",
  description = "An interactive timeline of additional projects with highlights and launch links.",
  entries = [],
  className,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className={"py-8 " + (className || "")}>
      <div>
        <div className="mx-auto max-w-3xl">
          <h4 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-white">
            {title}
          </h4>
          <p className="mb-6 text-sm text-neutral-400">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-12">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-8"
                aria-current={isActive ? "true" : "false"}
              >
                <div className="top-24 flex h-min w-56 shrink-0 items-center gap-3 md:sticky">
                  <div
                    className={`rounded-lg p-2 transition-all duration-300 border ${
                      isActive ? "bg-white text-black border-white" : "bg-white/[0.04] text-white border-white/10"
                    }`}
                  >
                    <entry.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-400"}`}>
                      {entry.title}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {entry.subtitle}
                    </span>
                  </div>
                </div>

                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                <article
                  className={`flex flex-col rounded-2xl border p-5 transition-all duration-300 w-full ${
                    isActive ? "bg-white/[0.04] border-white/30 shadow-xl shadow-black/50" : "bg-white/[0.01] border-white/10"
                  }`}
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-4 h-56 w-full rounded-xl object-cover grayscale contrast-125 border border-white/10"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {entry.title}
                      </h4>
                      <p className={`text-xs md:text-sm text-neutral-300 leading-relaxed ${isActive ? "line-clamp-none" : "line-clamp-2"}`}>
                        {entry.description}
                      </p>
                    </div>

                    <div
                      aria-hidden={!isActive}
                      className={
                        "grid transition-all duration-500 ease-out " +
                        (isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2.5 text-xs text-neutral-300"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="pt-2">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="group/btn gap-2 border-white/20 bg-white/5 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs font-medium"
                              >
                                <a
                                  href={entry.button.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {entry.button.text}
                                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
