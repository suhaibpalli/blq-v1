import RevealOnScroll from "@/components/animations/RevealOnScroll";

const PARAGRAPHS = [
  {
    num: "01",
    text: "Black Quantum Labs is a full-spectrum digital engineering studio built for founders, startups, and companies that refuse to settle for average.",
  },
  {
    num: "02",
    text: "We work at the intersection of design and engineering — shipping products that are as beautiful as they are performant. Every pixel is intentional. Every system is built to last.",
  },
  {
    num: "03",
    text: "From a landing page to a distributed cloud system, we bring the same obsessive attention to detail to every engagement. If you want something extraordinary, welcome to the Lab.",
  },
];

export default function IntroSection() {
  return (
    <section className="py-40 px-6 md:px-10 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32">
        
        {/* Left — sticky */}
        <div className="lg:sticky lg:top-36 h-fit">
          <RevealOnScroll variant="fade-up">
            <p
              className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium"
              style={{ color: "var(--color-ink-3)" }}
            >
              The Studio
            </p>
            <h2
              className="font-display font-black leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px,5.5vw,80px)", color: "var(--color-ink)" }}
            >
              We don&apos;t just
              <br />build software.
              <br />
              <span style={{ color: "var(--color-cyan)" }}>
                We engineer
                <br />leverage.
              </span>
            </h2>
          </RevealOnScroll>
        </div>

        {/* Right — scrollable with separator */}
        <div
          className="flex flex-col gap-16 lg:pl-16 lg:border-l"
          style={{ borderColor: "var(--color-border)" }}
        >
          {PARAGRAPHS.map(({ num, text }, i) => (
            <RevealOnScroll key={num} delay={i * 0.12} variant="fade-up">
              <div className="flex gap-8">
                <span
                  className="font-mono text-xs shrink-0 mt-[6px] font-bold tracking-widest"
                  style={{ color: "var(--color-cyan)" }}
                >
                  {num}
                </span>
                <p
                  className="text-lg md:text-xl leading-[1.75]"
                  style={{ color: "var(--color-ink-2)" }}
                >
                  {text}
                </p>
              </div>
            </RevealOnScroll>
          ))}

          {/* Quick metrics */}
          <RevealOnScroll delay={0.36} variant="fade-up">
            <div
              className="grid grid-cols-3 gap-px border rounded-2xl overflow-hidden mt-6"
              style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}
            >
              {[
                { v: "15+", l: "Projects Shipped" },
                { v: "8+",  l: "Industries Served" },
                { v: "3",   l: "Core Disciplines" },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="px-6 py-8"
                  style={{ background: "var(--color-bg-2)" }}
                >
                  <p
                    className="font-display font-black text-4xl tracking-tight mb-2"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {v}
                  </p>
                  <p className="text-xs tracking-wide" style={{ color: "var(--color-ink-3)" }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
