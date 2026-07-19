import type { AnnotationDraft, BookmarkPoint, ReadingAnnotation } from "../../api/annotations.ts";

export const ANNOTATION_ANCHOR_VERSION = 1;
export const ANNOTATION_MAX_EXACT = 4000;
export const ANNOTATION_MAX_CONTEXT = 256;
export const ANNOTATION_MAX_NOTE = 10000;

type DomPoint = { node: Text; offset: number };
type TextMap = { text: string; starts: DomPoint[]; ends: DomPoint[] };

export type SerializedSelection = Omit<AnnotationDraft, "annotation_type" | "note_text" | "color_code" | "client_request_id">;

function textNodes(root: Node): Text[] {
  const documentRef = root.ownerDocument ?? document;
  const walker = documentRef.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent || parent.closest("script,style,[hidden],[aria-hidden='true']")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

function buildTextMap(root: Node): TextMap {
  let text = "";
  const starts: DomPoint[] = [];
  const ends: DomPoint[] = [];
  let whitespaceOpen = false;
  for (const node of textNodes(root)) {
    const value = node.data;
    for (let offset = 0; offset < value.length; offset += 1) {
      const char = value[offset];
      if (/\s/u.test(char)) {
        if (!whitespaceOpen && text.length > 0) {
          text += " ";
          starts.push({ node, offset });
          ends.push({ node, offset: offset + 1 });
          whitespaceOpen = true;
        } else if (whitespaceOpen && ends.length) {
          ends[ends.length - 1] = { node, offset: offset + 1 };
        }
      } else {
        text += char;
        starts.push({ node, offset });
        ends.push({ node, offset: offset + 1 });
        whitespaceOpen = false;
      }
    }
  }
  if (text.endsWith(" ")) {
    text = text.slice(0, -1);
    starts.pop();
    ends.pop();
  }
  return { text, starts, ends };
}

export function normalizeAnnotationText(value: string): string {
  return value.replace(/\s+/gu, " ").trim();
}

function fragmentOf(node: Node, root: HTMLElement): HTMLElement | null {
  const element = node instanceof Element ? node : node.parentElement;
  const fragment = element?.closest<HTMLElement>("[data-reader-fragment]") ?? null;
  return fragment && root.contains(fragment) ? fragment : null;
}

function fragmentNumber(fragment: HTMLElement): number | null {
  const value = Number.parseInt(fragment.dataset.readerFragment ?? "", 10);
  return Number.isInteger(value) && value > 0 ? value : null;
}

function normalizedOffset(fragment: HTMLElement, container: Node, offset: number): number {
  const range = fragment.ownerDocument.createRange();
  range.selectNodeContents(fragment);
  range.setEnd(container, offset);
  return normalizeAnnotationText(range.toString()).length;
}

export function serializeSelection(root: HTMLElement, selection: Selection, contentVersion: string): SerializedSelection | null {
  if (selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;
  const startFragmentElement = fragmentOf(range.startContainer, root);
  const endFragmentElement = fragmentOf(range.endContainer, root);
  if (!startFragmentElement || !endFragmentElement) return null;
  const startFragment = fragmentNumber(startFragmentElement);
  const endFragment = fragmentNumber(endFragmentElement);
  if (startFragment === null || endFragment === null || endFragment < startFragment) return null;
  const exactText = normalizeAnnotationText(range.toString());
  if (!exactText || exactText.length > ANNOTATION_MAX_EXACT) return null;
  const startOffset = normalizedOffset(startFragmentElement, range.startContainer, range.startOffset);
  const endOffset = normalizedOffset(endFragmentElement, range.endContainer, range.endOffset);
  if (startFragment === endFragment && endOffset <= startOffset) return null;
  const startText = buildTextMap(startFragmentElement).text;
  const endText = buildTextMap(endFragmentElement).text;
  return {
    start_fragment: startFragment,
    start_offset: startOffset,
    end_fragment: endFragment,
    end_offset: endOffset,
    exact_text: exactText,
    prefix_text: startText.slice(Math.max(0, startOffset - ANNOTATION_MAX_CONTEXT), startOffset) || null,
    suffix_text: endText.slice(endOffset, endOffset + ANNOTATION_MAX_CONTEXT) || null,
    content_version: contentVersion,
    anchor_version: ANNOTATION_ANCHOR_VERSION,
  };
}

export function serializeBookmarkPoint(root: HTMLElement, viewport: HTMLElement, contentVersion: string): BookmarkPoint | null {
  const viewportRect = viewport.getBoundingClientRect();
  let best: { fragment: number; offset: number; text: string; score: number } | null = null;
  for (const fragment of root.querySelectorAll<HTMLElement>("[data-reader-fragment]")) {
    const number = fragmentNumber(fragment);
    if (number === null || ![...fragment.getClientRects()].some((rect) => rect.right > viewportRect.left && rect.left < viewportRect.right && rect.bottom > viewportRect.top && rect.top < viewportRect.bottom)) continue;
    const map = buildTextMap(fragment);
    for (let offset = 0; offset < map.starts.length; offset += 1) {
      const range = fragment.ownerDocument.createRange();
      range.setStart(map.starts[offset].node, map.starts[offset].offset);
      range.setEnd(map.ends[offset].node, map.ends[offset].offset);
      const rect = [...range.getClientRects()].find((item) => item.right > viewportRect.left && item.left < viewportRect.right && item.bottom > viewportRect.top && item.top < viewportRect.bottom);
      if (!rect) continue;
      const score = Math.max(0, rect.top - viewportRect.top) * Math.max(1, viewportRect.width) + Math.max(0, rect.left - viewportRect.left);
      if (best === null || score < best.score) best = { fragment: number, offset, text: map.text, score };
      break;
    }
  }
  if (!best) return null;
  return {
    start_fragment: best.fragment,
    start_offset: best.offset,
    end_fragment: best.fragment,
    end_offset: best.offset,
    exact_text: "",
    prefix_text: best.text.slice(Math.max(0, best.offset - ANNOTATION_MAX_CONTEXT), best.offset) || null,
    suffix_text: best.text.slice(best.offset, best.offset + ANNOTATION_MAX_CONTEXT) || null,
    content_version: contentVersion,
    anchor_version: ANNOTATION_ANCHOR_VERSION,
    client_request_id: crypto.randomUUID(),
  };
}

function rangeFromMap(documentRef: Document, map: TextMap, start: number, end: number): Range | null {
  if (start < 0 || end <= start || start >= map.starts.length || end > map.ends.length) return null;
  const range = documentRef.createRange();
  const startPoint = map.starts[start];
  const endPoint = map.ends[end - 1];
  range.setStart(startPoint.node, startPoint.offset);
  range.setEnd(endPoint.node, endPoint.offset);
  return range;
}

export function resolveAnnotationRange(root: HTMLElement, annotation: ReadingAnnotation | SerializedSelection): Range | null {
  const startFragment = root.querySelector<HTMLElement>(`[data-reader-fragment="${annotation.start_fragment}"]`);
  const endFragment = root.querySelector<HTMLElement>(`[data-reader-fragment="${annotation.end_fragment}"]`);
  if (startFragment && endFragment) {
    const startMap = buildTextMap(startFragment);
    if (annotation.exact_text === "" && startFragment === endFragment && annotation.start_offset === annotation.end_offset) {
      const startPoint = startMap.starts[annotation.start_offset] ?? startMap.ends[annotation.start_offset - 1];
      const endPoint = startMap.ends[annotation.start_offset] ?? startPoint;
      if (!startPoint || !endPoint) return null;
      const pointRange = root.ownerDocument.createRange();
      pointRange.setStart(startPoint.node, startPoint.offset);
      pointRange.setEnd(endPoint.node, endPoint.offset);
      return pointRange;
    }
    const endMap = startFragment === endFragment ? startMap : buildTextMap(endFragment);
    const startPoint = startMap.starts[annotation.start_offset];
    const endPoint = endMap.ends[annotation.end_offset - 1];
    if (startPoint && endPoint) {
      const candidate = root.ownerDocument.createRange();
      candidate.setStart(startPoint.node, startPoint.offset);
      candidate.setEnd(endPoint.node, endPoint.offset);
      if (normalizeAnnotationText(candidate.toString()) === annotation.exact_text) return candidate;
    }
  }
  const map = buildTextMap(root);
  let searchFrom = 0;
  let best: { index: number; score: number } | null = null;
  while (searchFrom <= map.text.length) {
    const index = map.text.indexOf(annotation.exact_text, searchFrom);
    if (index < 0) break;
    let score = 0;
    if (annotation.prefix_text && map.text.slice(Math.max(0, index - annotation.prefix_text.length), index).endsWith(annotation.prefix_text)) score += 1;
    const after = index + annotation.exact_text.length;
    if (annotation.suffix_text && map.text.slice(after, after + annotation.suffix_text.length).startsWith(annotation.suffix_text)) score += 1;
    if (best === null || score > best.score) best = { index, score };
    searchFrom = index + 1;
  }
  return best ? rangeFromMap(root.ownerDocument, map, best.index, best.index + annotation.exact_text.length) : null;
}

export function annotationContentVersion(generatedAt: string | undefined, uri: string, pages: number): string {
  return generatedAt?.trim() || `manifest-v2:${uri}:${pages}`;
}
