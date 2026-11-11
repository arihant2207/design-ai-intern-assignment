"use client";

import { motion } from "motion/react";
import { FileCheck2, RefreshCw, ShieldCheck } from "lucide-react";
import { useCorrectionModal } from "./CorrectionContext";
import { ImageSlot } from "./ImageSlot";
import { Button, Container, HairlineRule, SectionHeader } from "./Primitives";

const TRUST_PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Planned phone & address confirmation",
    body: "The Verified indicator is designed to mark clinics, labs, and shelters whose active phone number, street address, and service scope have been directly confirmed.",
  },
  {
    icon: FileCheck2,
    title: "Relevance-first ordering as a design principle",
    body: "Search and emergency lists are intended to rank around distance, live IST opening status, and matching care type—keeping verification status distinct from search placement.",
  },
  {
    icon: RefreshCw,
    title: "Community correction loop",
    body: "Clinic hours shift during festivals, monsoons, and staff leave. Every listing card and the footer carry a Submit a Correction link so visitors can flag outdated details.",
  },
] as const;

export function TrustSection() {
  const { openCorrection } = useCorrectionModal();

  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <HairlineRule withArch className="mb-14 sm:mb-18" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <ImageSlot
              aspectRatio="4/3"
              slotId="trustClinic"
              tone="sand-forest"
              alt="Printed clinic registration certificate and appointment ledger on a wooden desk"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionHeader
              eyebrow="Verification Approach"
              title="How we plan to verify listings"
              description="Directory trust depends on separating confirmed details from unverified entries and making it straightforward to report stale information."
            />

            <div className="space-y-5 pt-1">
              {TRUST_PRINCIPLES.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex items-start gap-3.5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-sand/70 text-forest mt-0.5">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-forest">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-base text-muted leading-relaxed">
                        {point.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => openCorrection("")}
              >
                Report an outdated listing
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
