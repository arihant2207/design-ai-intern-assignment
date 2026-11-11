import type { ReactNode } from "react";
import { AnimalsShell } from "@/components/animals/AnimalsShell";
import { getResolvedImageMap } from "@/lib/images.server";

export default function AnimalsLayout({ children }: { children: ReactNode }) {
  const resolvedImages = getResolvedImageMap();
  return <AnimalsShell resolvedImages={resolvedImages}>{children}</AnimalsShell>;
}
