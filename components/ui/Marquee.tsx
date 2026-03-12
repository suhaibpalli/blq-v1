import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  direction?: "left" | "right";
}

export function Marquee({ children, className, duration = "40s", direction = "left" }: MarqueeProps) {
  const cls = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className={cn("overflow-hidden w-full marquee-mask", className)}>
      <div
        className={`marquee-track ${cls} flex items-center`}
        style={{ "--duration": duration } as React.CSSProperties}
      >
        {/*
          BUG #22 FIX: Previously rendered children ×4. This breaks the seamless loop.

          How the marquee animation works:
            - CSS: @keyframes marquee-left { from: translateX(0) → to: translateX(-50%) }
            - The track must be exactly 2× the visible width for translateX(-50%) to land
              precisely at the start of the second copy — creating a perfect seamless loop.

          With 4 copies: translateX(-50%) only moves halfway through the content.
          At the end of the animation it jumps back to 0, which is NOT aligned with
          the start of a copy → visible glitch/jump every loop.

          Fix: Render exactly 2 copies. translateX(-50%) = moves exactly one full copy width.
          When the animation resets to 0, the visible content is identical → seamless.
        */}
        {children}
        {children}
      </div>
    </div>
  );
}
