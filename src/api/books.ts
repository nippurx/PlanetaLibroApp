import { apiClient } from "./client";

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
    titulo: apiBook.titulo,
    subtitulo: apiBook.subtitulo ?? "",
    descripcion: "descripcion" in apiBook && apiBook.descripcion ? apiBook.descripcion : "",
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
    currentPage: 1,
    progressPercent: 0,
    currentChapter: "Capitulo inicial",
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
