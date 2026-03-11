const ITEMS = [
  "Web Engineering", "Mobile Apps", "AI & Automation",
  "Cloud Architecture", "UI/UX Design", "API Engineering", "Tech Consulting",
];

function MarqueeRow({
  direction = "left",
  speed = "40s",
}: {
  direction?: "left" | "right";
  speed?: string;
}) {
  const cls = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`marquee-track ${cls}`}
        style={{ "--duration": speed } as React.CSSProperties}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="font-display font-black whitespace-nowrap px-8 select-none"
            style={{
              fontSize: "clamp(28px,4vw,52px)",
              color: i % 3 === 0 ? "var(--color-ink-3)" : i % 3 === 1 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
            }}
          >
            {item}
            <span
              className="mx-6 inline-block align-middle w-2 h-2 rounded-full"
              style={{ background: "var(--color-cyan)", opacity: 0.4 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section
      className="relative overflow-hidden border-y py-6"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-2)" }}
    >
      <MarqueeRow direction="left"  speed="45s" />
      <MarqueeRow direction="right" speed="55s" />
    </section>
  );
}
