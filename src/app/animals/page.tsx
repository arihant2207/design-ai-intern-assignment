import { EmergencyStrip } from "@/components/animals/EmergencyStrip";
import { ForProvidersBand } from "@/components/animals/ForProvidersBand";
import { HeroSection } from "@/components/animals/HeroSection";
import { HowItWorks } from "@/components/animals/HowItWorks";
import { OpenNowRow } from "@/components/animals/OpenNowRow";
import { ServicesBento } from "@/components/animals/ServicesBento";
import { TrustSection } from "@/components/animals/TrustSection";

export default function AnimalsHomePage() {
  return (
    <>
      <HeroSection />
      <EmergencyStrip />
      <ServicesBento />
      <OpenNowRow />
      <HowItWorks />
      <TrustSection />
      <ForProvidersBand />
    </>
  );
}
