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

export function getLibraryActions(book: Book, _audioProgressSeconds: number): LibraryActions {
  const page = validReadingPage(book.currentPage);
  const read = book.readOnline
    ? {
        kind: "read" as const,
        href: `/read/${encodeURIComponent(book.uri)}/${page}`,
        label: "Leer",
        ariaLabel: `Leer ${book.titulo}`,
        icon: "menu_book" as const,
      }
    : null;
  const listen = book.hasAudio
    ? {
        kind: "listen" as const,
        href: `/listen/${encodeURIComponent(book.uri)}`,
        label: "Escuchar",
        ariaLabel: `Escuchar el audiolibro de ${book.titulo}`,
        icon: "headphones" as const,
      }
    : null;

  return { read, listen, cover: read ?? listen };
}

export function getBookDetailUrl(book: Book): string {
  return `/book/${encodeURIComponent(book.uri)}`;
}
