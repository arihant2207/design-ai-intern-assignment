"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { SearchFilters } from "@/types/provider";
import { FilterPanel } from "./FilterPanel";
import { Button } from "./Primitives";

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const selectors =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selectors));
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  onChange,
  onClearAll,
  activeCount,
  resultCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onClearAll: () => void;
  activeCount: number;
  resultCount: number;
}) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusables = getFocusableElements(sheetRef.current);
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
      requestAnimationFrame(() => {
        prevFocusRef.current?.focus();
      });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
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
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative z-10 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-line-strong bg-paper"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <h2 id={titleId} className="font-display text-xl text-forest">
                Filter results
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-forest hover:bg-sand transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel
                idPrefix="mobile-sheet"
                filters={filters}
                onChange={onChange}
                onClearAll={onClearAll}
                activeCount={activeCount}
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-paper px-5 py-4">
              <Button variant="outline" size="md" onClick={onClearAll}>
                Clear all
              </Button>
              <Button variant="primary" size="md" onClick={onClose}>
                Show {resultCount} {resultCount === 1 ? "result" : "results"}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

