import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Marquee } from "@/components/ui/Marquee";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Born in a lab. Built for the real world. The story behind Black Quantum Labs.",
};

const VALUES = [
  { num: "01", title: "Craft First",            desc: "We obsess over the 1% of details that 99% of studios overlook. Every interaction, every animation, every API response — it all matters." },
  { num: "02", title: "Ship Fast",               desc: "Speed without sloppiness. We move with urgency because your runway is real, without cutting corners that'll haunt you later." },
  { num: "03", title: "Full Transparency",        desc: "No status theatre. No spin. You always know exactly where your project stands — the good, the hard, and the plan." },
  { num: "04", title: "Long-term Thinking",       desc: "We build architecture that scales, code that's readable, and systems you'll be proud of in three years." },
];

const STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "GCP",
  "Figma", "Three.js", "PostgreSQL", "MongoDB", "Docker", "Kubernetes",
  "Redis", "GraphQL", "Tailwind",
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
          <h1
            className="font-display font-black leading-none tracking-[-0.04em] max-w-5xl text-ink"
          >
            Born in a lab.
            <br />
            <span className="text-cyan">Built for the</span>
            <br />
            real world.
          </h1>
        </RevealOnScroll>
      </section>

      {/* Hero Image Section */}
      <section className="px-6 md:px-10 max-w-[1440px] mx-auto pb-40">
        <RevealOnScroll delay={0.2}>
          <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden border border-border">
            <Image 
              src="/images/about-lab.png"
              alt="Black Quantum Labs Studio"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-radial-vignette opacity-60" />
            
            <div className="absolute bottom-10 left-10 hidden md:block">
              <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
                <span className="w-12 h-px bg-current" />
                Est. MMXXIV
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Story */}
      <section
        className="px-6 md:px-10 max-w-[1440px] mx-auto py-32 border-t grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 border-border"
      >
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
              <p className="text-lg md:text-xl leading-[1.8] text-ink-2">
                {text}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Values */}
      <section
        className="px-6 md:px-10 max-w-[1440px] mx-auto py-32 border-t border-border"
      >
        <RevealOnScroll variant="fade-up">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-16 font-medium text-ink-3">
            Core Principles
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {VALUES.map((val, i) => (
            <RevealOnScroll key={val.num} delay={val.num === "01" ? 0 : i * 0.08} variant="fade-up">
              <div
                className="p-10 group transition-colors duration-300 bg-bg hover:bg-bg-2"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs font-bold mt-1 shrink-0 text-cyan">
                    {val.num}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-3 text-ink">
                      {val.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-2">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section
        className="py-24 border-y overflow-hidden border-border bg-bg-2"
      >
        <p
          className="text-center text-[11px] tracking-[0.22em] uppercase mb-12 font-medium text-ink-3"
        >
          Technologies we leverage
        </p>
        <Marquee duration="35s" direction="left">
          {STACK.map((tech, i) => (
            <span
              key={i}
              className="font-display font-black whitespace-nowrap px-8"
              style={{
                fontSize: "clamp(24px,3.5vw,44px)",
                color: i % 2 === 0 ? "var(--color-border-strong)" : "var(--color-border)",
              }}
            >
              {tech} <span style={{ color: "var(--color-cyan)", opacity: 0.3 }}>·</span>
            </span>
          ))}
        </Marquee>
        <Marquee duration="45s" direction="right" className="mt-4">
          {[...STACK].reverse().map((tech, i) => (
            <span
              key={i}
              className="font-display font-black whitespace-nowrap px-8"
              style={{
                fontSize: "clamp(20px,2.5vw,32px)",
                color: "var(--color-border)",
              }}
            >
              {tech} <span style={{ color: "var(--color-cyan)", opacity: 0.2 }}>·</span>
            </span>
          ))}
        </Marquee>
      </section>
    </main>
  );
}
