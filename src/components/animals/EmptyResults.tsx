"use client";

import { SearchX } from "lucide-react";
import { Button } from "./Primitives";

export function EmptyResults({
  canWidenDistance,
  onWidenDistance,
  onClearAll,
}: {
  canWidenDistance: boolean;
  onWidenDistance: () => void;
  onClearAll: () => void;
}) {
  return (
    <div className="rounded-xl border border-line-strong bg-sand/40 p-8 sm:p-10 text-center space-y-4">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-t-full rounded-b-md border border-line-strong bg-paper text-forest">
        <SearchX className="h-5 w-5" strokeWidth={1.5} />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="font-display text-2xl text-forest">
          No listings match these filters
        </h2>
        <p className="text-base text-muted leading-relaxed">
          Try widening your distance radius, turning off the live open-now
          filter between morning and evening OPD hours, or resetting all
          filters.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {canWidenDistance ? (
          <Button variant="secondary" size="md" onClick={onWidenDistance}>
            Widen distance to 10 km
          </Button>
        ) : null}
        <Button variant="primary" size="md" onClick={onClearAll}>
          Clear all filters
        </Button>
      </div>
    </div>
  );
}

