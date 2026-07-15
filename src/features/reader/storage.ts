import { ReaderPreferences, ReaderProgress } from "./types";

const PREFERENCES_KEY = "reader-preferences:v1";
const DEFAULTS: ReaderPreferences = { version: 1, mode: "paged", theme: "sepia", font: "serif", fontSize: 20, lineHeight: 1.5, measure: 720 };

export function loadPreferences(): ReaderPreferences {
  try {
    const value = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? "null") as Partial<ReaderPreferences> | null;
    if (!value || value.version !== 1) return DEFAULTS;
    return {
      version: 1,
      mode: value.mode === "scroll" ? "scroll" : "paged",
      theme: value.theme === "light" || value.theme === "dark" ? value.theme : "sepia",
      font: value.font === "sans" || value.font === "accessible" ? value.font : "serif",
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
