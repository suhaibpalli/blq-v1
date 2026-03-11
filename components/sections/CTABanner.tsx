import { Button } from "@/components/ui/Button";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-border mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-glow rounded-[100%] blur-[100px] pointer-events-none opacity-50 mix-blend-screen pulse-slow"></div>

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        <RevealOnScroll>
          <h2 className="font-display font-extrabold text-[clamp(40px,6vw,80px)] leading-tight mb-6">
            Got a project in mind?
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-[600px] mx-auto">
            Let&apos;s talk. No pitch decks, no fluff &mdash; just a real conversation about what we can build together.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="shadow-[0_0_30px_var(--color-accent-glow)]">
              Book a Free Discovery Call &rarr;
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
      
      {/* Quick infinite pulse animation for CTA background */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        .pulse-slow {
          animation: customPulse 8s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
