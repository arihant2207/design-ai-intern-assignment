"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ACADEMY_NAME } from "@/lib/academy-config";

const NAV_LINKS = [
  { href: "#programmes", label: "Programmes" },
  { href: "#syllabus", label: "Syllabus" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--academy-line)] bg-[var(--academy-paper)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-[var(--academy-ink)] no-underline"
        >
          <span
            aria-hidden="true"
            className="academy-mono inline-flex h-7 w-7 items-center justify-center border border-[var(--academy-line-strong)] bg-[var(--academy-chalk)] text-xs font-semibold"
          >
            AI
          </span>
          <span className="academy-display text-lg font-bold tracking-tight sm:text-xl">
            {ACADEMY_NAME}
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--academy-muted)] transition-colors hover:text-[var(--academy-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#register"
            whileTap={{ scale: 0.98 }}
            className="hidden min-h-[40px] items-center gap-1.5 rounded-md bg-[var(--academy-cobalt)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)] md:inline-flex"
          >
            Enquire now
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </motion.a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="academy-mobile-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--academy-line)] bg-[var(--academy-surface)] text-[var(--academy-ink)] md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="academy-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--academy-line)] bg-[var(--academy-paper)] md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-2 text-base font-medium text-[var(--academy-ink)] hover:bg-[var(--academy-surface-alt)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-[var(--academy-cobalt)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--academy-cobalt-hover)]"
              >
                Enquire now
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
