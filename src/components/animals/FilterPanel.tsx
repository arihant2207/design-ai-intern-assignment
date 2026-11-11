"use client";

import { clsx } from "clsx";
import {
  ANIMAL_TYPES,
  SERVICE_DEFINITIONS,
  type AnimalType,
  type ServiceType,
} from "@/lib/config";
import type { LanguageSpoken, PriceBand, SearchFilters } from "@/types/provider";

const DISTANCE_OPTIONS: ReadonlyArray<1 | 3 | 5 | 10> = [1, 3, 5, 10];
const RATING_OPTIONS: ReadonlyArray<3.5 | 4 | 4.5> = [3.5, 4, 4.5];
const LANGUAGE_VALUES: readonly LanguageSpoken[] = [
  "English",
  "Hindi",
  "Gujarati",
];
const PRICE_BANDS: readonly PriceBand[] = ["₹", "₹₹", "₹₹₹"];

export interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onClearAll: () => void;
  activeCount: number;
  idPrefix: string;
}

export function FilterPanel({
  filters,
  onChange,
  onClearAll,
  activeCount,
  idPrefix,
}: FilterPanelProps) {
  const serviceSelectId = `${idPrefix}-service`;
  const animalSelectId = `${idPrefix}-animal`;
  const languageSelectId = `${idPrefix}-language`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-line">
        <h2 className="font-display text-xl text-forest">
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-medium text-terracotta-dark hover:text-forest underline underline-offset-4 cursor-pointer py-1"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {/* Service Type */}
      <div>
        <label
          htmlFor={serviceSelectId}
          className="block text-sm font-medium text-forest mb-1.5"
        >
          Service type
        </label>
        <select
          id={serviceSelectId}
          value={filters.service}
          onChange={(e) =>
            onChange({ service: e.target.value as ServiceType | "" })
          }
          className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper px-3 py-2 text-sm text-forest focus:border-forest"
        >
          <option value="">All services</option>
          {SERVICE_DEFINITIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Animal Type */}
      <div>
        <label
          htmlFor={animalSelectId}
          className="block text-sm font-medium text-forest mb-1.5"
        >
          Animal type
        </label>
        <select
          id={animalSelectId}
          value={filters.animal}
          onChange={(e) =>
            onChange({ animal: e.target.value as AnimalType | "" })
          }
          className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper px-3 py-2 text-sm text-forest focus:border-forest"
        >
          <option value="">All animals</option>
          {ANIMAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Distance */}
      <fieldset>
        <legend className="text-sm font-medium text-forest mb-2">
          Distance radius
        </legend>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={filters.maxDistanceKm === null}
            onClick={() => onChange({ maxDistanceKm: null })}
            className={clsx(
              "min-h-[36px] rounded-md border px-2.5 text-xs font-medium transition-colors cursor-pointer",
              filters.maxDistanceKm === null
                ? "border-forest bg-forest text-paper"
                : "border-line-strong bg-paper text-forest hover:bg-sand/70"
            )}
          >
            Any
          </button>
          {DISTANCE_OPTIONS.map((km) => {
            const active = filters.maxDistanceKm === km;
            return (
              <button
                key={km}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  onChange({ maxDistanceKm: active ? null : km })
                }
                className={clsx(
                  "min-h-[36px] rounded-md border px-2.5 text-xs font-medium transition-colors cursor-pointer",
                  active
                    ? "border-forest bg-forest text-paper"
                    : "border-line-strong bg-paper text-forest hover:bg-sand/70"
                )}
              >
                {km} km
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Availability & Care toggles */}
      <fieldset className="space-y-2.5">
        <legend className="text-sm font-medium text-forest mb-2">
          Hours &amp; care options
        </legend>
        {[
          { key: "openNow" as const, label: "Open now (IST)" },
          { key: "only24x7" as const, label: "Open 24x7" },
          { key: "emergency" as const, label: "Emergency care" },
          { key: "homeVisit" as const, label: "Home visit available" },
          { key: "verifiedOnly" as const, label: "Verified listings only" },
        ].map((item) => {
          const inputId = `${idPrefix}-${item.key}`;
          return (
            <label
              key={item.key}
              htmlFor={inputId}
              className="flex items-center gap-2.5 text-sm text-forest cursor-pointer py-0.5 select-none"
            >
              <input
                id={inputId}
                type="checkbox"
                checked={filters[item.key]}
                onChange={(e) => onChange({ [item.key]: e.target.checked })}
                className="h-4 w-4 rounded border-line-strong accent-terracotta cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          );
        })}
      </fieldset>

      {/* Minimum Rating */}
      <fieldset>
        <legend className="text-sm font-medium text-forest mb-2">
          Minimum rating
        </legend>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={filters.minRating === null}
            onClick={() => onChange({ minRating: null })}
            className={clsx(
              "min-h-[36px] rounded-md border px-2.5 text-xs font-medium transition-colors cursor-pointer",
              filters.minRating === null
                ? "border-forest bg-forest text-paper"
                : "border-line-strong bg-paper text-forest hover:bg-sand/70"
            )}
          >
            Any
          </button>
          {RATING_OPTIONS.map((rating) => {
            const active = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ minRating: active ? null : rating })}
                className={clsx(
                  "min-h-[36px] rounded-md border px-2.5 text-xs font-medium transition-colors cursor-pointer",
                  active
                    ? "border-forest bg-forest text-paper"
                    : "border-line-strong bg-paper text-forest hover:bg-sand/70"
                )}
              >
                {rating}+
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Language */}
      <div>
        <label
          htmlFor={languageSelectId}
          className="block text-sm font-medium text-forest mb-1.5"
        >
          Language spoken
        </label>
        <select
          id={languageSelectId}
          value={filters.language}
          onChange={(e) =>
            onChange({ language: e.target.value as LanguageSpoken | "" })
          }
          className="w-full min-h-[44px] rounded-md border border-line-strong bg-paper px-3 py-2 text-sm text-forest focus:border-forest"
        >
          <option value="">Any language</option>
          {LANGUAGE_VALUES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Price Band */}
      <fieldset>
        <legend className="text-sm font-medium text-forest mb-2">
          Price band
        </legend>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={filters.priceBand === ""}
            onClick={() => onChange({ priceBand: "" })}
            className={clsx(
              "min-h-[36px] rounded-md border px-3 text-xs font-medium transition-colors cursor-pointer",
              filters.priceBand === ""
                ? "border-forest bg-forest text-paper"
                : "border-line-strong bg-paper text-forest hover:bg-sand/70"
            )}
          >
            Any
          </button>
          {PRICE_BANDS.map((band) => {
            const active = filters.priceBand === band;
            return (
              <button
                key={band}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ priceBand: active ? "" : band })}
                className={clsx(
                  "min-h-[36px] rounded-md border px-3 text-xs font-semibold transition-colors cursor-pointer",
                  active
                    ? "border-forest bg-forest text-paper"
                    : "border-line-strong bg-paper text-forest hover:bg-sand/70"
                )}
              >
                {band}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

