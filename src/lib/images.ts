/**
 * Single manifest for all animal-care photography under /public/images.
 * Each entry defines src, descriptive alt text from visual inspection,
 * and objectPosition to keep the subject centred inside the arch crop.
 */
export interface ImageSlotConfig {
  src: string;
  alt: string;
  objectPosition: string;
}

export const IMAGE_SLOTS = {
  // Hero slots (above the fold, priority loaded)
  heroPrimary: {
    src: "/images/hero-cat.jpg",
    alt: "Close-up portrait of an orange tabby cat looking attentively upward",
    objectPosition: "50% 35%",
  },
  heroSecondaryTop: {
    src: "/images/hero-dog-checkup.jpg",
    alt: "Veterinarian in a white lab coat gently examining a small brown dog on an exam mat",
    objectPosition: "52% 28%",
  },
  heroSecondaryBottom: {
    src: "/images/hero-dog.jpg",
    alt: "Portrait of a smiling golden retriever against a deep slate-blue backdrop",
    objectPosition: "50% 32%",
  },

  // Services bento slots (6 distinct photos)
  serviceClinic: {
    src: "/images/vet-stethoscope.webp",
    alt: "Veterinarian in blue gloves listening to a yellow Labrador puppy's heartbeat with a stethoscope",
    objectPosition: "48% 35%",
  },
  serviceHospital: {
    src: "/images/clinic-interior.jpg",
    alt: "Bright veterinary hospital reception area with a wooden slatted desk and indoor plants",
    objectPosition: "50% 48%",
  },
  serviceDiagnostics: {
    src: "/images/clinic-room.webp",
    alt: "Veterinary examination and ultrasound room with stainless steel table and imaging cart",
    objectPosition: "56% 52%",
  },
  serviceBoarding: {
    src: "/images/boarding.jpg",
    alt: "Two caretakers seated on the floor with small dogs in front of numbered indoor boarding kennels",
    objectPosition: "50% 50%",
  },
  serviceAmbulance: {
    src: "/images/vet-hands.jpg",
    alt: "Clinician in teal scrubs steadying a cream puppy while wearing a stethoscope",
    objectPosition: "52% 38%",
  },
  serviceNgo: {
    src: "/images/rescue-street-dog.jpg",
    alt: "Portrait of a calm tan Indian pariah dog outdoors",
    objectPosition: "50% 35%",
  },

  // Trust section
  trustClinic: {
    src: "/images/trust-records.jpg",
    alt: "Veterinary clinician in scrubs holding a pen and reviewing notes on a black clipboard",
    objectPosition: "52% 35%",
  },

  // Provider cards (varied so adjacent cards do not repeat photos)
  providerCatClinic: {
    src: "/images/cat-2.jpg",
    alt: "Brown tabby cat sitting calmly against a warm cream backdrop",
    objectPosition: "50% 52%",
  },
  providerVetStethoscope: {
    src: "/images/vet-stethoscope.webp",
    alt: "Veterinarian examining a yellow Labrador puppy on a clinic table",
    objectPosition: "48% 35%",
  },
  providerVetHands: {
    src: "/images/vet-hands.jpg",
    alt: "Veterinary clinician gently comforting a cream-coated puppy",
    objectPosition: "52% 38%",
  },
  providerClinicInterior: {
    src: "/images/clinic-interior.jpg",
    alt: "Clean veterinary clinic reception and waiting lounge",
    objectPosition: "50% 48%",
  },
  providerDiagnosticsRoom: {
    src: "/images/clinic-room.webp",
    alt: "Veterinary diagnostics and ultrasound examination room",
    objectPosition: "56% 52%",
  },
  providerBoardingKennel: {
    src: "/images/boarding.jpg",
    alt: "Staff caring for dogs inside an indoor pet boarding room",
    objectPosition: "50% 50%",
  },
  providerDaycareYard: {
    src: "/images/daycare-playing.jpg",
    alt: "Group of dogs resting together in a fenced outdoor turf daycare yard",
    objectPosition: "48% 45%",
  },
  providerDaycareGarden: {
    src: "/images/daycare-garden.jpg",
    alt: "Two golden dogs playing together on a sunlit green lawn",
    objectPosition: "50% 58%",
  },
  providerIndiePup: {
    src: "/images/indie-dog.jpg",
    alt: "Young tan-and-white Indian pariah dog sitting on an outdoor path",
    objectPosition: "55% 32%",
  },
  providerRescueDog: {
    src: "/images/rescue-street-dog.jpg",
    alt: "Indian street dog looking steadily toward the camera",
    objectPosition: "50% 35%",
  },
  providerRabbit: {
    src: "/images/rabbit.jpg",
    alt: "White rabbit with upright pink ears sitting in green grass",
    objectPosition: "45% 38%",
  },
  providerParrot: {
    src: "/images/parrot.jpg",
    alt: "Blue-and-gold macaw parrot perched in profile against a warm timber backdrop",
    objectPosition: "52% 52%",
  },
} as const satisfies Record<string, ImageSlotConfig>;

export type ImageSlotId = keyof typeof IMAGE_SLOTS;
