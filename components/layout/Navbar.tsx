import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-40 bg-bg-primary/50 backdrop-blur-md border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight">
          BQL
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/work" className="text-sm font-medium hover:text-accent-primary transition-colors">Work</Link>
          <Link href="/services" className="text-sm font-medium hover:text-accent-primary transition-colors">Services</Link>
          <Link href="/about" className="text-sm font-medium hover:text-accent-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-accent-primary transition-colors">Contact</Link>
          <Link 
            href="/contact" 
            className="px-5 py-2.5 rounded-full border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-primary text-sm font-bold transition-all"
          >
            Start Project &rarr;
          </Link>
        </nav>
      </div>
    </header>
  );
}
