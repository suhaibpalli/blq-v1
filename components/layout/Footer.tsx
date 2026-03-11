export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-bg-secondary py-12">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-display font-bold text-2xl mb-4">Black Quantum Labs</h3>
          <p className="text-text-secondary">Building the future, one system at a time.</p>
        </div>
        <div className="flex flex-col md:items-end justify-center">
          <p className="text-text-secondary">hello@blackquantumlabs.io</p>
          <p className="text-text-secondary">Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}
