"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { TRACKS } from "@/lib/academy-config";

interface ProgrammeTracksProps {
  onSelectTrack: (trackId: string) => void;
}

export function ProgrammeTracks({ onSelectTrack }: ProgrammeTracksProps) {
  const [leadTrack, secondTrack, thirdTrack] = TRACKS;

  return (
    <section
      id="programmes"
      aria-labelledby="tracks-heading"
      className="border-b border-[var(--academy-line)] bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
              Programme Tracks
            </p>
            <h2
              id="tracks-heading"
              className="academy-display mt-2 text-3xl font-bold text-[var(--academy-ink)] sm:text-4xl"
            >
              Three focused tracks for different starting points.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--academy-muted)]">
            Pick one track as your primary focus or mention multiple interests
            when you request batch details.
          </p>
        </div>

        {/* Non-uniform layout: featured dark ink lead card + staggered 7/5 paper pair */}
        <div className="mt-10 space-y-6">
          {/* Featured wide lead track on ink (#0E1116) background with paper text */}
          {leadTrack && (
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-[var(--academy-ink)] bg-[var(--academy-ink)] p-6 text-[var(--academy-paper)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <span className="academy-mono text-xs font-semibold text-[var(--academy-chalk)]">
                    {leadTrack.code}
                  </span>

                  <h3 className="academy-display mt-3 text-2xl font-bold text-[var(--academy-paper)] sm:text-3xl">
                    {leadTrack.name}
                  </h3>
                  <p className="mt-3 text-base text-[#D4D7DD]">
                    {leadTrack.summary}
                  </p>

                  <p className="mt-5 border-l-2 border-[var(--academy-cobalt)] pl-4 text-sm text-[var(--academy-paper)]">
                    <span className="academy-mono text-xs uppercase text-[#B5BAC4]">
                      For:{" "}
                    </span>
                    <span className="font-medium">{leadTrack.forWhom}</span>
                  </p>
                </div>

                <div className="flex flex-col justify-between lg:col-span-6 lg:border-l lg:border-white/15 lg:pl-8">
                  <div>
                    <ul className="space-y-3">
                      {leadTrack.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-sm text-[var(--academy-paper)]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--academy-chalk)]"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {leadTrack.focusTools.map((tool) => (
                        <span
                          key={tool}
                          className="academy-mono rounded border border-white/20 bg-white/5 px-2.5 py-0.5 text-xs text-[var(--academy-paper)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => onSelectTrack(leadTrack.id)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[var(--academy-cobalt)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)] sm:w-auto"
                    >
                      {leadTrack.ctaLabel}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Asymmetric 7 / 5 split on paper background with 1px hairline borders */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {[
              { track: secondTrack, span: "lg:col-span-7", delay: 0.05 },
              { track: thirdTrack, span: "lg:col-span-5", delay: 0.1 },
            ].map(({ track, span, delay }) =>
              track ? (
                <motion.article
                  key={track.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay }}
                  className={`flex flex-col justify-between rounded-lg border border-[var(--academy-line)] bg-[var(--academy-paper)] p-6 sm:p-7 ${span}`}
                >
                  <div>
                    <span className="academy-mono text-xs font-semibold text-[var(--academy-cobalt)]">
                      {track.code}
                    </span>

                    <h3 className="academy-display mt-2.5 text-2xl font-bold text-[var(--academy-ink)]">
                      {track.name}
                    </h3>
                    <p className="mt-2.5 text-base text-[var(--academy-muted)]">
                      {track.summary}
                    </p>

                    <p className="mt-4 text-sm text-[var(--academy-ink)]">
                      <span className="academy-mono text-xs uppercase text-[var(--academy-muted)]">
                        For:{" "}
                      </span>
                      <span className="font-medium">{track.forWhom}</span>
                    </p>

                    <ul className="mt-4 space-y-2.5 border-t border-[var(--academy-line)] pt-4">
                      {track.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-sm text-[var(--academy-ink)]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--academy-cobalt)]"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {track.focusTools.map((tool) => (
                        <span
                          key={tool}
                          className="academy-mono rounded border border-[var(--academy-line)] bg-[var(--academy-surface)] px-2.5 py-0.5 text-xs text-[var(--academy-ink)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--academy-line)] pt-5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => onSelectTrack(track.id)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[var(--academy-cobalt)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)] sm:w-auto"
                    >
                      {track.ctaLabel}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </motion.button>
                  </div>
                </motion.article>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
