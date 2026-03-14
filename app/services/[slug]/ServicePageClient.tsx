"use client";

import { SERVICE_FAQS, PRICING_TIERS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PricingSection from "@/components/sections/PricingSection";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  pricing: { min: number; max: number; unit: string };
}

interface PricingTier {
  id: string;
  tier: string;
  price: string;
  priceRaw: { min: number; max: number | null };
  sub: string;
  features: string[];
  cta: string;
  highlight: boolean;
  popularFor?: string[];
}

interface Faq {
  q: string;
  a: string;
}

interface ServicePageClientProps {
  service: Service;
  relatedServices: Service[];
}

export default function ServicePageClient({
  service,
  relatedServices,
}: ServicePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "features" | "benefits" | "process"
  >("features");

  const ServiceIcon = LucideIcons[
    service.icon as keyof typeof LucideIcons
  ] as LucideIcon;

  return (
    <main style={{ paddingTop: "120px" }}>
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-20">
        <RevealOnScroll variant="fade-up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-ink-3 hover:text-cyan transition-colors mb-8"
          >
            <LucideIcons.ArrowLeft size={16} />
            All Services
          </Link>
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3">
            {service.id} — {service.shortTitle}
          </p>
          <h1
            className="font-display font-black leading-[0.93] tracking-[-0.04em] text-ink mb-10"
            style={{ fontSize: "clamp(40px,8.5vw,110px)" }}
          >
            {service.title.split(' ').map((word, i) => (
              <span key={i} className={i === service.title.split(' ').length - 1 ? "text-gradient-hero" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-ink-2 max-w-2xl leading-relaxed font-medium">
            {service.description}
          </p>
        </RevealOnScroll>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-20 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealOnScroll variant="fade-up">
            <div className="aspect-video rounded-2xl bg-bg-2 border border-border flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-dim/20 to-purple-500/10" />
              <div className="w-20 h-20 rounded-2xl bg-cyan-dim flex items-center justify-center">
                {ServiceIcon && (
                  <ServiceIcon
                    size={40}
                    className="text-cyan"
                    strokeWidth={1}
                  />
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up" delay={0.1}>
            <div className="space-y-10">
              <div className="p-8 rounded-3xl glass-panel border-white/5">
                <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-bold text-cyan">
                  Mission Overview
                </p>
                <p className="text-lg text-ink-2 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl glass-panel border-white/5">
                  <p className="text-[10px] tracking-widest uppercase mb-4 font-bold text-ink-3">
                    Est. Timeline
                  </p>
                  <p className="text-2xl font-display font-bold text-ink">
                    4–12 Weeks
                  </p>
                </div>
                <div className="p-8 rounded-3xl glass-panel border-white/5">
                  <p className="text-[10px] tracking-widest uppercase mb-4 font-bold text-ink-3">
                    Deliverables
                  </p>
                  <p className="text-2xl font-display font-bold text-ink">
                    {service.features.length}+ Items
                  </p>
                </div>
              </div>

              <Link href="/contact" className="block">
                <motion.div
                  className="w-full inline-flex items-center justify-center gap-3 h-16 rounded-full font-bold text-lg bg-cyan text-bg shadow-xl shadow-cyan/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Initiate Project
                  <LucideIcons.ArrowRight size={20} />
                </motion.div>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-20 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase mb-4 font-medium text-ink-3">
                What&apos;s Included
              </p>
              <h2 className="font-display font-black text-4xl md:text-5xl text-ink">
                Everything you need
              </h2>
            </div>

            <div className="flex gap-2 bg-bg-2 p-1 rounded-full">
              {(["features", "benefits", "process"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                    activeTab === tab
                      ? "bg-cyan text-bg"
                      : "text-ink-2 hover:text-ink",
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(activeTab === "features"
              ? service.features
              : activeTab === "benefits"
                ? service.benefits
                : [
                    "Discovery & Deep Strategy",
                    "Advanced System Design",
                    "Agile 1-Week Build Sprints",
                    "Bi-Weekly Progress Demos",
                    "Stress-Testing & Security QA",
                    "Seamless Production Launch",
                  ]
            ).map((item, index) => (
              <RevealOnScroll key={item} delay={index * 0.05} variant="fade-up">
                <div className="p-8 rounded-3xl glass-panel border-white/5 hover:border-cyan/30 transition-all duration-500 group/feature">
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 group-hover/feature:bg-cyan-dim transition-colors">
                    <span className="font-mono text-sm font-bold text-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-3 group-hover/feature:text-cyan transition-colors">
                    {item}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-3">
                    {activeTab === "features" &&
                      "A core pillar of our delivery excellence, included as standard."}
                    {activeTab === "benefits" &&
                      "Measurable business impact and strategic advantage for your firm."}
                    {activeTab === "process" &&
                      "Our battle-tested methodology for engineering at speed."}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <PricingSection />

      <section className="px-6 md:px-10 max-w-[800px] mx-auto py-20 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-12 font-medium text-ink-3 text-center">
            Frequently Asked Questions
          </p>
        </RevealOnScroll>

        {SERVICE_FAQS.slice(0, 5).map((faq: Faq, i: number) => (
          <RevealOnScroll key={i} delay={0.05} variant="fade-up">
            <div
              className="border-b border-border cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4 py-6">
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
                    <p className="text-base leading-relaxed pb-6 text-ink-2">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        ))}
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-20 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium text-ink-3">
            Related Services
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((related, index) => {
            const RelatedIcon = LucideIcons[
              related.icon as keyof typeof LucideIcons
            ] as LucideIcon;
            return (
              <RevealOnScroll
                key={related.slug}
                delay={index * 0.1}
                variant="fade-up"
              >
                <Link
                  href={`/services/${related.slug}`}
                  className="group block p-8 rounded-2xl bg-bg-2 border border-border hover:border-cyan transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-6 group-hover:bg-cyan-dim transition-colors">
                    {RelatedIcon && (
                      <RelatedIcon size={24} className="text-cyan" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-3 group-hover:text-cyan transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-ink-2 mb-4 line-clamp-2">
                    {related.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-cyan">
                    Learn more
                    <LucideIcons.ArrowRight size={14} />
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-32">
        <RevealOnScroll variant="fade-up">
          <div className="text-center">
            <h2 className="font-display font-black text-4xl md:text-6xl text-ink mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-ink-2 mb-10 max-w-xl mx-auto">
              Let&apos;s discuss your project and find the best solution for
              your needs.
            </p>
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center justify-center gap-2 h-16 px-10 rounded-full font-bold text-lg bg-cyan text-bg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
                <LucideIcons.ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </main>
  );
}
