"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS, accentCSS, colors } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ShinyText from "@/components/reactbits/ShinyText";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, BookOpen, ExternalLink, Sparkles } from "lucide-react";

interface Event {
  title: string;
  date: string;
  location?: string;
  description: string;
  role: string;
  attendees?: number;
  link?: string;
  tags?: string[];
  impact?: string;
}

// Hardware-accelerated, fluid entrance animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth, high-end feel
      delay: index * 0.04 
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

// Events organized
const eventsOrganized: Event[] = [
  {
    title: "Hack GeekRoom",
    date: "2024 - 2025",
    location: "Multiple Venues",
    role: "Primary Organizer",
    description:
      "Orchestrated a large-scale hackathon series focused on full-stack development and modern technologies. Managed technical infrastructure, participant experience, mentorship program, and sponsored opportunities.",
    attendees: 500,
    tags: ["Hackathon", "Full Stack", "Networking"],
    impact: "Connected 500+ developers, facilitated 50+ project submissions, and hosted tech talks from industry leaders",
  },
  {
    title: "Code Cubicle 5.0",
    date: "2024",
    location: "MSIT Campus",
    role: "Co-Organizer & Technical Lead",
    description:
      "Designed and executed a competitive hackathon featuring multiple tracks including Web Development, AI/ML, and Mobile App Development. Coordinated with technical mentors and industry sponsors.",
    attendees: 300,
    tags: ["Hackathon", "Multi-Track", "Competition"],
    impact: "Delivered a seamless event experience with real-time judging dashboard and mentorship program",
  },
  {
    title: "HackAvensis 2024",
    date: "2024",
    location: "Aravali Institute",
    role: "Technical Co-Organizer",
    description:
      "Led the technical infrastructure and workshop planning for a college-wide hackathon. Managed participant onboarding, judging criteria, and sponsor coordination.",
    attendees: 400,
    tags: ["Hackathon", "Student Competition", "Workshops"],
    impact: "Successfully hosted 400+ students with 60+ innovative project submissions",
  },
  {
    title: "Tech Workshops Series",
    date: "2023 - Present",
    location: "GDG-MSIT & Geek Room",
    role: "Workshop Lead & Instructor",
    description:
      "Conducted monthly technical workshops covering full-stack development, ML/AI, DevOps, and modern development practices. Topics include Next.js mastery, LLM applications, and system design.",
    attendees: 50,
    tags: ["Education", "Technical Training", "Community Building"],
    impact: "Trained 500+ developers in modern technologies with hands-on, project-based learning",
  },
];

// Events participated in / attended to
const eventsAttended: Event[] = [
  {
    title: "Google I/O Extended 2024",
    date: "2024",
    location: "Mumbai, India",
    role: "Attendee & Volunteer",
    description:
      "Participated in Google's largest developer conference extended event. Attended talks on Flutter, Firebase, Google Cloud, and AI/ML innovations. Volunteered for booth management and participant engagement.",
    tags: ["Google", "Cloud", "Flutter", "Networking"],
    impact: "Learned cutting-edge Google technologies and connected with 1000+ developers",
  },
  {
    title: "Developer Days 2024",
    date: "2024",
    location: "Delhi, India",
    role: "Participant & Community Representative",
    description:
      "Attended multi-day developer conference showcasing latest in web development, mobile development, and DevOps. Participated in code labs and networking sessions.",
    tags: ["Web Development", "Mobile", "DevOps"],
    impact: "Expanded network and stayed updated with industry best practices",
  },
  {
    title: "JavaScript Mastery Conf 2024",
    date: "2024",
    location: "Virtual",
    role: "Attendee",
    description:
      "Joined a specialized conference focused on JavaScript ecosystem, React best practices, and Next.js deep dives. Attended talks from leading React and JavaScript experts.",
    tags: ["JavaScript", "React", "Next.js"],
    impact: "Enhanced expertise in JavaScript frameworks and modern web development",
  },
  {
    title: "AI & ML Summit India 2024",
    date: "2024",
    location: "Bangalore, India",
    role: "Participant",
    description:
      "Attended summit featuring talks on transformers, LLMs, effective prompting, and production ML systems. Participated in hands-on sessions with PyTorch and TensorFlow.",
    tags: ["AI/ML", "LLM", "Deep Learning"],
    impact: "Gained insights into production ML and latest AI research trends",
  },
  {
    title: "React India 2024",
    date: "2024",
    location: "Goa, India",
    role: "Attendee",
    description:
      "Attended premier React conference featuring keynotes from React core team members, advanced patterns workshops, and community networking events.",
    tags: ["React", "Web Development", "Performance"],
    impact: "Connected with React community and learned advanced optimization techniques",
  },
];

// Events mentored
const eventsMentored: Event[] = [
  {
    title: "Hack GeekRoom Mentorship Program",
    date: "2024 - 2025",
    location: "Multiple Venues",
    role: "Lead Mentor",
    description:
      "Provided comprehensive mentorship to 30+ teams during hackathons. Guided teams through ideation, technical implementation, architecture planning, and deployment.",
    tags: ["Mentorship", "Hackathon", "Technical Guidance"],
    impact: "Helped 20+ teams successfully submit projects with 10+ teams winning awards",
  },
  {
    title: "Full Stack Development Bootcamp",
    date: "2024",
    location: "GDG-MSIT",
    role: "Mentor & Instructor",
    description:
      "Mentored a cohort of 25 students in comprehensive full-stack development. Provided personalized guidance on project selection, technical challenges, and career development.",
    tags: ["Bootcamp", "Full Stack", "Career Mentoring"],
    impact: "Guided all 25 participants to launch personal portfolio projects and secure internships",
  },
  {
    title: "AI/ML Project Mentorship",
    date: "2024",
    location: "Geek Room & Online",
    role: "Project Mentor",
    description:
      "Mentored 15+ students on AI/ML projects from concept to deployment. Topics included ML pipelines, LLM applications, and production deployment strategies.",
    tags: ["AI/ML", "Project Development", "Deployment"],
    impact: "Successfully guided projects resulting in 8 publications and 3 open-source contributions",
  },
  {
    title: "Open Source Contribution Guide",
    date: "2024",
    role: "Mentor & Guide",
    description:
      "Mentored 20+ contributors in open-source development, Git workflows, and best practices. Helped contributors identify issues and submit meaningful PRs.",
    tags: ["Open Source", "Git", "Community"],
    impact: "Facilitated 50+ merged PRs and onboarded new contributors to the ecosystem",
  },
  {
    title: "Startup Mentorship Program",
    date: "2024 - Present",
    location: "Online",
    role: "Technical Mentor & Advisor",
    description:
      "Providing technical mentorship to early-stage startups on system architecture, tech stack selection, and scalability planning.",
    tags: ["Startup", "Technical Advisory", "Architecture"],
    impact: "Helped 5 startups validate technical approaches and secure funding",
  },
];

interface EventSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  events: Event[];
  icon: React.ReactNode;
  theme: string;
  cc: any;
  ac: any;
  palette: any;
  isCompactGrid?: boolean;
}

interface EventCardProps {
  event: Event;
  index: number;
  cc: any;
  ac: any;
  palette: any;
}

function EventCard({ event, index, cc, ac, palette }: EventCardProps) {
  return (
    <motion.div 
      variants={fadeUp} 
      custom={index}
      className="h-full"
    >
      <div
        className="group relative flex flex-col justify-between rounded-2xl border p-6 md:p-7 cursor-pointer h-full overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1] will-change-transform transform-gpu hover:-translate-y-2 hover:shadow-2xl"
        style={{
          backgroundColor: cc.bg,
          borderColor: cc.border,
          backdropFilter: cc.backdropFilter,
          borderWidth: "1px",
        }}
      >
        {/* Subtle Accent Highlight Overlay Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1]"
          style={{ backgroundColor: ac.primary }}
        />

        <div>
          {/* Header with title and role */}
          <div className="mb-4 pb-4 border-b transition-colors duration-500 ease-[0.16,1,0.3,1]" style={{ borderBottomColor: `${palette.text}15` }}>
            <h4 className="text-lg md:text-xl font-bold tracking-tight mb-2.5 transition-colors duration-300 group-hover:text-opacity-80" style={{ color: palette.heading }}>
              {event.title}
            </h4>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]"
              style={{
                backgroundColor: `${ac.primary}12`,
                color: ac.primary,
              }}
            >
              <Sparkles size={11} className="animate-pulse" />
              {event.role}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs font-medium" style={{ color: palette.textSecondary }}>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: ac.primary }} />
              <span>{event.date}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: ac.primary }} />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendees && (
              <div className="flex items-center gap-1.5">
                <Users size={13} style={{ color: ac.primary }} />
                <span>{event.attendees}+ attending</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed mb-5 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ease-[0.16,1,0.3,1]" style={{ color: palette.text, opacity: 0.9 }}>
            {event.description}
          </p>
        </div>

        <div>
          {/* Impact highlight */}
          {event.impact && (
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl mb-4 border transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:bg-opacity-10"
              style={{
                backgroundColor: `${ac.primary}05`,
                borderColor: `${ac.primary}20`,
              }}
            >
              <Trophy size={14} className="mt-0.5 flex-shrink-0 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-110" style={{ color: ac.primary }} />
              <p className="text-xs md:text-sm leading-normal font-medium" style={{ color: palette.text }}>
                <span className="font-bold" style={{ color: ac.primary }}>Impact:</span> {event.impact}
              </p>
            </div>
          )}

          {/* Tags Layout */}
          {event.tags && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {event.tags.map((tag) => (
                <Badge key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EventSection({ id, title, subtitle, events, icon, theme, cc, ac, palette, isCompactGrid = false }: EventSectionProps) {
  return (
    <section id={id} className="py-16 scroll-mt-24">
      {/* Section header */}
      <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mb-10">
        <div className="flex items-center gap-3.5 mb-2">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl border shadow-inner"
            style={{
              backgroundColor: `${ac.primary}10`,
              borderColor: `${ac.primary}25`,
              color: ac.primary,
            }}
          >
            {icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: palette.heading }}>
            <ShinyText text={title} speed={6} />
          </h3>
        </div>
        {subtitle && (
          <p className="text-sm md:text-base max-w-2xl pl-[54px]" style={{ color: palette.textSecondary }}>
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Events dynamic grid layout */}
      <motion.div
        className={`grid grid-cols-1 gap-6 ${isCompactGrid ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {events.map((event, index) => (
          <EventCard
            key={`${event.title}-${index}`}
            event={event}
            index={index}
            cc={cc}
            ac={ac}
            palette={palette}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default function EventsPage() {
  const { theme } = useTheme();
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];
  const palette = colors[theme];
  
  const [activeTab, setActiveTab] = useState("organized");

  const sections = [
    { id: "organized", label: "Organized", count: eventsOrganized.length },
    { id: "attended", label: "Attended", count: eventsAttended.length },
    { id: "mentored", label: "Mentored", count: eventsMentored.length }
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16">
        <SectionHeading label="Community" title="Events & Speaking" />

        {/* Hero Info Description */}
        <div
          className="mb-12 rounded-2xl border p-6 md:p-8 relative overflow-hidden shadow-sm"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: ac.primary }} />
          <p className="max-w-3xl text-sm md:text-base leading-relaxed font-medium" style={{ color: palette.text }}>
            I'm passionate about community building, knowledge sharing, and fostering the next generation of developers. 
            Here are the events I've organized, attended, and mentored others through.
          </p>
        </div>

        {/* Sticky Sub-Navigation Tab Bar */}
        <div 
          className="sticky top-[72px] z-40 backdrop-blur-md py-4 mb-4 border-b flex items-center justify-between overflow-x-auto no-scrollbar gap-4"
          style={{ borderBottomColor: `${palette.text}10` }}
        >
          <div className="flex items-center gap-1.5 bg-opacity-40 p-1.5 rounded-xl border" style={{ backgroundColor: `${cc.bg}`, borderColor: cc.border }}>
            {sections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide uppercase transition-colors duration-300 whitespace-nowrap flex items-center gap-1.5"
                style={{ color: activeTab === tab.id ? palette.bg : palette.textSecondary }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{ backgroundColor: ac.primary }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span>{tab.label}</span>
                <span 
                  className="inline-flex items-center justify-center text-[10px] w-4 h-4 rounded-full font-sans font-bold transition-colors duration-300"
                  style={{ 
                    backgroundColor: activeTab === tab.id ? `${palette.bg}30` : `${ac.primary}15`,
                    color: activeTab === tab.id ? palette.bg : ac.primary 
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Sections */}
        <div className="space-y-4 divide-y" style={{ divideColor: `${palette.text}08` }}>
          <EventSection
            id="organized"
            title="Events Organized"
            subtitle="Leading tech events, hackathons, and multi-venue developer frameworks from concept to dynamic runtime execution."
            events={eventsOrganized}
            icon={<Trophy size={18} />}
            theme={theme}
            cc={cc}
            ac={ac}
            palette={palette}
          />

          <EventSection
            id="attended"
            title="Events Attended"
            subtitle="Engaging with worldwide ecosystems, specialized frameworks workshops, and elite developer summits."
            events={eventsAttended}
            icon={<Calendar size={18} />}
            theme={theme}
            cc={cc}
            ac={ac}
            palette={palette}
            isCompactGrid={true}
          />

          <EventSection
            id="mentored"
            title="Events Mentored"
            subtitle="Empowering developers, advising core project frameworks, and guiding developers into global open-source tech contributions."
            events={eventsMentored}
            icon={<BookOpen size={18} />}
            theme={theme}
            cc={cc}
            ac={ac}
            palette={palette}
          />
        </div>

        {/* Call To Action Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="rounded-3xl border p-8 md:p-14 relative overflow-hidden shadow-xl"
            style={{
              backgroundColor: `${ac.primary}05`,
              borderColor: `${ac.primary}20`,
              backdropFilter: cc.backdropFilter,
            }}
          >
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: ac.primary }} />
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: ac.primary }} />

            <div className="relative z-10">
              <div 
                className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-sm border"
                style={{ backgroundColor: `${palette.bg}`, borderColor: `${ac.primary}25` }}
              >
                <Sparkles size={24} style={{ color: ac.primary }} />
              </div>
              
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: palette.heading }}>
                Interested in Collaborating?
              </h3>
              <p className="text-sm md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: palette.textSecondary }}>
                I'm always open to speaking opportunities, workshop collaborations, mentoring new developers, and organizing community events. 
                Let's build something amazing together!
              </p>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-500 ease-[0.16,1,0.3,1] will-change-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-xl"
                style={{
                  backgroundColor: ac.primary,
                  color: palette.bg,
                  boxShadow: `0 10px 25px -5px ${ac.primary}30`
                }}
              >
                <span>Get in Touch</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}