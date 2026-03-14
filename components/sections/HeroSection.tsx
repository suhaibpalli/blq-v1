"use client";

import { motion } from "framer-motion";
import HeroCanvas from "@/components/three/HeroCanvas";
import Link from "next/link";

const STATS = [
  { value: "48h",  label: "Average response" },
  { value: "100%", label: "Project delivery" },
  { value: "3×",   label: "Client retention" },
];

export default function HeroSection() {
  const words = ["We", "Build", "What", "Others", "Can't", "Imagine."];

  return (
    <section className="relative w-full min-h-svh flex flex-col justify-end overflow-hidden pb-0">
      {/* Three.js canvas — sits at z-0 (default stacking, behind everything) */}
      <HeroCanvas />

      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 90%, var(--color-cyan-glow) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 10%, var(--color-accent-2) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-2 w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-36 pb-0 flex flex-col">
        
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-medium text-ink-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan" />
            Digital Engineering Studio
          </span>
          <span className="h-px w-12 bg-border-strong" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-ink-3">
            Chennai, India
          </span>
        </motion.div>

        {/* Headline — word-by-word clip reveal */}
        <h1 className="font-display font-black leading-[0.93] tracking-[-0.04em] mb-16 overflow-hidden">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.3 + i * 0.085,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block mr-[0.2em] ${
                i === words.length - 1 ? "text-gradient-hero" : "text-ink"
              }`}
              style={{ fontSize: "clamp(52px, 9.5vw, 140px)" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-border flex flex-col md:flex-row md:items-end gap-10 pt-8 pb-12"
        >
          <div className="flex-1 max-w-md">
            <p className="text-base md:text-lg leading-relaxed text-ink-2">
              From pixel-perfect interfaces to distributed cloud systems —
              we ship products that move the needle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-3 h-14 px-8 rounded-full font-bold text-sm tracking-wide bg-cyan text-bg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </Link>
            <Link href="/work">
              <motion.span
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full font-medium text-sm border tracking-wide border-border-strong text-ink-2 bg-white/5 backdrop-blur-sm"
                whileHover={{ borderColor: "var(--color-cyan)", color: "var(--color-ink)", scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Case Studies
              </motion.span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-10 pl-10 border-l border-border mt-8 md:mt-0">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-black text-3xl tracking-tight text-ink">{value}</p>
                <p className="text-xs mt-0.5 tracking-wide text-ink-3">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-10 z-2 hidden md:flex flex-col items-center gap-3"
      >
        <div
          className="w-px h-16 origin-top"
          style={{ background: "linear-gradient(to bottom, var(--color-border-strong), transparent)" }}
        />
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-mono text-ink-3"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
