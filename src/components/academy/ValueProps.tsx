"use client";

import { motion } from "motion/react";
import { VALUE_PROPS } from "@/lib/academy-config";

export function ValueProps() {
  return (
    <section
      aria-labelledby="value-props-heading"
      className="border-b border-[var(--academy-line)] bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
            How the programme works
          </p>
          <h2
            id="value-props-heading"
            className="academy-display mt-2 text-2xl font-bold text-[var(--academy-ink)] sm:text-3xl"
          >
            Built around real output, not video playlists.
          </h2>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[var(--academy-line)] border-y border-[var(--academy-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {VALUE_PROPS.map((item, idx) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="py-6 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <span className="academy-mono text-xs font-medium text-[var(--academy-cobalt)]">
                {item.code}
              </span>
              <h3 className="academy-display mt-2 text-xl font-bold text-[var(--academy-ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--academy-muted)]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
