import { apiClient } from "./client";

type ApiEnvelope<T> = { data: T };

function createRequestId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export type AudiobookBookmark = {
  id: number;
  ebooks_books_id: number;
  media_id: string;
  position_seconds: number;
  note_text: string | null;
  revision: number;
  created_at: string;
  updated_at: string;
};

export async function listAudiobookBookmarks(uri: string, signal?: AbortSignal): Promise<AudiobookBookmark[]> {
  const response = await apiClient.get<ApiEnvelope<{ items: AudiobookBookmark[]; media_id: string }>>(
    `/public/books/${encodeURIComponent(uri)}/audiobook-bookmarks`, undefined, signal,
  );
  return response.data.items;
}

export async function createAudiobookBookmark(uri: string, positionSeconds: number, mediaId: string, csrfToken: string) {
  const response = await apiClient.post<ApiEnvelope<{ bookmark: AudiobookBookmark; created: boolean }>>(
    `/public/books/${encodeURIComponent(uri)}/audiobook-bookmarks`,
    { position_seconds: positionSeconds, media_id: mediaId, client_request_id: createRequestId() },
    { "X-CSRF-Token": csrfToken },
  );
  return response.data;
}

export async function updateAudiobookBookmark(id: number, noteText: string | null, revision: number, csrfToken: string) {
  const response = await apiClient.patch<ApiEnvelope<AudiobookBookmark>>(
    `/public/audiobook-bookmarks/${id}`,
    { note_text: noteText, revision },
    { "X-CSRF-Token": csrfToken },
  );
  return response.data;
}

export async function deleteAudiobookBookmark(id: number, csrfToken: string): Promise<void> {
  await apiClient.delete<ApiEnvelope<{ deleted: boolean }>>(
    `/public/audiobook-bookmarks/${id}`,
    { "X-CSRF-Token": csrfToken },
  );
}
