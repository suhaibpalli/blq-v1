import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto">
      <RevealOnScroll>
        <div className="mb-16">
          <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4 block">Capabilities</span>
          <h2 className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-tight">Everything you need.<br/><span className="text-text-muted">Nothing you don&apos;t.</span></h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as any;
          
          return (
            <RevealOnScroll key={service.id} delay={index * 0.1}>
              <Card className="h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-glow rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent size={24} strokeWidth={1.5} />}
                    </div>
                    <span className="font-mono text-text-muted text-sm">{service.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>
                </div>

                <Link href={`/services#${service.id}`} className="text-accent-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto w-fit">
                  Learn more <span className="text-lg leading-none">&rarr;</span>
                </Link>
              </Card>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
