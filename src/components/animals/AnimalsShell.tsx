"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import type { ResolvedImageMap } from "@/lib/images.server";
import { CorrectionProvider } from "./CorrectionContext";
import { CorrectionModal } from "./CorrectionModal";
import { Footer } from "./Footer";
import { ImageRegistryProvider } from "./ImageRegistryContext";
import { LanguageProvider } from "./LanguageContext";
import { Navbar } from "./Navbar";

export function AnimalsShell({
  resolvedImages,
  children,
}: {
  resolvedImages: ResolvedImageMap;
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <ImageRegistryProvider resolvedImages={resolvedImages}>
        <LanguageProvider>
          <CorrectionProvider>
            <div className="min-h-screen flex flex-col bg-paper text-forest">
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <CorrectionModal />
            </div>
          </CorrectionProvider>
        </LanguageProvider>
      </ImageRegistryProvider>
    </MotionConfig>
  );
}

