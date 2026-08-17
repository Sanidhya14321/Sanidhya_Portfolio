"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading = "Experience Timeline",
  subheading = "Roles, impact, and technical stacks across my journey.",
  className,
}: {
  data: TimelineEntry[];
  heading?: string;
  subheading?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={`w-full font-sans ${className || ""}`} ref={containerRef}>
      <div className="mb-12 md:mb-16">
        <div className="inline-block mb-3">
          <p className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400">
            Career
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
          {heading}
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl">
          {subheading}
        </p>
        <div className="w-12 h-0.5 bg-white/30 mt-4" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-16">
        {data.map((item, index) => (
          <div key={item.title + index} className="flex justify-start pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-40 z-40 flex max-w-xs self-start md:w-full md:max-w-sm md:flex-row md:items-center">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black border border-white/20 md:left-3">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-3xl lg:text-4xl font-mono">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-16 md:pl-4">
              <h3 className="mb-4 block text-left text-xl font-bold text-neutral-400 md:hidden font-mono">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-white via-neutral-300 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
