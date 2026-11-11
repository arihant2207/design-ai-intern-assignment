import type { RefObject } from "react";
import { ACADEMY_NAME } from "@/lib/academy-config";

interface FooterProps {
  footerRef?: RefObject<HTMLElement | null>;
}

export function Footer({ footerRef }: FooterProps) {
  return (
    <footer
      ref={footerRef}
      className="border-t border-[var(--academy-line)] bg-[var(--academy-paper)] pb-12"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="academy-display text-lg font-bold text-[var(--academy-ink)]">
              {ACADEMY_NAME}
            </p>
            {/* Disclosure 3 of 3 */}
            <p className="mt-1 max-w-md text-sm text-[var(--academy-muted)]">
              Front-end prototype with a sample curriculum only.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
          >
            <a
              href="#programmes"
              className="inline-flex min-h-[44px] items-center font-medium text-[var(--academy-ink)] hover:text-[var(--academy-cobalt)]"
            >
              Programmes
            </a>
            <a
              href="#syllabus"
              className="inline-flex min-h-[44px] items-center font-medium text-[var(--academy-ink)] hover:text-[var(--academy-cobalt)]"
            >
              Syllabus
            </a>
            <a
              href="#faq"
              className="inline-flex min-h-[44px] items-center font-medium text-[var(--academy-ink)] hover:text-[var(--academy-cobalt)]"
            >
              FAQ
            </a>
            <a
              href="#register"
              className="inline-flex min-h-[44px] items-center font-semibold text-[var(--academy-cobalt)] hover:underline"
            >
              Enquire now
            </a>
          </nav>
        </div>

        <div className="mt-6 border-t border-[var(--academy-line)] pt-5">
          <p className="academy-mono text-xs text-[var(--academy-muted)]">
            {ACADEMY_NAME} · Front-end prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
