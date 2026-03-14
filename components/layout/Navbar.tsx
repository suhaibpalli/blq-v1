"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        /*
          BUG #21 FIX: When scrolled, the navbar had NO visual background or blur.
          The previous code only changed the border color (`border-border` vs `border-transparent`).
          Without a background, the navbar is completely transparent — all page content
          scrolls directly behind it with no separation.

          Fix: When scrolled, apply:
            - bg-bg/80        → semi-transparent dark background (80% opacity)
            - backdrop-blur-xl → frosted glass blur effect
            - border-b border-border → subtle separator line
          These together create the "glass navbar" effect seen on premium sites.
          
          Note: bg-bg/80 uses Tailwind's opacity modifier on a CSS variable color.
          This requires Tailwind v4's @theme inline tokens (which we have set up).
        */
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-3 group"
          >
            <Logo className="w-8 h-8 text-cyan transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display font-black text-[15px] tracking-[0.22em] uppercase text-ink">
              Black<span className="text-cyan">Quantum</span>Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-[13px] font-medium tracking-wide hover-line transition-colors duration-300",
                  pathname.startsWith(href)
                    ? "text-ink"
                    : "text-ink-2 hover:text-ink",
                )}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center gap-4 border-l border-border pl-8 ml-2">
              <ThemeToggle />
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-full border border-cyan text-cyan"
                  whileHover={{
                    backgroundColor: "var(--color-cyan)",
                    color: "var(--color-bg)",
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start a Project
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 flex flex-col gap-[5px] p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 6.5, backgroundColor: "var(--color-ink)" }
                  : { rotate: 0, y: 0, backgroundColor: "var(--color-ink)" }
              }
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] rounded-full origin-center"
            />
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] rounded-full bg-ink"
            />
            <motion.span
              animate={
                menuOpen
                  ? {
                      rotate: -45,
                      y: -6.5,
                      backgroundColor: "var(--color-ink)",
                    }
                  : { rotate: 0, y: 0, backgroundColor: "var(--color-ink)" }
              }
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] rounded-full origin-center"
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
            className="fixed inset-0 z-40 flex flex-col bg-bg-3"
          >
            <div className="flex flex-col justify-center h-full px-8 md:px-10 pt-24 pb-16 gap-2">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={href}
                    className={`block font-display font-black leading-none tracking-tight transition-colors duration-200 ${pathname.startsWith(href) ? "text-cyan" : "text-ink"}`}
                    style={{ fontSize: "clamp(40px,10vw,80px)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-cyan)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        pathname.startsWith(href)
                          ? "var(--color-cyan)"
                          : "var(--color-ink)")
                    }
                  >
                    {label}
                  </Link>
                  <div className="h-px mt-4 bg-border" />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-auto flex justify-between items-end"
              >
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-3">
                    Theme
                  </p>
                  <ThemeToggle />
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-[0.15em] uppercase mb-1 text-ink-3">
                    Email
                  </p>
                  <a
                    href="mailto:hello@blackquantumlabs.io"
                    className="text-sm text-ink-2"
                  >
                    hello@blackquantumlabs.io
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
