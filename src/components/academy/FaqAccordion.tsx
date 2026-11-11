"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FAQS } from "@/lib/academy-config";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("prerequisites");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-[var(--academy-line)] bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
              Frequently Asked Questions
            </p>
            <h2
              id="faq-heading"
              className="academy-display mt-2 text-3xl font-bold text-[var(--academy-ink)] sm:text-4xl"
            >
              Clear answers before you enquire.
            </h2>
            <p className="mt-3 text-base text-[var(--academy-muted)]">
              Anything not covered here—including exact cohort dates and fee
              details—can be asked directly in the enquiry form below.
            </p>
          </div>

          <div className="divide-y divide-[var(--academy-line)] border-y border-[var(--academy-line)] lg:col-span-8">
            {FAQS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const triggerId = `faq-trigger-${item.id}`;

              return (
                <div key={item.id}>
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[var(--academy-cobalt)]"
                    >
                      <span className="text-base font-semibold text-[var(--academy-ink)] sm:text-lg">
                        {item.question}
                      </span>
                      <span className="shrink-0 text-[var(--academy-ink)]">
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        )}
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
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-base leading-relaxed text-[var(--academy-muted)]">
                          {item.answer}
                        </p>
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
