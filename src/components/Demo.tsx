"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PhoneFrame } from "./demo/PhoneFrame";
import { CaptureScreen } from "./demo/CaptureScreen";
import { ProcessingScreen } from "./demo/ProcessingScreen";
import { ReviewScreen } from "./demo/ReviewScreen";
import { ConfirmScreen } from "./demo/ConfirmScreen";
import { TeamViews } from "./demo/TeamViews";

const CAPTIONS = [
  {
    label: "01",
    title: "Capture",
    text: "The GP walks the property. Takes photos the way they already do. Nothing changes about their behavior.",
  },
  {
    label: "02",
    title: "Processing",
    text: "Chief writes the notes from visual evidence, in real time. The observations a CRE professional would write.",
  },
  {
    label: "03",
    title: "Review",
    text: "Visit ends. Notes are already done. The GP reviews and adds the judgment only they can supply.",
  },
  {
    label: "04",
    title: "Distribution",
    text: "One tap. The analyst gets what feeds the model. The VP gets the full picture. The GP's post-visit work goes to zero.",
  },
];

export function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Step transitions aligned with screen crossfade points
  const activeBeat = useTransform(scrollYProgress, [0, 0.19, 0.22, 0.39, 0.42, 0.54, 0.57, 0.85, 1], [0, 0, 1, 1, 2, 2, 3, 3, 3]);
  const phoneX = useTransform(scrollYProgress, [0.55, 0.65], [0, isMd ? -200 : 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.05], [0.95, 1]);
  const teamOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const screenProgress = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.55, 0.65], [0, 0.99, 1.99, 2.99, 3.5]);
  const contentFadeOut = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <div className="absolute top-20 left-6 sm:left-12 z-20">
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            How to get started with Chief
          </h2>
        </div>
        <motion.div
          className="w-full h-full flex items-center justify-center pt-16 pb-28 sm:pb-36"
          style={{ opacity: contentFadeOut }}
        >
          <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
            <motion.div
              className="flex-shrink-0"
              style={{
                opacity: phoneOpacity,
                scale: phoneScale,
                x: phoneX,
              }}
            >
              <PhoneFrame>
                <PhoneScreenSwitcher progress={screenProgress} />
              </PhoneFrame>
            </motion.div>

            <motion.div
              className="hidden md:flex absolute right-12 top-0 bottom-0 max-w-xl w-[38%] items-center"
              style={{ opacity: teamOpacity }}
            >
              <TeamViews />
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <CaptionSwitcher activeBeat={activeBeat} captions={CAPTIONS} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneScreenSwitcher({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative w-full h-full">
      <ScreenLayer progress={progress} range={[0, 1]}>
        <CaptureScreen />
      </ScreenLayer>
      <ScreenLayer progress={progress} range={[1, 2]}>
        <ProcessingScreen />
      </ScreenLayer>
      <ScreenLayer progress={progress} range={[2, 3]}>
        <ReviewScreen />
      </ScreenLayer>
      <ScreenLayer progress={progress} range={[3, 4]}>
        <ConfirmScreen />
      </ScreenLayer>
    </div>
  );
}

function ScreenLayer({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
}) {
  const opacity = useTransform(
    progress,
    [range[0] - 0.1, range[0], range[1] - 0.1, range[1]],
    [0, 1, 1, 0]
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {children}
    </motion.div>
  );
}

function CaptionSwitcher({
  activeBeat,
  captions,
}: {
  activeBeat: MotionValue<number>;
  captions: typeof CAPTIONS;
}) {
  return (
    <div className="relative h-24">
      {captions.map((caption, i) => (
        <CaptionItem key={i} activeBeat={activeBeat} index={i} caption={caption} />
      ))}
    </div>
  );
}

function CaptionItem({
  activeBeat,
  index,
  caption,
}: {
  activeBeat: MotionValue<number>;
  index: number;
  caption: (typeof CAPTIONS)[number];
}) {
  const opacity = useTransform(activeBeat, (v: number) =>
    Math.round(v) === index ? 1 : 0
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <p className="text-gold font-mono text-xs tracking-widest uppercase mb-1">
        {caption.label} &middot; {caption.title}
      </p>
      <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
        {caption.text}
      </p>
    </motion.div>
  );
}
