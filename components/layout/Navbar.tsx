"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/work",     label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const lastScrollY               = useRef(0);
  const pathname                  = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 300);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-(--color-border)"
            : "border-b border-transparent"
        )}
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          background: scrolled ? "rgba(3,3,10,0.85)" : "transparent",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group flex items-center gap-3">
            <span
              className="font-display font-black text-[15px] tracking-[0.22em] uppercase"
              style={{ color: "var(--color-ink)" }}
            >
              Black
              <span style={{ color: "var(--color-cyan)" }}>Quantum</span>
              Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-[13px] font-medium tracking-wide hover-line transition-colors duration-300",
                  pathname.startsWith(href)
                    ? "text-(--color-ink)"
                    : "text-(--color-ink-2) hover:text-(--color-ink)"
                )}
              >
                {label}
              </Link>
            ))}

            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: "var(--color-cyan)",
                  color: "var(--color-cyan)",
                }}
                whileHover={{
                  backgroundColor: "var(--color-cyan)",
                  color: "#03030A",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 flex flex-col gap-[5px] p-2 group"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] rounded-full origin-center"
              style={{ background: "var(--color-ink)" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] rounded-full"
              style={{ background: "var(--color-ink)" }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] rounded-full origin-center"
              style={{ background: "var(--color-ink)" }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "var(--color-bg-3)" }}
          >
            <div className="flex flex-col justify-center h-full px-10 pt-24 pb-16 gap-2">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    className="block font-display font-black text-[clamp(48px,10vw,80px)] leading-[1] tracking-tight transition-colors duration-200"
                    style={{ color: pathname.startsWith(href) ? "var(--color-cyan)" : "var(--color-ink)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-cyan)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = pathname.startsWith(href) ? "var(--color-cyan)" : "var(--color-ink)")}
                  >
                    {label}
                  </Link>
                  <div className="h-px mt-4" style={{ background: "var(--color-border)" }} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-auto flex justify-between items-end"
              >
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "var(--color-ink-3)" }}>Email</p>
                  <a href="mailto:hello@blackquantumlabs.io" className="text-sm" style={{ color: "var(--color-ink-2)" }}>
                    hello@blackquantumlabs.io
                  </a>
                </div>
                <p className="text-xs font-mono" style={{ color: "var(--color-ink-3)" }}>Chennai, India</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
