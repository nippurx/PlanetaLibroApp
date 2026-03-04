import { apiClient } from "./client";

type ApiEnvelope<T> = {
  data: T;
};

type BookListApiItem = {
  id: number;
  uri: string;
  titulo: string;
  subtitulo: string | null;
  autor: {
    uri: string | null;
    nombre: string | null;
  };
  cover_url?: string | null;
  recursos: {
    read_online: boolean;
    video_audiolibro: string | null;
  };
  formatos: {
    pdf: boolean;
    epub: boolean;
    mobi: boolean;
  };
};

type BookDetailApiItem = BookListApiItem & {
  descripcion: string | null;
  idioma: string | null;
  updated_at: string | null;
  recursos: BookListApiItem["recursos"] & {
    archivo: string | null;
    archivo_alternativo: string | null;
    archivo_audiolibro: string | null;
    external_pdf: string | null;
    descargar: boolean;
    url_amazon: string | null;
    link_p2p: string | null;
    link_hotmart: string | null;
  };
};

type BookListResponse = {
  items: BookListApiItem[];
  pagination: {
    limit: number;
    offset: number;
  };
};

type HealthResponse = {
  ok: boolean;
  version: string;
};

export type Book = {
  id: number;
  uri: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  autorNombre: string;
  autorUri: string | null;
  cover_url: string | null;
  hasCover: boolean;
  readOnline: boolean;
  hasAudio: boolean;
  youtubeVideoId: string | null;
  formatos: {
    pdf: boolean;
    epub: boolean;
    mobi: boolean;
  };
  idioma: string | null;
  updatedAt: string | null;
  currentPage: number;
  progressPercent: number;
  currentChapter: string;
};

function normalizeAudioId(value: string | null): string | null {
  if (!value || value === "sin-audiolibro") {
    return null;
  }

  return value;
}

function normalizeAuthorName(value: string | null): string {
  return value?.trim() || "Autor desconocido";
}

function mapBook(apiBook: BookListApiItem | BookDetailApiItem): Book {
  const audioId = normalizeAudioId(apiBook.recursos.video_audiolibro);
  const coverUrl = apiBook.cover_url ?? null;

  return {
    id: apiBook.id,
    uri: apiBook.uri,
    titulo: apiBook.titulo,
    subtitulo: apiBook.subtitulo ?? "",
    descripcion: "descripcion" in apiBook && apiBook.descripcion ? apiBook.descripcion : "",
    autorNombre: normalizeAuthorName(apiBook.autor.nombre),
    autorUri: apiBook.autor.uri,
    cover_url: coverUrl,
    hasCover: Boolean(coverUrl),
    readOnline: apiBook.recursos.read_online,
    hasAudio: Boolean(audioId),
    youtubeVideoId: audioId,
    formatos: apiBook.formatos,
    idioma: "idioma" in apiBook ? apiBook.idioma : null,
    updatedAt: "updated_at" in apiBook ? apiBook.updated_at : null,
    currentPage: 1,
    progressPercent: 0,
    currentChapter: "Capítulo inicial",
  };
}

function filterBooks(books: Book[], q: string): Book[] {
  const normalizedQuery = q.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return books;
  }

  return books.filter((book) =>
    [book.titulo, book.subtitulo, book.autorNombre, book.uri]
      .filter(Boolean)
      .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
  );
}

export async function getBookByUri(uri: string): Promise<Book> {
  const response = await apiClient.get<ApiEnvelope<BookDetailApiItem>>(`/public/libro/${encodeURIComponent(uri)}`);
  return mapBook(response.data);
}

export async function getHomeBooks(limit = 10): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(`/public/libros?limit=${limit}`);
  return response.data.items.map(mapBook);
}

export async function searchBooks(q: string): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>("/public/libros?limit=60");
  return filterBooks(response.data.items.map(mapBook), q).slice(0, 20);
}

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<ApiEnvelope<HealthResponse>>("/public/health");
  return response.data;
}