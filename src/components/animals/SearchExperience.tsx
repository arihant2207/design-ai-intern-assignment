"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { List, Map as MapIcon, Search, SlidersHorizontal, X } from "lucide-react";
import { clsx } from "clsx";
import { SAMPLE_PROVIDERS } from "@/data/providers";
import {
  ANIMAL_TYPES,
  SAMPLE_CITY,
  SERVICE_DEFINITIONS,
  SERVICE_LABEL_MAP,
  type AnimalType,
  type ServiceType,
} from "@/lib/config";
import { getProviderHoursStatus, type ProviderHoursStatus } from "@/lib/hours";
import type {
  LanguageSpoken,
  PriceBand,
  Provider,
  SearchFilters,
  SortOption,
} from "@/types/provider";
import { EmptyResults } from "./EmptyResults";
import { FilterPanel } from "./FilterPanel";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { Button, Container } from "./Primitives";
import { ProviderCard } from "./ProviderCard";
import { StaticCityMap } from "./StaticCityMap";
import { useIsHydrated } from "./useHydrated";

const EMPTY_FILTERS: SearchFilters = {
  query: "",
  service: "",
  animal: "",
  maxDistanceKm: null,
  openNow: false,
  only24x7: false,
  emergency: false,
  homeVisit: false,
  minRating: null,
  verifiedOnly: false,
  language: "",
  priceBand: "",
};

function parseInitialFilters(params: URLSearchParams): SearchFilters {
  const rawService = params.get("service") ?? "";
  const validService = SERVICE_DEFINITIONS.some((s) => s.id === rawService)
    ? (rawService as ServiceType)
    : "";

  const rawAnimal = params.get("animal") ?? "";
  const validAnimal = ANIMAL_TYPES.includes(rawAnimal as AnimalType)
    ? (rawAnimal as AnimalType)
    : "";

  return {
    ...EMPTY_FILTERS,
    query: params.get("location") ?? "",
    service: validService,
    animal: validAnimal,
    emergency: params.get("emergency") === "true",
    only24x7: params.get("only24x7") === "true",
  };
}

function normalizeLocationQuery(raw: string): string {
  const cityToken = SAMPLE_CITY.toLowerCase();
  return raw
    .toLowerCase()
    .replaceAll(cityToken, "")
    .replace(/[,]+/g, " ")
    .trim();
}

interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

function SearchExperienceContent({
  initialFilters,
  initialFocusId,
}: {
  initialFilters: SearchFilters;
  initialFocusId: string | null;
}) {
  const hydrated = useIsHydrated();
  const searchInputId = useId();
  const sortSelectId = useId();
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("nearest");
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [focusedProviderId, setFocusedProviderId] = useState<string | null>(
    initialFocusId
  );
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "map">(
    initialFocusId ? "map" : "list"
  );

  const updateFilters = (patch: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const clearAllFilters = () => {
    setFilters(EMPTY_FILTERS);
    setFocusedProviderId(null);
  };

  const statusMap = useMemo(() => {
    const map = new Map<string, ProviderHoursStatus>();
    if (!hydrated) return map;
    for (const provider of SAMPLE_PROVIDERS) {
      map.set(provider.id, getProviderHoursStatus(provider));
    }
    return map;
  }, [hydrated]);

  const filteredResults = useMemo(() => {
    const cleanedQuery = normalizeLocationQuery(filters.query);

    const matching = SAMPLE_PROVIDERS.filter((provider) => {
      if (cleanedQuery) {
        const haystack = [
          provider.name,
          provider.locality,
          ...provider.specialisations,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(cleanedQuery)) return false;
      }

      if (filters.service && provider.serviceType !== filters.service) {
        return false;
      }
      if (filters.animal && !provider.animals.includes(filters.animal)) {
        return false;
      }
      if (
        filters.maxDistanceKm !== null &&
        provider.distanceKm > filters.maxDistanceKm
      ) {
        return false;
      }
      if (filters.only24x7 && !provider.is24x7) return false;
      if (filters.emergency && !provider.emergencyCare) return false;
      if (filters.homeVisit && !provider.homeVisit) return false;
      if (filters.verifiedOnly && !provider.verified) return false;
      if (filters.minRating !== null && provider.rating < filters.minRating) {
        return false;
      }
      if (
        filters.language &&
        !provider.languages.includes(filters.language as LanguageSpoken)
      ) {
        return false;
      }
      if (
        filters.priceBand &&
        provider.priceBand !== (filters.priceBand as PriceBand)
      ) {
        return false;
      }
      if (filters.openNow && hydrated) {
        const status = statusMap.get(provider.id);
        if (!status?.isOpen) return false;
      }
      return true;
    });

    return [...matching].sort((a, b) => {
      if (sortBy === "top-rated") {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      }

      if (sortBy === "open-first" && hydrated) {
        const aOpen = statusMap.get(a.id)?.isOpen ? 1 : 0;
        const bOpen = statusMap.get(b.id)?.isOpen ? 1 : 0;
        if (bOpen !== aOpen) return bOpen - aOpen;
        if (a.is24x7 !== b.is24x7) return a.is24x7 ? -1 : 1;
      }

      return a.distanceKm - b.distanceKm;
    });
  }, [filters, hydrated, sortBy, statusMap]);

  const activeChips: FilterChip[] = useMemo(() => {
    const chips: FilterChip[] = [];
    if (filters.query.trim()) {
      chips.push({
        key: "query",
        label: `Area: ${filters.query.trim()}`,
        onRemove: () => updateFilters({ query: "" }),
      });
    }
    if (filters.service) {
      chips.push({
        key: "service",
        label: SERVICE_LABEL_MAP[filters.service],
        onRemove: () => updateFilters({ service: "" }),
      });
    }
    if (filters.animal) {
      chips.push({
        key: "animal",
        label: `Animal: ${filters.animal}`,
        onRemove: () => updateFilters({ animal: "" }),
      });
    }
    if (filters.maxDistanceKm !== null) {
      chips.push({
        key: "distance",
        label: `Within ${filters.maxDistanceKm} km`,
        onRemove: () => updateFilters({ maxDistanceKm: null }),
      });
    }
    if (filters.openNow) {
      chips.push({
        key: "openNow",
        label: "Open now",
        onRemove: () => updateFilters({ openNow: false }),
      });
    }
    if (filters.only24x7) {
      chips.push({
        key: "only24x7",
        label: "24x7 only",
        onRemove: () => updateFilters({ only24x7: false }),
      });
    }
    if (filters.emergency) {
      chips.push({
        key: "emergency",
        label: "Emergency care",
        onRemove: () => updateFilters({ emergency: false }),
      });
    }
    if (filters.homeVisit) {
      chips.push({
        key: "homeVisit",
        label: "Home visit",
        onRemove: () => updateFilters({ homeVisit: false }),
      });
    }
    if (filters.minRating !== null) {
      chips.push({
        key: "minRating",
        label: `Rating ${filters.minRating}+`,
        onRemove: () => updateFilters({ minRating: null }),
      });
    }
    if (filters.verifiedOnly) {
      chips.push({
        key: "verifiedOnly",
        label: "Verified only",
        onRemove: () => updateFilters({ verifiedOnly: false }),
      });
    }
    if (filters.language) {
      chips.push({
        key: "language",
        label: `Speaks ${filters.language}`,
        onRemove: () => updateFilters({ language: "" }),
      });
    }
    if (filters.priceBand) {
      chips.push({
        key: "priceBand",
        label: `Price ${filters.priceBand}`,
        onRemove: () => updateFilters({ priceBand: "" }),
      });
    }
    return chips;
  }, [filters]);

  const handleDirections = (provider: Provider) => {
    setFocusedProviderId(provider.id);
    setMobileView("map");
    if (window.innerWidth >= 1024) {
      mapSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleSelectPin = (provider: Provider) => {
    setFocusedProviderId(provider.id);
    const cardEl = document.getElementById(`provider-card-${provider.id}`);
    if (cardEl && window.innerWidth >= 1024) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="py-6 sm:py-10 pb-24 lg:pb-14">
      <Container>
        {/* Top search & sort header */}
        <div className="border-b border-line pb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Directory Search
              </p>
              <h1 className="font-display text-3xl sm:text-4xl text-forest leading-tight mt-1">
                Animal care listings
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <label htmlFor={searchInputId} className="sr-only">
                  Search locality, clinic name, or specialisation
                </label>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <input
                  id={searchInputId}
                  type="search"
                  value={filters.query}
                  onChange={(e) => updateFilters({ query: e.target.value })}
                  placeholder="Area, clinic, or service..."
                  className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper pl-9 pr-3 py-2 text-sm text-forest placeholder:text-muted/80 focus:border-forest"
                />
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor={sortSelectId}
                  className="text-xs font-medium text-muted whitespace-nowrap"
                >
                  Sort by
                </label>
                <select
                  id={sortSelectId}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="min-h-[44px] rounded-md border border-line-strong bg-paper px-3 py-2 text-sm text-forest focus:border-forest"
                >
                  <option value="nearest">Nearest</option>
                  <option value="top-rated">Top rated</option>
                  <option value="open-first">Open now first</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result count & active filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              aria-live="polite"
              className="text-sm font-medium text-forest/85"
            >
              Showing {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "provider" : "providers"}
            </p>

            {/* Mobile List / Map toggle */}
            <div
              role="group"
              aria-label="Mobile view switch"
              className="inline-flex lg:hidden items-center rounded-md border border-line-strong bg-sand/55 p-0.5"
            >
              <button
                type="button"
                aria-pressed={mobileView === "list"}
                onClick={() => setMobileView("list")}
                className={clsx(
                  "inline-flex min-h-[36px] items-center gap-1.5 rounded-[4px] px-3 text-xs font-medium transition-colors cursor-pointer",
                  mobileView === "list"
                    ? "bg-forest text-paper"
                    : "text-forest/85"
                )}
              >
                <List className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>List</span>
              </button>
              <button
                type="button"
                aria-pressed={mobileView === "map"}
                onClick={() => setMobileView("map")}
                className={clsx(
                  "inline-flex min-h-[36px] items-center gap-1.5 rounded-[4px] px-3 text-xs font-medium transition-colors cursor-pointer",
                  mobileView === "map"
                    ? "bg-forest text-paper"
                    : "text-forest/85"
                )}
              >
                <MapIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Map</span>
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <AnimatePresence initial={false}>
                {activeChips.map((chip) => (
                  <motion.button
                    key={chip.key}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.15 }}
                    onClick={chip.onRemove}
                    aria-label={`Remove filter ${chip.label}`}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-line-strong bg-sand/75 px-3 py-1 text-xs font-medium text-forest hover:bg-sand transition-colors cursor-pointer"
                  >
                    <span>{chip.label}</span>
                    <X className="h-3.5 w-3.5 text-muted" strokeWidth={1.5} />
                  </motion.button>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-terracotta-dark hover:text-forest underline underline-offset-4 px-2 py-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          ) : null}
        </div>

        {/* Main 3-column desktop grid / 1-column mobile layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside
            aria-label="Search filters"
            className="hidden lg:block lg:col-span-3 rounded-xl border border-line bg-sand/35 p-5"
          >
            <FilterPanel
              idPrefix="desktop-sidebar"
              filters={filters}
              onChange={updateFilters}
              onClearAll={clearAllFilters}
              activeCount={activeChips.length}
            />
          </aside>

          {/* Centre Results List */}
          <section
            aria-label="Matching providers"
            className={clsx(
              "lg:col-span-5 space-y-4",
              mobileView === "map" ? "hidden lg:block" : "block"
            )}
          >
            {filteredResults.length === 0 ? (
              <EmptyResults
                canWidenDistance={
                  filters.maxDistanceKm !== null && filters.maxDistanceKm < 10
                }
                onWidenDistance={() => updateFilters({ maxDistanceKm: 10 })}
                onClearAll={clearAllFilters}
              />
            ) : (
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filteredResults.map((provider) => {
                    const isHighlighted =
                      hoveredProviderId === provider.id ||
                      focusedProviderId === provider.id;

                    return (
                      <motion.div
                        key={provider.id}
                        id={`provider-card-${provider.id}`}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <ProviderCard
                          variant="full"
                          provider={provider}
                          hoursStatus={
                            hydrated
                              ? (statusMap.get(provider.id) ?? null)
                              : null
                          }
                          isHighlighted={isHighlighted}
                          onHoverStart={(id) => setHoveredProviderId(id)}
                          onHoverEnd={() => setHoveredProviderId(null)}
                          onDirections={handleDirections}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </section>

          {/* Right Panel: Sticky Static SVG Map */}
          <aside
            ref={mapSectionRef}
            aria-label="Provider map"
            className={clsx(
              "lg:col-span-4 lg:sticky lg:top-24",
              mobileView === "map" ? "block" : "hidden lg:block"
            )}
          >
            <StaticCityMap
              providers={filteredResults}
              activeProviderId={hoveredProviderId}
              focusedProviderId={focusedProviderId}
              onHoverPin={(id) => setHoveredProviderId(id)}
              onSelectPin={handleSelectPin}
            />
          </aside>
        </div>
      </Container>

      {/* Mobile sticky bottom Filters / Map bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line-strong bg-paper/95 backdrop-blur-xs px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => setMobileSheetOpen(true)}
            className="flex-1"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
            <span>
              Filters{activeChips.length > 0 ? ` (${activeChips.length})` : ""}
            </span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              setMobileView((prev) => (prev === "list" ? "map" : "list"))
            }
            className="flex-1"
          >
            {mobileView === "list" ? (
              <>
                <MapIcon className="h-4 w-4" strokeWidth={1.5} />
                <span>Map ({filteredResults.length})</span>
              </>
            ) : (
              <>
                <List className="h-4 w-4" strokeWidth={1.5} />
                <span>List ({filteredResults.length})</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <MobileFilterSheet
        isOpen={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onClearAll={clearAllFilters}
        activeCount={activeChips.length}
        resultCount={filteredResults.length}
      />
    </div>
  );
}

export function SearchExperience() {
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();
  const { initialFilters, initialFocusId } = useMemo(() => {
    const parsed = new URLSearchParams(paramsKey);
    return {
      initialFilters: parseInitialFilters(parsed),
      initialFocusId: parsed.get("focus"),
    };
  }, [paramsKey]);

  return (
    <SearchExperienceContent
      key={paramsKey}
      initialFilters={initialFilters}
      initialFocusId={initialFocusId}
    />
  );
}
