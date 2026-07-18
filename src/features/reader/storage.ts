import { ReaderPreferences, ReaderProgress } from "./types";

const PREFERENCES_KEY = "reader-preferences:v2";
const LEGACY_PREFERENCES_KEY = "reader-preferences:v1";
const DEFAULTS: ReaderPreferences = { version: 2, mode: "paged", theme: "sepia", font: "book", alignment: "justify", fontSize: 20, lineHeight: 1.5, measure: 720 };

function normalizeFont(value: unknown): ReaderPreferences["font"] {
  if (value === "clear" || value === "hyperlegible" || value === "opendyslexic") return value;
  if (value === "sans") return "clear";
  if (value === "accessible") return "hyperlegible";
  return "book";
}

export function loadPreferences(): ReaderPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY) ?? localStorage.getItem(LEGACY_PREFERENCES_KEY);
    const value = JSON.parse(stored ?? "null") as (Omit<Partial<ReaderPreferences>, "version" | "font"> & { version?: number; font?: unknown }) | null;
    if (!value || (value.version !== 1 && value.version !== 2)) return DEFAULTS;
    return {
      version: 2,
      mode: value.mode === "scroll" ? "scroll" : "paged",
      theme: value.theme === "light" || value.theme === "dark" ? value.theme : "sepia",
      font: normalizeFont(value.font),
      alignment: value.alignment === "left" ? "left" : "justify",
      fontSize: Math.min(32, Math.max(14, Number(value.fontSize) || DEFAULTS.fontSize)),
      lineHeight: Math.min(2.2, Math.max(1.35, Number(value.lineHeight) || DEFAULTS.lineHeight)),
      measure: Math.min(960, Math.max(480, Number(value.measure) || DEFAULTS.measure)),
    };
  } catch { return DEFAULTS; }
}

export function savePreferences(value: ReaderPreferences): void {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value)); } catch { /* Reading remains available. */ }
}

function progressKey(uri: string): string { return `reader-progress:v1:${uri}`; }

export function loadProgress(uri: string): ReaderProgress | null {
  try {
    const value = JSON.parse(localStorage.getItem(progressKey(uri)) ?? "null") as ReaderProgress | null;
    return value?.version === 1 && value.uri === uri && value.anchor?.version === 1 ? value : null;
  } catch { return null; }
}

export function saveProgress(value: ReaderProgress): void {
  try { localStorage.setItem(progressKey(value.uri), JSON.stringify(value)); } catch { /* Reading remains available. */ }
}
