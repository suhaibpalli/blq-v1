"use client";

import { SERVICES, PRICING_TIERS, SERVICE_FAQS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PricingSection from "@/components/sections/PricingSection";

const SERVICE_INDEX = SERVICES.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  shortTitle: s.shortTitle,
  icon: s.icon,
}));

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ paddingTop: "120px" }}>
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-32">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3">
            What We Do
          </p>
          <h1
            className="font-display font-black leading-[0.93] tracking-[-0.04em] text-ink"
            style={{ fontSize: "clamp(52px,9vw,120px)" }}
          >
            Capabilities &
            <br />
            <span className="text-cyan">Pricing.</span>
          </h1>
        </RevealOnScroll>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-20">
        <RevealOnScroll variant="fade-up" delay={0.1}>
          <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium text-ink-3">
            Quick Navigation
          </p>
          <div className="flex flex-wrap gap-3">
            {SERVICE_INDEX.map((service) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = LucideIcons[
                service.icon as unknown as keyof typeof LucideIcons
              ] as any;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-bg-2 border border-border hover:border-cyan transition-all duration-300"
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className="text-ink-3 group-hover:text-cyan transition-colors"
                    />
                  )}
                  <span className="text-sm font-medium text-ink-2 group-hover:text-ink transition-colors">
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </RevealOnScroll>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-24 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium text-ink-3">
            Our Expertise
          </p>
        </RevealOnScroll>

        {SERVICES.map((service, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Icon = LucideIcons[
            service.icon as keyof typeof LucideIcons
          ] as unknown as any;
          return (
            <RevealOnScroll
              key={service.id}
              delay={index * 0.05}
              variant="fade-up"
            >
              <Link
                href={`/services/${service.slug}`}
                id={service.slug}
                className="group border-b border-white/5 py-12 scroll-mt-32 grid grid-cols-1 lg:grid-cols-[100px_1fr_300px] gap-8 items-start transition-all duration-500 hover:bg-white/2"
              >
                <div className="flex items-center gap-6 lg:flex-col lg:items-start">
                  <span className="font-mono text-xs font-bold text-ink-3">
                    {service.id}
                  </span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-surface border border-border text-cyan group-hover:bg-cyan-dim transition-all duration-300">
                    {Icon && <Icon size={24} strokeWidth={1.5} />}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 transition-colors text-ink group-hover:text-cyan">
                    {service.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-ink-2 mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {service.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="text-xs px-4 py-1.5 rounded-full bg-surface border border-border text-ink-2"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-end justify-between h-full pt-2">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-ink-3 mb-2 font-bold">Starting Portfolio</p>
                    <p className="font-display font-black text-3xl text-ink">
                      ${service.pricing.min.toLocaleString()}—
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-3 text-sm font-bold text-cyan group-hover:translate-x-2 transition-transform">
                    Explore Details
                    <LucideIcons.ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          );
        })}
      </section>

      <PricingSection />

      <section className="px-6 md:px-10 max-w-[800px] mx-auto pb-40">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium text-ink-3">
            FAQ
          </p>
        </RevealOnScroll>

        {SERVICE_FAQS.map((faq, i) => (
          <RevealOnScroll key={i} delay={0.05} variant="fade-up">
            <div
              className="border-b border-border cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4 py-7">
                <h4
                  className={cn(
                    "font-display font-bold text-lg transition-colors",
                    openFaq === i ? "text-cyan" : "text-ink",
                  )}
                >
                  {faq.q}
                </h4>
                <motion.span
                  animate={{ rotate: openFaq === i ? 135 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-ink-3 shrink-0"
                >
                  <LucideIcons.Plus size={18} />
                </motion.span>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-base leading-relaxed pb-8 text-ink-2">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        ))}
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-40">
        <RevealOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3">
              Not Sure?
            </p>
            <h2
              className="font-display font-black leading-[0.95] tracking-[-0.03em] text-ink mb-6"
              style={{ fontSize: "clamp(32px,5vw,64px)" }}
            >
              Let&apos;s Find the Right Solution
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto mb-10">
              Book a free 30-minute discovery call. We&apos;ll understand your
              needs and recommend the best approach.
            </p>
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-base bg-cyan text-bg border border-transparent hover:scale-[1.02]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Call
                <LucideIcons.ArrowRight size={18} />
              </motion.span>
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </main>
  );
}
