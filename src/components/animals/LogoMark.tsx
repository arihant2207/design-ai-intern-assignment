import { clsx } from "clsx";

/**
 * Simple arch-inspired logomark used beside the wordmark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={clsx("h-6 w-6 shrink-0", className)}
    >
      <path
        d="M5 24V13.5C5 8.253 9.029 4 14 4C18.971 4 23 8.253 23 13.5V24"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 24V14.5C10 12.015 11.791 10 14 10C16.209 10 18 12.015 18 14.5V24"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="3"
        y1="24"
        x2="25"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

