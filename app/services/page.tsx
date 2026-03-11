"use client";

import { SERVICES } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/Button";

const PRICING = [
  {
    tier: "STARTER",
    price: "₹50K–80K",
    features: ["Landing page", "3-5 sections", "CMS setup", "2 revisions"],
    cta: "Get Quote",
  },
  {
    tier: "GROWTH",
    price: "₹1.5L–3L",
    features: ["Full web app", "+ mobile app", "AI features", "3 revisions", "Priority support"],
    cta: "Get Quote",
    highlight: true,
  },
  {
    tier: "ENTERPRISE",
    price: "₹5L+",
    features: ["End-to-end product", "Retainer model", "Dedicated team", "SLA guarantees"],
    cta: "Let's Talk",
  },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Most web apps take 4-8 weeks. Landing pages take 1-2 weeks. We operate in fast, focused 1-week sprints." },
  { q: "Do you offer post-launch support?", a: "Yes, we offer ongoing maintenance and growth retainers starting at ₹25k/mo to ensure your digital asset stays performant." },
  { q: "What tech stack do you use?", a: "Standardized on Next.js, Node.js, and React Native. We choose boring tech for the backend (Postgres) and cutting-edge tech for the frontend." },
  { q: "Do you design the UI as well?", a: "Absolutely. We are a design-first engineering studio. Every project goes through a rigorous UX/UI phase before a line of code is written." },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-[1440px] mx-auto w-full">
      <RevealOnScroll>
        <div className="mb-24 text-center">
          <h1 className="font-display font-bold text-[clamp(48px,8vw,96px)] leading-tight mb-8">Capabilities & <span className="text-accent-primary">Pricing.</span></h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">We build elite software for founders who refuse to settle for average.</p>
        </div>
      </RevealOnScroll>

      {/* Services Deep Dive */}
      <section className="mb-32 max-w-[1000px] mx-auto space-y-8">
         <RevealOnScroll>
           <h2 className="text-2xl font-bold mb-12 border-b border-border pb-4">Our Expertise</h2>
         </RevealOnScroll>
         
         {SERVICES.map((service, index) => {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as any;
           return (
             <RevealOnScroll key={service.id} delay={index * 0.1}>
               <div id={service.id} className="p-8 bg-bg-secondary border border-border rounded-xl flex flex-col md:flex-row gap-8 items-start scroll-mt-32">
                 <div className="w-16 h-16 shrink-0 rounded-full bg-bg-elevated text-accent-primary flex items-center justify-center">
                   {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                   <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono text-text-muted">
                     <span>&rarr; Strategy & Architecture</span>
                     <span>&rarr; Full-stack Implementation</span>
                     <span>&rarr; Performance Tuning</span>
                     <span>&rarr; Deployment</span>
                   </div>
                 </div>
               </div>
             </RevealOnScroll>
           );
         })}
      </section>

      {/* Pricing Tiers */}
      <section className="mb-32">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-tight mb-4">Transparent Pricing.</h2>
            <p className="text-text-secondary text-lg">No hidden fees. Just world-class execution.</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {PRICING.map((tier, index) => (
            <RevealOnScroll key={tier.tier} delay={index * 0.1}>
              <div className={cn(
                "p-8 rounded-2xl border flex flex-col h-full",
                tier.highlight ? "bg-[radial-gradient(ellipse_at_top,var(--color-bg-elevated),var(--color-bg-secondary))] border-accent-primary shadow-[0_0_30px_var(--color-accent-glow)]" : "bg-bg-secondary border-border"
              )}>
                {tier.highlight && <span className="bg-accent-primary text-bg-primary text-xs font-bold px-3 py-1 rounded-full w-fit mb-6">MOST POPULAR</span>}
                <h3 className="text-xl font-bold mb-2">{tier.tier}</h3>
                <div className="text-4xl font-display font-bold mb-8">{tier.price}</div>
                
                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map(feat => (
                    <li key={feat} className="flex gap-3 text-text-secondary">
                      <LucideIcons.Check size={20} className="text-accent-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant={tier.highlight ? "primary" : "outline"} className="w-full">
                  {tier.cta} &rarr;
                </Button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[800px] mx-auto">
        <RevealOnScroll>
           <h2 className="font-display font-bold text-4xl mb-12 text-center">Frequently Asked Questions</h2>
        </RevealOnScroll>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <RevealOnScroll key={index} delay={0.1}>
              <div 
                className={cn(
                  "border rounded-xl p-6 cursor-pointer transition-all",
                  openFaq === index ? "border-accent-primary bg-bg-elevated" : "border-border bg-bg-secondary"
                )}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className={cn("font-bold text-lg", openFaq === index ? "text-accent-primary" : "text-text-primary")}>{faq.q}</h4>
                  <span className="text-text-muted shrink-0">
                    <LucideIcons.ChevronDown className={cn("transition-transform duration-300", openFaq === index ? "rotate-180" : "")} />
                  </span>
                </div>
                <div className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openFaq === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                )}>
                  <div className="overflow-hidden">
                    <p className="text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

    </main>
  );
}
