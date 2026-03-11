"use client";

import { useState } from "react";
import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CATEGORIES = ["All", "Web App", "Mobile App", "AI Integration", "Design"];

export default function WorkIndexPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? WORKS : WORKS.filter(w => w.type === active);

  return (
    <main style={{ paddingTop: "120px" }}>
      {/* Header */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-20">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium" style={{ color: "var(--color-ink-3)" }}>
            Case Studies
          </p>
          <h1
            className="font-display font-black leading-[0.93] tracking-[-0.04em] mb-12"
            style={{ fontSize: "clamp(52px,9vw,120px)", color: "var(--color-ink)" }}
          >
            Work that speaks
            <br />
            <span style={{ color: "var(--color-cyan)" }}>for itself.</span>
          </h1>
        </RevealOnScroll>

        {/* Filter Pills */}
        <RevealOnScroll delay={0.1} variant="fade-up">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-300",
                  active === cat
                    ? "border-cyan text-cyan bg-cyan-dim"
                    : "border-border text-ink-2 hover:border-border-strong"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Grid */}
      <section
        className="px-6 md:px-10 max-w-[1440px] mx-auto pb-40 border-t pt-16"
        style={{ borderColor: "var(--color-border)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group",
                  i === 0 && filtered.length > 2 ? "md:col-span-2" : ""
                )}
              >
                <Link href={`/work/${work.id}`} data-cursor="view" className="block">
                  <div
                    className="relative overflow-hidden rounded-2xl border mb-5 transition-all duration-500 group-hover:border-border-strong"
                    style={{
                      background: "var(--color-bg-2)",
                      borderColor: "var(--color-border)",
                      aspectRatio: i === 0 && filtered.length > 2 ? "16/7" : "4/3",
                    }}
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                      <div className="absolute inset-0 bg-radial-vignette opacity-50" />
                    </div>
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-end p-8"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: "color-mix(in srgb, var(--color-bg) 85%, transparent)", backdropFilter: "blur(8px)" }}
                    >
                      <div>
                        <p className="text-sm font-bold mb-2" style={{ color: "var(--color-cyan)" }}>
                          View Case Study →
                        </p>
                        <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>{work.description}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Meta */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--color-ink)" }}>
                        {work.title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--color-ink-3)" }}>{work.client}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className="block text-xs font-mono px-3 py-1 rounded-full border"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-ink-2)" }}
                      >
                        {work.type}
                      </span>
                      <span className="block text-xs font-mono mt-2" style={{ color: "var(--color-ink-3)" }}>
                        {work.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
