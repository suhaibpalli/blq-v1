import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:pointer-events-none tracking-wide";

  const variants = {
    primary:  "bg-(--color-cyan) text-bg font-bold hover:scale-[1.03] hover:shadow-[0_0_40px_var(--color-cyan-glow)] active:scale-[0.97]",
    secondary:"bg-(--color-surface) text-(--color-ink) border border-(--color-border-strong) hover:border-(--color-border-strong) hover:bg-(--color-bg-3)",
    outline:  "border border-(--color-cyan) text-(--color-cyan) hover:bg-(--color-cyan) hover:text-bg hover:shadow-[0_0_30px_var(--color-cyan-glow)] active:scale-[0.97]",
    ghost:    "text-(--color-ink-2) hover:text-(--color-ink)",
  };

  const sizes = {
    sm: "h-9 px-5 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
