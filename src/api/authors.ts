import { apiClient } from "./client";

import { decodeHtmlEntities, normalizePersonName } from "../utils/text";

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

const AUTHOR_IMAGES_BASE_URL = "https://planetalibro.net/ebooks/images/authors";

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
  const data = response.data;

  return {
    ...data,
    author: {
      ...data.author,
      nombre: normalizePersonName(data.author.nombre),
      bio: data.author.bio ? decodeHtmlEntities(data.author.bio) : data.author.bio,
      bio_html: data.author.bio_html ? decodeHtmlEntities(data.author.bio_html) : data.author.bio_html,
      htm: data.author.htm ? decodeHtmlEntities(data.author.htm) : data.author.htm,
      photo: data.author.photo?.url
        ? data.author.photo
        : {
            available: true,
            url: `${AUTHOR_IMAGES_BASE_URL}/${encodeURIComponent(data.author.uri)}.jpg`,
          },
    },
    books: data.books.map((book) => ({
      ...book,
      titulo: decodeHtmlEntities(book.titulo),
      subtitulo: book.subtitulo ? decodeHtmlEntities(book.subtitulo) : book.subtitulo,
      autor: book.autor
        ? {
            ...book.autor,
            nombre: book.autor.nombre ? normalizePersonName(book.autor.nombre) : book.autor.nombre,
          }
        : book.autor,
    })),
  };
}
