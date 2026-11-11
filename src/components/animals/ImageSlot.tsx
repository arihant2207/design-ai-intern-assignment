"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { IMAGE_SLOTS, type ImageSlotId } from "@/lib/images";
import { useResolvedImageSrc } from "./ImageRegistryContext";

export type ImageAspectRatio = "4/3" | "3/4" | "16/10" | "1/1" | "5/4" | "3/2";
export type ImageTone = "forest-sand" | "sand-forest" | "deep-sand";

const aspectClasses: Record<ImageAspectRatio, string> = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "3/2": "aspect-[3/2]",
};

const toneStyles: Record<ImageTone, { bg: string; stroke: string }> = {
  "forest-sand": {
    bg: "bg-sand",
    stroke: "#1F3A2E",
  },
  "sand-forest": {
    bg: "bg-forest",
    stroke: "#E8DFCB",
  },
  "deep-sand": {
    bg: "bg-forest-deep",
    stroke: "#E8DFCB",
  },
};

export interface ImageSlotProps {
  aspectRatio: ImageAspectRatio;
  alt?: string;
  src?: string;
  slotId?: ImageSlotId;
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
  tone?: ImageTone;
  className?: string;
}

/**
 * Editorial arch-cropped image slot.
 * Renders a Next/Image inside the arch mask when a valid image path is available,
 * and falls back cleanly to the duotone arch placeholder if missing or errored.
 */
export function ImageSlot({
  aspectRatio,
  alt,
  src,
  slotId,
  objectPosition,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  tone = "forest-sand",
  className,
}: ImageSlotProps) {
  const slotMeta = slotId ? IMAGE_SLOTS[slotId] : undefined;
  const diskSrc = useResolvedImageSrc(slotId);
  const candidateSrc = src ?? diskSrc;

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolvedSrc =
    candidateSrc && candidateSrc !== failedSrc ? candidateSrc : undefined;

  const resolvedAlt = alt || slotMeta?.alt || "Animal care photograph";
  const resolvedPosition =
    objectPosition ?? slotMeta?.objectPosition ?? "50% 50%";
  const style = toneStyles[tone];

  return (
    <div
      role={resolvedSrc ? undefined : "img"}
      aria-label={resolvedSrc ? undefined : resolvedAlt}
      data-image-path={slotMeta?.src}
      className={clsx(
        "relative overflow-hidden rounded-t-[999px] rounded-b-lg border border-line select-none",
        aspectClasses[aspectRatio],
        style.bg,
        className
      )}
    >
      {resolvedSrc ? (
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: resolvedPosition }}
          onError={() => setFailedSrc(resolvedSrc)}
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 400 320"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M 52 292 L 52 162 A 148 148 0 0 1 348 162 L 348 292"
            fill="none"
            stroke={style.stroke}
            strokeOpacity="0.18"
            strokeWidth="1.25"
          />
          <path
            d="M 104 292 L 104 166 A 96 96 0 0 1 296 166 L 296 292 Z"
            fill={style.stroke}
            fillOpacity="0.09"
            stroke={style.stroke}
            strokeOpacity="0.24"
            strokeWidth="1.25"
          />
          <path
            d="M 32 258 Q 124 212 216 254 T 368 242"
            fill="none"
            stroke={style.stroke}
            strokeOpacity="0.22"
            strokeWidth="1.25"
          />
          <circle
            cx="200"
            cy="128"
            r="34"
            fill={style.stroke}
            fillOpacity="0.08"
            stroke={style.stroke}
            strokeOpacity="0.22"
            strokeWidth="1.25"
          />
        </svg>
      )}
    </div>
  );
}
