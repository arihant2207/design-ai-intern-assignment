"use client";

import { MapPin, Phone, Star } from "lucide-react";
import { clsx } from "clsx";
import { SERVICE_LABEL_MAP } from "@/lib/config";
import type { Provider } from "@/types/provider";

const LOCALITY_LABELS = [
  { name: "Science City", x: 14, y: 12 },
  { name: "Motera", x: 69, y: 11 },
  { name: "Thaltej", x: 15, y: 24 },
  { name: "Shahibaug", x: 70, y: 24 },
  { name: "Bodakdev", x: 22, y: 34 },
  { name: "Navrangpura", x: 46, y: 37 },
  { name: "Vastrapur", x: 30, y: 42 },
  { name: "CG Road", x: 49, y: 46 },
  { name: "Satellite", x: 24, y: 54 },
  { name: "Paldi", x: 44, y: 69 },
  { name: "Bopal", x: 10, y: 66 },
  { name: "Prahlad Nagar", x: 22, y: 74 },
  { name: "Maninagar", x: 75, y: 79 },
] as const;

export interface StaticCityMapProps {
  providers: Provider[];
  activeProviderId: string | null;
  focusedProviderId: string | null;
  onHoverPin: (id: string | null) => void;
  onSelectPin: (provider: Provider) => void;
}

export function StaticCityMap({
  providers,
  activeProviderId,
  focusedProviderId,
  onHoverPin,
  onSelectPin,
}: StaticCityMapProps) {
  const highlightedId = activeProviderId ?? focusedProviderId;
  const selectedProvider =
    providers.find((p) => p.id === highlightedId) ?? providers[0] ?? null;

  return (
    <div className="rounded-xl border border-line-strong bg-sand/45 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Schematic Area Map
          </p>
          <p className="text-xs text-forest/80 mt-0.5">
            Hover or select a pin to match listings
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-line bg-sand/70 px-2.5 py-0.5 text-xs font-medium text-forest">
          <MapPin className="h-3.5 w-3.5 text-terracotta" strokeWidth={1.5} />
          {providers.length} {providers.length === 1 ? "pin" : "pins"}
        </span>
      </div>

      {/* Static SVG map canvas */}
      <div className="relative aspect-[4/4.2] w-full bg-[#EFE7D5]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* Subtle arterial road grid */}
          <g stroke="#1F3A2E" strokeOpacity="0.09" strokeWidth="0.45">
            <line x1="0" y1="22" x2="100" y2="22" />
            <line x1="0" y1="45" x2="100" y2="45" />
            <line x1="0" y1="68" x2="100" y2="68" />
            <line x1="20" y1="0" x2="20" y2="100" />
            <line x1="42" y1="0" x2="42" y2="100" />
            <line x1="74" y1="0" x2="74" y2="100" />
          </g>

          {/* Outer ring road hint */}
          <ellipse
            cx="46"
            cy="49"
            rx="42"
            ry="41"
            fill="none"
            stroke="#1F3A2E"
            strokeOpacity="0.14"
            strokeWidth="0.6"
            strokeDasharray="1.5 1.5"
          />

          {/* Sabarmati River ribbon */}
          <path
            d="M 60 0 C 57 18, 63 32, 59 50 C 56 66, 62 82, 57 100"
            fill="none"
            stroke="#1F3A2E"
            strokeOpacity="0.2"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M 60 0 C 57 18, 63 32, 59 50 C 56 66, 62 82, 57 100"
            fill="none"
            stroke="#DFD5BF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Subtle river bridges */}
          <g stroke="#1F3A2E" strokeOpacity="0.28" strokeWidth="0.7">
            <line x1="55" y1="30" x2="64" y2="30" />
            <line x1="55" y1="45" x2="63" y2="45" />
            <line x1="54" y1="58" x2="63" y2="58" />
          </g>
        </svg>

        {/* Locality labels */}
        {LOCALITY_LABELS.map((loc) => (
          <span
            key={loc.name}
            aria-hidden="true"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-forest/45 whitespace-nowrap select-none"
          >
            {loc.name}
          </span>
        ))}

        {/* Interactive provider pins */}
        {providers.map((provider, idx) => {
          const isActive = highlightedId === provider.id;
          const isFocused = focusedProviderId === provider.id;

          return (
            <button
              key={provider.id}
              type="button"
              onMouseEnter={() => onHoverPin(provider.id)}
              onMouseLeave={() => onHoverPin(null)}
              onFocus={() => onHoverPin(provider.id)}
              onBlur={() => onHoverPin(null)}
              onClick={() => onSelectPin(provider)}
              aria-label={`${provider.name}, ${provider.locality}, ${provider.distanceKm.toFixed(1)} km`}
              aria-pressed={isFocused}
              style={{
                left: `${provider.coordinates.x}%`,
                top: `${provider.coordinates.y}%`,
              }}
              className={clsx(
                "absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border font-semibold transition-transform cursor-pointer focus-visible:z-30",
                isActive
                  ? "z-20 h-9 min-w-[36px] px-2 bg-terracotta text-white border-paper scale-110 ring-2 ring-terracotta/35 text-xs"
                  : provider.emergencyCare
                    ? "z-10 h-7 min-w-[28px] px-1.5 bg-forest-deep text-paper border-paper/90 hover:scale-110 text-xs"
                    : "z-10 h-7 min-w-[28px] px-1.5 bg-paper text-forest border-forest/45 hover:bg-forest hover:text-paper hover:scale-110 text-xs"
              )}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Selected / highlighted pin readout */}
      {selectedProvider ? (
        <div className="border-t border-line bg-paper p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {focusedProviderId === selectedProvider.id
                  ? "Pinned on map"
                  : SERVICE_LABEL_MAP[selectedProvider.serviceType]}
              </p>
              <p className="font-display text-lg text-forest leading-snug truncate">
                {selectedProvider.name}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-forest shrink-0 pt-0.5">
              <Star
                className="h-3.5 w-3.5 text-saffron fill-saffron"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {selectedProvider.rating.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-xs text-muted">
              {selectedProvider.locality} ·{" "}
              {selectedProvider.distanceKm.toFixed(1)} km
            </span>
            <a
              href={`tel:${selectedProvider.phone.replace(/\s+/g, "")}`}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-line-strong bg-sand/60 px-3 text-xs font-medium text-forest hover:bg-forest hover:text-paper transition-colors"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Call {selectedProvider.phone}</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="border-t border-line bg-paper p-4 text-xs text-muted">
          No matching pins to display on the map.
        </div>
      )}
    </div>
  );
}

