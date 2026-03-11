"use client";

import { useState } from "react";
import { WORKS } from "@/lib/constants";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Web App", "Mobile App", "AI Integration", "Design"];

export default function WorkIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWorks = activeCategory === "All" 
    ? WORKS 
    : WORKS.filter(work => work.type === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-[1440px] mx-auto w-full">
      <RevealOnScroll>
        <div className="mb-20">
          <h1 className="font-display font-bold text-[clamp(48px,8vw,96px)] leading-tight mb-8">Work that speaks <span className="text-accent-secondary">for itself.</span></h1>
          
          <div className="flex flex-wrap gap-4 mt-8">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold border transition-all",
                  activeCategory === category 
                    ? "bg-text-primary text-bg-primary border-text-primary" 
                    : "border-border text-text-secondary hover:border-accent-primary hover:text-accent-primary"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {filteredWorks.map((work, index) => (
          <RevealOnScroll key={work.id} delay={Math.min(index * 0.1, 0.4)} className="break-inside-avoid">
            <Link href={`/work/${work.id}`} className="group block relative overflow-hidden rounded-xl bg-bg-secondary border border-border">
              <div className="aspect-4/5 md:aspect-square bg-bg-elevated relative w-full flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#00F5FF10] to-[#7B61FF10] opacity-50 z-0"></div>
                <p className="text-text-muted font-mono tracking-widest text-sm uppercase relative z-10">[{work.id} Preview Image]</p>
                
                {/* Image zoom effect on hover (simulated without actual image) */}
                <div className="absolute inset-0 bg-bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0">
                  <h3 className="font-display text-3xl font-bold mb-4">{work.title}</h3>
                  <p className="text-text-secondary mb-6">{work.description}</p>
                  <span className="text-accent-primary font-bold inline-flex items-center gap-2">View Project &rarr;</span>
                </div>
              </div>
              
              <div className="p-6 border-t border-border flex justify-between items-center group-hover:bg-bg-elevated transition-colors">
                <div>
                  <h3 className="font-bold text-lg">{work.title}</h3>
                  <p className="text-text-secondary text-sm">{work.client}</p>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-medium text-text-primary">{work.type}</span>
                  <span className="block text-xs font-mono text-text-muted mt-1">{work.year}</span>
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </main>
  );
}
