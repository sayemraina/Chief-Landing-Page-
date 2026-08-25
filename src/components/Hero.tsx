"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const fade = Math.max(0, 1 - window.scrollY / (vh * 1.0));
        setOpacity(fade);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="fixed inset-0 z-[5] flex flex-col items-center justify-center px-6 pt-20 text-center"
      style={{ opacity }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          background:
            "radial-gradient(ellipse 130% 100% at center, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.2) 60%, transparent 85%)",
        }}
      >
        <h1 className="mx-auto max-w-2xl text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight">
          Everything your firm knows, now comes to you.
        </h1>

        <p className="mx-auto mt-5 max-w-xs sm:max-w-none whitespace-normal sm:whitespace-nowrap text-base sm:text-lg text-text-secondary leading-relaxed">
          The cross-functional brain for Mid-Market Commercial Real Estate.
        </p>

        <a
          href="#book-call"
          className="mt-10 px-8 py-3.5 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors sm:-ml-6"
        >
          Book a call
        </a>
      </div>
    </section>
  );
}
