export function getAudiobookProgressKey(bookUri: string) {
  return `audiobook-progress:${bookUri}`;
}

export function saveAudiobookProgress(bookUri: string, seconds: number) {
  try {
    localStorage.setItem(getAudiobookProgressKey(bookUri), String(seconds));
  } catch {
    // El audio sigue disponible aunque el navegador rechace almacenamiento local.
  }
}

export function loadAudiobookProgress(bookUri: string): number {
  try {
    const raw = localStorage.getItem(getAudiobookProgressKey(bookUri));
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  } catch {
    return 0;
  }
}
