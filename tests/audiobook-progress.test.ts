import test from "node:test";
import assert from "node:assert/strict";
import {
  clampPlaybackPosition,
  formatPlaybackTime,
  normalizePlaybackSeconds,
  parseSharedPlaybackPosition,
  resolveResumePosition,
} from "../src/features/listen/progress.ts";

test("normaliza la posición de YouTube como segundos enteros no negativos", () => {
  assert.equal(normalizePlaybackSeconds(125.9), 125);
  assert.equal(normalizePlaybackSeconds(-4), 0);
  assert.equal(normalizePlaybackSeconds(Number.NaN), 0);
});

test("prioriza el progreso remoto y conserva el fallback legacy", () => {
  assert.equal(resolveResumePosition({
    has_progress: true,
    position_seconds: 125,
    furthest_position_seconds: 480,
    media_id: "youtube:test",
    progress_created_at: null,
    last_playback_activity_at: null,
  }, 90), 125);
  assert.equal(resolveResumePosition({
    has_progress: true,
    position_seconds: 0,
    furthest_position_seconds: 480,
    media_id: "youtube:test",
    progress_created_at: null,
    last_playback_activity_at: null,
  }, 90), 480);
});

test("usa el progreso local cuando todavía no existe una fila remota", () => {
  assert.equal(resolveResumePosition({
    has_progress: false,
    position_seconds: 0,
    furthest_position_seconds: 0,
    media_id: "youtube:test",
    progress_created_at: null,
    last_playback_activity_at: null,
  }, 90), 90);
});

test("formatea duraciones cortas y largas", () => {
  assert.equal(formatPlaybackTime(65), "1:05");
  assert.equal(formatPlaybackTime(3665), "1:01:05");
});

test("limita los saltos de la barra a la duración disponible", () => {
  assert.equal(clampPlaybackPosition(125.9, 300), 125);
  assert.equal(clampPlaybackPosition(450, 300), 300);
  assert.equal(clampPlaybackPosition(-20, 300), 0);
});

test("acepta solamente segundos enteros no negativos en enlaces compartidos", () => {
  assert.equal(parseSharedPlaybackPosition("755"), 755);
  assert.equal(parseSharedPlaybackPosition("0"), 0);
  assert.equal(parseSharedPlaybackPosition("12.5"), null);
  assert.equal(parseSharedPlaybackPosition("-1"), null);
  assert.equal(parseSharedPlaybackPosition("texto"), null);
  assert.equal(parseSharedPlaybackPosition(null), null);
});
