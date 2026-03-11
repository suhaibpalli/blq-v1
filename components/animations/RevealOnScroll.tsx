"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?:    number;
  duration?: number;
  variant?:  Variant;
  className?: string;
  amount?: number;
}

const VARIANTS: Record<Variant, { hidden: object; visible: object }> = {
  "fade-up":    { hidden: { y: 48, opacity: 0 },            visible: { y: 0, opacity: 1 } },
  "fade-in":    { hidden: { opacity: 0 },                   visible: { opacity: 1 } },
  "slide-left": { hidden: { x: 60, opacity: 0 },            visible: { x: 0, opacity: 1 } },
  "slide-right":{ hidden: { x: -60, opacity: 0 },           visible: { x: 0, opacity: 1 } },
  "scale":      { hidden: { scale: 0.92, opacity: 0 },      visible: { scale: 1, opacity: 1 } },
};

export default function RevealOnScroll({
  children,
  delay    = 0,
  duration = 0.8,
  variant  = "fade-up",
  className = "",
  amount   = 0.15,
}: RevealOnScrollProps) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, amount });
  const v       = VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden:  v.hidden,
        visible: {
          ...v.visible,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger children wrapper */
interface StaggerProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggerReveal({ children, stagger = 0.1, delay = 0, className = "" }: StaggerProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden:  { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
