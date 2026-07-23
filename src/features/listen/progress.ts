import type { AudiobookProgress } from "../../api/audiobookProgress";

export function normalizePlaybackSeconds(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

export function clampPlaybackPosition(value: number, duration: number): number {
  const position = normalizePlaybackSeconds(value);
  const normalizedDuration = normalizePlaybackSeconds(duration);
  return normalizedDuration > 0 ? Math.min(position, normalizedDuration) : position;
}

export function parseSharedPlaybackPosition(value: string | null): number | null {
  if (value === null || !/^\d+$/.test(value)) return null;
  const seconds = Number(value);
  return Number.isSafeInteger(seconds) ? seconds : null;
}

export function resolveResumePosition(remote: AudiobookProgress | null, localSeconds: number): number {
  const local = normalizePlaybackSeconds(localSeconds);
  if (!remote?.has_progress) return local;

  const current = normalizePlaybackSeconds(remote.position_seconds);
  const furthest = normalizePlaybackSeconds(remote.furthest_position_seconds);
  return current === 0 && furthest > 0 ? furthest : current;
}

export function formatPlaybackTime(seconds: number): string {
  const total = normalizePlaybackSeconds(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
