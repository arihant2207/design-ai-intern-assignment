"use client";

import { ArrowRight, FileText, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import {
  HERO_AUDIENCE_VARIANTS,
  HERO_WEEK_PLAN,
  TOOLS_COVERED,
  WHATSAPP_SAMPLE_URL,
  type HeroAudienceKey,
} from "@/lib/academy-config";

interface HeroProps {
  audience: HeroAudienceKey;
  onAudienceChange: (audience: HeroAudienceKey) => void;
  onOpenSyllabusModal: () => void;
  onSelectWeek: (week: string) => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({
  audience,
  onAudienceChange,
  onOpenSyllabusModal,
  onSelectWeek,
}: HeroProps) {
  const activeAudience = HERO_AUDIENCE_VARIANTS[audience];

  return (
    <section
      id="top"
      className="academy-grid-paper border-b border-[var(--academy-line)]"
    >
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left asymmetric column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Disclosure 1 of 3 */}
            <motion.p
              variants={staggerItem}
              className="academy-mono mb-4 inline-flex items-center gap-2 border border-[var(--academy-line)] bg-[var(--academy-surface)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]"
            >
              Practical Cohorts · Sample Curriculum
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="academy-display text-4xl font-bold leading-[1.05] text-[var(--academy-ink)] sm:text-5xl lg:text-[3.5rem]"
            >
              Learn AI by{" "}
              <span className="academy-chalk-mark academy-chalk-draw">
                building
              </span>{" "}
              real things you can actually use at work.
            </motion.h1>

            {/* Audience segmented control */}
            <motion.div
              variants={staggerItem}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <span
                id="hero-audience-label"
                className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]"
              >
                I&apos;m a:
              </span>
              <div
                role="group"
                aria-labelledby="hero-audience-label"
                className="inline-flex rounded-md border border-[var(--academy-line)] bg-[var(--academy-surface)] p-1"
              >
                {(["student", "professional"] as const).map((key) => {
                  const item = HERO_AUDIENCE_VARIANTS[key];
                  const selected = audience === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onAudienceChange(key)}
                      className={`min-h-[44px] rounded px-3.5 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "bg-[var(--academy-ink)] text-[var(--academy-paper)]"
                          : "text-[var(--academy-muted)] hover:text-[var(--academy-ink)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.p
              variants={staggerItem}
              aria-live="polite"
              className="mt-4 max-w-xl text-base leading-relaxed text-[var(--academy-muted)] sm:text-lg"
            >
              {activeAudience.supportingLine}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                href="#register"
                whileTap={{ scale: 0.985 }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[var(--academy-cobalt)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)]"
              >
                Enquire now
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                onClick={onOpenSyllabusModal}
                whileTap={{ scale: 0.985 }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-surface)] px-5 py-3 text-sm font-semibold text-[var(--academy-ink)] transition-colors hover:border-[var(--academy-ink)] hover:bg-[var(--academy-surface-alt)]"
              >
                <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Download syllabus
              </motion.button>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1"
            >
              <p className="academy-mono text-xs text-[var(--academy-muted)]">
                Next batch announced on enquiry · Fee shared on enquiry
              </p>
              {/* Links to a clearly fake sample WhatsApp number for prototype demo */}
              <a
                href={WHATSAPP_SAMPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (opens sample WhatsApp link)"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--academy-cobalt)] hover:underline"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right notebook-style week plan card (keeps 2px border + hard offset shadow) */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            aria-label="6-week plan overview"
            className="lg:col-span-5"
          >
            <div className="rounded-lg border-2 border-[var(--academy-ink)] bg-[var(--academy-surface)] shadow-[4px_4px_0_0_#0E1116]">
              <div className="flex items-center justify-between rounded-t-md border-b border-[var(--academy-line)] bg-[var(--academy-surface-alt)] px-4 py-3">
                <span className="academy-mono text-xs font-semibold uppercase tracking-wider text-[var(--academy-ink)]">
                  Week Plan
                </span>
                <span className="academy-mono text-xs text-[var(--academy-muted)]">
                  6 weeks
                </span>
              </div>

              <div className="divide-y divide-[var(--academy-line)]">
                {HERO_WEEK_PLAN.map((row) => (
                  <button
                    key={row.week}
                    type="button"
                    onClick={() => onSelectWeek(row.week)}
                    className="grid w-full grid-cols-[64px_1fr_auto] items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--academy-paper)]"
                  >
                    <span className="academy-mono text-xs font-medium text-[var(--academy-cobalt)]">
                      {row.week}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[var(--academy-ink)]">
                        {row.label}
                      </span>
                      <span className="block text-xs text-[var(--academy-muted)]">
                        Output: {row.deliverable}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-[var(--academy-muted)]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <div className="rounded-b-md border-t border-[var(--academy-line)] bg-[var(--academy-paper)] px-4 py-1">
                <a
                  href="#syllabus"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-[var(--academy-cobalt)] hover:underline"
                >
                  Inspect full syllabus
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Plain tool-names strip */}
        <div className="mt-12 border-t border-[var(--academy-line)] pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="academy-mono text-xs uppercase tracking-wider text-[var(--academy-muted)]">
              Tools covered across tracks
            </span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {TOOLS_COVERED.map((tool) => (
                <li
                  key={tool}
                  className="text-sm font-medium text-[var(--academy-ink)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
