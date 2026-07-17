import test from "node:test";
import assert from "node:assert/strict";
import { evaluateReaderGesture, type ReaderGestureEvaluation } from "../src/features/reader/gestures.ts";

function gesture(overrides: Partial<ReaderGestureEvaluation> = {}) {
  return evaluateReaderGesture({
    startX: 500,
    startY: 300,
    endX: 500,
    endY: 300,
    startedAt: 0,
    endedAt: 100,
    areaLeft: 0,
    areaWidth: 1000,
    interactive: false,
    hasSelection: false,
    cancelled: false,
    multiplePointers: false,
    canGoPrevious: true,
    canGoNext: true,
    ...overrides,
  });
}

test("toque al 10 % retrocede", () => assert.equal(gesture({ startX: 100, endX: 100 }), "previous"));
test("toque al 50 % alterna controles", () => assert.equal(gesture(), "toggle-controls"));
test("en modo continuo el toque central alterna controles aunque la navegacion lateral este deshabilitada", () => {
  assert.equal(gesture({ canGoPrevious: false, canGoNext: false }), "toggle-controls");
  assert.equal(gesture({ startX: 100, endX: 100, canGoPrevious: false, canGoNext: false }), "none");
  assert.equal(gesture({ startX: 900, endX: 900, canGoPrevious: false, canGoNext: false }), "none");
});
test("toque al 90 % avanza", () => assert.equal(gesture({ startX: 900, endX: 900 }), "next"));
test("swipe hacia la izquierda avanza", () => assert.equal(gesture({ endX: 430 }), "next"));
test("swipe hacia la derecha retrocede", () => assert.equal(gesture({ endX: 570 }), "previous"));
test("movimiento horizontal inferior al umbral conserva el toque", () => assert.equal(gesture({ startX: 100, endX: 140 }), "previous"));
test("movimiento principalmente vertical no navega", () => assert.equal(gesture({ endX: 505, endY: 360 }), "none"));
test("movimiento diagonal sin intención clara no navega", () => assert.equal(gesture({ endX: 540, endY: 335 }), "none"));
test("un enlace no activa navegación", () => assert.equal(gesture({ interactive: true, startX: 900, endX: 900 }), "none"));
test("un botón no activa navegación", () => assert.equal(gesture({ interactive: true }), "none"));
test("una selección de texto no activa navegación", () => assert.equal(gesture({ hasSelection: true }), "none"));
test("la primera página no retrocede", () => assert.equal(gesture({ startX: 100, endX: 100, canGoPrevious: false }), "none"));
test("la última página no avanza", () => assert.equal(gesture({ startX: 900, endX: 900, canGoNext: false }), "none"));
test("pointercancel no ejecuta acciones", () => assert.equal(gesture({ cancelled: true }), "none"));
test("multitouch no ejecuta acciones", () => assert.equal(gesture({ multiplePointers: true }), "none"));
test("una pulsación larga no navega ni alterna controles", () => assert.equal(gesture({ endedAt: 500 }), "none"));
test("los controles visibles no cambian la clasificación del toque central", () => {
  assert.equal(gesture(), "toggle-controls");
  assert.equal(gesture(), "toggle-controls");
});
