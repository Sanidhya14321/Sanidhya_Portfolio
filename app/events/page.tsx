"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS, colors, accentCSS, sectionStyles } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { Calendar, MapPin, Users, Award } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  participants?: number;
  role?: string;
  highlights?: string[];
  link?: string;
}

const eventsOrganized: Event[] = [
  {
    id: "codeKshetra-2.0",
    title: "Codeक्षेत्र 2.0",
    date: "2024",
    location: "MSIT, New Delhi",
    description: "Large-scale hackathon attracting tech enthusiasts from across India. Features innovative problem statements, mentorship, and networking opportunities.",
    participants: 15000,
    role: "Lead Organizer",
    highlights: [
      "15,000+ registrations",
      "Multi-track competition",
      "Industry mentors and judges",
      "Prize pool of ₹5+ lakhs"
    ],
    link: "#"
  },
  {
    id: "code-cubicle-5.0",
    title: "Code Cubicle 5.0",
    date: "2024",
    location: "Virtual & In-person",
    description: "Premier coding competition designed to challenge developers with real-world problems and collaborative team challenges.",
    participants: 8000,
    role: "Organizer & Technical Lead",
    highlights: [
      "8,000+ participants",
      "48-hour coding marathon",
      "Global participation",
      "Mentorship from tech leads"
    ],
    link: "#"
  },
  {
    id: "hackavensis-2024",
    title: "HackAvensis 2024",
    date: "2024",
    location: "MSIT, New Delhi",
    description: "Collaborative hackathon focused on building solutions for social impact and technological innovation.",
    participants: 5000,
    role: "Co-organizer",
    highlights: [
      "5,000+ registrations",
      "Social impact track",
      "Startup mentorship",
      "Industry partnerships"
    ],
    link: "#"
  },
  {
    id: "gdg-workshops",
    title: "GDG-MSIT Technical Workshops",
    date: "2023-2024",
    location: "MSIT Campus",
    description: "Regular technical workshops and speaker sessions focused on Google technologies, modern development practices, and emerging tech trends.",
    participants: 2000,
    role: "Head of Development",
    highlights: [
      "Monthly workshops",
      "20+ technical sessions",
      "Expert speakers",
      "Hands-on learning"
    ],
    link: "#"
  }
];

const eventsParticipated: Event[] = [
  {
    id: "google-io",
    title: "Google I/O Extended",
    date: "2024",
    location: "Online & Regional Meetups",
    description: "Participated in extended sessions showcasing latest Google technologies, AI innovations, and web development advancements.",
    role: "Participant & Session Attendee",
    highlights: [
      "Attended keynote sessions",
      "Hands-on workshops",
      "Networking with developers",
      "Product insights"
    ],
    link: "#"
  },
  {
    id: "ai-summit",
    title: "AI & ML Summit India",
    date: "2024",
    location: "Mumbai, India",
    description: "Major summit bringing together AI/ML practitioners, discussing latest advancements in artificial intelligence and machine learning applications.",
    role: "Participant & Speaker Candidate",
    highlights: [
      "Expert talks on LLMs",
      "AI infrastructure discussions",
      "Networking with AI community",
      "Latest tech trends"
    ],
    link: "#"
  },
  {
    id: "dev-conf",
    title: "Developer Conference India",
    date: "2023",
    location: "Bengaluru, India",
    description: "Annual conference showcasing innovative projects, new frameworks, and industry best practices in software development.",
    role: "Attendee & Project Showcase Participant",
    highlights: [
      "Project showcase track",
      "Technical talks",
      "Community networking",
      "Workshop sessions"
    ],
    link: "#"
  },
  {
    id: "hackathon-circuit",
    title: "National Hackathon Circuit",
    date: "2023-2024",
    location: "Multiple Cities (All India)",
    description: "Active participant in various national-level hackathons across India, competing and learning from diverse problem statements.",
    role: "Competitor & Team Lead",
    highlights: [
      "Won multiple rounds",
      "Top placements",
      "Innovation recognition",
      "Team collaboration"
    ],
    link: "#"
  }
];

const eventsMentored: Event[] = [
  {
    id: "mentorship-program",
    title: "Developer Mentorship Program",
    date: "2024",
    location: "Online (MSIT Community)",
    description: "Mentoring junior developers on full-stack development, system design, and career guidance in the tech industry.",
    participants: 50,
    role: "Mentor",
    highlights: [
      "Mentored 50+ developers",
      "1-on-1 guidance sessions",
      "Portfolio review",
      "Interview preparation"
    ],
    link: "#"
  },
  {
    id: "hackathon-mentorship",
    title: "Hackathon Mentorship Track",
    date: "2024",
    location: "Multiple Hackathons",
    description: "Served as technical mentor during hackathons, guiding teams through problem-solving, architecture decisions, and implementation.",
    participants: 30,
    role: "Technical Mentor",
    highlights: [
      "Mentored 30 teams",
      "Technical guidance",
      "Code review sessions",
      "Architecture planning"
    ],
    link: "#"
  },
  {
    id: "geek-room-mentorship",
    title: "Geek Room Development Track",
    date: "2023-2024",
    location: "MSIT, New Delhi (As Deputy Head)",
    description: "Led development initiatives and mentored community members on advanced programming concepts, AI/ML, and full-stack development.",
    participants: 100,
    role: "Deputy Head & Technical Lead",
    highlights: [
      "Mentored 100+ members",
      "Weekly technical sessions",
      "Project guidance",
      "Skill development workshops"
    ],
    link: "#"
  },
  {
    id: "gdg-mentorship",
    title: "Google Developer Group Mentorship",
    date: "2023-2024",
    location: "MSIT Campus",
    description: "As Head of Development for GDG-MSIT, mentoring developers on Google technologies, modern frameworks, and best development practices.",
    participants: 75,
    role: "Head of Development & Mentor",
    highlights: [
      "Mentored 75+ developers",
      "Google tech training",
      "Project mentorship",
      "Community leadership"
    ],
    link: "#"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const EventCard = ({ event, theme, spotlightColor }: { event: Event; theme: string; spotlightColor: string }) => {
  const cc = cardCSS[theme];
  const pal = colors[theme];
  const ac = accentCSS[theme];

  const cardRadius: Record<string, string> = {
    aurora: "rounded-2xl",
    industrial: "rounded-none",
    glass: "rounded-3xl",
    "dark-horse": "rounded-xl",
  };

  const cardClass = `border ${cardRadius[theme]} p-6 transition-all duration-300 group h-full`;
  const cardStyle: React.CSSProperties = {
    backgroundColor: cc.bg,
    borderColor: cc.border,
    backdropFilter: cc.backdropFilter,
  };

  return (
    <motion.div variants={fadeUp}>
      <SpotlightCard spotlightColor={spotlightColor} className={`${cardClass} hover:border-opacity-100`} style={cardStyle}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold" style={{ color: pal.heading }}>
              {event.title}
            </h3>
            {event.role && (
              <p className="text-xs md:text-sm mt-1 font-medium" style={{ color: ac.primary }}>
                {event.role}
              </p>
            )}
          </div>
          {event.participants && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${ac.primary}22`, color: ac.primary }}>
              <Users size={14} />
              <span className="text-xs font-medium">{event.participants.toLocaleString()}+</span>
            </div>
          )}
        </div>

        <p className="text-sm md:text-base mt-4" style={{ color: pal.text }}>
          {event.description}
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2 text-xs md:text-sm" style={{ color: pal.textSecondary }}>
            <Calendar size={16} style={{ color: ac.primary }} />
            <span>{event.date}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-xs md:text-sm" style={{ color: pal.textSecondary }}>
              <MapPin size={16} style={{ color: ac.primary }} />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.highlights && event.highlights.length > 0 && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: cc.border }}>
            <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: pal.heading }}>
              <Award size={14} /> Highlights
            </p>
            <ul className="space-y-1">
              {event.highlights.map((highlight, idx) => (
                <li key={idx} className="text-xs" style={{ color: pal.textSecondary }}>
                  • {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  );
};

type TabType = "organized" | "participated" | "mentored";

export default function EventsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("organized");
  const cc = cardCSS[theme];
  const pal = colors[theme];
  const ac = accentCSS[theme];
  const ss = sectionStyles[theme];

  const spotlightColor: Record<string, string> = {
    aurora: "rgba(124, 58, 237, 0.25)",
    industrial: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(255, 255, 255, 0.15)",
    "dark-horse": "rgba(0, 255, 163, 0.18)",
  };

  const tabs: { id: TabType; label: string; description: string }[] = [
    { id: "organized", label: "Events Organized", description: "Hackathons and technical events I've organized" },
    { id: "participated", label: "Participated In", description: "Events and conferences I've attended and competed in" },
    { id: "mentored", label: "Mentorship", description: "Events where I've mentored developers and community members" },
  ];

  const getActiveEvents = () => {
    switch (activeTab) {
      case "organized":
        return eventsOrganized;
      case "participated":
        return eventsParticipated;
      case "mentored":
        return eventsMentored;
    }
  };

  const activeTab_obj = tabs.find((t) => t.id === activeTab);
  const activeEvents = getActiveEvents();

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1000px] 2xl:max-w-[1200px] px-6 md:px-8 lg:px-10 py-16 md:py-20">
        <SectionHeading label="Community" title="Events & Speaking" />

        {/* Tab Navigation */}
        <div 
          className="mb-12 rounded-2xl border p-1 md:p-2 flex flex-col sm:flex-row gap-2"
          style={{
            backgroundColor: `${cc.bg}`,
            borderColor: cc.border,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm md:text-base"
              style={{
                backgroundColor: activeTab === tab.id ? ac.primary : "transparent",
                color: activeTab === tab.id ? (theme === "industrial" || theme === "dark-horse" ? "#000000" : pal.bg) : pal.text,
                borderColor: activeTab === tab.id ? ac.primary : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Description */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-8"
        >
          <p className="text-base md:text-lg" style={{ color: pal.text }}>
            {activeTab_obj?.description}
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {activeEvents.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              theme={theme}
              spotlightColor={spotlightColor[theme]}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16"
        >
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: pal.heading }}>
              Community Impact
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Events Organized", value: "4+", icon: "🎯" },
                { label: "Participants Reached", value: "30k+", icon: "👥" },
                { label: "Developers Mentored", value: "250+", icon: "🎓" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl md:text-3xl mb-2">{stat.icon}</p>
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: ac.primary }}>
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm mt-1" style={{ color: pal.textSecondary }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
