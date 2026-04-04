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

function EventSection({ title, events, icon, theme, cc, ac, palette }: EventSectionProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{
            backgroundColor: ac.iconBg,
            color: ac.primary,
          }}
        >
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: palette.heading }}>
          {title}
        </h3>
      </div>

      <motion.div
        className="space-y-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {events.map((event, index) => (
          <motion.div key={`${event.title}-${index}`} variants={fadeUp} custom={index}>
            <div
              className="rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: cc.bg,
                borderColor: cc.border,
                backdropFilter: cc.backdropFilter,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-semibold" style={{ color: palette.heading }}>
                    {event.title}
                  </h4>
                  <p className="text-sm md:text-base mt-1" style={{ color: palette.textSecondary }}>
                    {event.role}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 text-xs md:text-sm" style={{ color: palette.textSecondary }}>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      {event.attendees}+ attendees
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm md:text-base mb-4" style={{ color: palette.text }}>
                {event.description}
              </p>

              {event.impact && (
                <div
                  className="flex items-start gap-2 p-3 rounded-lg mb-4"
                  style={{ backgroundColor: `${ac.primary}15` }}
                >
                  <Trophy size={16} className="mt-0.5" style={{ color: ac.primary }} />
                  <p className="text-xs md:text-sm" style={{ color: palette.text }}>
                    <span className="font-semibold">Impact: </span>
                    {event.impact}
                  </p>
                </div>
              )}

              {event.tags && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} text={tag} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
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
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div
            className="rounded-2xl border p-8 md:p-12"
            style={{
              backgroundColor: cc.bg,
              borderColor: cc.border,
              backdropFilter: cc.backdropFilter,
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: palette.heading }}>
              Interested in Collaborating?
            </h3>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-6" style={{ color: palette.text }}>
              I'm always open to speaking opportunities, workshop collaborations, mentoring new developers, and organizing community events. 
              Let's build something amazing together!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: ac.primary,
                color: palette.bg,
                borderColor: ac.primary,
                border: "1px solid",
              }}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
