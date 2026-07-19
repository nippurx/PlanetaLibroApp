export function shouldHandleBookmarkClick(detail: number): boolean {
  return detail === 0;
}

export type BookmarkRect = { left: number; right: number; top: number; bottom: number };

export function bookmarkRectIsVisible(rect: BookmarkRect, viewport: BookmarkRect): boolean {
  return rect.right > viewport.left
    && rect.left < viewport.right
    && rect.bottom > viewport.top
    && rect.top < viewport.bottom;
}
