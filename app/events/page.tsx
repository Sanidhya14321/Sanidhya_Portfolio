"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cardCSS, accentCSS, colors } from "@/lib/themes";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
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
  title: string;
  subtitle?: string;
  events: Event[];
  icon: React.ReactNode;
  theme: string;
  cc: any;
  ac: any;
  palette: any;
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
    <motion.div variants={fadeUp} custom={index}>
      <Magnet padding={40} magnetStrength={2}>
        <div
          className="group rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-2xl cursor-pointer h-full"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
            borderWidth: "1px",
          }}
        >
          {/* Header with title and role */}
          <div className="mb-4 pb-4" style={{ borderBottomColor: `${ac.primary}30`, borderBottomWidth: "1px" }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-semibold group-hover:text-opacity-100 transition-colors" style={{ color: palette.heading }}>
                  {event.title}
                </h4>
                <div
                  className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: `${ac.primary}15`,
                    color: ac.primary,
                  }}
                >
                  <Sparkles size={12} />
                  {event.role}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-2 mb-4 text-xs md:text-sm" style={{ color: palette.textSecondary }}>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: ac.primary }} />
              <span>{event.date}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: ac.primary }} />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendees && (
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: ac.primary }} />
                <span>{event.attendees}+ attendees</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base mb-4 line-clamp-3 group-hover:line-clamp-none transition-all" style={{ color: palette.text }}>
            {event.description}
          </p>

          {/* Impact highlight */}
          {event.impact && (
            <motion.div
              className="flex items-start gap-3 p-3 rounded-lg mb-4 border"
              style={{
                backgroundColor: `${ac.primary}08`,
                borderColor: `${ac.primary}30`,
              }}
              whileHover={{ backgroundColor: `${ac.primary}15` }}
            >
              <Trophy size={16} className="mt-0.5 flex-shrink-0" style={{ color: ac.primary }} />
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: palette.text }}>
                <span className="font-semibold">Impact:</span> {event.impact}
              </p>
            </motion.div>
          )}

          {/* Tags */}
          {event.tags && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
      </Magnet>
    </motion.div>
  );
}

function EventSection({ title, subtitle, events, icon, theme, cc, ac, palette }: EventSectionProps) {
  return (
    <section className="py-12">
      {/* Section header */}
      <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-lg"
            style={{
              backgroundColor: `${ac.primary}20`,
              color: ac.primary,
            }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold" style={{ color: palette.heading }}>
              <ShinyText text={title} speed={6} />
            </h3>
            {subtitle && (
              <p className="text-sm md:text-base mt-1" style={{ color: palette.textSecondary }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Events grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
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

  return (
    <PageTransition>
      <section className="mx-auto max-w-[95%] xl:max-w-[1180px] 2xl:max-w-[1320px] px-6 md:px-8 lg:px-10 py-16 md:py-20">
        <SectionHeading label="Community" title="Events & Speaking" />

        <div
          className="mb-8 rounded-2xl border p-5 md:p-6"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <p className="max-w-3xl text-sm md:text-base" style={{ opacity: 0.8, color: palette.text }}>
            I'm passionate about community building, knowledge sharing, and fostering the next generation of developers. 
            Here are the events I've organized, attended, and mentored others through.
          </p>
        </div>

        {/* Events Organized */}
        <EventSection
          title="Events Organized"
          events={eventsOrganized}
          icon={<Trophy size={20} />}
          theme={theme}
          cc={cc}
          ac={ac}
          palette={palette}
        />

        {/* Events Attended */}
        <EventSection
          title="Events Attended"
          events={eventsAttended}
          icon={<Calendar size={20} />}
          theme={theme}
          cc={cc}
          ac={ac}
          palette={palette}
        />

        {/* Events Mentored */}
        <EventSection
          title="Events Mentored"
          events={eventsMentored}
          icon={<BookOpen size={20} />}
          theme={theme}
          cc={cc}
          ac={ac}
          palette={palette}
        />

        {/* Call to action */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            className="rounded-2xl border p-8 md:p-12"
            style={{
              backgroundColor: `${ac.primary}08`,
              borderColor: `${ac.primary}30`,
              backdropFilter: cc.backdropFilter,
            }}
          >
            <Sparkles size={40} className="mx-auto mb-4" style={{ color: ac.primary }} />
            <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: palette.heading }}>
              Interested in Collaborating?
            </h3>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: palette.textSecondary }}>
              I'm always open to speaking opportunities, workshop collaborations, mentoring new developers, and organizing community events. 
              Let's build something amazing together!
            </p>
            <Magnet padding={40} magnetStrength={2}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: ac.primary,
                  color: palette.bg,
                  border: `1px solid ${ac.primary}`,
                }}
              >
                <span>Get in Touch</span>
                <ExternalLink size={16} />
              </a>
            </Magnet>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
