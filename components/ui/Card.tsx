import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-secondary p-6 transition-all hover:border-accent-primary hover:shadow-[0_0_30px_var(--color-accent-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
