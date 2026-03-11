"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section
      className="relative py-48 px-6 md:px-10 overflow-hidden border-t"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-2)" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "700px",
          height: "350px",
          background: "radial-gradient(ellipse, var(--color-cyan-glow) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16">
        
        {/* Left */}
        <div className="flex-1">
          <RevealOnScroll variant="fade-up">
            <p
              className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium"
              style={{ color: "var(--color-cyan)", opacity: 0.7 }}
            >
              Ready to build?
            </p>
            <h2
              className="font-display font-black leading-[0.95] tracking-[-0.04em]"
              style={{ fontSize: "clamp(48px,8vw,120px)", color: "var(--color-ink)" }}
            >
              Got a project
              <br />
              <span style={{ color: "var(--color-cyan)" }}>in mind?</span>
            </h2>
          </RevealOnScroll>
        </div>

        {/* Right */}
        <RevealOnScroll variant="slide-left" delay={0.2}>
          <div className="flex flex-col gap-8">
            <p
              className="text-lg leading-relaxed max-w-sm"
              style={{ color: "var(--color-ink-2)" }}
            >
              No pitch decks, no fluff — just a real conversation about what we can build together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-3 h-16 px-10 rounded-full font-bold text-base tracking-wide"
                  style={{ background: "var(--color-cyan)", color: "var(--color-bg)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </Link>
              <a href="mailto:hello@blackquantumlabs.io">
                <motion.span
                  className="inline-flex items-center gap-3 h-16 px-10 rounded-full font-medium text-base border tracking-wide"
                  style={{ borderColor: "var(--color-border-strong)", color: "var(--color-ink-2)" }}
                  whileHover={{ borderColor: "var(--color-ink-2)", color: "var(--color-ink)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  hello@blackquantumlabs.io
                </motion.span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
