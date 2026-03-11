"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById("scroll-progress");
    if (!el) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      el.style.width = `${progress * 100}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "1px",
        width: "0%",
        background: "var(--color-cyan)",
        zIndex: 1000,
        transition: "width 0.05s linear",
      }}
    />
  );
}
