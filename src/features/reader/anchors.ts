import { ReaderAnchor } from "./types";

const QUOTE_SIZE = 80;

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function createAnchor(root: HTMLElement, element?: Element | null): ReaderAnchor {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-reader-block]"));
  const visibleBlocks = blocks.filter((item) => [...item.getClientRects()].some((rect) => (
    rect.right > 0
    && rect.left < window.innerWidth
    && rect.bottom > 0
    && rect.top < window.innerHeight
  )));
  const block = (element?.closest?.("[data-reader-block]") as HTMLElement | null) ?? visibleBlocks[0] ?? blocks[0];
  const blockIndex = block ? Number(block.dataset.readerBlock ?? 0) : 0;
  const text = normalize(block?.textContent ?? root.textContent ?? "");
  return { version: 1, quote: text.slice(0, QUOTE_SIZE), prefix: "", suffix: text.slice(QUOTE_SIZE, QUOTE_SIZE * 2), blockIndex, offset: 0 };
}

export function resolveAnchor(root: HTMLElement, anchor: ReaderAnchor): HTMLElement | null {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-reader-block]"));
  if (anchor.quote) {
    const exact = blocks.find((block) => normalize(block.textContent ?? "").includes(anchor.quote));
    if (exact) return exact;
    const words = normalize(anchor.quote).split(" ").filter(Boolean).slice(0, 5);
    const contextual = blocks.find((block) => words.length > 0 && words.every((word) => normalize(block.textContent ?? "").includes(word)));
    if (contextual) return contextual;
  }
  return blocks.find((block) => Number(block.dataset.readerBlock) === anchor.blockIndex) ?? blocks[Math.min(Math.max(anchor.blockIndex, 0), Math.max(0, blocks.length - 1))] ?? null;
}
