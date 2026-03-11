import { TESTIMONIALS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function TestimonialsSection() {
  return (
    <section
      className="py-40 px-6 md:px-10 max-w-[1440px] mx-auto border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <RevealOnScroll variant="fade-up">
        <p
          className="text-[11px] tracking-[0.22em] uppercase mb-20 font-medium"
          style={{ color: "var(--color-ink-3)" }}
        >
          Client Feedback
        </p>
      </RevealOnScroll>

      <div className="space-y-0">
        {TESTIMONIALS.map((t, index) => (
          <RevealOnScroll key={index} delay={index * 0.1} variant="fade-up">
            <div
              className="group grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end border-b py-14 transition-all duration-500"
              style={{
                borderColor: "var(--color-border)",
              }}
            >
              {/* Quote */}
              <div>
                {/* Open quote mark */}
                <p
                  className="font-display font-black text-7xl leading-none mb-4 select-none"
                  style={{ color: "var(--color-cyan)", opacity: 0.3 }}
                >
                  &quot;
                </p>
                <p
                  className="font-display font-bold leading-tight tracking-tight"
                  style={{
                    fontSize: "clamp(20px,3vw,36px)",
                    color: "var(--color-ink)",
                  }}
                >
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 lg:justify-end">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-sm shrink-0"
                  style={{
                    background: "var(--color-cyan-dim)",
                    color: "var(--color-cyan)",
                    border: "1px solid var(--color-cyan-glow)",
                  }}
                >
                  {t.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-ink-3)" }}
                  >
                    {t.position} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
