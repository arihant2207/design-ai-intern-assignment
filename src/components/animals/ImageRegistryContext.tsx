"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ResolvedImageMap } from "@/lib/images.server";

const ImageRegistryContext = createContext<ResolvedImageMap>({});

export function ImageRegistryProvider({
  resolvedImages,
  children,
}: {
  resolvedImages: ResolvedImageMap;
  children: ReactNode;
}) {
  return (
    <ImageRegistryContext.Provider value={resolvedImages}>
      {children}
    </ImageRegistryContext.Provider>
  );
}

export function useResolvedImageSrc(slotId?: keyof ResolvedImageMap) {
  const map = useContext(ImageRegistryContext);
  if (!slotId) return undefined;
  return map[slotId];
}

