"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-ocean to-charcoal overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6"
      >
        <p className="text-gold uppercase tracking-[0.3em] text-sm font-semibold mb-3">
          {subtitle}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold">
          {title}
        </h1>
      </motion.div>
    </section>
  );
}
