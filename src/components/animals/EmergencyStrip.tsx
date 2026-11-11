import { AlertCircle, ArrowRight } from "lucide-react";
import { ButtonLink, Container } from "./Primitives";

export function EmergencyStrip() {
  return (
    <section
      aria-label="Emergency care"
      className="border-y border-line-strong bg-sand/75"
    >
      <Container className="py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-terracotta/30 bg-terracotta/10 text-terracotta-dark">
              <AlertCircle className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-display text-xl text-forest leading-snug">
                Emergency? Find 24x7 vets and ambulances near you
              </p>
              <p className="text-sm text-forest/80 mt-0.5">
                Filter straight to round-the-clock ICU wards, trauma care, and
                rescue ambulances nearby.
              </p>
            </div>
          </div>

          <ButtonLink
            href="/animals/search?emergency=true"
            variant="primary"
            size="md"
            className="shrink-0 self-start sm:self-center"
          >
            <span>24x7 Emergency Care</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
