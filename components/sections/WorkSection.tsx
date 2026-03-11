"use client";

import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WorkSection() {
  return (
    <section
      className="py-40 px-6 md:px-10 max-w-[1440px] mx-auto border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Header */}
      <RevealOnScroll variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <p
              className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium"
              style={{ color: "var(--color-ink-3)" }}
            >
              Selected Work
            </p>
            <h2
              className="font-display font-black leading-none tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px,5.5vw,80px)", color: "var(--color-ink)" }}
            >
              Projects that
              <br />
              <span style={{ color: "var(--color-cyan)" }}>moved the needle.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold hover-line"
            style={{ color: "var(--color-ink-2)" }}
          >
            All Projects →
          </Link>
        </div>
      </RevealOnScroll>

      {/* Projects */}
      <div className="flex flex-col gap-8">
        {WORKS.slice(0, 3).map((work, index) => (
          <RevealOnScroll key={work.id} delay={index * 0.08} variant="fade-up">
            <Link href={`/work/${work.id}`} data-cursor="view" className="group block">
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  background: "var(--color-bg-2)",
                  border: "1px solid var(--color-border)",
                  aspectRatio: index === 0 ? "16/7" : "16/8",
                }}
                whileHover={{ borderColor: "var(--color-border-strong)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Image background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-radial-vignette opacity-60" />
                </div>

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] z-1"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-12"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "color-mix(in srgb, var(--color-bg) 88%, transparent)", backdropFilter: "blur(8px)" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] font-mono border"
                          style={{
                            borderColor: "var(--color-border-strong)",
                            color: "var(--color-ink-2)",
                            background: "var(--color-surface)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--color-ink-3)" }}
                    >
                      {work.year}
                    </span>
                  </div>

                  <div>
                    <p
                      className="text-xs tracking-[0.15em] uppercase mb-3 font-mono"
                      style={{ color: "var(--color-cyan)" }}
                    >
                      {work.type} · {work.client}
                    </p>
                    <h3
                      className="font-display font-black tracking-tight mb-3"
                      style={{
                        fontSize: "clamp(28px,4vw,56px)",
                        color: "var(--color-ink)",
                        lineHeight: 1,
                      }}
                    >
                      {work.title}
                    </h3>
                    <p className="text-base" style={{ color: "var(--color-ink-2)" }}>
                      {work.description}
                    </p>
                  </div>
                </motion.div>

                {/* Bottom label (visible when not hovering) */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-8 py-5 border-t"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg-2)" }}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {work.title}
                    </span>
                    <span
                      className="hidden sm:block text-sm"
                      style={{ color: "var(--color-ink-3)" }}
                    >
                      {work.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "var(--color-ink-3)" }}>
                    <span className="text-xs font-mono">{work.year}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    >
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
