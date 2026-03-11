"use client";

import { motion } from "framer-motion";
import HeroCanvas from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  const headingText = "We Build What Others Can't Imagine.";
  const words = headingText.split(" ");

  return (
    <section className="relative w-full h-svh flex flex-col items-center justify-center overflow-hidden">
      <HeroCanvas />
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-text-secondary text-sm tracking-[0.15em] uppercase mb-8 flex items-center gap-4"
        >
          <span>EST. 2024</span>
          <span className="w-1 h-1 rounded-full bg-accent-primary"></span>
          <span>CHENNAI, INDIA</span>
        </motion.div>

        <h1 className="font-display font-extrabold text-[clamp(48px,8vw,120px)] leading-[1.1] tracking-[-0.03em] max-w-[1000px] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-text-secondary text-lg md:text-xl max-w-[600px] mb-12"
        >
          Full-spectrum digital engineering studio.<br/>
          From idea to infrastructure — we ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="primary" size="lg">Start a Project &rarr;</Button>
          <Button variant="outline" size="lg">See Our Work &darr;</Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-center text-text-muted text-sm z-10 font-mono tracking-widest"
      >
        <span>SCROLL TO EXPLORE &darr;</span>
        <span>v1.0 &mdash; 2024</span>
      </motion.div>
    </section>
  );
}
