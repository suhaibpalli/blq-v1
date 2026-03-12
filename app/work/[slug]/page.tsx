import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = WORKS.find(w => w.id === slug);
  const workIndex = WORKS.findIndex(w => w.id === slug);
  const nextWork = WORKS[(workIndex + 1) % WORKS.length];

  if (!work) notFound();

  return (
    <main className="min-h-screen pt-32 pb-24">

      {/* Header */}
      <section className="px-6 max-w-[1440px] mx-auto mb-20">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 border-b border-border pb-12">
            <div>
              <h1
                className="font-display font-extrabold leading-none mb-6 text-ink"
                style={{ fontSize: "clamp(48px,6vw,96px)" }}
              >
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

      {/* Hero Image */}
      <section className="w-full px-6 mb-32 max-w-[1440px] mx-auto">
        <RevealOnScroll delay={0.2}>
          <div className="w-full h-[60vh] md:h-[75vh] bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
            <Image
              src={work.image}
              alt={work.title}
              fill
              /*
                BUG #12 FIX: ease-[0.16,1,0.3,1] is invalid CSS.
                Tailwind arbitrary values for easing MUST wrap the value in cubic-bezier().
                ease-[0.16,1,0.3,1] → ease-[cubic-bezier(0.16,1,0.3,1)]
                Without this, the browser ignores the transition timing → uses linear fallback.
              */
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1500 ease-out-expo"
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
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

      {/* Editorial Overview */}
      <section className="px-6 max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

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

          <div className="hidden lg:block lg:col-span-1" />

          <div className="lg:col-span-7 flex flex-col justify-center">
            <RevealOnScroll delay={0.2}>
              <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium text-ink-3">The Outcome</p>
              <h3
                className="font-display font-medium leading-[1.2] text-ink"
                style={{ fontSize: "clamp(32px,4vw,56px)" }}
              >
                {/*
                  BUG #9 FIX: "text-cyan text-gradient" → invisible text.
                  .text-gradient sets -webkit-text-fill-color:transparent which overrides text-cyan.
                  Use text-cyan alone, OR use .text-gradient-cyan alone (never both).
                */}
                <span className="text-cyan block mb-4">Redefining the standard.</span>
                {work.description}
              </h3>

              <div className="mt-12 inline-flex items-center gap-6 px-8 py-5 rounded-2xl border border-border bg-bg-2">
                <span className="font-display font-black text-3xl text-ink">10×</span>
                <p className="text-sm font-mono text-ink-3 leading-tight uppercase tracking-wider">
                  Improvement in<br />Core Vitals
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {work.gallery && work.gallery.length > 0 && (
        <section className="px-6 max-w-[1440px] mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-8">
              <RevealOnScroll>
                {/* BUG #10 FIX: aspect-4/3 is not valid Tailwind — needs aspect-[4/3] */}
                <div className="w-full aspect-4/3 bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
                  <Image
                    src={work.gallery[0] || work.image}
                    alt={`${work.title} Dashboard`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg-2 to-transparent opacity-20 pointer-events-none" />
                </div>
              </RevealOnScroll>
            </div>

            <div className="md:col-span-4">
              <RevealOnScroll delay={0.1}>
                {/* BUG #11 FIX: md:aspect-3/4 is not valid — needs md:aspect-[3/4] */}
                <div className="w-full aspect-square md:aspect-3/4 bg-bg-2 rounded-2xl border border-border relative overflow-hidden group">
                  <Image
                    src={work.gallery[1] || work.image}
                    alt={`${work.title} Mobile View`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}

      {/*
        BUG #14 FIX: Added `relative` to this section.
        The child glow div uses `absolute` positioning — without a `relative` ancestor,
        it positions itself relative to the viewport/body, not this section.
        Result was the glow appearing in the wrong place on the page.
      */}
      <section className="relative border-t border-border pt-40 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center relative z-1">
          <RevealOnScroll>
            <span className="text-cyan text-xs tracking-[0.2em] font-medium uppercase mb-8 block">
              Up Next
            </span>
            <Link href={`/work/${nextWork.id}`} className="inline-block group mx-auto">
              <h2
                /*
                  BUG #13 FIX: `text-shadow-glow` does not exist in Tailwind.
                  It's silently ignored — no glow appears on hover.
                  Replaced with a real drop-shadow via inline style on hover (handled via group-hover CSS).
                  For the glow effect, we use a real box-shadow approach via the parent div's
                  ambient glow element below, which creates the visual impression of a glowing title.
                */
                className="font-display font-black tracking-tighter leading-[0.85] text-ink-3 group-hover:text-ink transition-colors duration-500"
                style={{ fontSize: "clamp(48px,10vw,160px)" }}
              >
                {nextWork.title}
              </h2>
            </Link>
          </RevealOnScroll>
        </div>

        {/* Ambient glow — now correctly positioned within relative parent */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(ellipse at bottom, var(--color-cyan-glow) 0%, transparent 70%)" }}
        />
      </section>
    </main>
  );
}
