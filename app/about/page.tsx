import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Marquee } from "@/components/ui/Marquee";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

const VALUES = [
  { num: "01", title: "Craft First", desc: "We obsess over details most overlook." },
  { num: "02", title: "Ship Fast", desc: "Speed without sloppiness. We move fast and fix things." },
  { num: "03", title: "Full Transparency", desc: "No surprises. You always know where your project stands." },
  { num: "04", title: "Long-term Thinking", desc: "We build for scale, not just for today." },
];

const STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "GCP", 
  "Figma", "Three.js", "PostgreSQL", "MongoDB", "Docker", "Kubernetes"
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-0 flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-[1440px] px-6 text-center mb-32">
        <RevealOnScroll>
          <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-8 block">Our Story</span>
          <h1 className="font-display font-extrabold text-[clamp(48px,8vw,120px)] leading-[1.1] tracking-tight text-gradient bg-clip-text text-transparent bg-linear-to-br from-text-primary to-text-secondary">
            Born in a lab.<br/>
            Built for the real world.
          </h1>
        </RevealOnScroll>
      </section>

      {/* Origin Story */}
      <section className="w-full px-6 max-w-[800px] mx-auto text-lg md:text-xl leading-relaxed text-text-secondary space-y-8 mb-32">
        <RevealOnScroll>
          <p>
            <strong className="text-text-primary">Black Quantum Labs</strong> began with a simple premise: the gap between exceptional design and world-class engineering is too wide. The industry separates the thinkers from the builders, the designers from the developers.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p>
            We bridge that gap. We are a collective of digital craftsmen — engineers who understand typography, and designers who understand system architecture. 
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p>
            Based in Chennai but working globally, we partner strictly with founders and established teams who view software not as a cost center, but as a competitive advantage. If you want something average, there are thousands of agencies who can help. If you want something extraordinary, welcome to the Lab.
          </p>
        </RevealOnScroll>
      </section>

      {/* Values */}
      <section className="w-full max-w-[1440px] px-6 mx-auto mb-32">
         <RevealOnScroll>
           <h2 className="font-display font-bold text-4xl mb-12 text-center">Core Principles</h2>
         </RevealOnScroll>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {VALUES.map((val, i) => (
             <RevealOnScroll key={val.num} delay={i * 0.1}>
               <Card className="h-full bg-bg-secondary hover:bg-bg-elevated transition-colors border-border">
                  <span className="text-accent-primary font-mono text-sm mb-6 block">{val.num}</span>
                  <h3 className="font-bold text-xl mb-3">{val.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
               </Card>
             </RevealOnScroll>
           ))}
         </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="w-full py-20 bg-bg-secondary border-y border-border overflow-hidden mb-32">
         <h2 className="text-center text-text-muted text-sm tracking-[0.15em] uppercase mb-12">Technologies We Leverage</h2>
         <Marquee direction="left" speed="normal">
           {STACK.map((tech, i) => (
             <span key={i} className="text-2xl md:text-4xl font-display font-bold text-text-primary/10 hover:text-text-primary/50 transition-colors mx-8 whitespace-nowrap">
               {tech}
             </span>
           ))}
         </Marquee>
         <Marquee direction="right" speed="slow" className="mt-8">
           {STACK.reverse().map((tech, i) => (
             <span key={i} className="text-2xl md:text-4xl font-display font-bold text-text-primary/10 hover:text-text-primary/50 transition-colors mx-8 whitespace-nowrap">
               {tech}
             </span>
           ))}
         </Marquee>
      </section>
      
    </main>
  );
}
