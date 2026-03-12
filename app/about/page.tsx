import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Marquee } from "@/components/ui/Marquee";
import type { Metadata } from "next";
import Image from "next/image";
import AtomScene from "@/components/three/AtomScene";

export const metadata: Metadata = {
  title: "About",
  description: "Born in a lab. Built for the real world. The story behind Black Quantum Labs.",
};

const VALUES = [
  { num: "01", title: "Craft First",           desc: "We obsess over the 1% of details that 99% of studios overlook. Every interaction, every animation, every API response — it all matters." },
  { num: "02", title: "Ship Fast",              desc: "Speed without sloppiness. We move with urgency because your runway is real, without cutting corners that'll haunt you later." },
  { num: "03", title: "Full Transparency",       desc: "No status theatre. No spin. You always know exactly where your project stands — the good, the hard, and the plan." },
  { num: "04", title: "Long-term Thinking",      desc: "We build architecture that scales, code that's readable, and systems you'll be proud of in three years." },
];

import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython, SiGooglecloud,
  SiFigma, SiThreedotjs, SiPostgresql, SiMongodb, SiDocker, SiKubernetes,
  SiRedis, SiGraphql, SiTailwindcss, SiVercel, SiSupabase, SiPrisma, SiFramer,
  SiStripe, SiGo, SiWebgl, SiOpenai, SiAnthropic, SiLangchain
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const STACK = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "Go", icon: SiGo },
  { name: "AWS", icon: FaAws },
  { name: "GCP", icon: SiGooglecloud },
  { name: "Vercel", icon: SiVercel },
  { name: "OpenAI", icon: SiOpenai },
  { name: "Anthropic", icon: SiAnthropic },
  { name: "LangChain", icon: SiLangchain },
  { name: "Figma", icon: SiFigma },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "WebGL", icon: SiWebgl },
  { name: "Framer Motion", icon: SiFramer },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Supabase", icon: SiSupabase },
  { name: "Redis", icon: SiRedis },
  { name: "Prisma", icon: SiPrisma },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Stripe", icon: SiStripe },
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop: "120px" }}>
      {/* Hero */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-32">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium text-ink-3">
            Our Story
          </p>
          {/*
            BUG #15 FIX: h1 was missing its font-size style entirely.
            Without style={{ fontSize: "clamp(...)" }}, the heading renders at the browser's
            default h1 size (~32px) instead of the intended ~136px display size.
            The font-display + font-black classes alone do NOT set the size.
          */}
          <h1
            className="font-display font-black leading-none tracking-[-0.04em] max-w-5xl text-ink"
            style={{ fontSize: "clamp(52px, 9vw, 136px)" }}
          >
            Born in a lab.
            <br />
            <span className="text-cyan">Built for the</span>
            <br />
            real world.
          </h1>
        </RevealOnScroll>
      </section>

      {/* Hero Animation */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-40">
        <RevealOnScroll delay={0.2}>
          <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden border border-border bg-bg-2 flex items-center justify-center">
            <AtomScene />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
            
            <div className="absolute bottom-10 left-10 hidden md:block">
              <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase text-ink opacity-40">
                <span className="w-12 h-px bg-current" />
                Lab Environment v1.0
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Story */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-32 border-t border-border grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase font-medium text-ink-3">
            The Origin
          </p>
        </RevealOnScroll>

        <div className="space-y-10">
          {[
            <>
              <strong className="text-ink">Black Quantum Labs</strong> began with a simple premise: the gap between exceptional design and world-class engineering is too wide. The industry separates the thinkers from the builders.
            </>,
            "We bridge that gap. We are engineers who understand typography, and designers who understand distributed systems. That dual fluency isn't common — and it shows in every product we ship.",
            "Based in Chennai but working globally, we partner with founders and ambitious companies who view software as their primary competitive advantage. If you want something average, there are thousands of agencies who can help. If you want something extraordinary, welcome to the Lab.",
          ].map((text, i) => (
            <RevealOnScroll key={i} delay={i * 0.1} variant="fade-up">
              <p className="text-lg md:text-xl leading-[1.8] text-ink-2">{text}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto py-32 border-t border-border">
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium text-ink-3">
            Core Principles
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {VALUES.map((val, i) => (
            <RevealOnScroll key={val.num} delay={val.num === "01" ? 0 : i * 0.08} variant="fade-up">
              <div className="p-10 group transition-colors duration-300 bg-bg hover:bg-bg-2">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs font-bold mt-1 shrink-0 text-cyan">{val.num}</span>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-3 text-ink">{val.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-2">{val.desc}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-24 border-y border-border overflow-hidden bg-bg-2">
        <p className="text-center text-[11px] tracking-[0.22em] uppercase mb-12 font-medium text-ink-3">
          Technologies we leverage
        </p>
        <Marquee duration="35s" direction="left">
          {STACK.map((tech, i) => (
            <span
              key={i}
              className="font-display font-black whitespace-nowrap px-8"
              style={{
                fontSize: "clamp(24px,3.5vw,44px)",
                /*
                  BUGS #17 & #18 FIX:
                  `text-border-strong` and `text-border` are BORDER color tokens.
                  They are NOT registered as text color utilities in Tailwind.
                  Using them as className text colors silently fails — text renders
                  as the inherited color (likely --color-ink) instead of the dim effect.

                  Fix: Use inline style with the actual CSS variable values.
                */
                color: "var(--color-ink)",
                opacity: i % 2 === 0 ? 0.35 : 0.15,
                WebkitTextStroke: "1px rgba(var(--color-ink-rgb), 0.05)",
              }}
            >
              <tech.icon className="shrink-0" style={{ fontSize: "0.8em" }} />
              {tech.name} <span style={{ color: "var(--color-cyan)", opacity: 0.3, marginLeft: "1rem" }}>·</span>
            </span>
          ))}
        </Marquee>
        <Marquee duration="45s" direction="right" className="mt-4">
          {[...STACK].reverse().map((tech, i) => (
            <span
              key={i}
              className="font-display font-black whitespace-nowrap px-8 flex items-center gap-4"
              style={{
                fontSize: "clamp(20px,2.5vw,32px)",
                color: "var(--color-ink)",
                opacity: 0.2,
                WebkitTextStroke: "1px rgba(var(--color-ink-rgb), 0.05)",
              }}
            >
              <tech.icon className="shrink-0" style={{ fontSize: "0.8em" }} />
              {tech.name} <span style={{ color: "var(--color-cyan)", opacity: 0.2, marginLeft: "1rem" }}>·</span>
            </span>
          ))}
        </Marquee>
      </section>
    </main>
  );
}
