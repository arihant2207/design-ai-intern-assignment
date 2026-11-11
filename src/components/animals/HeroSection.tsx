"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Crosshair, MapPin, Search } from "lucide-react";
import {
  ANIMAL_TYPES,
  SAMPLE_CITY,
  SAMPLE_LOCATION_FILL,
  SERVICE_DEFINITIONS,
} from "@/lib/config";
import { ImageSlot } from "./ImageSlot";
import { Button, Container } from "./Primitives";

const QUICK_SEARCH_CHIPS = [
  { label: "24x7 vet", href: "/animals/search?only24x7=true" },
  { label: "Cat-friendly", href: "/animals/search?animal=Cat" },
  { label: "Boarding", href: "/animals/search?service=boarding-daycare" },
  { label: "Ambulance", href: "/animals/search?service=animal-ambulance" },
] as const;

export function HeroSection() {
  const router = useRouter();
  const locationId = useId();
  const animalId = useId();
  const serviceId = useId();

  const [location, setLocation] = useState("");
  const [usedSampleLocation, setUsedSampleLocation] = useState(false);
  const [animal, setAnimal] = useState("");
  const [service, setService] = useState("");

  const handleUseLocation = () => {
    setLocation(SAMPLE_LOCATION_FILL);
    setUsedSampleLocation(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (animal) params.set("animal", animal);
    if (service) params.set("service", service);

    const qs = params.toString();
    router.push(qs ? `/animals/search?${qs}` : "/animals/search");
  };

  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Headline + Search module */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Clinics, Hospitals &amp; Rescue
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] text-forest leading-[1.06] tracking-tight max-w-2xl">
                Trusted veterinary care across {SAMPLE_CITY}, without the
                guesswork.
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                Look up neighbourhood clinics, 24x7 animal hospitals, diagnostic
                labs, boarding, and animal ambulances—with live IST opening
                hours and direct clinic numbers.
              </p>
            </motion.div>

            {/* Search Module */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="space-y-3"
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-line-strong bg-sand/55 p-4 sm:p-5 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Location field */}
                  <div className="sm:col-span-12">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <label
                        htmlFor={locationId}
                        className="text-sm font-medium text-forest"
                      >
                        Neighbourhood or area
                      </label>
                      <button
                        type="button"
                        onClick={handleUseLocation}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-terracotta-dark hover:text-forest transition-colors cursor-pointer py-0.5"
                      >
                        <Crosshair className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span>Use my location</span>
                      </button>
                    </div>

                    <div className="relative">
                      <MapPin
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <input
                        id={locationId}
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (usedSampleLocation) setUsedSampleLocation(false);
                        }}
                        placeholder="e.g. Navrangpura, Satellite, Bodakdev"
                        className="w-full min-h-[46px] rounded-md border border-line-strong bg-paper pl-10 pr-3.5 py-2 text-base text-forest placeholder:text-muted/80 focus:border-forest"
                      />
                    </div>
                    {usedSampleLocation ? (
                      <p className="mt-1.5 text-xs text-muted">
                        Filled with sample location ({SAMPLE_LOCATION_FILL}).
                      </p>
                    ) : null}
                  </div>

                  {/* Animal select */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor={animalId}
                      className="block text-sm font-medium text-forest mb-1.5"
                    >
                      Animal
                    </label>
                    <select
                      id={animalId}
                      value={animal}
                      onChange={(e) => setAnimal(e.target.value)}
                      className="w-full min-h-[46px] rounded-md border border-line-strong bg-paper px-3.5 py-2 text-base text-forest focus:border-forest"
                    >
                      <option value="">All animals</option>
                      {ANIMAL_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service select */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor={serviceId}
                      className="block text-sm font-medium text-forest mb-1.5"
                    >
                      Service needed
                    </label>
                    <select
                      id={serviceId}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full min-h-[46px] rounded-md border border-line-strong bg-paper px-3.5 py-2 text-base text-forest focus:border-forest"
                    >
                      <option value="">All care services</option>
                      {SERVICE_DEFINITIONS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button type="submit" variant="primary" size="lg">
                    <Search className="h-4 w-4" strokeWidth={1.5} />
                    <span>Find a Vet</span>
                  </Button>

                  <Link
                    href="#services"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-forest hover:text-terracotta-dark underline underline-offset-4 transition-colors"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </form>

              {/* Quick-search chips */}
              <div
                aria-label="Quick searches"
                className="flex flex-wrap items-center gap-2 pt-0.5"
              >
                <span className="text-xs font-medium text-muted mr-1">
                  Quick filters:
                </span>
                {QUICK_SEARCH_CHIPS.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="inline-flex min-h-[34px] items-center rounded-full border border-line-strong bg-paper px-3.5 py-1 text-xs font-medium text-forest hover:bg-sand hover:border-forest/45 transition-colors"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column: Asymmetric editorial image composition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-12 gap-3.5 sm:gap-4 items-end"
          >
            <div className="col-span-7">
              <ImageSlot
                aspectRatio="3/4"
                slotId="heroPrimary"
                alt="Veterinarian examining a calm Indian pariah dog inside a sunlit clinic room"
              />
            </div>
            <div className="col-span-5 space-y-3.5 sm:space-y-4 pb-4">
              <ImageSlot
                aspectRatio="4/3"
                slotId="heroSecondaryTop"
                tone="sand-forest"
                alt="Cat resting comfortably on a linen examination table with a clinician"
              />
              <ImageSlot
                aspectRatio="1/1"
                slotId="heroSecondaryBottom"
                alt="Clean veterinary diagnostics workstation with microscope and sample trays"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
