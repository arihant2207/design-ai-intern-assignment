"use client";

import { motion } from "motion/react";
import { Container, SectionHeader } from "./Primitives";

const STEPS = [
  {
    number: "01",
    title: "Narrow by animal, locality, and urgency",
    detail:
      "Many clinics treat dogs and cats only; others carry avian, rabbit, exotic, or cattle experience. Filter by animal type, service category, and distance from your area.",
  },
  {
    number: "02",
    title: "Verify live hours and languages before leaving",
    detail:
      "Most neighbourhood clinics in India run split morning and evening OPDs. Each card checks current India Standard Time against the day's schedule and shows which languages reception speaks.",
  },
  {
    number: "03",
    title: "Contact the clinic directly—or flag an error",
    detail:
      "Call or message on WhatsApp straight from the listing with zero booking fees. If a timing or phone number has changed, use Submit a Correction on any card.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="How It Works"
              title="Three quiet steps before you travel"
              description="Built for stressful clinic runs—clear schedules and direct numbers first, without account walls."
            />
          </div>

          <motion.ol
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-8 divide-y divide-line border-y border-line"
          >
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline"
              >
                <span className="sm:col-span-2 font-display text-2xl sm:text-3xl text-terracotta-dark tracking-tight">
                  {step.number}
                </span>
                <div className="sm:col-span-10 space-y-2">
                  <h3 className="font-display text-2xl text-forest leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}

