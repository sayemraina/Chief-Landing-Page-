"use client";

import { motion } from "framer-motion";
import { TeamViews } from "./demo/TeamViews";

export function TeamViewsMobile() {
  return (
    <section className="md:hidden px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-text-secondary text-center mb-6">
          What the analyst and VP receive
        </p>
        <TeamViews />
      </motion.div>
    </section>
  );
}
