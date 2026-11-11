"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { clsx } from "clsx";
import { SERVICE_LABEL_MAP } from "@/lib/config";
import { getProviderHoursStatus, type ProviderHoursStatus } from "@/lib/hours";
import type { Provider } from "@/types/provider";
import { useCorrectionModal } from "./CorrectionContext";
import { ImageSlot } from "./ImageSlot";
import { Badge } from "./Primitives";
import { useIsHydrated } from "./useHydrated";

export interface ProviderCardProps {
  provider: Provider;
  variant?: "full" | "compact";
  /** Optional precomputed live status (when evaluated in parent list) */
  hoursStatus?: ProviderHoursStatus | null;
  /** Highlights card when its corresponding map pin is hovered or focused */
  isHighlighted?: boolean;
  onHoverStart?: (providerId: string) => void;
  onHoverEnd?: () => void;
  /** In-page map pin focus handler used on /animals/search */
  onDirections?: (provider: Provider) => void;
  className?: string;
}

export function ProviderCard({
  provider,
  variant = "full",
  hoursStatus,
  isHighlighted = false,
  onHoverStart,
  onHoverEnd,
  onDirections,
  className,
}: ProviderCardProps) {
  const { openCorrection } = useCorrectionModal();
  const hydrated = useIsHydrated();

  const computedStatus =
    hoursStatus !== undefined
      ? hoursStatus
      : hydrated
        ? getProviderHoursStatus(provider)
        : null;

  const telHref = `tel:${provider.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${provider.whatsappDigits}`;
  const isCompact = variant === "compact";

  // Show a single status badge; drop separate "24x7 Care" tag when status already says 24x7
  const showSeparateEmergencyTag =
    !isCompact && provider.emergencyCare && !provider.is24x7;

  return (
    <motion.article
      layout={!isCompact}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onMouseEnter={() => onHoverStart?.(provider.id)}
      onMouseLeave={() => onHoverEnd?.()}
      className={clsx(
        "group flex flex-col justify-between rounded-xl border bg-paper transition-colors",
        isCompact ? "p-4" : "p-4 sm:p-5",
        isHighlighted
          ? "border-terracotta ring-1 ring-terracotta/30 bg-sand/30"
          : "border-line hover:border-forest/40",
        className
      )}
    >
      <div>
        {/* Image & type */}
        <ImageSlot
          aspectRatio="16/10"
          slotId={provider.imageSlot}
          alt={`${provider.name} in ${provider.locality}`}
          tone={
            provider.serviceType === "animal-hospital"
              ? "sand-forest"
              : "forest-sand"
          }
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {SERVICE_LABEL_MAP[provider.serviceType]}
          </span>

          {!isCompact ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {provider.verified ? (
                <Badge tone="verified">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Verified
                </Badge>
              ) : null}

              {showSeparateEmergencyTag ? (
                <Badge tone="emergency">Emergency</Badge>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Name & price band (full only) */}
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-forest leading-snug tracking-tight">
            {provider.name}
          </h3>
          {!isCompact ? (
            <span
              aria-label={`Price band ${provider.priceBand}`}
              className="shrink-0 rounded border border-line bg-sand/60 px-2 py-0.5 text-xs font-semibold text-forest"
            >
              {provider.priceBand}
            </span>
          ) : null}
        </div>

        {/* Rating & distance */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-forest/85">
          <span className="inline-flex items-center gap-1 font-medium">
            <Star
              className="h-3.5 w-3.5 text-saffron fill-saffron"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {provider.rating.toFixed(1)}
            <span className="text-muted font-normal">
              ({provider.reviewCount})
            </span>
          </span>
          <span aria-hidden="true" className="text-line-strong">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {provider.locality} · {provider.distanceKm.toFixed(1)} km
          </span>
        </div>

        {/* Specialisations (full only) */}
        {!isCompact ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.specialisations.slice(0, 3).map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded border border-line bg-sand/45 px-2 py-0.5 text-xs text-forest/90"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {/* Single non-duplicated hours status */}
        <div className="mt-3.5 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-2">
          {!isCompact && computedStatus && !computedStatus.is24x7 ? (
            <div className="flex items-center gap-1.5 text-xs text-forest/85 min-w-0">
              <Clock
                className="h-3.5 w-3.5 text-muted shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{computedStatus.todayHoursLabel}</span>
            </div>
          ) : (
            <span className="text-xs text-muted">
              {isCompact ? "Availability" : "Schedule"}
            </span>
          )}

          {computedStatus ? (
            <Badge tone={computedStatus.isOpen ? "open" : "closed"}>
              {computedStatus.isOpen ? (
                <span
                  className="h-2 w-2 rounded-full bg-saffron"
                  aria-hidden="true"
                />
              ) : null}
              {computedStatus.statusLabel}
            </Badge>
          ) : (
            <Badge tone="neutral">Hours in IST</Badge>
          )}
        </div>

        {/* Languages & Animals (full only) */}
        {!isCompact ? (
          <p className="mt-2.5 text-xs text-muted">
            Treats {provider.animals.join(", ")} · Speaks{" "}
            {provider.languages.join(", ")}
          </p>
        ) : null}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3.5 border-t border-line space-y-2.5">
        <div
          className={clsx(
            "grid gap-2",
            isCompact ? "grid-cols-2" : "grid-cols-3"
          )}
        >
          <a
            href={telHref}
            aria-label={`Call ${provider.name} at ${provider.phone}`}
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-line-strong bg-paper px-2.5 text-xs font-medium text-forest hover:bg-sand transition-colors"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            <span>Call</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message ${provider.name} on WhatsApp`}
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-line-strong bg-paper px-2.5 text-xs font-medium text-forest hover:bg-sand transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            <span>WhatsApp</span>
          </a>

          {!isCompact ? (
            onDirections ? (
              <button
                type="button"
                onClick={() => onDirections(provider)}
                aria-label={`Show ${provider.name} on the map`}
                className={clsx(
                  "inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors cursor-pointer",
                  isHighlighted
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-line-strong bg-sand/60 text-forest hover:bg-forest hover:text-paper hover:border-forest"
                )}
              >
                <Navigation className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                <span>Directions</span>
              </button>
            ) : (
              <Link
                href={`/animals/search?focus=${provider.id}`}
                aria-label={`Show ${provider.name} on the search map`}
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-line-strong bg-sand/60 px-2.5 text-xs font-medium text-forest hover:bg-forest hover:text-paper hover:border-forest transition-colors"
              >
                <Navigation className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                <span>Directions</span>
              </Link>
            )
          ) : null}
        </div>

        {!isCompact ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => openCorrection(provider.name)}
              className="text-xs text-muted hover:text-terracotta-dark underline underline-offset-4 transition-colors cursor-pointer py-1"
            >
              Submit a Correction
            </button>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
