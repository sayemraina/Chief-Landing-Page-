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
        <h1 className="text-[28px] sm:text-[42px] font-semibold leading-snug tracking-tight text-center max-w-[340px] sm:max-w-none">
          Walk the site. By the time{" "}
          <br className="hidden sm:inline" />
          you leave, your team is already up to speed.
        </h1>

        <p className="mt-6 max-w-xs sm:max-w-none text-[15px] sm:text-[18px] text-text-secondary">
          Purpose-Built for Mid-Market Commercial Real Estate Teams.
        </p>

        <a
          href="#demo"
          className="mt-8 px-10 py-3.5 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors block w-fit sm:-ml-6"
        >
          See how it works
        </a>
      </div>
    </section>
  );
}
