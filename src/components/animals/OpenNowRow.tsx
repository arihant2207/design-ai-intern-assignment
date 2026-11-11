"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SAMPLE_PROVIDERS } from "@/data/providers";
import { getOpenShowcaseProviders } from "@/lib/hours";
import { ProviderCard } from "./ProviderCard";
import { ButtonLink, Container, SectionHeader } from "./Primitives";
import { useIsHydrated } from "./useHydrated";

const SSR_FALLBACK_PROVIDERS = [...SAMPLE_PROVIDERS]
  .sort((a, b) => {
    if (a.is24x7 !== b.is24x7) return a.is24x7 ? -1 : 1;
    if (a.emergencyCare !== b.emergencyCare) return a.emergencyCare ? -1 : 1;
    return a.distanceKm - b.distanceKm;
  })
  .slice(0, 6);

export function OpenNowRow() {
  const hydrated = useIsHydrated();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const items = hydrated
    ? getOpenShowcaseProviders(SAMPLE_PROVIDERS)
    : SSR_FALLBACK_PROVIDERS.map((provider) => ({
        provider,
        status: null,
      }));

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, hydrated]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollBy({
      left: direction * 356,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="py-14 sm:py-18 border-y border-line bg-sand/35">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Live IST Schedule"
            title="Open right now near you"
            description="Evaluated in India Standard Time. When clinics are between sessions, 24x7 hospitals, ambulances, and soonest-opening clinics appear first."
          />

          <div className="flex items-center gap-3 shrink-0">
            <div
              role="group"
              aria-label="Scroll providers row"
              className="inline-flex items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                aria-label="Previous open providers"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-paper text-forest hover:bg-sand disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                aria-label="Next open providers"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-paper text-forest hover:bg-sand disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <ButtonLink href="/animals/search" variant="outline" size="sm">
              <span>Browse all 16</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </ButtonLink>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mt-8"
        >
          {/* Left & right edge fade matching bg-sand/35 over bg-paper */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#F0E9D9] to-transparent transition-opacity"
            style={{ opacity: canScrollPrev ? 1 : 0 }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F0E9D9] to-transparent transition-opacity"
            style={{ opacity: canScrollNext ? 1 : 0 }}
          />

          <div
            ref={scrollerRef}
            onScroll={updateScrollState}
            tabIndex={0}
            aria-label="Open providers horizontal list"
            className="scrollbar-none flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory focus-visible:rounded-xl"
          >
            {items.map(({ provider, status }) => (
              <div
                key={provider.id}
                className="w-[292px] sm:w-[336px] shrink-0 snap-start flex"
              >
                <ProviderCard
                  variant="compact"
                  provider={provider}
                  hoursStatus={status}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
