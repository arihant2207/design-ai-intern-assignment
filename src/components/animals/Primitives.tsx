import type { ReactNode, ButtonHTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { clsx } from "clsx";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta text-white border border-terracotta hover:bg-terracotta-dark hover:border-terracotta-dark",
  secondary:
    "bg-sand text-forest border border-line-strong hover:bg-forest hover:text-paper hover:border-forest",
  outline:
    "bg-transparent text-forest border border-line-strong hover:bg-sand/70 hover:border-forest/40",
  ghost:
    "bg-transparent text-forest border border-transparent hover:bg-sand/60",
  inverse:
    "bg-paper text-forest-deep border border-paper hover:bg-sand hover:border-sand",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-3.5 py-2 text-sm",
  md: "min-h-[44px] px-5 py-2.5 text-[15px]",
  lg: "min-h-[48px] px-6 py-3 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors whitespace-nowrap",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export type BadgeTone =
  | "neutral"
  | "open"
  | "closed"
  | "verified"
  | "emergency"
  | "saffron";

const badgeToneClasses: Record<BadgeTone, string> = {
  neutral: "bg-sand/85 text-forest border-line",
  open: "bg-paper text-forest border-line-strong",
  closed: "bg-sand/55 text-forest/80 border-line",
  verified: "bg-forest/8 text-forest border-forest/20",
  emergency: "bg-terracotta/12 text-terracotta-dark border-terracotta/30",
  saffron: "bg-saffron text-forest-deep border-saffron",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5",
        badgeToneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted mb-2.5">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl sm:text-4xl text-forest leading-[1.12] tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base text-muted leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/**
 * Editorial rule with an optional centered arch keystone motif.
 */
export function HairlineRule({
  className,
  withArch = false,
}: {
  className?: string;
  withArch?: boolean;
}) {
  if (!withArch) {
    return <hr className={clsx("border-0 border-t border-line", className)} />;
  }

  return (
    <div
      aria-hidden="true"
      className={clsx("flex items-center gap-3", className)}
    >
      <span className="h-px flex-1 bg-line" />
      <svg
        viewBox="0 0 24 14"
        fill="none"
        className="h-3.5 w-6 text-forest/35 shrink-0"
      >
        <path
          d="M2 13V9C2 4.582 6.477 1 12 1C17.523 1 22 4.582 22 9V13"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
