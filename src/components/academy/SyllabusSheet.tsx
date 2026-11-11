"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SYLLABUS_META, SYLLABUS_WEEKS } from "@/lib/academy-config";

interface SyllabusSheetProps {
  openWeeks: Record<string, boolean>;
  onToggleWeek: (week: string) => void;
  onToggleAll: () => void;
}

export function SyllabusSheet({
  openWeeks,
  onToggleWeek,
  onToggleAll,
}: SyllabusSheetProps) {
  const allExpanded = SYLLABUS_WEEKS.every((item) => openWeeks[item.week]);

  return (
    <section
      id="syllabus"
      aria-labelledby="syllabus-heading"
      className="border-b border-[var(--academy-line)] bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
              Syllabus Sheet
            </span>
            <h2
              id="syllabus-heading"
              className="academy-display mt-2 text-3xl font-bold text-[var(--academy-ink)] sm:text-4xl"
            >
              Six weeks from structured prompts to a shipped project.
            </h2>
            {/* Disclosure 2 of 3 */}
            <p className="academy-mono mt-2 text-xs text-[var(--academy-muted)]">
              {SYLLABUS_META.caption}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleAll}
            className="academy-mono inline-flex min-h-[44px] self-start items-center rounded-md border border-[var(--academy-line)] bg-[var(--academy-surface)] px-3.5 py-2 text-xs font-medium text-[var(--academy-ink)] transition-colors hover:border-[var(--academy-line-strong)] md:self-auto"
          >
            {allExpanded ? "Collapse all weeks" : "Expand all weeks"}
          </button>
        </div>

        {/* Ruled notebook-sheet container with 1px hairline rules */}
        <div className="mt-8 overflow-hidden rounded-lg border border-[var(--academy-line)] bg-[var(--academy-surface)]">
          <div className="academy-mono hidden grid-cols-[96px_1fr_180px_44px] items-center border-b border-[var(--academy-line)] bg-[var(--academy-paper)] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)] sm:grid">
            <span>Week</span>
            <span>Module focus</span>
            <span>Primary tools</span>
            <span className="sr-only">Toggle</span>
          </div>

          <div className="divide-y divide-[var(--academy-line)]">
            {SYLLABUS_WEEKS.map((item) => {
              const isOpen = Boolean(openWeeks[item.week]);
              const slug = item.week.replace(/\s+/g, "-").toLowerCase();
              const panelId = `syllabus-panel-${slug}`;
              const triggerId = `syllabus-trigger-${slug}`;

              return (
                <div key={item.week} className="bg-[var(--academy-surface)]">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => onToggleWeek(item.week)}
                      className="grid w-full grid-cols-[72px_1fr_32px] items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[var(--academy-paper)] sm:grid-cols-[96px_1fr_180px_44px] sm:px-5 sm:py-5"
                    >
                      <span className="academy-mono text-xs font-semibold text-[var(--academy-cobalt)] sm:text-sm">
                        {item.week}
                      </span>

                      <span className="min-w-0">
                        <span className="academy-display block text-lg font-bold text-[var(--academy-ink)] sm:text-xl">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-sm font-normal text-[var(--academy-muted)] sm:hidden">
                          {item.tools.join(" · ")}
                        </span>
                      </span>

                      <span className="academy-mono hidden text-xs text-[var(--academy-muted)] sm:block">
                        {item.tools.join(" · ")}
                      </span>

                      <span className="flex justify-end">
                        <ChevronDown
                          className={`h-5 w-5 text-[var(--academy-ink)] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--academy-line)] bg-[var(--academy-paper)] px-4 pb-5 pt-4 sm:px-5 sm:pl-[116px]">
                          <p className="max-w-2xl text-base text-[var(--academy-ink)]">
                            {item.summary}
                          </p>

                          <ul className="mt-3 space-y-1.5">
                            {item.topics.map((topic) => (
                              <li
                                key={topic}
                                className="flex items-start gap-2.5 text-sm text-[var(--academy-muted)]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="academy-mono mt-0.5 text-xs text-[var(--academy-ink)]"
                                >
                                  —
                                </span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded border border-[var(--academy-line)] bg-[var(--academy-surface)] px-3 py-1.5 text-xs">
                            <span className="academy-mono font-semibold uppercase text-[var(--academy-cobalt)]">
                              Weekly output:
                            </span>
                            <span className="text-sm font-medium text-[var(--academy-ink)]">
                              {item.artifact}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
