"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { href: "#demo", watch: "demo-boundary", label: "How it works" },
  { href: "#problem", watch: "problem", label: "The problem" },
  { href: "#traceability", watch: "traceability", label: "Why it compounds" },
];

export function SectionNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        setVisible(window.scrollY > vh * 0.9);

        const scrollable = document.documentElement.scrollHeight - vh;
        setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

        const mid = vh / 2;
        let current: string | null = null;
        for (const s of SECTIONS) {
          const el = document.getElementById(s.watch);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) {
            current = s.href;
            break;
          }
        }
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: minimal dot rail, vertically centered on the left edge */}
      <nav
        aria-hidden={!visible}
        aria-label="Page sections"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-5 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.href;
          return (
            <a
              key={s.href}
              href={s.href}
              aria-label={s.label}
              tabIndex={visible ? 0 : -1}
              className="group relative flex items-center"
            >
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: isActive ? 8 : 6,
                  height: isActive ? 8 : 6,
                  backgroundColor: isActive
                    ? "var(--color-gold)"
                    : "rgba(255,255,255,0.25)",
                }}
              />
              <span className="pointer-events-none absolute left-5 whitespace-nowrap rounded-md border border-border bg-navy-light/90 px-2 py-1 text-[11px] text-text-secondary opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
                {s.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile: thin scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-40 h-0.5 md:hidden transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="h-full bg-gold origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </>
  );
}
