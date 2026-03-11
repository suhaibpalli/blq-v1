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
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-border text-ink-2 text-sm font-mono bg-bg-2">
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

      {/* Hero Image */}
      <section className="w-full px-6 mb-32 max-w-[1440px] mx-auto">
        <RevealOnScroll delay={0.2}>
          <div className="w-full h-[60vh] bg-bg-3 rounded-2xl border border-border relative overflow-hidden">
             <Image
               src={work.image}
               alt={work.title}
               fill
               className="object-cover"
               priority
               sizes="100vw"
             />
             <div className="absolute inset-0 bg-radial-vignette opacity-70" />
          </div>
        </RevealOnScroll>
      </section>

      {/* Overview */}
      <section className="px-6 max-w-[1200px] mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <RevealOnScroll>
            <div>
              <h3 className="font-bold text-2xl mb-6 text-cyan">The Challenge</h3>
              <p className="text-ink-2 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div>
              <h3 className="font-bold text-2xl mb-6 text-accent-secondary">The Approach</h3>
              <p className="text-ink-2 leading-relaxed">
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div>
              <h3 className="font-bold text-2xl mb-6 text-ink">The Outcome</h3>
              <p className="text-ink-2 leading-relaxed font-bold">
                {work.description}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Process Shots (Mockups) */}
      <section className="px-6 max-w-[1440px] mx-auto mb-32 space-y-6">
         <RevealOnScroll>
            <div className="w-full aspect-video bg-bg-2 rounded-2xl border border-border relative overflow-hidden">
               <Image
                 src={work.image}
                 alt={`${work.title} Process 1`}
                 fill
                 className="object-cover opacity-80"
                 sizes="(max-width: 1440px) 100vw, 1440px"
               />
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-bg opacity-40" />
            </div>
         </RevealOnScroll>
         <RevealOnScroll>
            <div className="w-full aspect-video bg-bg-2 rounded-2xl border border-border relative overflow-hidden">
               <Image
                 src={work.image}
                 alt={`${work.title} Process 2`}
                 fill
                 className="object-cover opacity-80"
                 sizes="(max-width: 1440px) 100vw, 1440px"
               />
               <div className="absolute inset-0 bg-linear-to-b from-transparent to-bg opacity-40" />
            </div>
         </RevealOnScroll>
      </section>

      {/* Next Work Banner */}
      <section className="border-t border-border pt-32 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <RevealOnScroll>
            <span className="text-ink-2 text-xs tracking-[0.15em] uppercase mb-8 block">Next Case Study</span>
            <Link href={`/work/${nextWork.id}`} className="inline-block group">
              <h2 className="font-display font-extrabold text-[clamp(40px,8vw,120px)] leading-none text-ink-3 group-hover:text-ink transition-colors duration-500">
                {nextWork.title}
              </h2>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
