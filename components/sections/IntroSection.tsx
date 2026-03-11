import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function IntroSection() {
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        
        {/* Left Column - Sticky */}
        <div className="lg:sticky lg:top-40 h-fit">
          <RevealOnScroll>
            <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-6 block">The Studio</span>
            <h2 className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-tight">
              We don&apos;t just<br/>
              build software.<br/>
              <span className="text-accent-primary text-opacity-80">We engineer leverage.</span>
            </h2>
          </RevealOnScroll>
        </div>

        {/* Right Column - Separator Line + Content */}
        <div className="relative pl-0 lg:pl-16 lg:border-l lg:border-border flex flex-col gap-24 font-body text-lg md:text-xl md:leading-relaxed text-text-secondary">
          <RevealOnScroll delay={0.1}>
            <div className="flex gap-6 items-start">
              <span className="text-accent-primary font-mono text-sm mt-1 shrink-0">01</span>
              <p>
                <strong className="text-text-primary">Black Quantum Labs</strong> is a full-spectrum digital engineering studio built for founders, startups, and companies that refuse to settle for average.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="flex gap-6 items-start">
              <span className="text-accent-primary font-mono text-sm mt-1 shrink-0">02</span>
              <p>
                We work at the intersection of design and engineering &mdash; shipping products that are as beautiful as they are performant.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="flex gap-6 items-start">
              <span className="text-accent-primary font-mono text-sm mt-1 shrink-0">03</span>
              <p>
                From a landing page to a distributed cloud system, we bring the same obsessive attention to detail to every engagement.
              </p>
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}
