import fs from "node:fs";
import path from "node:path";
import { IMAGE_SLOTS, type ImageSlotId } from "./images";

export type ResolvedImageMap = Partial<Record<ImageSlotId, string>>;

/**
 * Checks /public/images on the server so <ImageSlot> renders real photos
 * automatically when files exist on disk, without firing 404s for missing assets.
 */
export function getResolvedImageMap(): ResolvedImageMap {
  const resolved: ResolvedImageMap = {};
  const publicDir = path.join(process.cwd(), "public");

  (Object.keys(IMAGE_SLOTS) as ImageSlotId[]).forEach((slotId) => {
    const relativePath = IMAGE_SLOTS[slotId].path.replace(/^\/+/, "");
    const diskPath = path.join(publicDir, relativePath);
    if (fs.existsSync(diskPath)) {
      resolved[slotId] = IMAGE_SLOTS[slotId].path;
    }
  });

  return resolved;
}

