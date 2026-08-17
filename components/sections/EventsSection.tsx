"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import ShinyText from "@/components/reactbits/ShinyText";
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
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const,
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
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

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

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div 
      variants={fadeUp} 
      custom={index}
      className="h-full"
    >
      <div
        className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-7 h-full overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
      >
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div>
          <div className="mb-4 pb-4 border-b border-white/10">
            <h4 className="text-lg md:text-xl font-bold tracking-tight mb-2.5 text-white">
              {event.title}
            </h4>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase bg-white/10 text-white border border-white/10">
              <Sparkles size={11} className="animate-pulse" />
              {event.role}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-white" />
              <span>{event.date}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-white" />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendees && (
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-white" />
                <span>{event.attendees}+ attending</span>
              </div>
            )}
          </div>

          <p className="text-sm md:text-base leading-relaxed mb-5 text-neutral-300">
            {event.description}
          </p>
        </div>

        <div>
          {event.impact && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl mb-4 border border-white/10 bg-white/[0.03]">
              <Trophy size={14} className="mt-0.5 shrink-0 text-white" />
              <p className="text-xs md:text-sm leading-normal text-neutral-300">
                <span className="font-bold text-white">Impact:</span> {event.impact}
              </p>
            </div>
          )}

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

interface EventSectionBlockProps {
  id: string;
  title: string;
  subtitle?: string;
  events: Event[];
  icon: React.ReactNode;
  isCompactGrid?: boolean;
}

function EventSectionBlock({ id, title, subtitle, events, icon, isCompactGrid = false }: EventSectionBlockProps) {
  return (
    <div id={id} className="py-10 scroll-mt-24">
      <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/5 text-white">
            {icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            <ShinyText text={title} speed={6} />
          </h3>
        </div>
        {subtitle && (
          <p className="text-sm md:text-base text-neutral-400 pl-[54px] max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>

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
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("events-organized");

  const sections = [
    { id: "events-organized", label: "Organized", count: eventsOrganized.length },
    { id: "events-attended", label: "Attended", count: eventsAttended.length },
    { id: "events-mentored", label: "Mentored", count: eventsMentored.length }
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="events" className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-10 py-12 md:py-16 scroll-mt-12">
      <SectionHeading label="Community" title="Events & Speaking" />

      {/* Hero Description */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8">
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-neutral-300">
          Passionate about community building, developer mentorship, and tech knowledge sharing.
          Here are hackathons, conferences, and technical workshops I have organized, attended, or mentored.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="sticky top-4 z-40 backdrop-blur-xl py-3 mb-4 border-b border-white/10 flex items-center justify-between overflow-x-auto gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
          {sections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative px-4 py-2 rounded-lg text-xs md:text-sm font-mono font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap flex items-center gap-2"
              style={{ color: activeTab === tab.id ? "#000000" : "#A3A3A3" }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeEventTab"
                  className="absolute inset-0 rounded-lg bg-white -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span>{tab.label}</span>
              <span 
                className={`inline-flex items-center justify-center text-[10px] w-4 h-4 rounded-full font-mono font-bold ${
                  activeTab === tab.id ? "bg-black/20 text-black" : "bg-white/10 text-neutral-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Sections */}
      <div className="space-y-4">
        <EventSectionBlock
          id="events-organized"
          title="Events Organized"
          subtitle="Leading hackathons, developer meetups, and multi-track technical challenges from concept to execution."
          events={eventsOrganized}
          icon={<Trophy size={18} />}
        />

        <div className="border-t border-white/10 pt-4">
          <EventSectionBlock
            id="events-attended"
            title="Events Attended"
            subtitle="Participating in global conferences, summits, and technical masterclasses."
            events={eventsAttended}
            icon={<Calendar size={18} />}
            isCompactGrid={true}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <EventSectionBlock
            id="events-mentored"
            title="Events Mentored"
            subtitle="Guiding aspiring engineers, advising architecture on startup teams, and onboarding open-source contributors."
            events={eventsMentored}
            icon={<BookOpen size={18} />}
          />
        </div>
      </div>

      {/* Collaboration CTA */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 shadow-2xl shadow-black/50">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center border border-white/15 bg-white/5 text-white">
            <Sparkles size={20} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Interested in Collaborating?
          </h3>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Open to speaking engagements, workshop mentorship, open-source initiatives, and event organization.
          </p>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm bg-white text-black hover:bg-neutral-200 transition-all shadow-lg hover:shadow-white/10"
          >
            <span>Get in Touch</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
