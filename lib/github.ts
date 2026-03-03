/**
 * Fetch GitHub contribution data for a user
 * Using GitHub's GraphQL API via public endpoint
 */

export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

/**
 * Fetch contribution data from GitHub GraphQL API
 * Note: This requires a server-side API route for production use
 * For now, we'll use a public scraping approach
 */
export async function fetchGitHubContributions(
  username: string,
  days: number = 365
): Promise<GitHubContribution[]> {
  try {
    // Using GitHub's public contribution API (scraped data)
    // Note: In production, you should use the official GraphQL API with authentication
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache for 1 hour to avoid rate limiting
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch GitHub contributions:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    // Calculate the date range for the last N days
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    
    // Transform the data to our format and filter for last N days
    const contributions: GitHubContribution[] = [];
    
    if (data.contributions) {
      for (const contribution of data.contributions) {
        const contributionDate = new Date(contribution.date);
        
        // Only include contributions within the last N days
        if (contributionDate >= startDate && contributionDate <= today) {
          const count = contribution.count || 0;
          
          // Calculate level (0-4) based on contribution count
          // GitHub uses different thresholds, we'll use these approximate values
          let level = 0;
          if (count > 0) level = 1;
          if (count >= 3) level = 2;
          if (count >= 6) level = 3;
          if (count >= 10) level = 4;
          
          contributions.push({
            date: contribution.date,
            count: count,
            level: level,
          });
        }
      }
    }
    
    return contributions;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return [];
  }
}

/**
 * Generate mock contribution data for demonstration/fallback
 */
export function generateMockContributions(year: number = new Date().getFullYear()): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Random contribution pattern (more realistic than pure random)
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Less activity on weekends
    const baseChance = isWeekend ? 0.3 : 0.7;
    const hasActivity = Math.random() < baseChance;
    
    let count = 0;
    let level = 0;
    
    if (hasActivity) {
      // Weighted random contribution count
      const rand = Math.random();
      if (rand < 0.3) {
        count = 1 + Math.floor(Math.random() * 2); // 1-2 contributions
        level = 1;
      } else if (rand < 0.6) {
        count = 3 + Math.floor(Math.random() * 3); // 3-5 contributions
        level = 2;
      } else if (rand < 0.85) {
        count = 6 + Math.floor(Math.random() * 4); // 6-9 contributions
        level = 3;
      } else {
        count = 10 + Math.floor(Math.random() * 10); // 10-19 contributions
        level = 4;
      }
    }
    
    contributions.push({
      date: currentDate.toISOString().split('T')[0],
      count,
      level,
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return contributions;
}
