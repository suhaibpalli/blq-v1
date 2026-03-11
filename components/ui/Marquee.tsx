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
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
