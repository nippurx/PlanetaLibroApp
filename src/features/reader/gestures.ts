export const READER_SWIPE_THRESHOLD_PX = 45;
export const READER_DIRECTION_LOCK_PX = 10;
export const READER_AXIS_DOMINANCE = 1.25;
export const READER_LONG_PRESS_MS = 500;

export type ReaderGestureAction = "previous" | "next" | "toggle-controls" | "none";

export type ReaderGestureEvaluation = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startedAt: number;
  endedAt: number;
  areaLeft: number;
  areaWidth: number;
  interactive: boolean;
  hasSelection: boolean;
  cancelled: boolean;
  multiplePointers: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
};

const INTERACTIVE_SELECTOR = [
  "a", "button", "input", "textarea", "select", "option", "label",
  "[contenteditable]", "[data-reader-interactive]", ".reader-toolbar",
  ".reader-panel", ".reader-progress", ".reader-backdrop",
].join(",");

export function isReaderInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;
}

export function hasActiveTextSelection(): boolean {
  return Boolean(window.getSelection()?.toString().trim());
}

export function evaluateReaderGesture(input: ReaderGestureEvaluation): ReaderGestureAction {
  if (input.cancelled || input.multiplePointers || input.interactive || input.hasSelection || input.areaWidth <= 0) return "none";

  const deltaX = input.endX - input.startX;
  const deltaY = input.endY - input.startY;
  const absoluteX = Math.abs(deltaX);
  const absoluteY = Math.abs(deltaY);
  const duration = input.endedAt - input.startedAt;
  const horizontalDominant = absoluteX > absoluteY * READER_AXIS_DOMINANCE;
  const verticalDominant = absoluteY > absoluteX * READER_AXIS_DOMINANCE;

  if (duration >= READER_LONG_PRESS_MS) return "none";
  if (absoluteX >= READER_SWIPE_THRESHOLD_PX && horizontalDominant) {
    if (deltaX < 0) return input.canGoNext ? "next" : "none";
    return input.canGoPrevious ? "previous" : "none";
  }
  if (verticalDominant && absoluteY >= READER_DIRECTION_LOCK_PX) return "none";
  if (!horizontalDominant && Math.max(absoluteX, absoluteY) >= READER_DIRECTION_LOCK_PX) return "none";

  const relativeX = (input.startX - input.areaLeft) / input.areaWidth;
  if (relativeX < 0.2) return input.canGoPrevious ? "previous" : "none";
  if (relativeX > 0.8) return input.canGoNext ? "next" : "none";
  return "toggle-controls";
}
