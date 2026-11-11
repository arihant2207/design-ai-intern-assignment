"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Ambulance,
  ArrowUpRight,
  Building2,
  HeartHandshake,
  Home,
  Microscope,
  Stethoscope,
} from "lucide-react";
import { clsx } from "clsx";
import { SERVICE_DEFINITIONS, type ServiceType } from "@/lib/config";
import type { ImageSlotId } from "@/lib/images";
import { ImageSlot } from "./ImageSlot";
import { Container, SectionHeader } from "./Primitives";

const SERVICE_ICONS: Record<ServiceType, typeof Stethoscope> = {
  "vet-clinic": Stethoscope,
  "animal-hospital": Building2,
  "boarding-daycare": Home,
  "diagnostics-lab": Microscope,
  "animal-ambulance": Ambulance,
  "ngo-rescue": HeartHandshake,
};

const BENTO_LAYOUT: Record<
  ServiceType,
  { spanClass: string; surfaceClass: string; tag: string; imageSlot: ImageSlotId }
> = {
  "vet-clinic": {
    spanClass: "md:col-span-7",
    surfaceClass: "bg-paper border-line-strong",
    tag: "Daily appointments & vaccinations",
    imageSlot: "serviceClinic",
  },
  "animal-hospital": {
    spanClass: "md:col-span-5",
    surfaceClass: "bg-forest text-paper border-forest",
    tag: "24x7 trauma & inpatient ICU",
    imageSlot: "serviceHospital",
  },
  "diagnostics-lab": {
    spanClass: "md:col-span-4",
    surfaceClass: "bg-sand/70 border-line",
    tag: "X-ray, ultrasound & blood work",
    imageSlot: "serviceDiagnostics",
  },
  "boarding-daycare": {
    spanClass: "md:col-span-8",
    surfaceClass: "bg-paper border-line",
    tag: "Short stays & post-op recovery",
    imageSlot: "serviceBoarding",
  },
  "animal-ambulance": {
    spanClass: "md:col-span-7",
    surfaceClass: "bg-sand/85 border-line-strong",
    tag: "Equipped street & home pickup",
    imageSlot: "serviceAmbulance",
  },
  "ngo-rescue": {
    spanClass: "md:col-span-5",
    surfaceClass: "bg-paper border-line",
    tag: "Shelters, ABC & bird rescue",
    imageSlot: "serviceNgo",
  },
};

export function ServicesBento() {
  return (
    <section id="services" className="py-14 sm:py-20 scroll-mt-20">
      <Container>
        <SectionHeader
          eyebrow="Care Directory"
          title="Six kinds of animal care, organised clearly"
          description="Choose what your companion or a street animal needs right now—every tile opens filtered results with hours and direct contact."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {SERVICE_DEFINITIONS.map((service) => {
            const Icon = SERVICE_ICONS[service.id];
            const layout = BENTO_LAYOUT[service.id];
            const isDark = service.id === "animal-hospital";

            return (
              <Link
                key={service.id}
                href={`/animals/search?service=${service.id}`}
                className={clsx(
                  "group relative flex flex-col justify-between rounded-xl border p-6 sm:p-7 transition-colors",
                  layout.spanClass,
                  layout.surfaceClass,
                  isDark
                    ? "hover:bg-forest-deep"
                    : "hover:border-forest/45 hover:bg-sand/45"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 min-w-0">
                    <span
                      className={clsx(
                        "inline-flex h-11 w-11 items-center justify-center rounded-lg border",
                        isDark
                          ? "border-paper/20 bg-paper/10 text-paper"
                          : "border-line-strong bg-paper text-forest"
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>

                    <p
                      className={clsx(
                        "inline-flex items-center gap-1 text-xs font-medium",
                        isDark ? "text-sand/90" : "text-muted"
                      )}
                    >
                      <span>{layout.tag}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </p>
                  </div>

                  <div className="w-24 sm:w-28 shrink-0">
                    <ImageSlot
                      aspectRatio="4/3"
                      slotId={layout.imageSlot}
                      sizes="(max-width: 768px) 96px, 112px"
                      tone={isDark ? "deep-sand" : "forest-sand"}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3
                    className={clsx(
                      "font-display text-2xl tracking-tight",
                      isDark ? "text-paper" : "text-forest"
                    )}
                  >
                    {service.label}
                  </h3>
                  <p
                    className={clsx(
                      "mt-2 text-base leading-relaxed max-w-lg",
                      isDark ? "text-sand/90" : "text-forest/80"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
