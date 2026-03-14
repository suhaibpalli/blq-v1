"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import RevealOnScroll, {
  StaggerReveal,
  StaggerItem,
} from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-40 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-border">
      {/* Header */}
      <RevealOnScroll variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3">
              Capabilities
            </p>
            <h2
              className="font-display font-black leading-none tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(40px,5.5vw,80px)" }}
            >
              Everything you need.
              <br />
              <span className="text-ink-3">Nothing you don&apos;t.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold hover-line transition-colors text-cyan"
          >
            View all services →
          </Link>
        </div>
      </RevealOnScroll>

      {/* Service List */}
      <StaggerReveal stagger={0.07}>
        {SERVICES.map((service, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Icon = LucideIcons[
            service.icon as keyof typeof LucideIcons
          ] as any;
          const isHovered = hovered === service.id;

          return (
            <StaggerItem key={service.id}>
              <motion.div
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative border-b border-border flex items-start gap-8 py-8 transition-all duration-400 service-row ${isHovered ? "bg-bg-2" : "bg-transparent"}`}
                animate={{ paddingLeft: isHovered ? "16px" : "0px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number */}
                <span
                  className={`font-mono text-xs font-bold shrink-0 mt-1 w-10 transition-colors ${isHovered ? "text-cyan" : "text-ink-3"}`}
                >
                  {service.id}
                </span>

                {/* Icon */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isHovered ? "bg-cyan-dim text-cyan" : "bg-surface text-ink-3"}`}
                >
                  {Icon && <Icon size={18} strokeWidth={1.5} />}
                </div>

                {/* Title + Desc */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-display font-bold text-xl md:text-2xl mb-2 transition-colors ${isHovered ? "text-ink" : "text-ink-2"}`}
                  >
                    {service.title}
                  </h3>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 4, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-sm leading-relaxed overflow-hidden text-ink-2"
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 mt-1"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-cyan"
                  >
                    Explore
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.div>

                {/* Large background number on hover */}
                <motion.span
                  animate={{ opacity: isHovered ? 0.04 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 font-display font-black pointer-events-none select-none text-ink"
                  style={{ fontSize: "clamp(60px,10vw,120px)", lineHeight: 1 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </section>
  );
}
