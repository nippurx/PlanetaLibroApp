import { apiClient } from "./client";

type ApiEnvelope<T> = { data: T };

export async function getReaderProgress(uri: string): Promise<number | null> {
  const response = await apiClient.get<ApiEnvelope<{ current_page: number } | null>>(
    `/public/reader-progress/${encodeURIComponent(uri)}`,
  );
  return response.data?.current_page ?? null;
}

export async function saveReaderProgress(uri: string, page: number, csrfToken: string): Promise<void> {
  await apiClient.post<ApiEnvelope<{ created: boolean; updated: boolean; current_page: number }>>(
    `/public/reader-progress/${encodeURIComponent(uri)}`,
    { page },
    { "X-CSRF-Token": csrfToken },
  );
}
