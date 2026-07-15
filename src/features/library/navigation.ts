import { type Book } from "../../api/books";

export type LibraryAction = {
  kind: "read" | "listen";
  href: string;
  label: string;
  ariaLabel: string;
  icon: "menu_book" | "headphones";
};

export type LibraryActions = {
  read: LibraryAction | null;
  listen: LibraryAction | null;
  cover: LibraryAction | null;
};

function validReadingPage(value: number): number {
  return Number.isFinite(value) && value >= 1 ? Math.trunc(value) : 1;
}

export function getLibraryActions(book: Book, audioProgressSeconds: number): LibraryActions {
  const page = validReadingPage(book.currentPage);
  const read = book.readOnline
    ? {
        kind: "read" as const,
        href: `/read/${encodeURIComponent(book.uri)}/${page}`,
        label: book.readingStarted ? "Continuar leyendo" : "Leer",
        ariaLabel: book.readingStarted ? `Continuar leyendo ${book.titulo}` : `Leer ${book.titulo}`,
        icon: "menu_book" as const,
      }
    : null;
  const hasAudioProgress = Number.isFinite(audioProgressSeconds) && audioProgressSeconds > 0;
  const listen = book.hasAudio
    ? {
        kind: "listen" as const,
        href: `/listen/${encodeURIComponent(book.uri)}`,
        label: hasAudioProgress ? "Continuar escuchando" : "Escuchar",
        ariaLabel: hasAudioProgress
          ? `Continuar escuchando el audiolibro de ${book.titulo}`
          : `Escuchar el audiolibro de ${book.titulo}`,
        icon: "headphones" as const,
      }
    : null;

  return { read, listen, cover: read ?? listen };
}

export function getBookDetailUrl(book: Book): string {
  return `/book/${encodeURIComponent(book.uri)}`;
}
