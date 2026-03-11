"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { accentCSS, cardCSS, colors } from "@/lib/themes";

export interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist, InsightX",
    description:
      "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions. Their dashboarding capabilities went above and beyond our expectations.",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product, NovaLabs",
    description:
      "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

export interface TestimonialCarouselProps {
  className?: string;
  testimonials?: Testimonial[];
}

export function TestimonialCarousel({ className, testimonials }: TestimonialCarouselProps) {
  const { theme } = useTheme();
  const palette = colors[theme];
  const cc = cardCSS[theme];
  const ac = accentCSS[theme];

  const source = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((index) => (index + 1) % source.length);
  const handlePrevious = () =>
    setCurrentIndex((index) => (index - 1 + source.length) % source.length);

  const currentTestimonial = source[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
    { icon: Globe, url: currentTestimonial.demoUrl, label: "Live Demo" },
  ].filter((item) => item.url && item.url !== "#");

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <div className="hidden md:flex relative items-center">
        <div
          className="w-[470px] h-[470px] rounded-3xl overflow-hidden flex-shrink-0 border"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                width={470}
                height={470}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1 border"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
            backdropFilter: cc.backdropFilter,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: palette.heading }}>
                  {currentTestimonial.name}
                </h2>

                <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>
                  {currentTestimonial.title}
                </p>
              </div>

              <p className="text-base leading-relaxed mb-8" style={{ color: palette.text }}>
                {currentTestimonial.description}
              </p>

              <div className="flex space-x-4">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer border"
                    style={{
                      backgroundColor: ac.iconBg,
                      borderColor: cc.border,
                    }}
                    aria-label={label}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: palette.heading }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
        <div
          className="w-full aspect-square rounded-3xl overflow-hidden mb-6 border"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: palette.heading }}>
                {currentTestimonial.name}
              </h2>

              <p className="text-sm font-medium mb-4" style={{ color: palette.textSecondary }}>
                {currentTestimonial.title}
              </p>

              <p className="text-sm leading-relaxed mb-6" style={{ color: palette.text }}>
                {currentTestimonial.description}
              </p>

              <div className="flex justify-center space-x-4">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer border"
                    style={{
                      backgroundColor: ac.iconBg,
                      borderColor: cc.border,
                    }}
                    aria-label={label}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: palette.heading }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="w-12 h-12 rounded-full border shadow-md flex items-center justify-center transition-colors cursor-pointer"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <ChevronLeft className="w-6 h-6" style={{ color: palette.heading }} />
        </button>

        <div className="flex gap-2">
          {source.map((_, testimonialIndex) => (
            <button
              key={testimonialIndex}
              onClick={() => setCurrentIndex(testimonialIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                testimonialIndex === currentIndex
                  ? ""
                  : ""
              )}
              style={{
                backgroundColor: testimonialIndex === currentIndex ? ac.primary : palette.textSecondary,
                opacity: testimonialIndex === currentIndex ? 1 : 0.55,
              }}
              aria-label={`Go to testimonial ${testimonialIndex + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="w-12 h-12 rounded-full border shadow-md flex items-center justify-center transition-colors cursor-pointer"
          style={{
            backgroundColor: cc.bg,
            borderColor: cc.border,
          }}
        >
          <ChevronRight className="w-6 h-6" style={{ color: palette.heading }} />
        </button>
      </div>
    </div>
  );
}
