"use client";

import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS } from "@/lib/themes";

export default function EventsOrganizedPage() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  return (
    <PageTransition>
      <section>
        <div className=" mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 py-12 rounded-2xl border" style={{ backgroundColor: cc.bg, borderColor: cc.border, backdropFilter: cc.backdropFilter }}>
          Coming Soon
        </div>
      </section>
    </PageTransition>
  );
}
