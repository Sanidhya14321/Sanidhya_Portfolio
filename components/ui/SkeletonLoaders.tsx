"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS } from "@/lib/themes";
import Skeleton from "./Skeleton";

export const HomePageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 py-24 md:py-32">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="space-y-8">
          <Skeleton variant="text" width="60%" height={48} />
          <Skeleton variant="text" width="80%" height={64} />
          <Skeleton variant="text" width="40%" height={32} />
          
          <div className="flex gap-4 mt-8">
            <Skeleton variant="rounded" width={140} height={48} />
            <Skeleton variant="rounded" width={140} height={48} />
          </div>
        </div>

        {/* Skills Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`border ${cardRadius[theme]} p-8`}
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
              }}
            >
              <Skeleton variant="text" width="70%" height={24} className="mb-4" />
              <Skeleton variant="text" width="50%" height={20} />
            </div>
          ))}
        </div>

        {/* Preview Cards */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`border ${cardRadius[theme]} p-12`}
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
              }}
            >
              <Skeleton variant="text" width="40%" height={32} className="mb-6" />
              <Skeleton variant="text" width="90%" height={20} className="mb-3" />
              <Skeleton variant="text" width="85%" height={20} className="mb-3" />
              <Skeleton variant="text" width="75%" height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutPageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 pb-12">
      {/* Section Heading */}
      <div className="mb-16">
        <Skeleton variant="text" width="30%" height={40} className="mb-4" />
        <Skeleton variant="text" width="15%" height={20} />
      </div>

      <div className="space-y-10">
        {/* Narrative Card */}
        <div
          className={`border ${cardRadius[theme]} p-12 md:p-16`}
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <Skeleton variant="text" width="100%" height={24} className="mb-4" />
          <Skeleton variant="text" width="95%" height={24} className="mb-4" />
          <Skeleton variant="text" width="90%" height={24} className="mb-4" />
          <Skeleton variant="text" width="85%" height={24} />
        </div>

        {/* Highlights Card */}
        <div
          className={`border ${cardRadius[theme]} p-12 md:p-16`}
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <Skeleton variant="text" width="40%" height={32} className="mb-10" />
          <div className="grid gap-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-5">
                <Skeleton variant="circular" width={24} height={24} />
                <div className="flex-1">
                  <Skeleton variant="text" width="100%" height={20} className="mb-2" />
                  <Skeleton variant="text" width="80%" height={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Card */}
        <div
          className={`border ${cardRadius[theme]} p-12 md:p-16`}
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <Skeleton variant="text" width="40%" height={32} className="mb-6" />
          <Skeleton variant="text" width="60%" height={24} className="mb-4" />
          <Skeleton variant="text" width="30%" height={20} className="mb-8" />
          <div className="space-y-3">
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="65%" height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsPageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 pb-12">
      {/* Section Heading */}
      <div className="mb-16">
        <Skeleton variant="text" width="30%" height={40} className="mb-4" />
        <Skeleton variant="text" width="15%" height={20} />
      </div>

      <div className="space-y-10">
        {/* Featured Projects */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`border ${cardRadius[theme]} p-12 md:p-16`}
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Skeleton variant="rounded" width={80} height={28} />
              <Skeleton variant="rounded" width={60} height={28} />
            </div>
            <Skeleton variant="text" width="60%" height={36} className="mb-6" />
            <Skeleton variant="text" width="100%" height={20} className="mb-3" />
            <Skeleton variant="text" width="95%" height={20} className="mb-3" />
            <Skeleton variant="text" width="85%" height={20} className="mb-8" />
            
            <div className="flex flex-wrap gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} variant="rounded" width={80} height={32} />
              ))}
            </div>
            
            <Skeleton variant="text" width="30%" height={20} />
          </div>
        ))}

        {/* Other Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`border ${cardRadius[theme]} p-10 md:p-12`}
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
              }}
            >
              <Skeleton variant="text" width="70%" height={28} className="mb-6" />
              <Skeleton variant="text" width="100%" height={18} className="mb-3" />
              <Skeleton variant="text" width="90%" height={18} className="mb-6" />
              
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} variant="rounded" width={70} height={28} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperiencePageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 pb-12">
      {/* Section Heading */}
      <div className="mb-16">
        <Skeleton variant="text" width="35%" height={40} className="mb-4" />
        <Skeleton variant="text" width="15%" height={20} />
      </div>

      <div className="space-y-10">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`border ${cardRadius[theme]} p-12 md:p-16`}
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
            }}
          >
            <div className="flex items-center gap-4 mb-7">
              <Skeleton variant="circular" width={12} height={12} />
              <Skeleton variant="text" width="25%" height={20} />
            </div>

            <Skeleton variant="text" width="60%" height={36} className="mb-4" />
            <Skeleton variant="text" width="40%" height={24} className="mb-8" />

            <Skeleton variant="text" width="100%" height={20} className="mb-3" />
            <Skeleton variant="text" width="95%" height={20} className="mb-3" />
            <Skeleton variant="text" width="85%" height={20} className="mb-8" />

            <div className="flex items-center gap-3 mb-6">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width="50%" height={20} />
            </div>

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} variant="rounded" width={90} height={32} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsPageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 pb-12">
      {/* Section Heading */}
      <div className="mb-16">
        <Skeleton variant="text" width="30%" height={40} className="mb-4" />
        <Skeleton variant="text" width="15%" height={20} />
      </div>

      {/* Logo Loop */}
      <div className="mb-20">
        <Skeleton variant="text" width="40%" height={32} className="mb-10 mx-auto" />
        <div className="flex items-center gap-8 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="rounded" width={100} height={100} />
          ))}
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`border ${cardRadius[theme]} p-12 md:p-16`}
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
            }}
          >
            <Skeleton variant="text" width="40%" height={32} className="mb-10" />
            <div className="flex flex-wrap gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                <Skeleton key={j} variant="rounded" width={120} height={48} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContactPageSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  return (
    <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-10 lg:px-12 py-24 md:py-32">
      {/* Section Heading */}
      <div className="mb-16">
        <Skeleton variant="text" width="40%" height={40} className="mb-4" />
        <Skeleton variant="text" width="15%" height={20} />
      </div>

      {/* Contact Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-16">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`border ${cardRadius[theme]} p-10 md:p-12`}
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
            }}
          >
            <div className="flex items-start gap-6">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="flex-1">
                <Skeleton variant="text" width="40%" height={20} className="mb-3" />
                <Skeleton variant="text" width="70%" height={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Card */}
      <div
        className={`border ${cardRadius[theme]} p-12 md:p-16 text-center`}
        style={{
          backgroundColor: cc.bg,
          borderColor: cc.border,
        }}
      >
        <Skeleton variant="text" width="60%" height={36} className="mb-6 mx-auto" />
        <Skeleton variant="text" width="80%" height={20} className="mb-8 mx-auto" />
        <Skeleton variant="rounded" width={160} height={48} className="mx-auto" />
      </div>
    </div>
  );
};
