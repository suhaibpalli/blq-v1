import { TESTIMONIALS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Card } from "@/components/ui/Card";

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto bg-bg-secondary mt-12 mb-12 rounded-3xl">
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4 block">Client Feedback</span>
          <h2 className="font-display font-bold text-[clamp(28px,4vw,56px)] leading-tight">Don&apos;t just take our word for it.</h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <RevealOnScroll key={index} delay={index * 0.1}>
            <Card className="h-full border-l-[3px] border-l-accent-primary bg-bg-primary">
              <div className="flex flex-col h-full justify-between gap-8">
                <p className="text-text-primary text-lg leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center font-display font-bold text-accent-primary text-xs">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary">{testimonial.author}</p>
                    <p className="text-xs text-text-secondary">{testimonial.position} @ {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
