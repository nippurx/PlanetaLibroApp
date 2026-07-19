import assert from "node:assert/strict";
import test from "node:test";
import { annotationContentVersion, normalizeAnnotationText } from "../src/features/reader/annotations.ts";
import { READER_CONTENT_CACHE } from "../src/features/reader/cachePolicy.ts";
import { shouldUseTemporaryContinuousSelection } from "../src/features/reader/selectionMode.ts";

test("normalizes whitespace without changing visible words", () => {
  assert.equal(normalizeAnnotationText("  La\n\tvida   es sueño  "), "La vida es sueño");
});

test("uses the manifest generation as content version", () => {
  assert.equal(annotationContentVersion("2026-07-18T10:00:00Z", "autor-libro", 12), "2026-07-18T10:00:00Z");
  assert.equal(annotationContentVersion(undefined, "autor-libro", 12), "manifest-v2:autor-libro:12");
});

test("revalidates reader content instead of accepting stale browser cache", () => {
  assert.equal(READER_CONTENT_CACHE, "no-cache");
});

test("uses temporary continuous selection only for Android paged mode", () => {
  const androidChrome = "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/136.0 Mobile Safari/537.36";
  assert.equal(shouldUseTemporaryContinuousSelection(androidChrome, "paged"), true);
  assert.equal(shouldUseTemporaryContinuousSelection(androidChrome, "scroll"), false);
  assert.equal(shouldUseTemporaryContinuousSelection("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", "paged"), false);
  assert.equal(shouldUseTemporaryContinuousSelection("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "paged"), false);
});
