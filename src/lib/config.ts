export const BRAND_NAME = "Practo for Animals";
export const SAMPLE_CITY = "Ahmedabad";
export const SAMPLE_LOCATION_FILL = `Navrangpura, ${SAMPLE_CITY}`;
export const TIMEZONE = "Asia/Kolkata";

export type LanguageCode = "en" | "hi" | "gu";

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  code: LanguageCode;
  shortLabel: string;
  label: string;
}> = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "hi", shortLabel: "हि", label: "Hindi" },
  { code: "gu", shortLabel: "ગુ", label: "Gujarati" },
];

export type AnimalType =
  | "Dog"
  | "Cat"
  | "Bird"
  | "Rabbit"
  | "Exotic"
  | "Livestock";

export const ANIMAL_TYPES: readonly AnimalType[] = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Exotic",
  "Livestock",
];

export type ServiceType =
  | "vet-clinic"
  | "animal-hospital"
  | "boarding-daycare"
  | "diagnostics-lab"
  | "animal-ambulance"
  | "ngo-rescue";

export interface ServiceDefinition {
  id: ServiceType;
  label: string;
  shortLabel: string;
  description: string;
}

export const SERVICE_DEFINITIONS: readonly ServiceDefinition[] = [
  {
    id: "vet-clinic",
    label: "Vet Clinics",
    shortLabel: "Vet Clinic",
    description:
      "Neighbourhood consultations, vaccinations, and preventive check-ups.",
  },
  {
    id: "animal-hospital",
    label: "Animal Hospitals",
    shortLabel: "Animal Hospital",
    description:
      "Multi-specialty surgery, inpatient wards, and round-the-clock ICU care.",
  },
  {
    id: "boarding-daycare",
    label: "Boarding & Daycare",
    shortLabel: "Boarding",
    description:
      "Supervised overnight stays, social play yards, and recovery boarding.",
  },
  {
    id: "diagnostics-lab",
    label: "Diagnostics & Labs",
    shortLabel: "Diagnostics",
    description:
      "Blood panels, digital X-ray, ultrasound, and home sample collection.",
  },
  {
    id: "animal-ambulance",
    label: "Animal Ambulance",
    shortLabel: "Ambulance",
    description:
      "Equipped emergency transport for injured pets and large animals.",
  },
  {
    id: "ngo-rescue",
    label: "NGOs & Rescue",
    shortLabel: "NGO & Rescue",
    description:
      "Community shelters, ABC sterilisation drives, and street-animal aid.",
  },
];

export const SERVICE_LABEL_MAP: Record<ServiceType, string> = {
  "vet-clinic": "Vet Clinics",
  "animal-hospital": "Animal Hospitals",
  "boarding-daycare": "Boarding & Daycare",
  "diagnostics-lab": "Diagnostics & Labs",
  "animal-ambulance": "Animal Ambulance",
  "ngo-rescue": "NGOs & Rescue",
};

