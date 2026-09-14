"use client";

import { motion } from "framer-motion";

export function PostDemoCTA() {
  return (
    <section className="relative z-10 bg-[#0A0F1C] py-16 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="#book-call"
          className="inline-block px-6 py-3 sm:px-10 sm:py-4 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors"
        >
          Get early access
        </a>
      </motion.div>
    </section>
  );
}
