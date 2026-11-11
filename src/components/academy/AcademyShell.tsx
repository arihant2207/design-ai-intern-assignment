"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import {
  HERO_AUDIENCE_VARIANTS,
  SYLLABUS_WEEKS,
  TRACKS,
  type HeroAudienceKey,
} from "@/lib/academy-config";
import type { ApplicantStatus } from "@/lib/leads";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ValueProps } from "./ValueProps";
import { ProgrammeTracks } from "./ProgrammeTracks";
import { SyllabusSheet } from "./SyllabusSheet";
import { ProjectShowcase } from "./ProjectShowcase";
import { FaqAccordion } from "./FaqAccordion";
import { RegistrationSection } from "./RegistrationSection";
import { SyllabusModal } from "./SyllabusModal";
import { StickyMobileCta } from "./StickyMobileCta";
import { Footer } from "./Footer";

export function AcademyShell() {
  const [audience, setAudience] = useState<HeroAudienceKey>("student");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicantStatus>("Student");
  const [selectedTrackId, setSelectedTrackId] = useState<string>(TRACKS[0].id);
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({
    "WK 01": true,
  });
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const registerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const regEl = registerRef.current;
    const footerEl = footerRef.current;
    if (!regEl && !footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === regEl) {
            setIsRegisterVisible(entry.isIntersecting);
          } else if (entry.target === footerEl) {
            setIsFooterVisible(entry.isIntersecting);
          }
        }
      },
      {
        threshold: 0.05,
      }
    );

    if (regEl) observer.observe(regEl);
    if (footerEl) observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleAudienceChange = (nextAudience: HeroAudienceKey) => {
    const variant = HERO_AUDIENCE_VARIANTS[nextAudience];
    setAudience(nextAudience);
    setSelectedStatus(variant.formStatus);
    setSelectedTrackId(variant.suggestedTrackId);
  };

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
    scrollToElement("register");
  };

  const handleSelectWeek = (week: string) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [week]: true,
    }));
    scrollToElement("syllabus");
  };

  const handleToggleWeek = (week: string) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [week]: !prev[week],
    }));
  };

  const handleToggleAllWeeks = () => {
    const allOpen = SYLLABUS_WEEKS.every((item) => openWeeks[item.week]);
    if (allOpen) {
      setOpenWeeks({});
      return;
    }
    const next: Record<string, boolean> = {};
    SYLLABUS_WEEKS.forEach((item) => {
      next[item.week] = true;
    });
    setOpenWeeks(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-[100dvh] flex-col">
        <Header />
        <main className="flex-1">
          <Hero
            audience={audience}
            onAudienceChange={handleAudienceChange}
            onOpenSyllabusModal={() => setSyllabusModalOpen(true)}
            onSelectWeek={handleSelectWeek}
          />
          <ValueProps />
          <ProgrammeTracks onSelectTrack={handleSelectTrack} />
          <SyllabusSheet
            openWeeks={openWeeks}
            onToggleWeek={handleToggleWeek}
            onToggleAll={handleToggleAllWeeks}
          />
          <ProjectShowcase />
          <FaqAccordion />
          <RegistrationSection
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedTrackId={selectedTrackId}
            onTrackChange={setSelectedTrackId}
            sectionRef={registerRef}
          />
        </main>
        <Footer footerRef={footerRef} />
        <StickyMobileCta
          visible={!isRegisterVisible && !isFooterVisible && !syllabusModalOpen}
        />
        <SyllabusModal
          open={syllabusModalOpen}
          onClose={() => setSyllabusModalOpen(false)}
          onJumpToSyllabus={() => scrollToElement("syllabus")}
        />
      </div>
    </MotionConfig>
  );
}
