"use client";

import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export type InteractiveSelectorOption = {
  title: string;
  description: string;
  image: string;
  icon?: ReactNode;
};

export type InteractiveSelectorTheme = {
  containerBackground: string;
  borderColor: string;
  activeBorderColor: string;
  iconBackground: string;
  titleColor: string;
  descriptionColor: string;
  chipTextColor: string;
  chipBorderColor: string;
  shadowActive: string;
  shadowIdle: string;
  mobileImageOverlay: string;
  desktopImageOverlay: string;
};

interface InteractiveSelectorProps {
  options: InteractiveSelectorOption[];
  title?: string;
  subtitle?: string;
  className?: string;
  themeStyles: InteractiveSelectorTheme;
  onActiveChange?: (index: number) => void;
}

const InteractiveSelector = ({
  options,
  title,
  subtitle,
  className = "",
  themeStyles,
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
      }, 150 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  useEffect(() => {
    if (activeIndex > options.length - 1) {
      setActiveIndex(0);
      onActiveChange?.(0);
    }
  }, [activeIndex, options.length, onActiveChange]);

  const hasOptions = options.length > 0;

  const wrapperStyle = useMemo<CSSProperties>(
    () => ({
      background: themeStyles.containerBackground,
      borderColor: themeStyles.borderColor,
    }),
    [themeStyles]
  );

  if (!hasOptions) {
    return (
      <div className={`rounded-2xl border p-6 ${className}`} style={wrapperStyle}>
        <p style={{ color: themeStyles.descriptionColor, opacity: 0.85 }}>
          No project cards are available right now.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl border p-4 md:p-6 ${className}`} style={wrapperStyle}>
      {(title || subtitle) && (
        <div className="mb-5 md:mb-6 text-center">
          {title ? (
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: themeStyles.titleColor }}>
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm md:text-base max-w-3xl mx-auto" style={{ color: themeStyles.descriptionColor }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-3 md:hidden">
        {options.map((option, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`${option.title}-${index}`}
              type="button"
              className="group relative overflow-hidden rounded-xl border text-left transition-all duration-500"
              onClick={() => {
                setActiveIndex(index);
                onActiveChange?.(index);
              }}
              style={{
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateY(0)" : "translateY(16px)",
                borderColor: isActive ? themeStyles.activeBorderColor : themeStyles.borderColor,
                boxShadow: isActive ? themeStyles.shadowActive : themeStyles.shadowIdle,
              }}
            >
              <div className={`relative w-full ${isActive ? "h-48" : "h-28"}`}>
                <OptimizedImage
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: themeStyles.mobileImageOverlay }} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 flex items-end gap-3">
                <div
                  className="h-10 w-10 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    background: themeStyles.iconBackground,
                    borderColor: themeStyles.borderColor,
                    color: themeStyles.chipTextColor,
                  }}
                >
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: themeStyles.titleColor }}>
                    {option.title}
                  </h3>
                  {isActive ? (
                    <p className="text-xs mt-1" style={{ color: themeStyles.descriptionColor }}>
                      {option.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex w-full h-[440px] items-stretch overflow-hidden rounded-xl">
        {options.map((option, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${option.title}-${index}`}
              type="button"
              className="group relative flex flex-col justify-end overflow-hidden border transition-all duration-700 ease-in-out text-left"
              style={{
                flex: isActive ? "7 1 0%" : "1 1 0%",
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateX(0)" : "translateX(-40px)",
                borderColor: isActive ? themeStyles.activeBorderColor : themeStyles.borderColor,
                boxShadow: isActive ? themeStyles.shadowActive : themeStyles.shadowIdle,
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
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 0.35 : 0.55,
                    background: themeStyles.desktopImageOverlay,
                  }}
                />
              </div>

              <div className="relative z-10 p-4 flex items-end gap-3 bg-gradient-to-t from-black/80 to-transparent">
                <div
                  className="h-11 w-11 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    background: themeStyles.iconBackground,
                    borderColor: themeStyles.chipBorderColor,
                    color: themeStyles.chipTextColor,
                  }}
                >
                  {option.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-lg leading-tight" style={{ color: themeStyles.titleColor }}>
                    {option.title}
                  </h3>
                  <p
                    className="text-sm transition-all duration-500"
                    style={{
                      color: themeStyles.descriptionColor,
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
