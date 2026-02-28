"use client";

import { useEffect, useState } from "react";
import ContributionGraph, { type ContributionData } from "@/components/reactbits/ContributionGraph";
import { fetchGitHubContributions } from "@/lib/github";
import Skeleton from "@/components/ui/Skeleton";

interface GitHubContributionWrapperProps {
  username: string;
  days?: number;
  brandColor: string;
  primaryColor: string;
  showLegend?: boolean;
  showTooltips?: boolean;
  className?: string;
}

export default function GitHubContributionWrapper({
  username,
  days = 365,
  brandColor,
  primaryColor,
  showLegend = true,
  showTooltips = true,
  className,
}: GitHubContributionWrapperProps) {
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadContributions() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchGitHubContributions(username, days);
        
        if (isMounted) {
          if (data && data.length > 0) {
            setContributions(data);
          } else {
            setError("No contribution data available");
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading contributions:", err);
          setError("Failed to load contribution data");
          setLoading(false);
        }
      }
    }

    loadContributions();

    return () => {
      isMounted = false;
    };
  }, [username, days]);

  if (loading) {
    return (
      <div className={className}>
        <Skeleton variant="rounded" width="100%" height={150} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center min-h-[150px] text-white/50`}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ContributionGraph
      data={contributions}
      brandColor={brandColor}
      primaryColor={primaryColor}
      showLegend={showLegend}
      showTooltips={showTooltips}
      className={className}
    />
  );
}
