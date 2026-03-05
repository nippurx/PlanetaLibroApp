import { apiClient } from "./client";

export type AuthorPhoto = {
  available: boolean;
  url: string | null;
};

export type Author = {
  uri: string;
  nombre: string;
  bio?: string | null;
  bio_html?: string | null;
  htm?: string | null;
  photo: AuthorPhoto;
};

export type AuthorBookItem = {
  id: number;
  uri: string;
  titulo: string;
  subtitulo: string | null;
  cover_url?: string | null;
  author_uri?: string | null;
  autor?: {
    uri: string | null;
    nombre: string | null;
  };
};

export type AuthorResponse = {
  author: Author;
  books: AuthorBookItem[];
  pagination: {
    limit: number;
    offset: number;
  };
};

type ApiEnvelope<T> = {
  data: T;
};

export async function fetchAuthorByUri(uri: string, params: { limit?: number; offset?: number } = {}): Promise<AuthorResponse> {
  const searchParams = new URLSearchParams();

  if (typeof params.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  if (typeof params.offset === "number") {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  const response = await apiClient.get<ApiEnvelope<AuthorResponse>>(`/public/autor/${encodeURIComponent(uri)}${suffix}`);
  return response.data;
}
