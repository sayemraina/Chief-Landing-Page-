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
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              className="relative w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-2xl p-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-text-primary transition-colors text-xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>

              {state === "success" ? (
                <div className="text-center space-y-3 py-4">
                  <p className="text-gold text-lg font-semibold">
                    You&apos;re on the list.
                  </p>
                  <p className="text-text-secondary text-sm">
                    I&apos;ll personally reach out within 48 hours.
                  </p>
                </div>
              ) : state === "duplicate" ? (
                <div className="text-center space-y-3 py-4">
                  <p className="text-gold text-lg font-semibold">
                    You&apos;re already signed up.
                  </p>
                  <p className="text-text-secondary text-sm">
                    We&apos;ll be in touch soon.
                  </p>
                </div>
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
