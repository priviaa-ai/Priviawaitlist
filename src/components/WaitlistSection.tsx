import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Mail, User } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// ------- CONFIG -------
const SUPABASE_URL = "https://kvehpmzqqcrvwlzaopzh.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZWhwbXpxcWNydndsemFvcHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzOTc1MDUsImV4cCI6MjA3Nzk3MzUwNX0.cxCSKiNwmCkSnLqGLEWaMwfVpRW8CNOZsMed4NT0HUs"; // TODO: paste anon key
const GMAIL_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwSA1iVvgmmZd05epX_BqEcNMQOFDq0e0dn_IechDvumPpmJSu1qqLKl1kAsGYwtH0D/exec";

// ------- INIT -------
const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON,
);

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] =
    useState(false);
  const [showErrorMessage, setShowErrorMessage] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill out all required fields.",
  );
  const [buttonText, setButtonText] = useState("Submit");
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  // Click outside to dismiss messages
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }
    };

    if (showSuccessMessage || showErrorMessage) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
      return () =>
        document.removeEventListener(
          "mousedown",
          handleClickOutside,
        );
    }
  }, [showSuccessMessage, showErrorMessage]);

  const isValidEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      String(e).toLowerCase(),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Validate fields
    if (!trimmedName || !trimmedEmail) {
      setErrorMessage("Please enter your name and email.");
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
      setTimeout(() => setShowErrorMessage(false), 5000);
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email.");
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
      setTimeout(() => setShowErrorMessage(false), 5000);
      return;
    }

    setIsLoading(true);
    setShowErrorMessage(false);
    setButtonText("Saving...");

    try {
      // 1) Insert into Supabase (RLS policy already allows anon INSERT only)
      const { error } = await supabaseClient
        .from("waitlist")
        .insert({
          name: trimmedName,
          email: trimmedEmail,
        });

      if (error) {
        const msg = (error.message || "").toLowerCase();
        if (
          (error.code || "").includes("23505") ||
          msg.includes("duplicate")
        ) {
          setErrorMessage("You're already on the list");
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 5000);
        } else {
          console.error(error);
          setErrorMessage(
            "Something went wrong. Please try again.",
          );
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 5000);
        }
        setIsLoading(false);
        setButtonText("Submit");
        return;
      }

      // 2) Trigger Gmail Apps Script — fire-and-forget (no-cors to avoid CORS preflight)
      fetch(GMAIL_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      }).catch(() => {
        /* ignore network errors here */
      });

      // 3) Show success + clear form
      setIsLoading(false);
      setIsSubmitted(true);
      setShowSuccessMessage(true);
      setButtonText("Submitted ✔");

      // Reset button text after 2 seconds
      setTimeout(() => {
        setButtonText("Submit");
        setIsSubmitted(false);
      }, 2000);

      // Reset form fields after showing success
      setTimeout(() => {
        setName("");
        setEmail("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Something went wrong. Please try again.",
      );
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 5000);
      setIsLoading(false);
      setButtonText("Submit");
    }
  };

  return (
    <section
      id="waitlist"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Glassmorphic card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#112C3F] to-[#1a4d5f] rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />

          {/* Main card */}
          <div
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden"
            style={{ willChange: "transform" }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#112C3F]/10 via-transparent to-[#1a4d5f]/10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl mb-4 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent"
              >
                Join Waitlist
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-2"
              >
                Join the waitlist for early access and exclusive
                updates.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="text-gray-400 mb-10"
              >
                Be the first to experience what's next!
              </motion.p>

              {/* Form */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                {/* Name input */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setShowErrorMessage(false);
                    }}
                    placeholder="Your Name here."
                    className={`w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-md border rounded-2xl text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200 ${
                      showErrorMessage
                        ? "border-red-400/60 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        : "border-white/10 focus:border-[#112C3F] focus:shadow-[0_0_20px_rgba(17,44,63,0.3)]"
                    }`}
                  />
                </div>

                {/* Email input */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowErrorMessage(false);
                    }}
                    placeholder="Your Email here."
                    className={`w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-md border rounded-2xl text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200 ${
                      showErrorMessage
                        ? "border-red-400/60 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        : "border-white/10 focus:border-[#112C3F] focus:shadow-[0_0_20px_rgba(17,44,63,0.3)]"
                    }`}
                  />
                </div>

                {/* Success/Error Messages */}
                <AnimatePresence mode="wait">
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="text-center py-3 px-4 rounded-xl bg-[#B5FF8A]/5 backdrop-blur-sm border border-[#B5FF8A]/20"
                      style={{
                        textShadow:
                          "0 0 8px rgba(181, 255, 138, 0.5)",
                      }}
                    >
                      <p className="text-[#B5FF8A]">
                        Thanks for signing up! You've been
                        added to the Privia AI waitlist.
                      </p>
                    </motion.div>
                  )}

                  {showErrorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="text-center py-3 px-4 rounded-xl bg-red-400/5 backdrop-blur-sm border border-red-400/20"
                      style={{
                        textShadow:
                          "0 0 8px rgba(248, 113, 113, 0.3)",
                      }}
                    >
                      <p className="text-red-300">
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  id="submit-btn"
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="group w-full py-4 rounded-2xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-md border border-white/10 text-white overflow-hidden relative transition-all duration-200 hover:border-[#112C3F] hover:shadow-[0_0_30px_rgba(17,44,63,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#112C3F]/20 to-[#1a4d5f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    key={buttonText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      buttonText
                    )}
                  </motion.span>
                </button>
              </motion.form>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#112C3F]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1a4d5f]/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* Additional glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#112C3F]/10 blur-[100px] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}