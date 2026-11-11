/**
 * Centralized image slot configuration.
 * Drop licensed photographs under /public/images/ matching the paths below.
 * Server-side resolution in src/lib/images.server.ts automatically activates any
 * file present on disk without causing 404s for missing slots.
 */
export interface ImageSlotConfig {
  path: string;
  alt: string;
  caption?: string;
}

export const IMAGE_SLOTS = {
  heroPrimary: {
    path: "/images/hero-clinic-consultation.jpg",
    alt: "Veterinarian examining a calm Indian pariah dog inside a sunlit clinic room",
    caption: "Routine & preventive care",
  },
  heroSecondaryTop: {
    path: "/images/hero-cat-checkup.jpg",
    alt: "Cat resting comfortably on a linen examination table with a clinician",
    caption: "Feline-friendly handling",
  },
  heroSecondaryBottom: {
    path: "/images/hero-diagnostics.jpg",
    alt: "Clean veterinary diagnostics workstation with microscope and sample trays",
    caption: "In-house diagnostics",
  },
  trustClinic: {
    path: "/images/trust-verification.jpg",
    alt: "Printed clinic registration certificate and appointment ledger on a wooden desk",
    caption: "Verification ledger",
  },
  providerClinic: {
    path: "/images/providers/clinic-default.jpg",
    alt: "Reception and consultation area of a neighbourhood veterinary clinic",
  },
  providerHospital: {
    path: "/images/providers/hospital-default.jpg",
    alt: "Surgical and inpatient monitoring bay inside an animal hospital",
  },
  providerBoarding: {
    path: "/images/providers/boarding-default.jpg",
    alt: "Shaded outdoor courtyard and clean indoor kennels at an animal boarding centre",
  },
  providerDiagnostics: {
    path: "/images/providers/diagnostics-default.jpg",
    alt: "Veterinary diagnostic lab counter with imaging and haematology equipment",
  },
  providerAmbulance: {
    path: "/images/providers/ambulance-default.jpg",
    alt: "Prepared animal rescue ambulance equipped with stretcher and oxygen support",
  },
  providerNgo: {
    path: "/images/providers/ngo-default.jpg",
    alt: "Volunteers caring for rescued dogs and birds at a local animal welfare shelter",
  },
} as const satisfies Record<string, ImageSlotConfig>;

export type ImageSlotId = keyof typeof IMAGE_SLOTS;
