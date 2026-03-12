export const SERVICES = [
  {
    id: "01",
    title: "Web Engineering",
    description:
      "We build full-stack web platforms, SaaS products, and high-performance marketing sites. From complex data dashboards to pixel-perfect landing pages — scalable, accessible, and fast.",
    icon: "Globe",
  },
  {
    id: "02",
    title: "Mobile Development",
    description:
      "Native-feel iOS and Android applications using React Native and Expo. We handle everything from architecture and auth to App Store deployment and post-launch iteration.",
    icon: "Smartphone",
  },
  {
    id: "03",
    title: "AI & Automation",
    description:
      "Custom LLM integrations, intelligent agents, RAG pipelines, and workflow automation. We make AI practical and production-ready — not just a demo.",
    icon: "Cpu",
  },
  {
    id: "04",
    title: "Cloud & DevOps",
    description:
      "AWS and GCP architecture, containerization, CI/CD pipelines, and infrastructure as code. We build systems that stay up, scale gracefully, and cost what they should.",
    icon: "Cloud",
  },
  {
    id: "05",
    title: "UI/UX Design",
    description:
      "Research-led design systems, interactive prototypes, and pixel-perfect Figma handoffs. We design products that feel intuitive on first use and age well over time.",
    icon: "PenTool",
  },
  {
    id: "06",
    title: "Tech Consulting",
    description:
      "Architecture reviews, technical due diligence, CTO advisory, and startup tech strategy. Honest, opinionated guidance from engineers who've built products at scale.",
    icon: "Lightbulb",
  },
];

export const WORKS = [
  {
    id: "nova-pay",
    title: "NovaPay",
    client: "NovaPay Inc.",
    type: "Web App",
    year: "2024",
    description:
      "A fintech payment infrastructure platform. Processed $2M in transactions on launch week with 99.99% uptime.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/images/work-novapay.png",
    gallery: [
      "/images/novapay-dashboard.png",
      "/images/novapay-mobile.png"
    ],
  },
  {
    id: "orbis-health",
    title: "Orbis Health",
    client: "Orbis Health",
    type: "Mobile App",
    year: "2024",
    description:
      "Patient management and telehealth mobile platform. 4.8★ App Store rating, 10K downloads in the first 30 days.",
    tags: ["React Native", "Firebase", "Twilio"],
    image: "/images/work-orbis.png",
    gallery: [
      "/images/orbis-dashboard.png",
      "/images/orbis-mobile.png"
    ],
  },
  {
    id: "synthex-ai",
    title: "Synthex AI",
    client: "Synthex AI",
    type: "AI Integration",
    year: "2024",
    description:
      "AI-powered content generation and brand voice platform. Reduced content creation time by 70% across 50+ brand clients.",
    tags: ["Python", "OpenAI API", "Next.js", "Redis"],
    image: "/images/work-synthex.png",
    gallery: [
      "/images/synthex-dashboard.png",
      "/images/synthex-editor.png"
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Black Quantum Labs didn't just build our product — they challenged every assumption and made it 10x better.",
    author: "Arjun Mehta",
    position: "Founder",
    company: "NovaPay",
  },
  {
    quote:
      "The attention to detail was unlike anything I've seen from any agency. Delivered on time, on budget, no excuses.",
    author: "Priya Iyer",
    position: "CTO",
    company: "Orbis Health",
  },
  {
    quote:
      "Fast, transparent, and genuinely talented. They feel like a permanent extension of our own team.",
    author: "David Kim",
    position: "CEO",
    company: "Synthex AI",
  },
];

export const PROCESS = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We learn your business, your users, and your goals deeply before writing a single line of code.",
  },
  {
    id: "02",
    title: "Architecture",
    description:
      "We map out the full system, tech stack, and delivery milestones with a written spec you approve.",
  },
  {
    id: "03",
    title: "Build",
    description:
      "Iterative 1-week sprints with live demos, async updates, and zero surprises.",
  },
  {
    id: "04",
    title: "Launch & Scale",
    description:
      "Deployment, monitoring, and ongoing support — we don't disappear after go-live.",
  },
];

export const NAV_LINKS = [
  { href: "/work",     label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];
