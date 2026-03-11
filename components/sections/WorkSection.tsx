import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import Image from "next/image";

export default function WorkSection() {
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto border-t border-border">
      <RevealOnScroll>
        <div className="mb-20">
          <span className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4 block">Selected Work</span>
          <h2 className="font-display font-bold text-[clamp(36px,5vw,72px)] leading-tight">Projects that <span className="text-accent-primary">moved the needle.</span></h2>
        </div>
      </RevealOnScroll>

      <div className="flex flex-col gap-24">
        {WORKS.slice(0, 3).map((work, index) => {
          const isEven = index % 2 === 0;

          return (
            <RevealOnScroll key={work.id}>
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}>
                
                {/* Image side */}
                <div className="w-full lg:w-[60%] overflow-hidden rounded-xl border border-border relative aspect-4/3 bg-bg-elevated">
                  {/* Since image placeholders are missing, creating a gradient placeholder */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#00F5FF10] to-[#7B61FF10] opacity-50 z-0"></div>
                  <div className="w-full h-full p-8 relative z-10 flex items-center justify-center">
                     <p className="text-text-muted font-mono tracking-widest text-sm uppercase">[{work.id} Preview Image]</p>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm">
                    <Link href={`/work/${work.id}`} className="px-8 py-4 rounded-full border border-accent-primary bg-bg-primary text-text-primary text-sm font-bold tracking-widest uppercase hover:bg-accent-primary hover:text-bg-primary transition-all">
                      View Case Study &rarr;
                    </Link>
                  </div>
                </div>

                {/* Content side */}
                <div className="w-full lg:w-[40%] flex flex-col items-start">
                  <h3 className="font-display text-4xl font-bold mb-6">{work.title}</h3>
                  
                  <div className="flex flex-col gap-4 text-text-secondary mb-8 w-full">
                    <div className="flex justify-between border-b border-border pb-2">
                       <span className="text-xs uppercase tracking-widest">Client</span>
                       <span className="text-text-primary font-medium text-sm">{work.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                       <span className="text-xs uppercase tracking-widest">Type</span>
                       <span className="text-text-primary font-medium text-sm">{work.type}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                       <span className="text-xs uppercase tracking-widest">Year</span>
                       <span className="text-text-primary font-medium text-sm">{work.year}</span>
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-text-secondary mb-8">
                    {work.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {work.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-bg-elevated border border-border rounded-full text-xs text-text-secondary whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          );
        })}
      </div>
      
      <RevealOnScroll delay={0.2} className="mt-24 flex justify-center">
        <Link href="/work" className="text-accent-primary hover:text-white transition-colors text-lg font-bold flex items-center gap-3 group">
          View All Projects <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
        </Link>
      </RevealOnScroll>

    </section>
  );
}
