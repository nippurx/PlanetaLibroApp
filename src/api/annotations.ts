import { apiClient } from "./client";

type ApiEnvelope<T> = { data: T };

export type AnnotationColor = 1 | 2 | 3 | 4;

export type ReadingAnnotation = {
  id: number;
  ebooks_books_id: number;
  start_fragment: number;
  start_offset: number;
  end_fragment: number;
  end_offset: number;
  exact_text: string;
  prefix_text: string | null;
  suffix_text: string | null;
  content_version: string;
  anchor_version: number;
  note_text: string | null;
  color_code: AnnotationColor;
  revision: number;
  created_at: string;
  updated_at: string;
};

export type AnnotationDraft = Omit<ReadingAnnotation, "id" | "ebooks_books_id" | "revision" | "created_at" | "updated_at"> & {
  client_request_id: string;
};

export async function listAnnotations(
  uri: string,
  filter: "all" | "highlights" | "notes" = "all",
  cursor?: string | null,
  signal?: AbortSignal,
): Promise<{ items: ReadingAnnotation[]; next_cursor: string | null }> {
  const query = new URLSearchParams({ filter, limit: "50" });
  if (cursor) query.set("cursor", cursor);
  const response = await apiClient.get<ApiEnvelope<{ items: ReadingAnnotation[]; next_cursor: string | null }>>(
    `/public/books/${encodeURIComponent(uri)}/annotations?${query}`,
    undefined,
    signal,
  );
  return response.data;
}

export async function createAnnotation(uri: string, draft: AnnotationDraft, csrfToken: string): Promise<ReadingAnnotation> {
  const response = await apiClient.post<ApiEnvelope<ReadingAnnotation>>(
    `/public/books/${encodeURIComponent(uri)}/annotations`,
    draft,
    { "X-CSRF-Token": csrfToken },
  );
  return response.data;
}

export async function updateAnnotation(
  id: number,
  update: { note_text: string | null; color_code: AnnotationColor; revision: number },
  csrfToken: string,
): Promise<ReadingAnnotation> {
  const response = await apiClient.patch<ApiEnvelope<ReadingAnnotation>>(
    `/public/annotations/${id}`,
    update,
    { "X-CSRF-Token": csrfToken },
  );
  return response.data;
}

export async function deleteAnnotation(id: number, csrfToken: string): Promise<void> {
  await apiClient.delete<ApiEnvelope<{ deleted: boolean }>>(
    `/public/annotations/${id}`,
    { "X-CSRF-Token": csrfToken },
  );
}
