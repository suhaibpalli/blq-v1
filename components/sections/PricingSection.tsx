"use client";

import { PRICING_TIERS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section className="relative py-40 px-6 md:px-10 overflow-hidden bg-bg-primary">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-2/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <RevealOnScroll variant="fade-up">
          <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-dim border border-cyan-glow text-[10px] font-black tracking-[0.2em] uppercase text-cyan mb-8">
              Investment Options
            </span>
            <h2 className="font-display font-black leading-[0.95] tracking-[-0.04em] text-ink mb-8" style={{ fontSize: "clamp(48px, 6vw, 96px)" }}>
              Transparent Pricing.<br />
              <span className="text-ink-3">Built for Scale.</span>
            </h2>
            <p className="text-large text-ink-2 max-w-2xl mx-auto leading-relaxed">
              No hidden fees or complex retainers. We offer clear, milestone-based pricing
              designed for startups and enterprises alike.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1240px] mx-auto">
          {PRICING_TIERS.map((tier, i) => (
            <RevealOnScroll key={tier.id} delay={i * 0.1} variant="fade-up">
              <div className={cn(
                "relative group flex flex-col h-full rounded-4xl p-10 transition-all duration-500",
                tier.highlight
                  ? "glass-premium border-cyan/30 scale-[1.02] z-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                  : "glass-panel hover:bg-white/5 border-border-strong z-10"
              )}>
                {/* Popular Badge (Von Restorff Effect) */}
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan text-bg text-[10px] font-black tracking-widest uppercase shadow-lg shadow-cyan/25">
                    Most Popular
                  </div>
                )}

                <div className="mb-10">
                  <h3 className={cn(
                    "font-display font-bold text-xl uppercase tracking-widest mb-4",
                    tier.highlight ? "text-cyan" : "text-ink-3"
                  )}>
                    {tier.tier}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-display font-black text-4xl lg:text-5xl text-ink">
                      {tier.price.split(' ')[0]}
                    </span>
                    <span className="text-ink-3 font-medium">
                      {tier.price.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-2">
                    {tier.sub}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-6 opacity-60">
                    What&apos;s Included
                  </p>
                  <ul className="space-y-5 mb-10">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-sm text-ink-2 group/item">
                        <div className={cn(
                          "mt-1 p-0.5 rounded-full",
                          tier.highlight ? "text-cyan" : "text-ink-3"
                        )}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="transition-colors group-hover/item:text-ink">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.popularFor && (
                    <div className="mb-10 p-4 rounded-2xl bg-white/3 border border-border">
                      <p className="text-[10px] font-bold text-ink-3 uppercase tracking-widest mb-3">
                        Ideal for:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tier.popularFor.map(service => (
                          <span key={service} className="text-[10px] px-2 py-1 rounded bg-surface text-ink-2">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/contact" className="mt-auto block">
                  <motion.div
                    className={cn(
                      "w-full h-14 rounded-full flex items-center justify-center gap-3 font-bold text-sm tracking-wide transition-all",
                      tier.highlight
                        ? "bg-cyan text-bg shadow-[0_10px_30px_-10px_rgba(0,245,255,0.4)]"
                        : "bg-surface text-ink border border-border-strong hover:border-ink-2"
                    )}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tier.cta}
                    <ArrowRight size={16} />
                  </motion.div>
                </Link>

                {/* Subtle outer glow for highlighted tier */}
                {tier.highlight && (
                  <div className="absolute inset-0 rounded-4xl bg-cyan/5 blur-3xl -z-10 animate-pulse" />
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll variant="fade-up" delay={0.4}>
          <div className="mt-24 text-center">
            <p className="text-sm text-ink-3 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span>Have a different scope?</span>
              <Link href="/contact" className="text-cyan font-bold hover:underline underline-offset-4 decoration-2">
                Custom quotes available within 24 hours →
              </Link>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
