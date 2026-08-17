"use client";

import { motion } from "framer-motion";

export default function Badge({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-white/10 bg-white/[0.04] text-neutral-300 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
}
