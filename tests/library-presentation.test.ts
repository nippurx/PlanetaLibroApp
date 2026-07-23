import test from "node:test";
import assert from "node:assert/strict";
import {
  getLibraryProgressLabel,
  isLibraryView,
  normalizeLibraryOffset,
  normalizeLibrarySort,
  updateLibrarySearchParams,
} from "../src/features/library/presentation.ts";

function libraryBook(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    uri: "libro",
    titulo: "Libro",
    subtitulo: "",
    descripcion: "",
    autorNombre: "Autora",
    autorUri: null,
    cover_url: null,
    hasCover: false,
    readOnline: true,
    hasAudio: false,
    youtubeVideoId: null,
    formatos: { pdf: false, epub: false, mobi: false },
    idioma: "es",
    updatedAt: null,
    tags: [],
    currentPage: 1,
    readingStarted: false,
    progressPercent: 0,
    hasReliableProgress: false,
    totalPages: null,
    listeningMinute: 0,
    listeningStarted: false,
    libraryState: "unread",
    addedAt: null,
    lastActivityAt: null,
    currentChapter: "",
    ...overrides,
  };
}

test("normaliza las vistas, el orden y la paginación recibidos desde la URL", () => {
  assert.equal(isLibraryView("abandoned"), true);
  assert.equal(isLibraryView("nuevo-libro"), false);
  assert.equal(normalizeLibrarySort("oldest"), "oldest");
  assert.equal(normalizeLibrarySort("otro"), "recent");
  assert.equal(normalizeLibraryOffset("40"), 40);
  assert.equal(normalizeLibraryOffset("-20"), 0);
});

test("conserva filtros y orden al cambiar búsqueda y reiniciar paginación", () => {
  const current = new URLSearchParams("view=all&sort=oldest&offset=40");
  const next = updateLibrarySearchParams(current, { q: "Borges", offset: null });

  assert.equal(next.get("view"), "all");
  assert.equal(next.get("sort"), "oldest");
  assert.equal(next.get("q"), "Borges");
  assert.equal(next.has("offset"), false);
});

test("solo muestra porcentaje cuando existe un total de páginas confiable", () => {
  assert.equal(
    getLibraryProgressLabel(libraryBook({ readingStarted: true, currentPage: 30 })),
    "Página 30",
  );
  assert.equal(
    getLibraryProgressLabel(libraryBook({
      readingStarted: true,
      currentPage: 30,
      progressPercent: 30,
      hasReliableProgress: true,
      totalPages: 100,
    })),
    "30% · Página 30 de 100",
  );
});
