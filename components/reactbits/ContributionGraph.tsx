"use client";

import { motion, useReducedMotion } from "framer-motion";
import type React from "react";
import { useMemo, useState } from "react";

export interface ContributionData {
  date: string;
  count: number;
  level: number;
}

export interface ContributionGraphProps {
  data?: ContributionData[];
  year?: number;
  className?: string;
  showLegend?: boolean;
  showTooltips?: boolean;
  brandColor?: string;
  primaryColor?: string;
}

const WEEKS_IN_YEAR = 53;
const DAYS_IN_WEEK = 7;
const JANUARY_MONTH = 0;
const DECEMBER_MONTH = 11;
const SUNDAY_DAY = 0;
const MIN_WEEKS_FOR_DECEMBER_HEADER = 2;
const TOOLTIP_OFFSET_X = 10;
const TOOLTIP_OFFSET_Y = 40;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LEVEL_0 = 0;
const LEVEL_1 = 1;
const LEVEL_2 = 2;
const LEVEL_3 = 3;
const LEVEL_4 = 4;
const CONTRIBUTION_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];
const DAY_1 = 1;
const DAY_31 = 31;

// Helper function to check if date is in valid range
const isDateInValidRange = (
  currentDate: Date,
  startDate: Date,
  endDate: Date,
  targetYear: number
) => {
  const isInRange = currentDate >= startDate && currentDate <= endDate;
  const isPreviousYearDecember =
    currentDate.getFullYear() === targetYear - 1 &&
    currentDate.getMonth() === DECEMBER_MONTH;
  const isNextYearJanuary =
    currentDate.getFullYear() === targetYear + 1 &&
    currentDate.getMonth() === JANUARY_MONTH;
  return isInRange || isPreviousYearDecember || isNextYearJanuary;
};

// Helper function to create day data
const createDayData = (
  currentDate: Date,
  contributionData: ContributionData[]
): ContributionData => {
  const dateString = currentDate.toISOString().split("T")[0];
  const existingData = contributionData.find((d) => d.date === dateString);
  return {
    date: dateString,
    count: existingData?.count ?? LEVEL_0,
    level: existingData?.level ?? LEVEL_0,
  };
};

// Helper function to check if month should be shown
interface MonthHeaderCheck {
  currentYear: number;
  targetYear: number;
  currentMonth: number;
  startDateDay: number;
  weekCount: number;
}
const shouldShowMonthHeader = ({
  currentYear,
  targetYear,
  currentMonth,
  startDateDay,
  weekCount,
}: MonthHeaderCheck) =>
  currentYear === targetYear ||
  (currentYear === targetYear - 1 &&
    currentMonth === DECEMBER_MONTH &&
    startDateDay !== SUNDAY_DAY &&
    weekCount >= MIN_WEEKS_FOR_DECEMBER_HEADER);

// Helper function to calculate month headers
const calculateMonthHeaders = (targetYear: number) => {
  const headers: { month: string; colspan: number; startWeek: number }[] = [];
  const startDate = new Date(targetYear, JANUARY_MONTH, DAY_1);
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());

  let currentMonth = -1;
  let currentYear = -1;
  let monthStartWeek = 0;
  let weekCount = 0;

  for (let weekNumber = 0; weekNumber < WEEKS_IN_YEAR; weekNumber++) {
    const weekDate = new Date(firstSunday);
    weekDate.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK);

    const monthKey = weekDate.getMonth();
    const yearKey = weekDate.getFullYear();

    if (monthKey !== currentMonth || yearKey !== currentYear) {
      if (
        currentMonth !== -1 &&
        shouldShowMonthHeader({
          currentYear,
          targetYear,
          currentMonth,
          startDateDay: startDate.getDay(),
          weekCount,
        })
      ) {
        headers.push({
          month: MONTHS[currentMonth],
          colspan: weekCount,
          startWeek: monthStartWeek,
        });
      }
      currentMonth = monthKey;
      currentYear = yearKey;
      monthStartWeek = weekNumber;
      weekCount = 1;
    } else {
      weekCount++;
    }
  }

  // Add the last month
  if (
    currentMonth !== -1 &&
    shouldShowMonthHeader({
      currentYear,
      targetYear,
      currentMonth,
      startDateDay: startDate.getDay(),
      weekCount,
    })
  ) {
    headers.push({
      month: MONTHS[currentMonth],
      colspan: weekCount,
      startWeek: monthStartWeek,
    });
  }

  return headers;
};

export function ContributionGraph({
  data = [],
  year,
  className = "",
  showLegend = true,
  showTooltips = true,
  brandColor = "#7C3AED",
  primaryColor = "rgba(255, 255, 255, 0.05)",
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  // Generate contribution colors based on brand color
  const contributionColors = useMemo(() => {
    return [
      primaryColor, // Level 0 - No contributions
      `${brandColor}40`, // Level 1 - 25% opacity
      `${brandColor}80`, // Level 2 - 50% opacity
      `${brandColor}BF`, // Level 3 - 75% opacity
      brandColor, // Level 4 - Max
    ];
  }, [brandColor, primaryColor]);

  // Calculate date range dynamically from data or use year
  const dateRange = useMemo(() => {
    if (data && data.length > 0) {
      // If we have data, use the date range from the data
      const dates = data.map(d => new Date(d.date)).sort((a, b) => a.getTime() - b.getTime());
      const startDate = dates[0];
      const endDate = dates[dates.length - 1];
      
      // Align to start from Sunday
      const firstSunday = new Date(startDate);
      firstSunday.setDate(startDate.getDate() - startDate.getDay());
      
      return {
        startDate: firstSunday,
        endDate,
        targetYear: endDate.getFullYear(),
      };
    } else if (year) {
      // Fallback to year-based calculation
      return {
        startDate: new Date(year, JANUARY_MONTH, DAY_1),
        endDate: new Date(year, DECEMBER_MONTH, DAY_31),
        targetYear: year,
      };
    } else {
      // Default to current year
      const currentYear = new Date().getFullYear();
      return {
        startDate: new Date(currentYear, JANUARY_MONTH, DAY_1),
        endDate: new Date(currentYear, DECEMBER_MONTH, DAY_31),
        targetYear: currentYear,
      };
    }
  }, [data, year]);

  // Generate all days for the date range
  const yearData = useMemo(() => {
    const { startDate, endDate, targetYear } = dateRange;
    const days: ContributionData[] = [];

    // Start from the Sunday we calculated
    const firstSunday = new Date(startDate);

    // Generate 53 weeks (GitHub shows 53 weeks)
    for (let weekNum = 0; weekNum < WEEKS_IN_YEAR; weekNum++) {
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const currentDate = new Date(firstSunday);
        currentDate.setDate(
          firstSunday.getDate() + weekNum * DAYS_IN_WEEK + day
        );

        if (currentDate <= endDate) {
          days.push(createDayData(currentDate, data));
        } else {
          // Add empty day for alignment
          days.push({
            date: "",
            count: LEVEL_0,
            level: LEVEL_0,
          });
        }
      }
    }

    return days;
  }, [data, dateRange]);

  // Calculate month headers with colspan
  const monthHeaders = useMemo(() => calculateMonthHeaders(dateRange.targetYear), [dateRange.targetYear]);

  const handleDayHover = (day: ContributionData, event: React.MouseEvent) => {
    if (showTooltips && day.date) {
      setHoveredDay(day);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContributionText = (count: number) => {
    if (count === LEVEL_0) {
      return "No contributions";
    }
    if (count === LEVEL_1) {
      return "1 contribution";
    }
    return `${count} contributions`;
  };

  return (
    <div className={`contribution-graph ${className}`}>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1 text-xs">
          <caption className="sr-only">Contribution Graph for {year}</caption>

          {/* Month Headers */}
          <thead>
            <tr className="h-3">
              <td className="w-7 min-w-7" />
              {monthHeaders.map((header) => (
                <td
                  className="relative text-left opacity-60"
                  style={{ color: 'var(--heading)' }}
                  colSpan={header.colspan}
                  key={`${header.month}-${header.startWeek}`}
                >
                  <span className="absolute top-0 left-1">{header.month}</span>
                </td>
              ))}
            </tr>
          </thead>

          {/* Day Grid */}
          <tbody>
            {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => (
              <tr className="h-2.5" key={DAYS[dayIndex]}>
                {/* Day Labels */}
                <td className="relative w-7 min-w-7 opacity-60" style={{ color: 'var(--heading)' }}>
                  {dayIndex % 2 === 0 && (
                    <span className="absolute -bottom-0.5 left-0 text-xs">
                      {DAYS[dayIndex]}
                    </span>
                  )}
                </td>

                {/* Day Cells */}
                {Array.from({ length: WEEKS_IN_YEAR }, (_, w) => {
                  const dayData = yearData[w * DAYS_IN_WEEK + dayIndex];
                  const cellKey = `${dayData?.date ?? "empty"}-${w}-${dayIndex}`;
                  if (!dayData?.date) {
                    return (
                      <td className="h-2.5 w-2.5 p-0" key={cellKey}>
                        <div className="h-2.5 w-2.5" />
                      </td>
                    );
                  }

                  return (
                    <td
                      className="h-2.5 w-2.5 cursor-pointer p-0"
                      key={cellKey}
                      onMouseEnter={(e) => handleDayHover(dayData, e)}
                      onMouseLeave={handleDayLeave}
                      title={
                        showTooltips
                          ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                          : undefined
                      }
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-white/20"
                        style={{ backgroundColor: contributionColors[dayData.level] }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {showTooltips && hoveredDay && (
        <motion.div
          animate={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
          }
          className="pointer-events-none fixed z-50 rounded-lg border border-white/10 px-3 py-2 text-sm shadow-lg"
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : { opacity: 0, scale: 0.8 }
          }
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }
          }
          style={{
            left: tooltipPosition.x + TOOLTIP_OFFSET_X,
            top: tooltipPosition.y - TOOLTIP_OFFSET_Y,
            backgroundColor: primaryColor,
            backdropFilter: 'blur(12px)'
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
        >
          <div className="font-semibold" style={{ color: 'var(--heading)' }}>
            {getContributionText(hoveredDay.count)}
          </div>
          <div className="opacity-70" style={{ color: 'var(--heading)' }}>
            {formatDate(hoveredDay.date)}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex items-center justify-between opacity-60 text-xs" style={{ color: 'var(--heading)' }}>
          <span>Less</span>
          <div className="flex items-center gap-1">
            {CONTRIBUTION_LEVELS.map((level) => (
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: contributionColors[level] }}
                key={level}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      )}
    </div>
  );
}

export default ContributionGraph;
