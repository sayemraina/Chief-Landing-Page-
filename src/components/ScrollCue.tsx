"use client";

import { useEffect, useState } from "react";

export function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80;
        setVisible(!nearBottom);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-8 left-0 right-0 z-40 flex justify-center transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        style={{
          animation: "scroll-bounce 1.8s ease-in-out infinite",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
