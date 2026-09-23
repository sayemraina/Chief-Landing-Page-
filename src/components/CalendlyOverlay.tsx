"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SAFETY_TIMEOUT_MS = 6000;

export function CalendlyOverlay() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clearSafetyTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    function handleOpening() {
      setVisible(true);
      clearSafetyTimeout();
      timeoutRef.current = setTimeout(() => setVisible(false), SAFETY_TIMEOUT_MS);
    }

    function handleMessage(e: MessageEvent) {
      const eventName = e.data?.event;
      if (typeof eventName === "string" && eventName.indexOf("calendly.") === 0) {
        setVisible(false);
        clearSafetyTimeout();
      }
    }

    window.addEventListener("calendly:opening", handleOpening);
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("calendly:opening", handleOpening);
      window.removeEventListener("message", handleMessage);
      clearSafetyTimeout();
    };
  }, []);

  function handleDismiss() {
    setVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-navy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleDismiss}
        >
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5 mb-5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gold"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-text-secondary text-sm">Connecting to Calendly</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
