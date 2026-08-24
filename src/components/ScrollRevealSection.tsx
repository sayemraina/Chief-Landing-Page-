"use client";

import { useEffect, useRef, useState } from "react";

interface Paragraph {
  text: string;
  className?: string;
}

interface ScrollRevealSectionProps {
  paragraphs: Paragraph[];
  innerClassName?: string;
  runwayVh?: number;
  opaqueBg?: boolean;
  title?: string;
}

export function ScrollRevealSection({
  paragraphs,
  innerClassName = "max-w-3xl mx-auto",
  runwayVh = 180,
  opaqueBg = true,
  title,
}: ScrollRevealSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = outerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const scrollable = rect.height - vh;
          if (scrollable > 0) {
            // Start reveal as soon as section enters the lower half of viewport
            const earlyStart = vh * 0.5;
            const scrolled = earlyStart - rect.top;
            const range = scrollable + earlyStart;
            setProgress(Math.max(0, Math.min(1, scrolled / range)));
          }
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build per-paragraph progress ranges with gaps between them
  const paraCount = paragraphs.length;
  const GAP = 0.10;
  const usable = 0.92 - (paraCount - 1) * GAP;
  const sliceWidth = usable / paraCount;
  const paraRanges = paragraphs.map((_, i) => ({
    start: i * (sliceWidth + GAP),
    end: i * (sliceWidth + GAP) + sliceWidth,
  }));

  // Build word list per paragraph
  const paraWords: string[][] = paragraphs.map((p) =>
    p.text.split(/\s+/)
  );

  return (
    <section
      ref={outerRef}
      className="relative z-10"
      style={{ height: `${runwayVh}vh`, ...(opaqueBg ? { backgroundColor: '#0A0F1C' } : {}) }}
    >
      <div className="sticky top-0 flex items-center justify-center min-h-screen px-6 pb-24">
        {title && (
          <div className="absolute top-20 left-6 sm:left-12 z-20">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
              {title}
            </h2>
          </div>
        )}
        <div
          className={`space-y-10 ${innerClassName}`}
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at center, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.2) 60%, transparent 85%)",
          }}
        >
          {paragraphs.map((para, pi) => {
            const words = paraWords[pi];
            const range = paraRanges[pi];
            const wordCount = words.length;
            return (
              <p key={pi} className={para.className}>
                {words.map((word, wi) => {
                  const wordStart =
                    range.start +
                    (wi / wordCount) * (range.end - range.start);
                  const wordEnd =
                    wordStart + (range.end - range.start) / wordCount;
                  const t = Math.max(
                    0,
                    Math.min(
                      1,
                      (progress - wordStart) / (wordEnd - wordStart)
                    )
                  );
                  const opacity = t;
                  return (
                    <span
                      key={wi}
                      style={{
                        opacity,
                        transition: "opacity 0.05s ease-out",
                      }}
                    >
                      {word}
                      {wi < wordCount - 1 ? " " : ""}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
