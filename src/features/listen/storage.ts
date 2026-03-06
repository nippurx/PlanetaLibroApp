export function getAudiobookProgressKey(bookUri: string) {
  return `audiobook-progress:${bookUri}`;
}

export function saveAudiobookProgress(bookUri: string, seconds: number) {
  localStorage.setItem(getAudiobookProgressKey(bookUri), String(seconds));
}

export function loadAudiobookProgress(bookUri: string): number {
  const raw = localStorage.getItem(getAudiobookProgressKey(bookUri));
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}
