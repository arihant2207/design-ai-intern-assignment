"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ACADEMY_NAME } from "@/lib/academy-config";

interface StickyMobileCtaProps {
  visible: boolean;
}

export function StickyMobileCta({ visible }: StickyMobileCtaProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--academy-line)] bg-[var(--academy-paper)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="academy-mono truncate text-xs font-medium text-[var(--academy-muted)]">
                6-week cohorts
              </p>
              <p className="truncate text-sm font-semibold text-[var(--academy-ink)]">
                {ACADEMY_NAME}
              </p>
            </div>
            <a
              href="#register"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-md bg-[var(--academy-cobalt)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--academy-cobalt-hover)]"
            >
              Enquire now
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
