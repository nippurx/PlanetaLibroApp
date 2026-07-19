import type { ReaderMode } from "./types.ts";

export const TEMPORARY_SELECTION_SETTLE_MS = 220;
export const TEMPORARY_SELECTION_END_GRACE_MS = 350;

export function shouldUseTemporaryContinuousSelection(userAgent: string, preferredMode: ReaderMode): boolean {
  return preferredMode === "paged" && /Android/i.test(userAgent);
}
