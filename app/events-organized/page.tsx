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
      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 pb-14">
        <SectionHeading label="Community" title="Events Organized" />

        <div
          className="mb-8 rounded-2xl border p-5 md:p-6"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <p className="max-w-3xl text-sm md:text-base" style={{ opacity: 0.78 }}>
            A visual log of communities, workshops, and meetups I have organized. Scroll through the
            parallax collage to explore snapshots from events focused on engineering, product, and
            collaboration.
          </p>
        </div>
      </section>

      <ZoomParallax images={eventImages} />

      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 py-12">
        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <p className="text-sm md:text-base" style={{ opacity: 0.75 }}>
            Interested in collaborating on the next event? Reach out from the contact page.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
