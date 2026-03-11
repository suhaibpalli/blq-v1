import { Marquee } from "@/components/ui/Marquee";

export default function MarqueeSection() {
  const items = [
    "Web Development",
    "Mobile Apps",
    "AI Integration",
    "Cloud Architecture",
    "UI/UX Design",
    "API Engineering",
    "Tech Consulting"
  ];

  return (
    <section className="py-20 bg-bg-primary overflow-hidden border-y border-border transform -skew-y-1 my-12">
      <Marquee speed="slow" className="py-4">
        {items.map((item, i) => (
          <span key={i} className="text-4xl md:text-5xl font-display font-extrabold text-text-muted whitespace-nowrap mx-4">
            {item} &middot;
          </span>
        ))}
      </Marquee>
    </section>
  );
}
