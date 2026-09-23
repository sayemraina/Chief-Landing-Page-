"use client";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export function Header() {
  function openCalendly(e: React.MouseEvent) {
    e.preventDefault();
    if (window.Calendly) {
      window.dispatchEvent(new CustomEvent("calendly:opening"));
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/sayam07raina/chief-15-min-intro",
      });
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="text-xl font-semibold tracking-tight">
        Chief<span className="text-gold">.</span>
      </div>
      <button
        onClick={openCalendly}
        className="px-5 py-2.5 bg-gold text-navy font-medium text-sm rounded-lg hover:bg-gold-dim transition-colors"
      >
        Book a call
      </button>
    </header>
  );
}
