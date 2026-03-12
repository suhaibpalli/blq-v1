import Link from "next/link";
import Logo from "@/components/ui/Logo";

const LINKS = {
  Studio: [
    { label: "Work",     href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About",    href: "/about" },
    { label: "Contact",  href: "/contact" },
  ],
  Services: [
    { label: "Web Engineering",   href: "/services#01" },
    { label: "Mobile Development",href: "/services#02" },
    { label: "AI & Automation",   href: "/services#03" },
    { label: "Cloud & DevOps",    href: "/services#04" },
    { label: "UI/UX Design",      href: "/services#05" },
    { label: "Tech Consulting",   href: "/services#06" },
  ],
  Connect: [
    { label: "LinkedIn",  href: "#" },
    { label: "GitHub",    href: "#" },
    { label: "Twitter/X", href: "#" },
    { label: "Dribbble",  href: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-0 border-t border-border bg-bg-2"
    >
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <Logo className="w-8 h-8 text-cyan transition-transform duration-500 group-hover:rotate-12" />
            <span
              className="font-display font-black text-[15px] tracking-[0.22em] uppercase text-ink"
            >
              Black<span className="text-cyan">Quantum</span>Labs
            </span>
          </Link>
          <p
            className="text-sm leading-relaxed max-w-[280px] mb-10 text-ink-2"
          >
            Full-spectrum digital engineering studio. Building the future,
            one system at a time.
          </p>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase mb-3 text-ink-3">
              Start a project
            </p>
            <a
              href="mailto:hello@blackquantumlabs.io"
              className="text-sm font-medium hover-line transition-colors text-cyan"
            >
              hello@blackquantumlabs.io
            </a>
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(LINKS).map(([group, links]) => (
          <div key={group}>
            <p
              className="text-[11px] tracking-[0.18em] uppercase mb-6 font-medium text-ink-3"
            >
              {group}
            </p>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover-line transition-colors duration-200 text-ink-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-border"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[12px] font-mono text-ink-3">
            © {year} Black Quantum Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[12px] font-mono text-ink-3">
              Global · Remote-first
            </p>
            <span
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-ink-3"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse bg-cyan"
              />
              AVAILABLE FOR PROJECTS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
