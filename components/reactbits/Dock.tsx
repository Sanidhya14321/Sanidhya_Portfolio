"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DockProps {
  items: DockItem[];
  className?: string;
  activeColor?: string;
  showOnScroll?: boolean;
}

const Dock: React.FC<DockProps> = ({
  items,
  className = "",
  activeColor = "#818CF8",
  showOnScroll = true,
}) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!showOnScroll) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl border border-white/10 bg-black/40 shadow-2xl">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className="relative p-3 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: isActive ? `${activeColor}20` : "transparent",
                    }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className="transition-colors"
                      style={{
                        color: isActive ? activeColor : "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {item.icon}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeDock"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dock;
