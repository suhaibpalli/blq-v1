import { PROCESS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function ProcessSection() {
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto">
      <RevealOnScroll>
        <div className="mb-20">
          <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4 block">How We Work</span>
          <h2 className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-tight">A process built for <span className="text-accent-secondary">outcomes.</span></h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-border z-0"></div>
        
        {PROCESS.map((step, index) => (
          <RevealOnScroll key={step.id} delay={index * 0.1}>
            <div className="relative z-10 flex flex-col pt-4">
              <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center font-mono text-accent-primary text-sm font-bold mb-8 group overflow-hidden">
                <span className="relative z-10">{step.id}</span>
                <div className="absolute inset-0 bg-accent-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
