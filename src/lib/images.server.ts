import fs from "node:fs";
import path from "node:path";
import { IMAGE_SLOTS, type ImageSlotId } from "./images";

export type ResolvedImageMap = Partial<Record<ImageSlotId, string>>;

/**
 * Checks /public/images on the server so <ImageSlot> renders real photos
 * when present on disk and falls back cleanly to the duotone placeholder if missing.
 */
export function getResolvedImageMap(): ResolvedImageMap {
  const resolved: ResolvedImageMap = {};
  const publicDir = path.join(process.cwd(), "public");

  (Object.keys(IMAGE_SLOTS) as ImageSlotId[]).forEach((slotId) => {
    const relativePath = IMAGE_SLOTS[slotId].src.replace(/^\/+/, "");
    const diskPath = path.join(publicDir, relativePath);
    if (fs.existsSync(diskPath)) {
      resolved[slotId] = IMAGE_SLOTS[slotId].src;
    }
  });

  return resolved;
}
