"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  HomePageSkeleton,
  AboutPageSkeleton,
  ProjectsPageSkeleton,
  ExperiencePageSkeleton,
  SkillsPageSkeleton,
  ContactPageSkeleton,
} from "./SkeletonLoaders";
import PageTransition from "./PageTransition";

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  children, 
  fallback 
}) => {
  return (
    <Suspense fallback={fallback || <HomePageSkeleton />}>
      {children}
    </Suspense>
  );
};

// Export page-specific wrappers for convenience
export const withHomeLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<HomePageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export const withAboutLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<AboutPageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export const withProjectsLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<ProjectsPageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export const withExperienceLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<ExperiencePageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export const withSkillsLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<SkillsPageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export const withContactLoading = (Component: React.ComponentType) => {
  return () => (
    <PageTransition>
      <Suspense fallback={<ContactPageSkeleton />}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export default LazyLoadWrapper;
