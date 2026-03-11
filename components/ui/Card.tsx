import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function Card({ className, children, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-8 transition-all duration-400",
        glow && "hover:border-(--color-cyan) hover:shadow-[0_0_40px_var(--color-cyan-dim)]",
        className
      )}
      style={{
        background: "var(--color-bg-2)",
        borderColor: "var(--color-border)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
