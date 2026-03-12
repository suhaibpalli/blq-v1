"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "view";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const state   = useRef<CursorState>("default");
  const pos     = useRef({ x: -100, y: -100 });
  const raf     = useRef<number>(0);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const target  = e.target as HTMLElement;
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

      dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;

      const lerpFactor = state.current === "view" ? 0.08 : 0.12;
      const offset     = state.current === "view" ? 32 : 20;
      const rx = pos.current.x - offset;
      const ry = pos.current.y - offset;
      const cx = parseFloat(ring.dataset.x || String(pos.current.x - 20));
      const cy = parseFloat(ring.dataset.y || String(pos.current.y - 20));
      const nx = cx + (rx - cx) * lerpFactor;
      const ny = cy + (ry - cy) * lerpFactor;
      ring.dataset.x = String(nx);
      ring.dataset.y = String(ny);
      ring.style.transform = `translate(${nx}px, ${ny}px)`;

      if (state.current === "view") {
        ring.style.width           = "64px";
        ring.style.height          = "64px";
        ring.style.backgroundColor = "var(--color-cyan)";
        ring.style.borderColor     = "transparent";
      } else if (state.current === "hover") {
        ring.style.width           = "48px";
        ring.style.height          = "48px";
        ring.style.backgroundColor = "var(--color-cyan-dim)";
        ring.style.borderColor     = "var(--color-cyan)";
      } else {
        ring.style.width           = "40px";
        ring.style.height          = "40px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor     = "var(--color-cyan-glow)";
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
      {/*
        BUGS #19 & #20 FIX: z-9997 is NOT in Tailwind's default z-index scale.
        Tailwind ships: z-0, z-10, z-20, z-30, z-40, z-50, z-auto.
        z-9997 as a className is silently ignored → cursor renders at z-index:auto
        and gets buried behind navbars, modals, and other positioned elements.

        Fix: Use inline style `zIndex` (a plain number) which always works.
        9997 puts cursor above grain overlay (9999) minus 2, but below page transitions (9998).
        Note: grain is z-index:9999 via CSS, so we set cursor at 9998 to stay below grain
        (grain is pointer-events:none so this doesn't affect interactivity).
      */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none bg-cyan"
        style={{
          zIndex: 9998,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none border flex items-center justify-center"
        style={{
          zIndex: 9998,
          width: "40px",
          height: "40px",
          borderColor: "var(--color-cyan-glow)",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s",
          willChange: "transform, width, height",
        }}
      >
        {label && (
          <span className="text-[9px] font-black tracking-[0.15em] uppercase text-bg select-none">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
