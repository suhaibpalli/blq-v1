import { PROCESS } from "@/lib/constants";
import RevealOnScroll, { StaggerReveal, StaggerItem } from "@/components/animations/RevealOnScroll";

export default function ProcessSection() {
  return (
    <section
      className="py-40 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-border"
    >
      <RevealOnScroll variant="fade-up">
        <div className="mb-24">
          <p
            className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3"
          >
            How We Work
          </p>
          <h2
            className="font-display font-black leading-none tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(40px,5.5vw,80px)" }}
          >
            A process built
            <br />
            <span className="text-ink-3">for outcomes.</span>
          </h2>
        </div>
      </RevealOnScroll>

      <StaggerReveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {PROCESS.map((step, index) => (
          <StaggerItem key={step.id}>
            <div
              className="relative group border-t border-border-strong pt-10 pr-8"
            >
              {/* Active indicator on border */}
              <div
                className="absolute -top-px left-0 h-px w-0 group-hover:w-full transition-all duration-700 bg-cyan"
                style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              />

              <div className="flex items-center gap-4 mb-8">
                {/* Number circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 group-hover:border-cyan-400 border-border-strong text-ink-3 bg-surface"
                >
                  {step.id}
                </div>

                {/* Connector line (except last) */}
                {index < PROCESS.length - 1 && (
                  <div
                    className="hidden lg:block flex-1 h-px bg-border"
                  />
                )}
              </div>

              <h3
                className="font-display font-bold text-xl mb-4 transition-colors group-hover:text-ink text-ink-2"
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-ink-3"
              >
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
