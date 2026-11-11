"use client";

import { motion } from "motion/react";
import { SAMPLE_PROJECTS } from "@/lib/academy-config";

export function ProjectShowcase() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="border-b border-[var(--academy-line)] bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
            What You&apos;ll Build
          </p>
          <h2
            id="projects-heading"
            className="academy-display mt-2 text-3xl font-bold text-[var(--academy-ink)] sm:text-4xl"
          >
            Four concrete work artifacts you leave with.
          </h2>
          <p className="mt-3 text-base text-[var(--academy-muted)]">
            Instead of generic prompt logs, every cohort focuses on structured
            deliverables you can show a hiring manager or put straight to work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SAMPLE_PROJECTS.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="flex flex-col justify-between rounded-lg border border-[var(--academy-line)] bg-[var(--academy-surface)] p-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="academy-mono text-xs font-semibold text-[var(--academy-cobalt)]">
                    {project.tag}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="academy-mono rounded border border-[var(--academy-line)] bg-[var(--academy-paper)] px-2 py-0.5 text-xs text-[var(--academy-ink)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="academy-display mt-3 text-2xl font-bold text-[var(--academy-ink)]">
                  {project.title}
                </h3>
                <p className="mt-2 text-base text-[var(--academy-muted)]">
                  {project.description}
                </p>
              </div>

              {/* Typographic UI snippet block (13px+ high-contrast text, 1px hairline border) */}
              <div
                aria-label={`${project.title} structural snippet`}
                className="mt-6 overflow-hidden rounded border border-[var(--academy-line)] bg-[var(--academy-paper)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--academy-line)] bg-[var(--academy-surface)] px-3.5 py-2">
                  <span className="academy-mono text-[13px] font-semibold text-[var(--academy-ink)]">
                    {project.snippetHeader}
                  </span>
                  <span
                    aria-hidden="true"
                    className="academy-mono text-xs font-medium text-[var(--academy-ink)]"
                  >
                    SPEC
                  </span>
                </div>
                <dl className="divide-y divide-[var(--academy-line)] px-3.5 py-1">
                  {project.snippetLines.map((line) => (
                    <div
                      key={line.label}
                      className="grid grid-cols-[84px_1fr] items-baseline gap-2 py-2 text-[13px]"
                    >
                      <dt className="academy-mono font-semibold text-[var(--academy-ink)]">
                        {line.label}
                      </dt>
                      <dd
                        className={`academy-mono ${
                          line.accent
                            ? "font-semibold text-[#1D32CC]"
                            : "text-[var(--academy-ink)]"
                        }`}
                      >
                        {line.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
