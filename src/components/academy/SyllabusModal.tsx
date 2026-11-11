"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, ArrowDown, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { submitSyllabusRequest } from "@/lib/leads";

interface SyllabusModalProps {
  open: boolean;
  onClose: () => void;
  onJumpToSyllabus: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SyllabusModal({
  open,
  onClose,
  onJumpToSyllabus,
}: SyllabusModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleClose = () => {
    setError(null);
    setConfirmedEmail(null);
    setEmail("");
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim();
      await submitSyllabusRequest(cleanEmail);
      setConfirmedEmail(cleanEmail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1116]/55 p-4"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="syllabus-modal-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-[var(--academy-line-strong)] bg-[var(--academy-surface)] p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-cobalt)]">
                  Syllabus Outline
                </p>
                <h2
                  id="syllabus-modal-title"
                  className="academy-display mt-1 text-2xl font-bold text-[var(--academy-ink)]"
                >
                  Download the syllabus
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close syllabus modal"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--academy-line)] text-[var(--academy-ink)] hover:bg-[var(--academy-paper)]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {confirmedEmail ? (
              <div className="mt-5" role="status" aria-live="polite">
                <div className="flex items-start gap-3 rounded-md border border-[var(--academy-line)] bg-[var(--academy-paper)] p-4">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--academy-cobalt)]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="text-sm text-[var(--academy-ink)]">
                    <p className="font-semibold">
                      Prototype confirmation for {confirmedEmail}
                    </p>
                    <p className="mt-1 text-[var(--academy-muted)]">
                      This front-end prototype does not send an email or generate
                      a PDF download. You can inspect the complete 6-week outline
                      directly on this page.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onJumpToSyllabus();
                    }}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md bg-[var(--academy-cobalt)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--academy-cobalt-hover)]"
                  >
                    Go to Syllabus section
                    <ArrowDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--academy-line)] px-4 py-2.5 text-sm font-semibold text-[var(--academy-ink)] hover:bg-[var(--academy-paper)]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                <p className="text-sm text-[var(--academy-muted)]">
                  Enter your email to view the 6-week syllabus outline and track
                  overview.
                </p>

                <div>
                  <label
                    htmlFor="modal-syllabus-email"
                    className="block text-sm font-semibold text-[var(--academy-ink)]"
                  >
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="modal-syllabus-email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "modal-syllabus-error" : undefined}
                    placeholder="you@example.com"
                    className="mt-1.5 min-h-[44px] w-full rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-3.5 py-2.5 text-base text-[var(--academy-ink)] placeholder:text-[var(--academy-muted)]/75 disabled:opacity-60"
                  />
                  {error && (
                    <p
                      id="modal-syllabus-error"
                      role="alert"
                      className="mt-1.5 text-sm font-medium text-[#B42318]"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={isSubmitting ? undefined : { scale: 0.985 }}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-[var(--academy-cobalt)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isSubmitting ? "Preparing preview..." : "Continue to syllabus"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
