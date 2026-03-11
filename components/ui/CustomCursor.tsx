"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "view";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const state    = useRef<CursorState>("default");
  const pos      = useRef({ x: -100, y: -100 });
  const raf      = useRef<number>(0);
  const [label, setLabel] = useState("");

  useEffect(() => {
    // Hide on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isImage = target.closest("[data-cursor='view']");
      const isLink  = target.closest("a, button, [data-cursor='hover']");

      if (isImage) {
        state.current = "view";
        setLabel("VIEW");
      } else if (isLink) {
        state.current = "hover";
        setLabel("");
      } else {
        state.current = "default";
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) { raf.current = requestAnimationFrame(animate); return; }

      // Dot follows instantly
      dot.style.transform  = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;

      // Ring lerps behind
      const lerpFactor = state.current === "view" ? 0.08 : 0.12;
      const rx = pos.current.x - (state.current === "view" ? 32 : 20);
      const ry = pos.current.y - (state.current === "view" ? 32 : 20);
      
      // Direct lerp without using the ringPos ref incorrectly
      const currentX = parseFloat(ring.dataset.x || String(pos.current.x - 20));
      const currentY = parseFloat(ring.dataset.y || String(pos.current.y - 20));
      const newX = currentX + (rx - currentX) * lerpFactor;
      const newY = currentY + (ry - currentY) * lerpFactor;
      ring.dataset.x = String(newX);
      ring.dataset.y = String(newY);

      ring.style.transform = `translate(${newX}px, ${newY}px)`;

      if (state.current === "view") {
        ring.style.width  = "64px";
        ring.style.height = "64px";
        ring.style.backgroundColor = "var(--color-cyan)";
        ring.style.borderColor = "transparent";
      } else if (state.current === "hover") {
        ring.style.width  = "48px";
        ring.style.height = "48px";
        ring.style.backgroundColor = "var(--color-cyan-dim)";
        ring.style.borderColor = "var(--color-cyan)";
      } else {
        ring.style.width  = "40px";
        ring.style.height = "40px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "var(--color-cyan-glow)";
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-9997"
        style={{
          background: "var(--color-cyan)",
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9997 border flex items-center justify-center"
        style={{
          width: "40px",
          height: "40px",
          borderColor: "rgba(0,232,255,0.5)",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s",
          willChange: "transform, width, height",
        }}
      >
        {label && (
          <span className="text-[9px] font-black tracking-[0.15em] uppercase" style={{ color: "var(--color-bg)" }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
}
