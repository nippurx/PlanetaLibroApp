import { PointerEvent as ReactPointerEvent, RefObject, useCallback, useRef } from "react";
import {
  evaluateReaderGesture,
  hasActiveTextSelection,
  isReaderInteractiveTarget,
  READER_AXIS_DOMINANCE,
  READER_DIRECTION_LOCK_PX,
} from "./gestures";

type GestureState = {
  pointerId: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startedAt: number;
  interactive: boolean;
  multiplePointers: boolean;
  direction: "pending" | "horizontal" | "vertical";
};

type ReaderGestureOptions = {
  containerRef: RefObject<HTMLElement>;
  enabled: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onToggleControls: () => void;
};

export function useReaderGestures(options: ReaderGestureOptions) {
  const gesture = useRef<GestureState | null>(null);
  const activePointers = useRef(new Set<number>());

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    activePointers.current.add(event.pointerId);
    if (gesture.current && gesture.current.pointerId !== event.pointerId) gesture.current.multiplePointers = true;
    if (!options.enabled || !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (gesture.current) {
      gesture.current.multiplePointers = true;
      return;
    }
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
      startedAt: performance.now(),
      interactive: isReaderInteractiveTarget(event.target),
      multiplePointers: activePointers.current.size > 1,
      direction: "pending",
    };
  }, [options.enabled]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    current.currentX = event.clientX;
    current.currentY = event.clientY;
    if (activePointers.current.size > 1) current.multiplePointers = true;
    if (current.direction !== "pending") return;
    const absoluteX = Math.abs(current.currentX - current.startX);
    const absoluteY = Math.abs(current.currentY - current.startY);
    if (Math.max(absoluteX, absoluteY) < READER_DIRECTION_LOCK_PX) return;
    if (absoluteX > absoluteY * READER_AXIS_DOMINANCE) current.direction = "horizontal";
    else if (absoluteY > absoluteX * READER_AXIS_DOMINANCE) current.direction = "vertical";
  }, []);

  const finish = useCallback((event: ReactPointerEvent<HTMLElement>, cancelled: boolean) => {
    activePointers.current.delete(event.pointerId);
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    gesture.current = null;
    const bounds = options.containerRef.current?.getBoundingClientRect();
    if (!bounds || current.direction === "vertical") return;
    const action = evaluateReaderGesture({
      startX: current.startX,
      startY: current.startY,
      endX: event.clientX,
      endY: event.clientY,
      startedAt: current.startedAt,
      endedAt: performance.now(),
      areaLeft: bounds.left,
      areaWidth: bounds.width,
      interactive: current.interactive,
      hasSelection: hasActiveTextSelection(),
      cancelled,
      multiplePointers: current.multiplePointers,
      canGoPrevious: options.canGoPrevious,
      canGoNext: options.canGoNext,
    });
    if (action === "previous") options.onPreviousPage();
    else if (action === "next") options.onNextPage();
    else if (action === "toggle-controls") options.onToggleControls();
  }, [options]);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => finish(event, false), [finish]);
  const onPointerCancel = useCallback((event: ReactPointerEvent<HTMLElement>) => finish(event, true), [finish]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
