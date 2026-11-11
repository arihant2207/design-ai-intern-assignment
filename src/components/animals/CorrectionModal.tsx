"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, X } from "lucide-react";
import { useCorrectionModal } from "./CorrectionContext";
import { Button } from "./Primitives";

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const selectors =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selectors));
}

function CorrectionModalDialog({
  initialListingName,
  onClose,
}: {
  initialListingName: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const listingInputId = useId();
  const issueInputId = useId();
  const contactInputId = useId();

  const dialogRef = useRef<HTMLDivElement>(null);
  const listingInputRef = useRef<HTMLInputElement>(null);

  const [listingName, setListingName] = useState(initialListingName);
  const [issueDetails, setIssueDetails] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = requestAnimationFrame(() => {
      listingInputRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusables = getFocusableElements(dialogRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!listingName.trim() || !issueDetails.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-forest-deep/55"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg rounded-xl border border-line-strong bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-1">
              Directory Accuracy
            </p>
            <h2
              id={titleId}
              className="font-display text-2xl text-forest leading-tight"
            >
              Submit a correction
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close correction form"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-forest hover:bg-sand transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-lg border border-line bg-sand/60 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="h-5 w-5 text-forest shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <div>
                <p className="font-medium text-forest">
                  Correction noted locally
                </p>
                <p className="mt-1.5 text-sm text-forest/80 leading-relaxed">
                  Thank you for helping keep{" "}
                  <span className="font-medium text-forest">{listingName}</span>{" "}
                  accurate. This is a front-end prototype, so no information was
                  transmitted or stored remotely.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button variant="primary" size="sm" onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor={listingInputId}
                className="block text-sm font-medium text-forest mb-1.5"
              >
                Clinic or service name
              </label>
              <input
                ref={listingInputRef}
                id={listingInputId}
                type="text"
                required
                value={listingName}
                onChange={(e) => setListingName(e.target.value)}
                placeholder="e.g. Sabarmati Veterinary Clinic"
                className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper px-3.5 py-2 text-base text-forest placeholder:text-muted/75 focus:border-forest"
              />
            </div>

            <div>
              <label
                htmlFor={issueInputId}
                className="block text-sm font-medium text-forest mb-1.5"
              >
                What needs updating?
              </label>
              <textarea
                id={issueInputId}
                required
                rows={3}
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                placeholder="Wrong opening hours, phone number changed, closed permanently, or address detail..."
                className="w-full rounded-md border border-line-strong bg-paper px-3.5 py-2.5 text-base text-forest placeholder:text-muted/75 focus:border-forest"
              />
            </div>

            <div>
              <label
                htmlFor={contactInputId}
                className="block text-sm font-medium text-forest mb-1.5"
              >
                Your email or phone{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={contactInputId}
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="In case we need to confirm a detail"
                className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper px-3.5 py-2 text-base text-forest placeholder:text-muted/75 focus:border-forest"
              />
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-muted">
                Prototype only — nothing is sent over the network.
              </p>
              <div className="flex items-center gap-2.5 justify-end">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Submit correction
                </Button>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export function CorrectionModal() {
  const { isOpen, openCount, initialListingName, closeCorrection } =
    useCorrectionModal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <CorrectionModalDialog
          key={openCount}
          initialListingName={initialListingName}
          onClose={closeCorrection}
        />
      ) : null}
    </AnimatePresence>
  );
}
