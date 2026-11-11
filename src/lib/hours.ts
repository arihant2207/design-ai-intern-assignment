import { TIMEZONE } from "@/lib/config";
import type { DayOfWeek, Provider, TimeRange } from "@/types/provider";

export interface ProviderHoursStatus {
  isOpen: boolean;
  is24x7: boolean;
  todayHoursLabel: string;
  statusLabel: string;
  /** Minutes until the next opening interval (0 if open now, null if no upcoming slots) */
  minutesUntilOpen: number | null;
  nextOpeningLabel: string | null;
}

const WEEKDAY_MAP: Record<string, DayOfWeek> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function parseMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatRanges(ranges: TimeRange[] | null): string {
  if (!ranges || ranges.length === 0) return "Closed today";
  return ranges.map((r) => `${r.open}–${r.close}`).join(", ");
}

/**
 * Extracts current weekday and minutes-from-midnight in Asia/Kolkata.
 */
export function getKolkataClock(now: Date = new Date()): {
  day: DayOfWeek;
  minutesOfDay: number;
} {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayPart = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hourRaw = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const hour = hourRaw === 24 ? 0 : hourRaw;

  return {
    day: WEEKDAY_MAP[weekdayPart] ?? 1,
    minutesOfDay: hour * 60 + minute,
  };
}

function isRangeOpenAt(range: TimeRange, minutesOfDay: number): boolean {
  const start = parseMinutes(range.open);
  const end = parseMinutes(range.close);
  if (end > start) {
    return minutesOfDay >= start && minutesOfDay < end;
  }
  // Handles overnight windows such as 18:00–02:00
  return minutesOfDay >= start || minutesOfDay < end;
}

/**
 * Evaluates live open/closed state in Asia/Kolkata.
 * Must only be used on the client after mount for live labels to avoid SSR hydration mismatches.
 */
export function getProviderHoursStatus(
  provider: Provider,
  now: Date = new Date()
): ProviderHoursStatus {
  if (provider.is24x7) {
    return {
      isOpen: true,
      is24x7: true,
      todayHoursLabel: "Open 24 hours",
      statusLabel: "Open 24x7",
      minutesUntilOpen: 0,
      nextOpeningLabel: null,
    };
  }

  const { day, minutesOfDay } = getKolkataClock(now);
  const todayRanges = provider.hours[day];
  const todayHoursLabel = formatRanges(todayRanges);

  const openNow = Boolean(
    todayRanges?.some((range) => isRangeOpenAt(range, minutesOfDay))
  );

  if (openNow) {
    return {
      isOpen: true,
      is24x7: false,
      todayHoursLabel,
      statusLabel: "Open now",
      minutesUntilOpen: 0,
      nextOpeningLabel: null,
    };
  }

  // Find the soonest upcoming opening time over the next 7 days
  let soonestDelta: number | null = null;
  let soonestLabel: string | null = null;

  for (let offset = 0; offset < 7; offset++) {
    const checkDay = ((day + offset) % 7) as DayOfWeek;
    const ranges = provider.hours[checkDay];
    if (!ranges || ranges.length === 0) continue;

    for (const range of ranges) {
      const startMin = parseMinutes(range.open);
      const delta = offset * 1440 + (startMin - minutesOfDay);
      if (delta > 0 && (soonestDelta === null || delta < soonestDelta)) {
        soonestDelta = delta;
        if (offset === 0) {
          soonestLabel = `Opens ${range.open} IST`;
        } else if (offset === 1) {
          soonestLabel = `Opens tomorrow ${range.open}`;
        } else {
          soonestLabel = `Opens ${range.open} IST`;
        }
      }
    }
  }

  return {
    isOpen: false,
    is24x7: false,
    todayHoursLabel,
    statusLabel: soonestLabel ?? "Closed",
    minutesUntilOpen: soonestDelta,
    nextOpeningLabel: soonestLabel,
  };
}

/**
 * Selects providers for the homepage "Open right now near you" strip.
 * Never returns empty: if fewer than `minCount` are currently open,
 * prioritises open/24x7 and emergency providers first, then providers opening soonest.
 */
export function getOpenShowcaseProviders(
  providers: Provider[],
  now: Date = new Date(),
  minCount = 4
): Array<{ provider: Provider; status: ProviderHoursStatus }> {
  const evaluated = providers.map((provider) => ({
    provider,
    status: getProviderHoursStatus(provider, now),
  }));

  const currentlyOpen = evaluated
    .filter((item) => item.status.isOpen)
    .sort((a, b) => {
      if (a.provider.is24x7 !== b.provider.is24x7) {
        return a.provider.is24x7 ? -1 : 1;
      }
      return a.provider.distanceKm - b.provider.distanceKm;
    });

  if (currentlyOpen.length >= minCount) {
    return currentlyOpen.slice(0, 7);
  }

  const remaining = evaluated
    .filter((item) => !item.status.isOpen)
    .sort((a, b) => {
      // Emergency providers surface ahead of standard closed listings
      if (a.provider.emergencyCare !== b.provider.emergencyCare) {
        return a.provider.emergencyCare ? -1 : 1;
      }
      const aWait = a.status.minutesUntilOpen ?? Number.MAX_SAFE_INTEGER;
      const bWait = b.status.minutesUntilOpen ?? Number.MAX_SAFE_INTEGER;
      if (aWait !== bWait) return aWait - bWait;
      return a.provider.distanceKm - b.provider.distanceKm;
    });

  return [...currentlyOpen, ...remaining].slice(0, Math.max(minCount, 6));
}

