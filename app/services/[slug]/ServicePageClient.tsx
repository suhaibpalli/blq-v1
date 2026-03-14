"use client";

import { SERVICE_FAQS, PRICING_TIERS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
            className="font-display font-black leading-[0.93] tracking-[-0.04em] text-ink mb-8"
            style={{ fontSize: "clamp(40px,8vw,96px)" }}
          >
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-ink-2 max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </RevealOnScroll>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-20 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealOnScroll variant="fade-up">
            <div className="aspect-video rounded-2xl bg-bg-2 border border-border flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-dim/20 to-purple-500/10" />
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
            <div className="space-y-8">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase mb-4 font-medium text-ink-3">
                  Overview
                </p>
                <p className="text-lg text-ink-2 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase mb-4 font-medium text-ink-3">
                  Investment
                </p>
                <div className="flex items-baseline gap-4">
                  <span className="font-display font-black text-5xl text-cyan">
                    ${service.pricing.min.toLocaleString()}
                  </span>
                  <span className="text-ink-3">
                    – ${service.pricing.max.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-ink-3 mt-2">
                  {service.pricing.unit === "project"
                    ? "Starting price"
                    : "Starting monthly"}{" "}
                  · Custom quotes available
                </p>
              </div>

              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-base bg-cyan text-bg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                  <LucideIcons.ArrowRight size={18} />
                </motion.span>
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(activeTab === "features"
              ? service.features
              : activeTab === "benefits"
                ? service.benefits
                : [
                    "Discovery & Requirements",
                    "Architecture Planning",
                    "Sprint-based Development",
                    "Regular Demos",
                    "Testing & QA",
                    "Deployment",
                  ]
            ).map((item, index) => (
              <RevealOnScroll key={item} delay={index * 0.05} variant="fade-up">
                <div className="p-6 rounded-xl bg-bg-2 border border-border hover:border-cyan/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-4">
                    <span className="font-mono text-sm font-bold text-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {item}
                  </h3>
                  <p className="text-sm text-ink-3">
                    {activeTab === "features" &&
                      "Core deliverable included in every project"}
                    {activeTab === "benefits" &&
                      "Business value you receive from our work"}
                    {activeTab === "process" &&
                      "Our proven methodology for success"}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-20 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.22em] uppercase mb-4 font-medium text-ink-3">
              Pricing Tiers
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-ink mb-4">
              Flexible Investment Options
            </h2>
            <p className="text-ink-2 max-w-xl mx-auto">
              Choose the tier that best fits your needs. All projects include
              our commitment to quality.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-[1200px] mx-auto">
          {PRICING_TIERS.map((tier: PricingTier, i: number) => {
            const isPopular = tier.popularFor?.some(
              (p: string) =>
                service.title
                  .toLowerCase()
                  .includes(p.toLowerCase().split(" ")[0]) ||
                p.toLowerCase().split(" ")[0] ===
                  service.title.toLowerCase().split(" ")[0],
            );

            return (
              <RevealOnScroll key={tier.tier} delay={i * 0.1} variant="fade-up">
                <div
                  className={cn(
                    "relative p-8 flex flex-col h-full transition-all duration-300",
                    tier.highlight || isPopular ? "bg-bg-3" : "bg-bg-2",
                  )}
                >
                  {(tier.highlight || isPopular) && (
                    <span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-cyan-dim text-cyan border border-cyan-glow">
                      {tier.highlight ? "Popular" : "Recommended"}
                    </span>
                  )}
                  <p className="text-sm font-bold mb-2 text-ink-3">
                    {tier.tier}
                  </p>
                  <p className="font-display font-black text-3xl mb-2 text-ink">
                    {tier.price}
                  </p>
                  <p className="text-sm text-ink-3 mb-6">{tier.sub}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.slice(0, 4).map((f: string) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-ink-2"
                      >
                        <LucideIcons.Check
                          size={14}
                          className="text-cyan mt-1 shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <motion.span
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 h-11 rounded-full font-bold text-sm border transition-all",
                        tier.highlight || isPopular
                          ? "bg-cyan text-bg border-transparent"
                          : "bg-transparent border-border-strong text-ink-2",
                      )}
                      whileHover={
                        tier.highlight || isPopular
                          ? { scale: 1.02 }
                          : {
                              borderColor: "var(--color-ink-2)",
                              color: "var(--color-ink)",
                            }
                      }
                      whileTap={{ scale: 0.97 }}
                    >
                      {tier.cta} →
                    </motion.span>
                  </Link>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

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
