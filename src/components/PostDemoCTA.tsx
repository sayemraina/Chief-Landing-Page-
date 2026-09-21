"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type FormState = "idle" | "submitting" | "success" | "error" | "duplicate";

export function PostDemoCTA() {
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company }),
      });

      if (res.status === 409) {
        setState("duplicate");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setState("error");
    }
  }

  function handleClose() {
    setShowForm(false);
    if (state === "success" || state === "duplicate") return;
    setState("idle");
    setErrorMsg("");
  }

  return (
    <>
      <section className="relative z-10 bg-[#0A0F1C] py-16 px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setShowForm(true)}
            className="inline-block px-6 py-3 sm:px-10 sm:py-4 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors"
          >
            Get early access
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-navy/40 backdrop-blur-md"
              onClick={handleClose}
            />
            <motion.div
              className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(17,24,39,0.95) 0%, rgba(10,15,28,0.98) 100%)",
                boxShadow: "0 0 0 1px rgba(196,166,109,0.15), 0 24px 80px -12px rgba(0,0,0,0.6), 0 0 40px -8px rgba(196,166,109,0.08)",
              }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-text-primary transition-colors text-xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>

              {state === "success" ? (
                <motion.div
                  className="text-center py-8 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="mx-auto mb-6 w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <p className="text-xl font-semibold tracking-tight mb-2">
                    You&apos;re on the list.
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We&apos;ll reach out within 2-3 days.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-2.5 text-sm text-text-secondary border border-[#1F2937] rounded-lg hover:border-[#374151] hover:text-text-primary transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : state === "duplicate" ? (
                <motion.div
                  className="text-center py-8 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mx-auto mb-6 w-14 h-14 rounded-full border-2 border-[#374151] flex items-center justify-center">
                    <span className="text-text-secondary text-lg">&#10003;</span>
                  </div>
                  <p className="text-xl font-semibold tracking-tight mb-2">
                    You&apos;re already signed up.
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We&apos;ll be in touch soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-2.5 text-sm text-text-secondary border border-[#1F2937] rounded-lg hover:border-[#374151] hover:text-text-primary transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight text-center mb-6">
                    Get early access
                  </h3>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#1F2937] rounded-lg text-text-primary placeholder:text-[#6B7280] focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#1F2937] rounded-lg text-text-primary placeholder:text-[#6B7280] focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0A0F1C] border border-[#1F2937] rounded-lg text-text-primary placeholder:text-[#6B7280] focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full px-6 py-3 bg-gold text-navy font-semibold text-base rounded-lg hover:bg-gold-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === "submitting"
                      ? "Signing up..."
                      : "Get early access"}
                  </button>
                  {state === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
