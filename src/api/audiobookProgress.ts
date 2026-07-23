import { apiClient } from "./client";

type ApiEnvelope<T> = { data: T };

export type AudiobookProgress = {
  has_progress: boolean;
  position_seconds: number;
  furthest_position_seconds: number;
  media_id: string;
  progress_created_at: string | null;
  last_playback_activity_at: string | null;
};

export type SavedAudiobookProgress = Omit<AudiobookProgress, "has_progress"> & {
  created: boolean;
};

export async function getAudiobookProgress(uri: string, signal?: AbortSignal): Promise<AudiobookProgress> {
  const response = await apiClient.get<ApiEnvelope<AudiobookProgress>>(
    `/public/audiobook-progress/${encodeURIComponent(uri)}`,
    undefined,
    signal,
  );
  return response.data;
}

export async function saveAudiobookProgress(
  uri: string,
  positionSeconds: number,
  mediaId: string,
  csrfToken: string,
  keepalive = false,
): Promise<SavedAudiobookProgress> {
  const response = await apiClient.post<ApiEnvelope<SavedAudiobookProgress>>(
    `/public/audiobook-progress/${encodeURIComponent(uri)}`,
    { position_seconds: positionSeconds, media_id: mediaId },
    { "X-CSRF-Token": csrfToken },
    keepalive,
  );
  return response.data;
}
