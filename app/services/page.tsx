"use client";

import { SERVICES } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const PRICING = [
  {
    tier: "Starter",
    price: "₹50K – 80K",
    sub: "Ideal for landing pages & MVPs",
    features: ["Landing page (3–5 sections)", "CMS integration", "Responsive design", "SEO setup", "2 revision rounds"],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    tier: "Growth",
    price: "₹1.5L – 3L",
    sub: "Full-featured web or mobile product",
    features: ["Complete web or mobile app", "AI/automation features", "Custom integrations", "3 revision rounds", "Priority support"],
    cta: "Get a Quote",
    highlight: true,
  },
  {
    tier: "Enterprise",
    price: "₹5L+",
    sub: "End-to-end product with ongoing support",
    features: ["End-to-end product build", "Dedicated team", "Retainer model", "SLA guarantees", "Post-launch support"],
    cta: "Let's Talk",
    highlight: false,
  },
];

const FAQS = [
  { q: "How long does a typical project take?",         a: "Most web apps take 4–8 weeks. Landing pages take 1–2 weeks. We operate in focused 1-week sprints with weekly demos." },
  { q: "Do you offer post-launch support?",             a: "Yes. We offer ongoing maintenance and growth retainers starting at ₹25k/mo to keep your product performant and evolving." },
  { q: "What tech stack do you use?",                   a: "We standardize on Next.js, Node.js, and React Native. We choose proven tech for the backend (Postgres) and cutting-edge for the frontend." },
  { q: "Do you design the UI as well?",                 a: "Absolutely. We are design-first. Every project begins with a UX research and Figma design phase before a line of code is written." },
  { q: "Can you work with our existing codebase?",      a: "Yes. We frequently do audits, refactors, and feature additions on existing products. We'll assess it first and give you an honest evaluation." },
  { q: "How do engagements typically start?",           a: "We start with a 30-minute discovery call to understand your goals, then send a fixed-scope proposal within 48 hours. No retainers upfront." },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ paddingTop: "120px" }}>
      {/* Header */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-32">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium" style={{ color: "var(--color-ink-3)" }}>
            What We Do
          </p>
          <h1
            className="font-display font-black leading-[0.93] tracking-[-0.04em]"
            style={{ fontSize: "clamp(52px,9vw,120px)", color: "var(--color-ink)" }}
          >
            Capabilities &
            <br />
            <span style={{ color: "var(--color-cyan)" }}>Pricing.</span>
          </h1>
        </RevealOnScroll>
      </section>

      {/* Services */}
      <section
        className="px-6 md:px-10 max-w-[1440px] mx-auto py-24 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium" style={{ color: "var(--color-ink-3)" }}>
            Our Expertise
          </p>
        </RevealOnScroll>

        {SERVICES.map((service, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Icon = LucideIcons[service.icon as keyof typeof LucideIcons] as any;
          return (
            <RevealOnScroll key={service.id} delay={index * 0.07} variant="fade-up">
              <div
                id={service.id}
                className="group border-b py-12 scroll-mt-32 grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-8 items-start transition-all duration-300"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="font-mono text-xs font-bold" style={{ color: "var(--color-ink-3)" }}>
                    {service.id}
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-surface)", color: "var(--color-cyan)" }}
                  >
                    {Icon && <Icon size={18} strokeWidth={1.5} />}
                  </div>
                </div>

                <div>
                  <h3
                    className="font-display font-bold text-2xl md:text-3xl mb-4 transition-colors"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm font-mono" style={{ color: "var(--color-ink-3)" }}>
                  {["Strategy & Architecture", "Full-stack Implementation", "Performance Optimization", "Deployment & Monitoring"].map(item => (
                    <span key={item} className="flex items-center gap-2">
                      <span style={{ color: "var(--color-cyan)", opacity: 0.5 }}>→</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </section>

      {/* Pricing */}
      <section
        className="px-6 md:px-10 max-w-[1440px] mx-auto py-40 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <RevealOnScroll variant="fade-up">
          <div className="mb-20">
            <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium" style={{ color: "var(--color-ink-3)" }}>
              Investment
            </p>
            <h2
              className="font-display font-black leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px,6vw,88px)", color: "var(--color-ink)" }}
            >
              Transparent Pricing.
              <br />
              <span style={{ color: "var(--color-ink-3)" }}>No hidden fees.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-border)" }}>
          {PRICING.map((tier, i) => (
            <RevealOnScroll key={tier.tier} delay={i * 0.1} variant="fade-up">
              <div
                className="relative p-10 flex flex-col h-full transition-all duration-300"
                style={{
                  background: tier.highlight ? "var(--color-bg-3)" : "var(--color-bg-2)",
                  minHeight: "520px",
                }}
              >
                {tier.highlight && (
                  <span
                    className="absolute top-6 right-6 text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                    style={{ background: "var(--color-cyan-dim)", color: "var(--color-cyan)", border: "1px solid var(--color-cyan-glow)" }}
                  >
                    Most Popular
                  </span>
                )}
                <div className="mb-10">
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--color-ink-3)" }}>
                    {tier.tier}
                  </p>
                  <p
                    className="font-display font-black tracking-tight mb-2"
                    style={{ fontSize: "clamp(28px,3vw,44px)", color: "var(--color-ink)" }}
                  >
                    {tier.price}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-ink-3)" }}>{tier.sub}</p>
                </div>

                <ul className="space-y-4 flex-1 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-ink-2)" }}>
                      <LucideIcons.Check size={14} style={{ color: "var(--color-cyan)", marginTop: 3, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <motion.span
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 h-12 rounded-full font-bold text-sm border transition-all",
                      tier.highlight
                        ? "bg-(--color-cyan) text-bg border-transparent"
                        : "bg-transparent border-(--color-border-strong) text-(--color-ink-2)"
                    )}
                    whileHover={tier.highlight ? { scale: 1.02 } : { borderColor: "var(--color-ink-2)", color: "var(--color-ink)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tier.cta} →
                  </motion.span>
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 md:px-10 max-w-[800px] mx-auto pb-40"
      >
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium" style={{ color: "var(--color-ink-3)" }}>
            FAQ
          </p>
        </RevealOnScroll>

        {FAQS.map((faq, i) => (
          <RevealOnScroll key={i} delay={0.05} variant="fade-up">
            <div
              className="border-b cursor-pointer"
              style={{ borderColor: "var(--color-border)" }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4 py-7">
                <h4
                  className={cn("font-display font-bold text-lg transition-colors", openFaq === i ? "" : "")}
                  style={{ color: openFaq === i ? "var(--color-cyan)" : "var(--color-ink)" }}
                >
                  {faq.q}
                </h4>
                <motion.span
                  animate={{ rotate: openFaq === i ? 135 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: "var(--color-ink-3)", flexShrink: 0 }}
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
                    <p
                      className="text-base leading-relaxed pb-8"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        ))}
      </section>
    </main>
  );
}
