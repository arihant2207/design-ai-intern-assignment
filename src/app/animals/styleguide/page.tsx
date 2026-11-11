import { ShieldCheck } from "lucide-react";
import { ImageSlot } from "@/components/animals/ImageSlot";
import {
  Badge,
  ButtonLink,
  Container,
  HairlineRule,
  SectionHeader,
} from "@/components/animals/Primitives";
import { BRAND_NAME } from "@/lib/config";

export default function StyleguidePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-12">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Internal Reference
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-forest leading-[1.08] tracking-tight">
            {BRAND_NAME} — Styleguide
          </h1>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            Unlinked design system reference for typography, colour tokens,
            status badges, buttons, and arch image frames.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/animals" variant="primary" size="md">
              Primary Terracotta
            </ButtonLink>
            <ButtonLink href="/animals" variant="secondary" size="md">
              Secondary Sand
            </ButtonLink>
            <ButtonLink href="/animals" variant="outline" size="md">
              Outline
            </ButtonLink>
          </div>
        </section>

        <HairlineRule withArch />

        {/* Colour tokens */}
        <section className="space-y-5">
          <SectionHeader
            eyebrow="Palette"
            title="Colour tokens"
            description="Warm paper and sand grounds paired with deep forest ink, #B84A25 terracotta CTAs, and saffron status highlights."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: "paper", hex: "#F4EEE1", cls: "bg-paper text-forest" },
              { name: "sand", hex: "#E8DFCB", cls: "bg-sand text-forest" },
              { name: "forest", hex: "#1F3A2E", cls: "bg-forest text-paper" },
              {
                name: "forest-deep",
                hex: "#12261D",
                cls: "bg-forest-deep text-paper",
              },
              {
                name: "terracotta",
                hex: "#B84A25",
                cls: "bg-terracotta text-white",
              },
              {
                name: "saffron",
                hex: "#E3A72F",
                cls: "bg-saffron text-forest-deep",
              },
              { name: "muted", hex: "#5B6B60", cls: "bg-muted text-paper" },
            ].map((swatch) => (
              <div
                key={swatch.name}
                className={`rounded-lg border border-line p-4 ${swatch.cls}`}
              >
                <p className="text-sm font-medium">{swatch.name}</p>
                <p className="text-xs opacity-90 mt-1">{swatch.hex}</p>
              </div>
            ))}
          </div>
        </section>

        <HairlineRule />

        {/* Type scale */}
        <section className="space-y-5">
          <SectionHeader
            eyebrow="Typography"
            title="Fraunces & Instrument Sans"
          />
          <div className="space-y-4 rounded-xl border border-line bg-sand/35 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                Display H1 · Fraunces
              </p>
              <p className="font-display text-4xl sm:text-5xl text-forest tracking-tight mt-1">
                Reliable care for every companion.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                Section H2 · Fraunces
              </p>
              <p className="font-display text-3xl text-forest tracking-tight mt-1">
                24x7 Animal Hospitals &amp; Clinics
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                Body · Instrument Sans (16px minimum)
              </p>
              <p className="text-base text-forest/90 max-w-2xl mt-1">
                Plain, clear clinic details—opening hours in IST, languages
                spoken at reception, and direct phone numbers without
                middlemen.
              </p>
            </div>
          </div>
        </section>

        <HairlineRule />

        {/* Badges & Image slots */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-display text-2xl text-forest">Status badges</h2>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="open">
                <span
                  className="h-2 w-2 rounded-full bg-saffron"
                  aria-hidden="true"
                />
                Open now
              </Badge>
              <Badge tone="closed">Opens 17:00 IST</Badge>
              <Badge tone="verified">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                Verified Clinic
              </Badge>
              <Badge tone="emergency">24x7 Emergency</Badge>
              <Badge tone="saffron">Top Rated</Badge>
              <Badge tone="neutral">English · Hindi · Gujarati</Badge>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <ImageSlot
              aspectRatio="4/3"
              slotId="heroPrimary"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <ImageSlot
              aspectRatio="4/3"
              tone="sand-forest"
              alt="Duotone arch placeholder fallback in sand and forest tones"
            />
          </div>
        </section>
      </Container>
    </div>
  );
}

