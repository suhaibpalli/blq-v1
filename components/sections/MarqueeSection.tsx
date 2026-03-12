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

  /*
    BUG #23 FIX (part 1): Previously used 4 copies: [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]
    The marquee-left animation uses translateX(-50%), which requires exactly 2 copies of the
    full content for a seamless loop. With 4 copies, the animation ends at -50% = middle of
    content, then jumps back to 0 = visible seam/glitch.

    Fix: Use exactly 2 copies by spreading ITEMS twice into the track.
    The CSS animation handles the seamless loop perfectly with this setup.
  */
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden py-3 marquee-mask w-full">
      <div
        className={`marquee-track ${cls}`}
        style={{ "--duration": speed } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-black whitespace-nowrap px-8 select-none"
            style={{
              fontSize: "clamp(28px,4vw,52px)",
              /*
                BUG #23 FIX (part 2): Previously used CSS variable references to border tokens:
                  - "var(--color-ink-3)"       ← correct (this is an ink/text token)
                  - "var(--color-border-strong)" ← WRONG: this is rgba(255,255,255,0.14) — border token
                  - "var(--color-border)"        ← WRONG: this is rgba(255,255,255,0.07) — border token

                Border tokens ARE valid rgba values, but using them for TEXT color creates
                extremely dim text. The intent is a "ghost" marquee effect with subtle opacity.
                Using the explicit rgba values makes the intent clear and avoids confusion.

                The 3-level opacity creates a visual depth effect (near/mid/far):
                  - Every 3rd item (i%3===0): slightly brighter
                  - Every 3rd+1 (i%3===1): mid dim
                  - Every 3rd+2 (i%3===2): most dim
              */
              color:
                i % 3 === 0
                  ? "rgba(238,238,255,0.12)"  /* bright ghost */
                  : i % 3 === 1
                  ? "rgba(238,238,255,0.07)"  /* mid ghost */
                  : "rgba(238,238,255,0.04)", /* dim ghost */
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
      className="relative overflow-hidden border-y py-6 w-full"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-2)" }}
    >
      <MarqueeRow direction="left"  speed="45s" />
      <MarqueeRow direction="right" speed="55s" />
    </section>
  );
}
