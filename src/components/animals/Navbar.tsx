"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import {
  BRAND_NAME,
  LANGUAGE_OPTIONS,
  SAMPLE_CITY,
  type LanguageCode,
} from "@/lib/config";
import { useLanguage } from "./LanguageContext";
import { LogoMark } from "./LogoMark";
import { ButtonLink, Container } from "./Primitives";

const NAV_LINKS = [
  { href: "/animals/search", matchPath: "/animals/search", label: "Find a Vet" },
  { href: "/animals#services", matchPath: null, label: "Explore Services" },
] as const;

const languageFontClass: Record<LanguageCode, string> = {
  en: "font-sans text-sm",
  hi: "[font-family:var(--font-devanagari)] text-[15px]",
  gu: "[font-family:var(--font-gujarati)] text-[15px]",
};

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        requestAnimationFrame(() => {
          menuButtonRef.current?.focus();
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-xs transition-[border-color,box-shadow] duration-200",
        scrolled
          ? "border-line-strong shadow-[0_2px_10px_rgba(31,58,46,0.06)]"
          : "border-line"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Wordmark + Arch Logomark */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/animals"
              className="inline-flex items-center gap-2.5 text-forest hover:text-terracotta-dark transition-colors min-w-0"
            >
              <LogoMark className="text-forest" />
              <span className="font-display text-xl sm:text-[22px] font-medium tracking-tight truncate">
                {BRAND_NAME}
              </span>
            </Link>
            <span className="hidden xl:inline-block text-xs text-muted border-l border-line pl-3">
              {SAMPLE_CITY}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((item) => {
              const isActive = Boolean(
                item.matchPath && pathname.startsWith(item.matchPath)
              );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "relative py-1.5 text-[15px] font-medium transition-colors",
                    isActive
                      ? "text-forest"
                      : "text-forest/80 hover:text-forest"
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-terracotta"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              role="group"
              aria-label="Language switcher (visual preview)"
              className="inline-flex items-center rounded-md border border-line bg-sand/55 p-0.5"
            >
              {LANGUAGE_OPTIONS.map((opt) => {
                const active = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    aria-pressed={active}
                    aria-label={`${opt.label} (${opt.shortLabel})`}
                    onClick={() => setLanguage(opt.code)}
                    className={clsx(
                      "min-h-[36px] px-2.5 rounded-[4px] font-medium leading-none transition-colors cursor-pointer",
                      languageFontClass[opt.code],
                      active
                        ? "bg-forest text-paper"
                        : "text-forest/85 hover:text-forest"
                    )}
                  >
                    {opt.shortLabel}
                  </button>
                );
              })}
            </div>

            <ButtonLink href="/animals#for-providers" variant="primary" size="sm">
              List Your Business
            </ButtonLink>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong text-forest hover:bg-sand/70 transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-line bg-paper"
          >
            <Container className="py-5 space-y-5">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((item) => {
                  const isActive = Boolean(
                    item.matchPath && pathname.startsWith(item.matchPath)
                  );
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        "min-h-[44px] flex items-center justify-between text-base font-medium px-2 rounded-md hover:bg-sand/60 transition-colors",
                        isActive
                          ? "text-forest underline decoration-terracotta decoration-2 underline-offset-4"
                          : "text-forest/85"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label="Language switcher (visual preview)"
                  className="inline-flex items-center rounded-md border border-line bg-sand/55 p-0.5"
                >
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const active = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        aria-pressed={active}
                        aria-label={`${opt.label} (${opt.shortLabel})`}
                        onClick={() => setLanguage(opt.code)}
                        className={clsx(
                          "min-h-[40px] px-3 rounded-[4px] font-medium leading-none transition-colors cursor-pointer",
                          languageFontClass[opt.code],
                          active
                            ? "bg-forest text-paper"
                            : "text-forest/85 hover:text-forest"
                        )}
                      >
                        {opt.shortLabel}
                      </button>
                    );
                  })}
                </div>

                <Link
                  href="/animals#for-providers"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-dark transition-colors"
                >
                  List Your Business
                </Link>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
