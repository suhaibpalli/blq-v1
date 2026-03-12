import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const work = WORKS.find(w => w.id === slug);
  const workIndex = WORKS.findIndex(w => w.id === slug);
  const nextWork = WORKS[(workIndex + 1) % WORKS.length];

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 max-w-[1440px] mx-auto mb-20">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 border-b border-border pb-12">
            <div>
              <h1 className="font-display font-extrabold text-[clamp(48px,6vw,96px)] leading-none mb-6 text-ink">
                {work.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {work.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-border-strong text-ink-2 text-sm font-mono glass-panel">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-16 text-sm font-mono">
              <div>
                <span className="block text-ink-3 mb-2 uppercase tracking-widest text-xs">Client</span>
                <span className="text-ink">{work.client}</span>
              </div>
              <div>
                <span className="block text-ink-3 mb-2 uppercase tracking-widest text-xs">Year</span>
                <span className="text-ink">{work.year}</span>
              </div>
              <div>
                <span className="block text-ink-3 mb-2 uppercase tracking-widest text-xs">Type</span>
                <span className="text-ink">{work.type}</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Hero Image (Parallax Placeholder logic) */}
      <section className="w-full px-6 mb-32 max-w-[1440px] mx-auto">
        <RevealOnScroll delay={0.2}>
          <div className="w-full h-[60vh] md:h-[75vh] bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
             {/* Note: Real Parallax requires a client component. 
                 We'll use standard high-res scaling on hover for a cinematic feel. */}
             <Image
               src={work.image}
               alt={work.title}
               fill
               className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
               priority
               unoptimized
               sizes="(max-width: 1440px) 100vw, 1440px"
             />
             <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
             {/* Subtle Grid overlay */}
             <div
               className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{
                 backgroundImage:
                   "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
                 backgroundSize: "60px 60px",
               }}
             />
          </div>
        </RevealOnScroll>
      </section>

      {/* Editorial Overview Section */}
      <section className="px-6 max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Challenge & Approach (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-16">
            <RevealOnScroll>
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-cyan">The Challenge</p>
                <p className="text-ink-2 leading-relaxed text-lg">
                  Before {work.title}, the industry standard relied on fragmented tools and excessive manual oversight, causing high error rates and sluggish execution speeds.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <div className="border-t border-border pt-8">
                <p className="text-[11px] tracking-[0.22em] uppercase mb-6 font-medium text-ink-3">The Approach</p>
                <p className="text-ink-2 leading-relaxed text-lg">
                  We engineered a central nervous system built on {work.tags[0]} and {work.tags[1]}. By flattening the architecture, we eliminated middlemen data hops and established a unified source of truth.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* The Outcome (Right Column - Large Typography) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <RevealOnScroll delay={0.2}>
               <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium text-ink-3">The Outcome</p>
               <h3 className="font-display font-medium leading-[1.2] text-[clamp(32px,4vw,56px)] text-ink">
                 <span className="text-cyan text-gradient block mb-4">Redefining the standard.</span>
                 {work.description}
               </h3>
               
               {/* Quick Metric highlight */}
               <div className="mt-12 inline-flex items-center gap-6 px-8 py-5 rounded-2xl border border-border bg-bg-2">
                 <span className="font-display font-black text-3xl text-ink">10x</span>
                 <p className="text-sm font-mono text-ink-3 leading-tight uppercase tracking-wider">Improvement in<br />Core Vitals</p>
               </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Bento / Asymmetrical Gallery Grid */}
      {work.gallery && work.gallery.length > 0 && (
        <section className="px-6 max-w-[1440px] mx-auto mb-40">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Image 1: Main Process Shot (Large) */}
              <div className="md:col-span-8">
                <RevealOnScroll>
                  <div className="w-full aspect-4/3 bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
                     <Image
                       src={work.gallery[0] || work.image}
                       alt={`${work.title} High-Fi Dashboard`}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                       sizes="(max-width: 1024px) 100vw, 66vw"
                       unoptimized
                     />
                     <div className="absolute inset-0 bg-linear-to-t from-bg-2 to-transparent opacity-20 pointer-events-none" />
                  </div>
                </RevealOnScroll>
              </div>

              {/* Image 2: Secondary Shot (Tall / Side Profile) */}
              <div className="md:col-span-4">
                <RevealOnScroll delay={0.1}>
                  <div className="w-full aspect-square md:aspect-3/4 bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
                     <Image
                       src={work.gallery[1] || work.image}
                       alt={`${work.title} Mobile View`}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                       sizes="(max-width: 1024px) 100vw, 33vw"
                       unoptimized
                     />
                  </div>
                </RevealOnScroll>
              </div>
           </div>
        </section>
      )}

      {/* Next Work Banner */}
      <section className="border-t border-border pt-40 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <RevealOnScroll>
            <span className="text-cyan text-xs tracking-[0.2em] font-medium uppercase mb-8 block drop-shadow-sm">Up Next</span>
            <Link href={`/work/${nextWork.id}`} className="inline-block group mx-auto">
              <h2 className="font-display font-black tracking-tighter text-[clamp(48px,10vw,160px)] leading-[0.85] text-ink opacity-40 group-hover:opacity-100 group-hover:text-shadow-glow transition-all duration-500">
                {nextWork.title}
              </h2>
            </Link>
          </RevealOnScroll>
        </div>
        
        {/* Subtle background glow for Next Work */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(ellipse at bottom, var(--color-cyan-glow) 0%, transparent 70%)" }}
        />
      </section>
    </main>
  );
}
