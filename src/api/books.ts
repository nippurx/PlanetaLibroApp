import { apiClient } from "./client";
import { decodeHtmlEntities, normalizePersonName } from "../utils/text";

type ApiEnvelope<T> = {
  data: T;
};

const PLANETA_LIBRO_ORIGIN = "https://planetalibro.net";

type BookListApiItem = {
  id: number;
  uri: string;
  author_uri?: string | null;
  titulo: string;
  subtitulo: string | null;
  autor:
    | {
        uri: string | null;
        nombre: string | null;
      }
    | string;
  cover_url?: string | null;
  recursos?: {
    read_online: boolean;
    video_audiolibro: string | null;
  };
  read_online?: boolean;
  video_audiolibro?: string | null;
  formatos?: {
    pdf: boolean;
    epub: boolean;
    mobi: boolean;
  };
  reading?: {
    current_page: number;
    first_read: string | null;
    last_read: string | null;
    started?: boolean;
    total_pages?: number | null;
    progress_percent?: number | null;
  };
  listening?: {
    current_minute: number;
    furthest_minute: number;
    first_read: string | null;
    last_read: string | null;
    started: boolean;
  };
  state?: LibraryState;
  added_at?: string | null;
  last_activity_at?: string | null;
};

type BookDetailApiItem = Omit<BookListApiItem, "autor"> & {
  autor: {
    uri: string | null;
    nombre: string | null;
  };
  tags?: unknown;
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

export type BookTag = {
  uri: string;
  label: string;
};

export type BookListResult = {
  items: Book[];
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
  recursos?: {
    read_online?: boolean;
    video_audiolibro?: string | null;
  };
  hasAudio: boolean;
  youtubeVideoId: string | null;
  formatos: {
    pdf: boolean;
    epub: boolean;
    mobi: boolean;
  };
  idioma: string | null;
  updatedAt: string | null;
  tags: BookTag[];
  currentPage: number;
  readingStarted: boolean;
  progressPercent: number;
  hasReliableProgress: boolean;
  totalPages: number | null;
  listeningMinute: number;
  listeningStarted: boolean;
  libraryState: LibraryState | null;
  addedAt: string | null;
  lastActivityAt: string | null;
  currentChapter: string;
};

export type LibraryState = "unread" | "in_progress" | "completed" | "abandoned";

export type LibraryCounts = Record<LibraryState | "all", number>;

export type LibrarySummary = {
  sections: Record<"in_progress" | "unread" | "completed", { items: Book[]; total: number }>;
  total: number;
  counts: LibraryCounts;
};

export type LibraryListResult = {
  items: Book[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
  filters: {
    state: LibraryState | "all";
    q: string;
    sort: "recent" | "oldest";
  };
  counts: LibraryCounts;
};

function normalizeAudioId(value: string | null): string | null {
  if (!value || value === "sin-audiolibro") {
    return null;
  }

  return value;
}

function normalizeAuthorName(value: string | null): string {
  return value ? normalizePersonName(value) : "Autor desconocido";
}

function getAuthorData(apiBook: BookListApiItem | BookDetailApiItem): { name: string; uri: string | null } {
  if (typeof apiBook.autor === "string") {
    return {
      name: normalizeAuthorName(apiBook.autor),
      uri: apiBook.author_uri ?? null,
    };
  }

  return {
    name: normalizeAuthorName(apiBook.autor.nombre),
    uri: apiBook.autor.uri ?? apiBook.author_uri ?? null,
  };
}

function getBookResources(apiBook: BookListApiItem | BookDetailApiItem): { read_online: boolean; video_audiolibro: string | null } {
  if (apiBook.recursos) {
    return apiBook.recursos;
  }

  return {
    read_online: apiBook.read_online ?? false,
    video_audiolibro: apiBook.video_audiolibro ?? null,
  };
}

function normalizeCoverUrl(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${PLANETA_LIBRO_ORIGIN}${value}`;
  }

  return `${PLANETA_LIBRO_ORIGIN}/${value}`;
}

function normalizeTagLabel(value: string | null | undefined): string {
  return value?.trim() || "Tema";
}

type ApiTagItem = {
  uri?: string | null;
  label?: string | null;
  nombre_es?: string | null;
  nombre?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractTagItems(value: unknown): Array<string | ApiTagItem> {
  if (Array.isArray(value)) {
    return value as Array<string | ApiTagItem>;
  }

  if (!isRecord(value)) {
    return [];
  }

  if (Array.isArray(value.tags)) {
    return value.tags as Array<string | ApiTagItem>;
  }

  if (Array.isArray(value.items)) {
    return value.items as Array<string | ApiTagItem>;
  }

  if (Array.isArray(value.data)) {
    return value.data as Array<string | ApiTagItem>;
  }

  return [];
}

function normalizeTags(value: BookDetailApiItem["tags"]): BookTag[] {
  return extractTagItems(value)
    .map((tag) => {
      if (typeof tag === "string") {
        const uri = tag.trim();

        if (!uri) {
          return null;
        }

        return {
          uri,
          label: normalizeTagLabel(uri.replace(/[-_]+/g, " ")),
        };
      }

      const uri = tag.uri?.trim();

      if (!uri) {
        return null;
      }

      return {
        uri,
        label: normalizeTagLabel(tag.label ?? tag.nombre_es ?? tag.nombre),
      };
    })
    .filter((tag): tag is BookTag => Boolean(tag));
}

function mapBook(apiBook: BookListApiItem | BookDetailApiItem): Book {
  const author = getAuthorData(apiBook);
  const recursos = getBookResources(apiBook);
  const audioId = normalizeAudioId(recursos.video_audiolibro);
  const coverUrl = normalizeCoverUrl(apiBook.cover_url);
  const formatos = apiBook.formatos ?? {
    pdf: false,
    epub: false,
    mobi: false,
  };

  return {
    id: apiBook.id,
    uri: apiBook.uri,
    titulo: decodeHtmlEntities(apiBook.titulo),
    subtitulo: apiBook.subtitulo ? decodeHtmlEntities(apiBook.subtitulo) : "",
    descripcion: "descripcion" in apiBook && apiBook.descripcion ? decodeHtmlEntities(apiBook.descripcion) : "",
    autorNombre: author.name,
    autorUri: author.uri,
    cover_url: coverUrl,
    hasCover: Boolean(coverUrl),
    readOnline: recursos.read_online,
    recursos,
    hasAudio: Boolean(audioId),
    youtubeVideoId: audioId,
    formatos,
    idioma: "idioma" in apiBook ? apiBook.idioma : null,
    updatedAt: "updated_at" in apiBook ? apiBook.updated_at : null,
    tags: "tags" in apiBook ? normalizeTags(apiBook.tags) : [],
    currentPage: apiBook.reading?.current_page ?? 1,
    readingStarted: apiBook.reading?.started ?? (Boolean(apiBook.reading?.first_read) || (apiBook.reading?.current_page ?? 1) > 1),
    progressPercent: apiBook.reading?.progress_percent ?? 0,
    hasReliableProgress: apiBook.reading?.progress_percent !== null && apiBook.reading?.progress_percent !== undefined,
    totalPages: apiBook.reading?.total_pages ?? null,
    listeningMinute: apiBook.listening?.current_minute ?? 0,
    listeningStarted: apiBook.listening?.started ?? false,
    libraryState: apiBook.state ?? null,
    addedAt: apiBook.added_at ?? null,
    lastActivityAt: apiBook.last_activity_at ?? null,
    currentChapter: "Capitulo inicial",
  };
}

export async function getUserLibrary(): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<{ items: BookListApiItem[] }>>("/public/library");
  return response.data.items.map(mapBook);
}

type LibrarySummaryApiResponse = {
  sections: Record<"in_progress" | "unread" | "completed", { items: BookListApiItem[]; total: number }>;
  total: number;
  counts: LibraryCounts;
};

type LibraryListApiResponse = {
  items: BookListApiItem[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    has_more: boolean;
  };
  filters: LibraryListResult["filters"];
  counts: LibraryCounts;
};

export async function getLibrarySummary(previewLimit = 10): Promise<LibrarySummary> {
  const response = await apiClient.get<ApiEnvelope<LibrarySummaryApiResponse>>(
    `/public/library/summary?preview_limit=${previewLimit}`,
  );
  return {
    ...response.data,
    sections: {
      in_progress: {
        total: response.data.sections.in_progress.total,
        items: response.data.sections.in_progress.items.map(mapBook),
      },
      unread: {
        total: response.data.sections.unread.total,
        items: response.data.sections.unread.items.map(mapBook),
      },
      completed: {
        total: response.data.sections.completed.total,
        items: response.data.sections.completed.items.map(mapBook),
      },
    },
  };
}

export async function getLibraryItems(options: {
  state: LibraryState | "all";
  q?: string;
  sort?: "recent" | "oldest";
  limit?: number;
  offset?: number;
}): Promise<LibraryListResult> {
  const params = new URLSearchParams({
    state: options.state,
    q: options.q?.trim() ?? "",
    sort: options.sort ?? "recent",
    limit: String(options.limit ?? 20),
    offset: String(options.offset ?? 0),
  });
  const response = await apiClient.get<ApiEnvelope<LibraryListApiResponse>>(
    `/public/library/items?${params.toString()}`,
  );
  return {
    items: response.data.items.map(mapBook),
    pagination: {
      limit: response.data.pagination.limit,
      offset: response.data.pagination.offset,
      total: response.data.pagination.total,
      hasMore: response.data.pagination.has_more,
    },
    filters: response.data.filters,
    counts: response.data.counts,
  };
}

export async function getBookByUri(uri: string): Promise<Book> {
  const response = await apiClient.get<ApiEnvelope<BookDetailApiItem>>(`/public/libro/${encodeURIComponent(uri)}`);
  return mapBook(response.data);
}

export async function getHomeBooks(limit = 10): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(`/public/libros?limit=${limit}`);
  return response.data.items.map(mapBook);
}

export async function fetchBooksByTag(tag: string, limit = 10, offset = 0, lang = "es"): Promise<BookListResult> {
  const searchParams = new URLSearchParams({
    tag: tag.trim(),
    limit: String(limit),
    offset: String(offset),
    lang,
  });

  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(`/public/libros/por-tag?${searchParams.toString()}`);

  return {
    items: response.data.items.map(mapBook),
    pagination: response.data.pagination,
  };
}

export async function fetchTopBooks(lang: string = "es", limit: number = 15): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(`/public/libros/top?limit=${limit}&lang=${lang}`);
  return response.data.items.map(mapBook);
}

export async function fetchTopReadBooks(lang: string = "es", limit: number = 15): Promise<Book[]> {
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(
    `/public/libros/top-leidos?limit=${limit}&lang=${lang}`,
  );
  return response.data.items.map(mapBook);
}

export async function searchBooks(q: string, limit = 20, offset = 0): Promise<Book[]> {
  const normalizedQuery = q.trim();
  if (!normalizedQuery) {
    return [];
  }

  const encodedQuery = encodeURIComponent(normalizedQuery);
  const response = await apiClient.get<ApiEnvelope<BookListResponse>>(
    `/public/buscar?q=${encodedQuery}&limit=${limit}&offset=${offset}`,
  );
  return response.data.items.map(mapBook);
}

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<ApiEnvelope<HealthResponse>>("/public/health");
  return response.data;
}
