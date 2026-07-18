import assert from "node:assert/strict";
import test from "node:test";
import { annotationContentVersion, normalizeAnnotationText } from "../src/features/reader/annotations.ts";

test("normalizes whitespace without changing visible words", () => {
  assert.equal(normalizeAnnotationText("  La\n\tvida   es sueño  "), "La vida es sueño");
});

test("uses the manifest generation as content version", () => {
  assert.equal(annotationContentVersion("2026-07-18T10:00:00Z", "autor-libro", 12), "2026-07-18T10:00:00Z");
  assert.equal(annotationContentVersion(undefined, "autor-libro", 12), "manifest-v2:autor-libro:12");
});
