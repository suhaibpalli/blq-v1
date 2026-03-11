import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "fast" | "normal" | "slow";
  direction?: "left" | "right";
}

export function Marquee({
  children,
  className,
  speed = "normal",
  direction = "left",
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [--gap:2rem] group",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-(--gap)",
          "animate-marquee"
        )}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: speed === "fast" ? "20s" : speed === "slow" ? "60s" : "40s",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-(--gap)",
          "animate-marquee"
        )}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: speed === "fast" ? "20s" : speed === "slow" ? "60s" : "40s",
        }}
      >
        {children}
      </div>
    </div>
  );
}
