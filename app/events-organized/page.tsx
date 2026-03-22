"use client";

import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS } from "@/lib/themes";

const eventImages = [
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Tech meetup crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Stage talk",
  },
  {
    src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Workshop collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Audience during keynote",
  },
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Event networking",
  },
  {
    src: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Hackathon moment",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80",
    alt: "Team celebration",
  },
];

export default function EventsOrganizedPage() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];

  return (
    <PageTransition>
      <section></section>
    </PageTransition>
  );
}
