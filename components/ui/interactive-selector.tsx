"use client";

import React, { ReactNode, useEffect, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export type InteractiveSelectorOption = {
  title: string;
  description: string;
  image: string;
  icon?: ReactNode;
};

interface InteractiveSelectorProps {
  options: InteractiveSelectorOption[];
  title?: string;
  subtitle?: string;
  className?: string;
  onActiveChange?: (index: number) => void;
}

const InteractiveSelector = ({
  options,
  title,
  subtitle,
  className = "",
  onActiveChange,
}: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  useEffect(() => {
    setAnimatedOptions([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => (prev.includes(i) ? prev : [...prev, i]));
      }, 100 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6 backdrop-blur-md ${className}`}>
      {title ? (
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h3>
          {subtitle ? <p className="text-sm text-neutral-400 mt-1">{subtitle}</p> : null}
        </div>
      ) : null}

      {/* Mobile Stack Layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {options.map((option, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${option.title}-${index}`}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                onActiveChange?.(index);
              }}
              className="relative overflow-hidden rounded-xl border text-left transition-all duration-300"
              style={{
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateY(0)" : "translateY(16px)",
                borderColor: isActive ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
                boxShadow: isActive ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div className={`relative w-full ${isActive ? "h-48" : "h-28"}`}>
                <OptimizedImage
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 flex items-end gap-3">
                <div className="h-10 w-10 rounded-full border border-white/20 bg-black/70 flex items-center justify-center shrink-0 text-white">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {option.title}
                  </h4>
                  {isActive ? (
                    <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2">
                      {option.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop Flex Expansion Layout */}
      <div className="hidden md:flex w-full h-[440px] items-stretch overflow-hidden rounded-xl gap-2">
        {options.map((option, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${option.title}-${index}`}
              type="button"
              className="group relative flex flex-col justify-end overflow-hidden rounded-xl border transition-all duration-700 ease-in-out text-left"
              style={{
                flex: isActive ? "7 1 0%" : "1 1 0%",
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateX(0)" : "translateX(-30px)",
                borderColor: isActive ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.1)",
                boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.6)" : "none",
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(index);
                  onActiveChange?.(index);
                }
              }}
            >
              <div className="absolute inset-0">
                <OptimizedImage
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/95 via-black/50 to-black/20"
                  style={{ opacity: isActive ? 0.6 : 0.85 }}
                />
              </div>

              <div className="relative z-10 p-5 flex items-end gap-3 bg-gradient-to-t from-black/90 to-transparent">
                <div className="h-11 w-11 rounded-full border border-white/20 bg-black/80 flex items-center justify-center shrink-0 text-white shadow-lg">
                  {option.icon}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-lg leading-tight text-white">
                    {option.title}
                  </h4>
                  <p
                    className="text-sm text-neutral-300 transition-all duration-500 mt-1"
                    style={{
                      opacity: isActive ? 1 : 0,
                      maxHeight: isActive ? "80px" : "0px",
                      overflow: "hidden",
                    }}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveSelector;
