export function FooterCTA() {
  return (
    <section
      id="book-call"
      className="relative z-10 py-20 sm:py-28 px-6"
    >
      <div
        className="max-w-2xl mx-auto text-center"
        style={{
          background:
            "radial-gradient(ellipse 130% 100% at center, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.2) 60%, transparent 85%)",
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          See it in action
        </h2>
        <p className="mt-4 text-text-secondary text-lg">
          15 minutes. We&apos;ll show you how Chief handles a real site visit.
        </p>
        <a
          href="#book-call"
          className="inline-block mt-8 px-10 py-4 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors"
        >
          Book a call
        </a>
      </div>

    </section>
  );
}
