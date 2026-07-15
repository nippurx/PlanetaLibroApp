import { ReaderError, ReaderManifest } from "./types";
import { ApiError, apiClient } from "../../api/client";

const SAFE_URI = /^[a-zA-Z0-9._-]+$/;

export function assertBookUri(uri: string): string {
  if (!SAFE_URI.test(uri) || uri.startsWith(".") || uri.includes("..")) {
    throw new ReaderError("La URI del libro no es válida.", "INVALID_URI");
  }
  return uri;
}

export function getReaderRoot(uri: string): string {
  const safe = assertBookUri(uri);
  const [author] = safe.split("-");
  if (!author || safe.length < 2) throw new ReaderError("La URI no permite resolver el libro.", "INVALID_URI");
  return `/lector/${encodeURIComponent(safe[0])}/${encodeURIComponent(safe[1])}/${encodeURIComponent(author)}/${encodeURIComponent(safe)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseManifest(value: unknown, expectedUri?: string): ReaderManifest {
  if (!isRecord(value) || value.version !== 2 || !Number.isInteger(value.pages) || Number(value.pages) < 1) {
    throw new ReaderError("El manifiesto del libro no es compatible.", "INVALID_MANIFEST");
  }
  const pages = Number(value.pages);
  const uri = typeof value.uri === "string" ? value.uri : "";
  if (!SAFE_URI.test(uri) || (expectedUri && uri !== expectedUri)) {
    throw new ReaderError("El manifiesto no corresponde al libro solicitado.", "INVALID_MANIFEST");
  }
  const index = Array.isArray(value.index)
    ? value.index.flatMap((item) => {
        if (!isRecord(item) || typeof item.titulo !== "string" || !Number.isInteger(item.pag) || !Number.isInteger(item.nivel)) return [];
        const pag = Number(item.pag);
        if (pag < 1 || pag > pages) return [];
        return [{ titulo: item.titulo, pag, nivel: Math.max(1, Math.min(6, Number(item.nivel))) }];
      })
    : [];
  const chapters = Array.isArray(value.chapters)
    ? value.chapters.flatMap((item) => {
        if (!isRecord(item) || typeof item.href !== "string" || !Number.isInteger(item.page) || typeof item.title !== "string") return [];
        const page = Number(item.page);
        return page >= 1 && page <= pages ? [{ href: item.href, page, title: item.title }] : [];
      })
    : [];
  const paginicio = Number.isInteger(value.paginicio) && Number(value.paginicio) >= 1 && Number(value.paginicio) <= pages ? Number(value.paginicio) : 1;
  return {
    version: 2,
    uri,
    generated_at: typeof value.generated_at === "string" ? value.generated_at : undefined,
    pages,
    paginicio,
    index,
    chapters,
    assets: Array.isArray(value.assets) ? value.assets.filter((item): item is string => typeof item === "string") : [],
    warnings: Array.isArray(value.warnings) ? value.warnings.filter((item): item is string => typeof item === "string") : [],
  };
}

async function fetchOk(url: string, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(url, { credentials: "include", signal, headers: { Accept: "application/json,text/html;q=0.9" } });
  if (!response.ok) throw new ReaderError(`No se pudo cargar el recurso (${response.status}).`, "HTTP_ERROR", undefined, response.status);
  return response;
}

export async function loadManifest(uri: string, signal?: AbortSignal): Promise<ReaderManifest> {
  const safeUri = assertBookUri(uri);
  try {
    const response = await fetchOk(`${getReaderRoot(safeUri)}/manifest.json`, signal);
    return parseManifest(await response.json(), safeUri);
  } catch (error) {
    if (error instanceof ReaderError && error.code === "HTTP_ERROR" && error.status === 404) {
      try {
        const response = await apiClient.get<{ data: unknown }>(
          `/public/reader-manifest/${encodeURIComponent(safeUri)}`,
          undefined,
          signal,
        );
        return parseManifest(response.data, safeUri);
      } catch (fallbackError) {
        if (fallbackError instanceof ApiError) {
          throw new ReaderError(fallbackError.message, "HTTP_ERROR", fallbackError, fallbackError.status);
        }
        throw fallbackError;
      }
    }
    if (error instanceof ReaderError) throw error;
    throw new ReaderError("El manifiesto no contiene JSON válido.", "INVALID_MANIFEST", error);
  }
}

export async function loadFragment(uri: string, page: number, totalPages: number, signal?: AbortSignal): Promise<string> {
  if (!Number.isInteger(page) || page < 1 || page > totalPages) throw new ReaderError("El fragmento está fuera del libro.", "OUT_OF_RANGE");
  const response = await fetchOk(`${getReaderRoot(uri)}/pag-${page}.html`, signal);
  return response.text();
}

export function getLegacyReaderUrl(uri: string, page = 1): string {
  return `/leerlibro/${encodeURIComponent(assertBookUri(uri))}/${Math.max(1, Math.trunc(page))}`;
}
