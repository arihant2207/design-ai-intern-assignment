"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Container } from "./Primitives";

const PROVIDER_REASONS = [
  {
    title: "Direct calls and WhatsApp inquiries",
    body: "Pet owners and feeders reach your front desk directly with one tap from your listing.",
  },
  {
    title: "Separate OPD, surgery, and holiday hours",
    body: "Publish split morning/evening timings or 24x7 trauma availability so people know when to bring urgent cases.",
  },
  {
    title: "Specific species and lab capabilities",
    body: "Tag avian, exotic, rabbit, or livestock expertise alongside X-ray, ultrasound, or home-visit coverage.",
  },
] as const;

export function ForProvidersBand() {
  const [requested, setRequested] = useState(false);

  return (
    <section
      id="for-providers"
      className="bg-forest-deep text-paper scroll-mt-20 border-t border-forest"
    >
      <Container className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">
              For Clinics, Labs &amp; Shelters
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-paper leading-[1.1] tracking-tight">
              Run a practice or rescue nearby?
            </h2>
            <p className="text-base text-sand/85 leading-relaxed">
              Keep your clinic hours, phone numbers, and species coverage
              accurate for pet owners and local feeders.
            </p>

            {requested ? (
              <div className="rounded-lg border border-sand/25 bg-forest p-4 text-sm text-sand space-y-1.5">
                <p className="inline-flex items-center gap-2 font-medium text-paper">
                  <CheckCircle2 className="h-4 w-4 text-saffron" strokeWidth={1.5} />
                  Listing onboarding preview
                </p>
                <p className="text-sand/85 leading-relaxed">
                  Provider sign-up is a visual preview in this front-end
                  prototype. No form or request was sent over the network.
                </p>
              </div>
            ) : (
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setRequested(true)}
                >
                  <span>List Your Business</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pt-2">
            {PROVIDER_REASONS.map((reason, index) => (
              <div
                key={reason.title}
                className="border-t border-sand/20 pt-4 space-y-2"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-saffron">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl text-paper leading-snug">
                  {reason.title}
                </h3>
                <p className="text-base text-sand/80 leading-relaxed">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
