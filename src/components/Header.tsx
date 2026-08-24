export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="text-xl font-semibold tracking-tight">
        Chief<span className="text-gold">.</span>
      </div>
      <a
        href="#book-call"
        className="px-5 py-2.5 bg-gold text-navy font-medium text-sm rounded-lg hover:bg-gold-dim transition-colors"
      >
        Book a call
      </a>
    </header>
  );
}
