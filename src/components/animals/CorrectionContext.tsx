"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface CorrectionContextValue {
  isOpen: boolean;
  openCount: number;
  initialListingName: string;
  openCorrection: (listingName?: string) => void;
  closeCorrection: () => void;
}

const CorrectionContext = createContext<CorrectionContextValue | null>(null);

export function CorrectionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [initialListingName, setInitialListingName] = useState("");
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openCorrection = useCallback((listingName = "") => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setInitialListingName(listingName);
    setOpenCount((c) => c + 1);
    setIsOpen(true);
  }, []);

  const closeCorrection = useCallback(() => {
    setIsOpen(false);
    // Restore focus to the button/link that opened the dialog
    requestAnimationFrame(() => {
      lastFocusedRef.current?.focus();
    });
  }, []);

  return (
    <CorrectionContext.Provider
      value={{ isOpen, openCount, initialListingName, openCorrection, closeCorrection }}
    >
      {children}
    </CorrectionContext.Provider>
  );
}

export function useCorrectionModal() {
  const ctx = useContext(CorrectionContext);
  if (!ctx) {
    throw new Error("useCorrectionModal must be used within CorrectionProvider");
  }
  return ctx;
}
