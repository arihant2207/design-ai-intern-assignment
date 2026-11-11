"use client";

import Link from "next/link";
import { BRAND_NAME, SERVICE_DEFINITIONS } from "@/lib/config";
import { useCorrectionModal } from "./CorrectionContext";
import { LogoMark } from "./LogoMark";
import { Container } from "./Primitives";

export function Footer() {
  const { openCorrection } = useCorrectionModal();

  return (
    <footer className="border-t border-line bg-sand/55 text-forest">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Editorial colophon */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/animals"
              className="inline-flex items-center gap-2.5 font-display text-2xl tracking-tight text-forest"
            >
              <LogoMark className="text-forest" />
              <span>{BRAND_NAME}</span>
            </Link>
            <p className="text-base text-forest/85 max-w-sm leading-relaxed">
              An editorial directory to find veterinary clinics, 24x7 animal
              hospitals, diagnostics labs, boarding, ambulances, and rescue NGOs
              near you.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => openCorrection("")}
                className="inline-flex min-h-[40px] items-center text-sm font-medium text-terracotta-dark underline underline-offset-4 hover:text-forest transition-colors cursor-pointer"
              >
                Submit a Correction
              </button>
            </div>
          </div>

          {/* Services quick links */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/75 mb-3.5">
              Care Directory
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {SERVICE_DEFINITIONS.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/animals/search?service=${service.id}`}
                    className="text-forest/85 hover:text-forest hover:underline underline-offset-4"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform links */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest/75 mb-3.5">
              Platform
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/animals/search"
                  className="text-forest/85 hover:text-forest hover:underline underline-offset-4"
                >
                  Search all providers
                </Link>
              </li>
              <li>
                <Link
                  href="/animals/search?emergency=true"
                  className="text-forest/85 hover:text-forest hover:underline underline-offset-4"
                >
                  24x7 Emergency &amp; Ambulance
                </Link>
              </li>
              <li>
                <Link
                  href="/animals#how-it-works"
                  className="text-forest/85 hover:text-forest hover:underline underline-offset-4"
                >
                  How verification works
                </Link>
              </li>
              <li>
                <Link
                  href="/animals#for-providers"
                  className="text-forest/85 hover:text-forest hover:underline underline-offset-4"
                >
                  List Your Business
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line text-xs text-forest/80">
          <p>
            {BRAND_NAME} — Front-end prototype. All listings, hours, and phone
            numbers shown are fictional sample data.
          </p>
        </div>
      </Container>
    </footer>
  );
}
