import type { AnimalType, ServiceType } from "@/lib/config";
import type { ImageSlotId } from "@/lib/images";

export type PriceBand = "₹" | "₹₹" | "₹₹₹";

export type LanguageSpoken = "English" | "Hindi" | "Gujarati";

/** 0 = Sunday, 1 = Monday, ..., 6 = Saturday */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeRange {
  /** 24-hour HH:mm format in Asia/Kolkata */
  open: string;
  /** 24-hour HH:mm format in Asia/Kolkata */
  close: string;
}

export type WeeklyHours = Record<DayOfWeek, TimeRange[] | null>;

export interface Provider {
  id: string;
  name: string;
  serviceType: ServiceType;
  animals: AnimalType[];
  specialisations: string[];
  locality: string;
  distanceKm: number;
  /** Normalized 0..100 coordinates on the stylised Ahmedabad SVG map */
  coordinates: {
    x: number;
    y: number;
  };
  rating: number;
  reviewCount: number;
  is24x7: boolean;
  emergencyCare: boolean;
  homeVisit: boolean;
  verified: boolean;
  languages: LanguageSpoken[];
  priceBand: PriceBand;
  phone: string;
  whatsappDigits: string;
  imageSlot: ImageSlotId;
  hours: WeeklyHours;
}

export type SortOption = "nearest" | "top-rated" | "open-first";

export interface SearchFilters {
  query: string;
  service: ServiceType | "";
  animal: AnimalType | "";
  maxDistanceKm: 1 | 3 | 5 | 10 | null;
  openNow: boolean;
  only24x7: boolean;
  emergency: boolean;
  homeVisit: boolean;
  minRating: 3.5 | 4 | 4.5 | null;
  verifiedOnly: boolean;
  language: LanguageSpoken | "";
  priceBand: PriceBand | "";
}

